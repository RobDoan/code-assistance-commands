import { symlink, rm, access, stat, readdir, lstat } from 'fs/promises';
import { resolve, join, dirname } from 'path';
import type { ConfigurationEntry, LinkOperationResult } from './types';
import PathValidator from './path-validator';
import UserPrompt, { type ConfirmationOptions } from './user-prompt';
import DirectoryCreator from './directory-creator';
import { Logger, ConfigSymlinkerError, ErrorCode } from './error-handler';

export default class SymbolicLinkManager {
  private static readonly MAX_DEPTH = 10;

  static async processConfigurationEntry(
    entry: ConfigurationEntry,
    targetProjectPath: string,
    verbose: boolean = false,
    bypassPrompts: boolean = false,
    dryRun: boolean = false
  ): Promise<LinkOperationResult> {
    const result: LinkOperationResult = {
      success: false,
      entry,
      linksCreated: [],
      errors: []
    };

    try {
      const sourcePath = resolve(entry.original);
      const effectiveTargetPath = PathValidator.getTargetPath(entry.original, entry.target);
      const fullTargetPath = resolve(targetProjectPath, effectiveTargetPath);

      Logger.operation(`Processing ${entry.type} link: ${sourcePath} -> ${fullTargetPath}`);

      if (dryRun) {
        Logger.info(`[DRY RUN] Would create ${entry.type} link: ${sourcePath} -> ${fullTargetPath}`);
        result.success = true;
        result.linksCreated.push(fullTargetPath);
        return result;
      }

      // Comprehensive validation
      const validation = await this.validateEntry(entry, sourcePath, targetProjectPath, effectiveTargetPath);
      if (!validation.isValid) {
        result.errors.push(validation.error!);
        return result;
      }

      if (entry.type === 'folder') {
        const folderResult = await this.createFolderLink(sourcePath, fullTargetPath, verbose, bypassPrompts);
        result.linksCreated = folderResult.linksCreated;
        result.errors = folderResult.errors;
      } else if (entry.type === 'files') {
        const filesResult = await this.createFileLinks(sourcePath, fullTargetPath, verbose, bypassPrompts);
        result.linksCreated = filesResult.linksCreated;
        result.errors = filesResult.errors;
      }

      result.success = result.errors.length === 0;
      return result;

    } catch (error) {
      const configError = error instanceof ConfigSymlinkerError
        ? error
        : ConfigSymlinkerError.fromNodeError(error, 'Processing configuration entry');

      result.errors.push(configError.message);
      Logger.error('Configuration entry processing failed', configError);
      return result;
    }
  }

  private static async validateEntry(
    entry: ConfigurationEntry,
    sourcePath: string,
    targetProjectPath: string,
    targetPath: string
  ): Promise<{ isValid: boolean; error?: string }> {
    // Validate source path exists
    const sourceValidation = await PathValidator.validateSourcePath(sourcePath);
    if (!sourceValidation.isValid) {
      return { isValid: false, error: sourceValidation.error };
    }

    // Prevent directory traversal
    const traversalValidation = PathValidator.preventDirectoryTraversal(targetProjectPath, targetPath);
    if (!traversalValidation.isValid) {
      return { isValid: false, error: traversalValidation.error };
    }

    // Validate path length and characters
    const lengthValidation = PathValidator.validatePathLength(targetPath);
    if (!lengthValidation.isValid) {
      return { isValid: false, error: lengthValidation.error };
    }

    const charValidation = PathValidator.validatePathCharacters(targetPath);
    if (!charValidation.isValid) {
      return { isValid: false, error: charValidation.error };
    }

    return { isValid: true };
  }

