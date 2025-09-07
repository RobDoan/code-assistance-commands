import { access, stat, constants } from 'fs/promises';
import { resolve, normalize, relative, isAbsolute } from 'path';
import type { ValidationResult } from './types';

export default class PathValidator {
  private static readonly DANGEROUS_PATHS = [
    '/etc', '/usr', '/var', '/bin', '/sbin', '/home', '/root',
    'C:\\Windows', 'C:\\Program Files', 'C:\\Users'
  ];

  static async validateTargetPath(targetPath: string): Promise<ValidationResult> {
    return this.validatePathCommon(targetPath, constants.F_OK | constants.R_OK | constants.W_OK, true);
  }

  static async validateSourcePath(sourcePath: string): Promise<ValidationResult> {
    return this.validatePathCommon(sourcePath, constants.F_OK | constants.R_OK, false);
  }

  private static async validatePathCommon(
    inputPath: string,
    accessMode: number,
    mustBeDirectory: boolean
  ): Promise<ValidationResult> {
    try {
      const sanitized = this.sanitizePath(inputPath);
      const resolvedPath = resolve(sanitized);

      const dangerousCheck = this.checkForDangerousPaths(resolvedPath);
      if (!dangerousCheck.isValid) {
        return dangerousCheck;
      }

      await access(resolvedPath, accessMode);

      if (mustBeDirectory) {
        const stats = await stat(resolvedPath);
        if (!stats.isDirectory()) {
          return { isValid: false, error: 'Target path must be a directory' };
        }
      }

      return { isValid: true };
    } catch (error: any) {
      const errorMessage = this.getAccessErrorMessage(error, inputPath);
      return { isValid: false, error: errorMessage };
    }
  }

  static preventDirectoryTraversal(basePath: string, targetPath: string): ValidationResult {
    try {
      const resolvedBase = resolve(this.sanitizePath(basePath));
      const resolvedTarget = resolve(resolvedBase, this.sanitizePath(targetPath));
      const relativePath = relative(resolvedBase, resolvedTarget);

      // Check if the relative path tries to go outside the base directory
      if (relativePath.startsWith('..') || relativePath === '..' || isAbsolute(relativePath)) {
        return {
          isValid: false,
          error: `Path traversal detected: "${targetPath}" would escape the target directory. Resolved to: ${relativePath}`
        };
      }

      // Additional check: ensure the resolved target is actually under the base path
      if (!resolvedTarget.startsWith(resolvedBase)) {
        return {
          isValid: false,
          error: `Path traversal detected: "${targetPath}" resolves outside the target directory`
        };
      }

      return { isValid: true };
    } catch (error) {
      return {
        isValid: false,
        error: `Path validation failed: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  static validatePathLength(path: string): ValidationResult {
    const maxLength = process.platform === 'win32' ? 260 : 4096;

    if (path.length > maxLength) {
      return {
        isValid: false,
        error: `Path length exceeds maximum allowed length (${maxLength} characters): ${path.length}`
      };
    }

    return { isValid: true };
  }

  static validatePathCharacters(path: string): ValidationResult {
    // Check for null bytes and other dangerous characters
    const dangerousChars = /[\x00-\x1f\x7f<>:"|?*]/g;

    if (dangerousChars.test(path)) {
      return {
        isValid: false,
        error: `Path contains invalid characters: "${path}"`
      };
    }

    return { isValid: true };
  }

  static normalizePath(path: string): string {
    return normalize(this.sanitizePath(path));
  }

  static getTargetPath(originalPath: string, targetPath?: string): string {
    // If target is not specified, use original path as target
    const effectiveTarget = targetPath || originalPath;
    return this.normalizePath(effectiveTarget);
  }

  private static sanitizePath(path: string): string {
    if (!path || typeof path !== 'string') {
      throw new Error('Path must be a non-empty string');
    }

    // Remove null bytes and trim whitespace
    return path.replace(/\x00/g, '').trim();
  }

  private static checkForDangerousPaths(resolvedPath: string): ValidationResult {
    for (const dangerousPath of this.DANGEROUS_PATHS) {
      if (resolvedPath.startsWith(dangerousPath)) {
        return {
          isValid: false,
          error: `Access to system directory is not allowed: ${dangerousPath}`
        };
      }
    }

    return { isValid: true };
  }

  private static getAccessErrorMessage(error: any, path: string): string {
    switch (error.code) {
      case 'ENOENT':
        return `Path does not exist: ${path}`;
      case 'EACCES':
        return `Permission denied: ${path}`;
      case 'ENOTDIR':
        return `Path is not a directory: ${path}`;
      case 'EPERM':
        return `Operation not permitted: ${path}`;
      default:
        return `Path is not accessible: ${path} (${error.message || 'Unknown error'})`;
    }
  }
}