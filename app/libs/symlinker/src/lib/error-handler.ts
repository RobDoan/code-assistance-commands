export enum ErrorCode {
  SUCCESS = 0,
  CONFIGURATION_ERROR = 1,
  PATH_ERROR = 2,
  SYMLINK_ERROR = 3,
  PERMISSION_ERROR = 4,
  USER_ABORT = 5
}

export class ConfigSymlinkerError extends Error {
  public readonly code: ErrorCode;
  public readonly details?: any;
  public readonly originalError?: Error;

  constructor(
    message: string,
    code: ErrorCode = ErrorCode.SYMLINK_ERROR,
    details?: any,
    originalError?: Error
  ) {
    super(message);
    this.name = 'ConfigSymlinkerError';
    this.code = code;
    this.details = details;
    this.originalError = originalError;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConfigSymlinkerError);
    }
  }

  static fromNodeError(error: any, context?: string): ConfigSymlinkerError {
    const contextMessage = context ? `${context}: ` : '';

    switch (error.code) {
      case 'ENOENT':
        return new ConfigSymlinkerError(
          `${contextMessage}File or directory not found: ${error.path}`,
          ErrorCode.PATH_ERROR,
          { originalCode: error.code, path: error.path },
          error
        );

      case 'EACCES':
      case 'EPERM':
        return new ConfigSymlinkerError(
          `${contextMessage}Permission denied: ${error.path}`,
          ErrorCode.PERMISSION_ERROR,
          { originalCode: error.code, path: error.path },
          error
        );

      case 'EEXIST':
        return new ConfigSymlinkerError(
          `${contextMessage}File or directory already exists: ${error.path}`,
          ErrorCode.SYMLINK_ERROR,
          { originalCode: error.code, path: error.path },
          error
        );

      case 'ENOTDIR':
        return new ConfigSymlinkerError(
          `${contextMessage}Not a directory: ${error.path}`,
          ErrorCode.PATH_ERROR,
          { originalCode: error.code, path: error.path },
          error
        );

      case 'EISDIR':
        return new ConfigSymlinkerError(
          `${contextMessage}Is a directory: ${error.path}`,
          ErrorCode.PATH_ERROR,
          { originalCode: error.code, path: error.path },
          error
        );

      default:
        return new ConfigSymlinkerError(
          `${contextMessage}Filesystem error: ${error.message}`,
          ErrorCode.SYMLINK_ERROR,
          { originalCode: error.code, path: error.path },
          error
        );
    }
  }

  getActionableMessage(): string {
    switch (this.code) {
      case ErrorCode.CONFIGURATION_ERROR:
        return `${this.message}\n💡 Tip: Check your configuration file syntax and ensure all required fields are present.`;

      case ErrorCode.PATH_ERROR:
        return `${this.message}\n💡 Tip: Verify the path exists and you have access permissions.`;

      case ErrorCode.PERMISSION_ERROR:
        return `${this.message}\n💡 Tip: Run the command with appropriate permissions or check file/directory ownership.`;

      case ErrorCode.SYMLINK_ERROR:
        return `${this.message}\n💡 Tip: Use --force to overwrite existing files, or remove conflicting files manually.`;

      case ErrorCode.USER_ABORT:
        return `${this.message}\n💡 Operation was cancelled by user.`;

      default:
        return this.message;
    }
  }
}

export class Logger {
  private static verboseMode = false;
  private static logLevel: 'error' | 'warn' | 'info' | 'debug' = 'info';

  static setVerbose(verbose: boolean): void {
    this.verboseMode = verbose;
    this.logLevel = verbose ? 'debug' : 'info';
  }

  static error(message: string, error?: Error | ConfigSymlinkerError, details?: any): void {
    console.error(`❌ ERROR: ${message} \n`);

    if (error) {
      if (this.verboseMode) {
        if (error instanceof ConfigSymlinkerError) {
          console.error(`   Code: ${error.code} \n`);
          if (error.details) {
            console.error(`   Details: ${JSON.stringify(error.details, null, 2)} \n`);
          }
          if (error.originalError) {
            console.error(`   Original: ${error.originalError.message} \n`);
            console.error(`   Stack: ${error.originalError.stack} \n`);
          }
        } else {
          console.error(`   Stack: ${error.stack} \n`);
        }
      } else {
        console.error(`   ${error.message} \n`);
      }
    }

    if (details && this.verboseMode) {
      console.error(`   Context: ${JSON.stringify(details, null, 2)} \n`);
    }
  }