  private static async createFolderLink(
    sourcePath: string,
    targetPath: string,
    verbose: boolean,
    bypassPrompts: boolean = false
  ): Promise<{ linksCreated: string[]; errors: string[] }> {
    const result = { linksCreated: [] as string[], errors: [] as string[] };

    try {
      // Check if target already exists
      const targetExists = await this.pathExists(targetPath);

      if (targetExists) {
        const stats = await lstat(targetPath);
        let existingType: string;
        if (stats.isDirectory()) {
          existingType = 'directory';
        } else if (stats.isFile()) {
          existingType = 'file';
        } else if (stats.isSymbolicLink()) {
          existingType = 'symlink';
        } else {
          existingType = 'other';
        }
        // Target exists - ask user for confirmation to override
        const confirmationOptions: ConfirmationOptions = {
          entry: { original: sourcePath, type: 'folder' },
          targetPath,
          existingType: existingType as 'file' | 'directory' | 'symlink' | 'other',
          conflictDetails: `Existing item will be replaced with symlink to: ${sourcePath}`
        };

        const confirmation = await UserPrompt.confirmOverwrite(confirmationOptions, bypassPrompts);

        if (confirmation.action === 'abort') {
          throw new ConfigSymlinkerError('Operation aborted by user', ErrorCode.USER_ABORT);
        }

        if (confirmation.action === 'skip') {
          Logger.info(`Skipped overwriting existing item: ${targetPath}`);
          return result;
        }

        // Remove existing item and continue with creation
        await rm(targetPath, { recursive: true, force: true });
        Logger.info(`Removed existing item: ${targetPath}`);
      }

      // Ensure parent directory exists using DirectoryCreator
      const parentDir = dirname(targetPath);
      const dirResult = await DirectoryCreator.ensureDirectoryExists(parentDir, true, verbose);

      if (!dirResult.success) {
        result.errors.push(...dirResult.errors);
        return result;
      }

      // Create the symlink
      await symlink(sourcePath, targetPath, 'dir');
      result.linksCreated.push(targetPath);

      Logger.success(`Created folder symlink: ${targetPath} -> ${sourcePath}`);

    } catch (error) {
      const configError = error instanceof ConfigSymlinkerError
        ? error
        : ConfigSymlinkerError.fromNodeError(error, 'Creating folder symlink');

      result.errors.push(configError.message);
      Logger.error('Failed to create folder symlink', configError);
    }

    return result;
  }

  private static async createFileLinks(
    sourcePath: string,
    targetPath: string,
    verbose: boolean,
    bypassPrompts: boolean = false
  ): Promise<{ linksCreated: string[]; errors: string[] }> {
    const result = { linksCreated: [] as string[], errors: [] as string[] };

    try {
      const stats = await stat(sourcePath);

      if (stats.isFile()) {
        // Single file
        const fileResult = await this.createSingleFileLink(sourcePath, targetPath, verbose, bypassPrompts);
        result.linksCreated.push(...fileResult.linksCreated);
        result.errors.push(...fileResult.errors);
      } else if (stats.isDirectory()) {
        // Directory - use DirectoryCreator to map structure and create file links
        const sourceStructure = await DirectoryCreator.mapDirectoryStructure(sourcePath, this.MAX_DEPTH);

        if (!sourceStructure) {
          result.errors.push(`Failed to map directory structure: ${sourcePath}`);
          return result;
        }

        // Create target directory structure (for files only)
        const structureResult = await DirectoryCreator.replicateDirectoryStructure(
          sourceStructure,
          targetPath,
          true, // files only
          verbose
        );

        result.errors.push(...structureResult.errors);

        // Create symlinks for all files recursively
        const dirResult = await this.createDirectoryFileLinks(sourcePath, targetPath, verbose, 0, bypassPrompts);
        result.linksCreated.push(...dirResult.linksCreated);
        result.errors.push(...dirResult.errors);
      } else {
        result.errors.push(`Source path is neither file nor directory: ${sourcePath}`);
      }
    } catch (error) {
      const configError = error instanceof ConfigSymlinkerError
        ? error
        : ConfigSymlinkerError.fromNodeError(error, 'Creating file links');

      result.errors.push(configError.message);
      Logger.error('Failed to process source path for file links', configError);
    }

    return result;
  }

