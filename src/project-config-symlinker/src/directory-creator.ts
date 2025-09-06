import { mkdir, access, stat, readdir } from 'fs/promises';
import { resolve, join, dirname, relative } from 'path';
import type { ValidationResult } from './types.js';
import PathValidator from './path-validator.js';
import { Logger, ConfigSymlinkerError, ErrorCode } from './error-handler.js';

export interface DirectoryStructure {
  path: string;
  type: 'directory' | 'file';
  children?: DirectoryStructure[];
  relativePath: string;
}

export interface DirectoryCreationResult {
  success: boolean;
  createdDirectories: string[];
  errors: string[];
}

export default class DirectoryCreator {
  private static readonly MAX_DEPTH = 10;

  static async ensureDirectoryExists(
    directoryPath: string,
    createIfMissing: boolean = true,
    verbose: boolean = false
  ): Promise<DirectoryCreationResult> {
    const result: DirectoryCreationResult = {
      success: false,
      createdDirectories: [],
      errors: []
    };

    try {
      const resolvedPath = resolve(directoryPath);

      const exists = await this.pathExists(resolvedPath);
      if (exists) {
        const stats = await stat(resolvedPath);
        if (stats.isDirectory()) {
          Logger.debug(`Directory already exists: ${resolvedPath}`);
          result.success = true;
          return result;
        } else {
          result.errors.push(`Path exists but is not a directory: ${resolvedPath}`);
          return result;
        }
      }

      if (!createIfMissing) {
        result.errors.push(`Directory does not exist and creation is disabled: ${resolvedPath}`);
        return result;
      }

      // Create directory recursively
      await mkdir(resolvedPath, { recursive: true });
      result.createdDirectories.push(resolvedPath);
      result.success = true;

      if (verbose) {
        Logger.info(`Created directory: ${resolvedPath}`);
      }

      return result;

    } catch (error) {
      const configError = ConfigSymlinkerError.fromNodeError(error, 'Directory creation');
      result.errors.push(configError.message);
      Logger.error('Failed to create directory', configError);
      return result;
    }
  }

  static async mapDirectoryStructure(
    sourcePath: string,
    maxDepth: number = DirectoryCreator.MAX_DEPTH
  ): Promise<DirectoryStructure | null> {
    try {
      const resolvedPath = resolve(sourcePath);

      // Validate source path
      const validation = await PathValidator.validateSourcePath(resolvedPath);
      if (!validation.isValid) {
        throw new ConfigSymlinkerError(validation.error!, ErrorCode.PATH_ERROR);
      }

      const stats = await stat(resolvedPath);
      const baseName = relative(dirname(resolvedPath), resolvedPath);

      const structure: DirectoryStructure = {
        path: resolvedPath,
        type: stats.isDirectory() ? 'directory' : 'file',
        relativePath: baseName
      };

      // If it's a directory and we haven't exceeded max depth, map children
      if (stats.isDirectory() && maxDepth > 0) {
        structure.children = await this.mapDirectoryChildren(
          resolvedPath,
          maxDepth - 1
        );
      }

      return structure;

    } catch (error) {
      Logger.error(`Failed to map directory structure: ${sourcePath}`, error as Error);
      return null;
    }
  }

  private static async mapDirectoryChildren(
    directoryPath: string,
    remainingDepth: number
  ): Promise<DirectoryStructure[]> {
    const children: DirectoryStructure[] = [];

    try {
      const entries = await readdir(directoryPath, { withFileTypes: true });

      for (const entry of entries) {
        const childPath = join(directoryPath, entry.name);
        const relativePath = relative(dirname(directoryPath), childPath);

        const childStructure: DirectoryStructure = {
          path: childPath,
          type: entry.isDirectory() ? 'directory' : 'file',
          relativePath
        };

        // Recursively map subdirectories if depth allows
        if (entry.isDirectory() && remainingDepth > 0) {
          childStructure.children = await this.mapDirectoryChildren(
            childPath,
            remainingDepth - 1
          );
        }

        children.push(childStructure);
      }

    } catch (error) {
      Logger.warn(`Failed to read directory contents: ${directoryPath}`, error);
    }

    return children;
  }

  static async replicateDirectoryStructure(
    sourceStructure: DirectoryStructure,
    targetBasePath: string,
    filesOnly: boolean = false,
    verbose: boolean = false
  ): Promise<DirectoryCreationResult> {
    const result: DirectoryCreationResult = {
      success: false,
      createdDirectories: [],
      errors: []
    };

    try {
      await this.replicateStructureRecursive(
        sourceStructure,
        targetBasePath,
        targetBasePath,
        filesOnly,
        verbose,
        result
      );

      result.success = result.errors.length === 0;
      return result;

    } catch (error) {
      const configError = error instanceof ConfigSymlinkerError
        ? error
        : new ConfigSymlinkerError(
            `Failed to replicate directory structure: ${error}`,
            ErrorCode.SYMLINK_ERROR
          );

      result.errors.push(configError.message);
      return result;
    }
  }

  private static async replicateStructureRecursive(
    sourceStructure: DirectoryStructure,
    targetBasePath: string,
    currentTargetPath: string,
    filesOnly: boolean,
    verbose: boolean,
    result: DirectoryCreationResult
  ): Promise<void> {
    // Calculate target path for current item
    const targetPath = join(currentTargetPath, sourceStructure.relativePath);

    if (sourceStructure.type === 'directory') {
      if (!filesOnly) {
        // Create directory if not in files-only mode
        const dirResult = await this.ensureDirectoryExists(targetPath, true, verbose);
        result.createdDirectories.push(...dirResult.createdDirectories);
        result.errors.push(...dirResult.errors);
      } else {
        // In files-only mode, just ensure the directory exists for file placement
        const dirResult = await this.ensureDirectoryExists(targetPath, true, false);
        result.createdDirectories.push(...dirResult.createdDirectories);
        result.errors.push(...dirResult.errors);
      }

      // Process children
      if (sourceStructure.children) {
        for (const child of sourceStructure.children) {
          await this.replicateStructureRecursive(
            child,
            targetBasePath,
            targetPath,
            filesOnly,
            verbose,
            result
          );
        }
      }
    } else if (sourceStructure.type === 'file') {
      // For files, ensure the parent directory exists
      const parentDir = dirname(targetPath);
      const dirResult = await this.ensureDirectoryExists(parentDir, true, false);
      result.createdDirectories.push(...dirResult.createdDirectories);
      result.errors.push(...dirResult.errors);
    }
  }


  private static async pathExists(path: string): Promise<boolean> {
    try {
      await access(path);
      return true;
    } catch {
      return false;
    }
  }
}