  static warn(message: string, details?: any): void {
    if (this.logLevel === 'error') return;

    console.warn(`⚠️  WARN: ${message} \n`);

    if (details && this.verboseMode) {
      console.warn(`   Details: ${JSON.stringify(details, null, 2)} \n`);
    }
  }

  static info(message: string, details?: any): void {
    if (['error', 'warn'].includes(this.logLevel)) return;

    console.log(`ℹ️  INFO: ${message} \n`);

    if (details && this.verboseMode) {
      console.log(`   Details: ${JSON.stringify(details, null, 2)} \n`);
    }
  }

  static debug(message: string, details?: any): void {
    if (!this.verboseMode) return;

    console.log(`🔍 DEBUG: ${message} \n`);

    if (details) {
      console.log(`   Details: ${JSON.stringify(details, null, 2)} \n`);
    }
  }

  static success(message: string): void {
    console.log(`✅ ${message} \n`);
  }

  static operation(message: string): void {
    console.log(`🔄 ${message} \n`);
  }

  static progress(message: string): void {
    if (this.verboseMode) {
      console.log(`⏳ ${message} \n`);
    }
  }
}

export class ErrorRecovery {
  static async handleRecoverableError(
    error: ConfigSymlinkerError,
    context: string,
    retryCallback?: () => Promise<void>
  ): Promise<boolean> {
    Logger.warn(`Recoverable error in ${context}: ${error.message}`);

    if (retryCallback && error.code !== ErrorCode.USER_ABORT) {
      try {
        await retryCallback();
        Logger.success(`Recovered from error in ${context}`);
        return true;
      } catch (retryError) {
        Logger.error(`Recovery failed in ${context}`, retryError as Error);
        return false;
      }
    }

    return false;
  }

  static shouldContinueAfterError(error: ConfigSymlinkerError): boolean {
    // Continue processing other entries for most errors, except user abort
    return error.code !== ErrorCode.USER_ABORT;
  }

  static getErrorSummary(errors: ConfigSymlinkerError[]): string {
    if (errors.length === 0) return 'No errors occurred.';

    const errorCounts = errors.reduce((counts, error) => {
      const errorType = ErrorCode[error.code] || 'UNKNOWN';
      counts[errorType] = (counts[errorType] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);

    const summary = Object.entries(errorCounts)
      .map(([type, count]) => `${type}: ${count}`)
      .join(', ');

    return `${errors.length} error(s) - ${summary}`;
  }
}

export class ErrorHandler {
  static handleError(error: any, context?: string): never {
    let configError: ConfigSymlinkerError;

    if (error instanceof ConfigSymlinkerError) {
      configError = error;
    } else if (error && error.code) {
      configError = ConfigSymlinkerError.fromNodeError(error, context);
    } else {
      configError = new ConfigSymlinkerError(
        error.message || String(error),
        ErrorCode.SYMLINK_ERROR,
        { context }
      );
    }

    Logger.error(configError.getActionableMessage(), configError);
    process.exit(configError.code);
  }

  static handleWarning(warning: string, details?: any): void {
    Logger.warn(warning, details);
  }

  static validateEnvironment(): void {
    // Check Node.js version
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

    if (majorVersion < 16) {
      throw new ConfigSymlinkerError(
        `Node.js version ${nodeVersion} is not supported. Please use Node.js 16.0.0 or higher.`,
        ErrorCode.CONFIGURATION_ERROR
      );
    }

    // Check platform support for symbolic links
    if (process.platform === 'win32') {
      Logger.warn('Windows platform detected. Symbolic links may require administrator privileges.');
    }

    Logger.debug('Environment validation passed', {
      nodeVersion,
      platform: process.platform,
      arch: process.arch
    });
  }

  static createProcessExitHandler(): void {
    process.on('uncaughtException', (error) => {
      Logger.error('Uncaught exception', error);
      process.exit(ErrorCode.SYMLINK_ERROR);
    });

    process.on('unhandledRejection', (reason, promise) => {
      Logger.error('Unhandled promise rejection', reason as Error, { promise });
      process.exit(ErrorCode.SYMLINK_ERROR);
    });

    process.on('SIGINT', () => {
      Logger.info('Received SIGINT (Ctrl+C). Shutting down gracefully...');
      process.exit(ErrorCode.USER_ABORT);
    });

    process.on('SIGTERM', () => {
      Logger.info('Received SIGTERM. Shutting down gracefully...');
      process.exit(ErrorCode.USER_ABORT);
    });
  }
}