  private static async createSingleFileLink(
    sourcePath: string,
    targetPath: string,
    verbose: boolean,
    bypassPrompts: boolean = false
  ): Promise<{ linksCreated: string[]; errors: string[] }> {
    const result = { linksCreated: [] as string[], errors: [] as string[] };

    try {
      // Check if target already exists
      const targetExists = await this.pathExists(targetPath);

      if (targetExists) {
        const stats = await lstat(targetPath);
        // Target exists - ask user for confirmation
        const existingType = stats.isSymbolicLink() ? 'symlink' :
          stats.isDirectory() ? 'directory' : 'file';

        const confirmationOptions: ConfirmationOptions = {
          entry: { original: sourcePath, type: 'files' },
          targetPath,
          existingType,
          conflictDetails: `Existing ${existingType} will be replaced with symlink`
        };

        const confirmation = await UserPrompt.confirmOverwrite(confirmationOptions, bypassPrompts);

        if (confirmation.action === 'abort') {
          throw new ConfigSymlinkerError('Operation aborted by user', ErrorCode.USER_ABORT);
        }

        if (confirmation.action === 'skip') {
          Logger.info(`Skipped overwriting ${existingType}: ${targetPath}`);
          return result;
        }

        // Remove existing file/directory/symlink
        await rm(targetPath, { recursive: true, force: true });
        Logger.info(`Removed existing ${existingType}: ${targetPath}`);
      }

      // Ensure parent directory exists using DirectoryCreator
      const parentDir = dirname(targetPath);
      const dirResult = await DirectoryCreator.ensureDirectoryExists(parentDir, true, verbose);

      if (!dirResult.success) {
        result.errors.push(...dirResult.errors);
        return result;
      }

      // Create the symlink
      await symlink(sourcePath, targetPath, 'file');
      result.linksCreated.push(targetPath);

      Logger.success(`Created file symlink: ${targetPath} -> ${sourcePath}`);

    } catch (error) {
      const configError = error instanceof ConfigSymlinkerError
        ? error
        : ConfigSymlinkerError.fromNodeError(error, 'Creating file symlink');

      result.errors.push(configError.message);
      Logger.error('Failed to create file symlink', configError);
    }

    return result;
  }

  private static async createDirectoryFileLinks(
    sourceDir: string,
    targetDir: string,
    verbose: boolean,
    currentDepth: number,
    bypassPrompts: boolean = false
  ): Promise<{ linksCreated: string[]; errors: string[] }> {
    const result = { linksCreated: [] as string[], errors: [] as string[] };

    if (currentDepth >= this.MAX_DEPTH) {
      result.errors.push(`Maximum directory depth (${this.MAX_DEPTH}) exceeded at: ${sourceDir}`);
      return result;
    }

    try {
      const entries = await readdir(sourceDir, { withFileTypes: true });

      for (const entry of entries) {
        const sourcePath = join(sourceDir, entry.name);
        const targetPath = join(targetDir, entry.name);

        if (entry.isFile()) {
          // Create symlink for file
          const fileResult = await this.createSingleFileLink(sourcePath, targetPath, verbose, bypassPrompts);
          result.linksCreated.push(...fileResult.linksCreated);
          result.errors.push(...fileResult.errors);
        } else if (entry.isDirectory()) {
          // Recursively process subdirectory
          const subResult = await this.createDirectoryFileLinks(sourcePath, targetPath, verbose, currentDepth + 1, bypassPrompts);
          result.linksCreated.push(...subResult.linksCreated);
          result.errors.push(...subResult.errors);
        } else if (entry.isSymbolicLink()) {
          Logger.debug(`Skipping symbolic link: ${sourcePath}`);
        }
      }
    } catch (error) {
      const configError = error instanceof ConfigSymlinkerError
        ? error
        : ConfigSymlinkerError.fromNodeError(error, 'Reading directory for file links');

      result.errors.push(configError.message);
      Logger.error(`Failed to read directory: ${sourceDir}`, configError);
    }

    return result;
  }

  // Removed deprecated ensureDirectoryExists - now using DirectoryCreator

  private static async pathExists(path: string): Promise<boolean> {
    try {
      await access(path);
      return true;
    } catch {
      return false;
    }
  }
}