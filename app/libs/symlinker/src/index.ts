import { program } from 'commander';
import { readFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { CLIOptions, ProcessingResult } from './lib/types';
import ConfigLoader from './lib/config-loader';
import PathValidator from './lib/path-validator';
import SymbolicLinkManager from './lib/symbolic-link-manager';
import UserPrompt from './lib/user-prompt';
import { Logger, ErrorHandler, ConfigSymlinkerError, ErrorCode } from './lib/error-handler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getPackageVersion(): Promise<string> {
  try {
    const packageJsonPath = resolve(__dirname, '../package.json');
    const packageJson = await readFile(packageJsonPath, 'utf-8');
    const pkg = JSON.parse(packageJson);
    return pkg.version;
  } catch {
    return '1.0.0';
  }
}

async function execSymlinker(targetProjectPath: string, options: CLIOptions): Promise<void> {
  // Initialize logger and error handling
  Logger.setVerbose(options.verbose || false);
  ErrorHandler.validateEnvironment();

  Logger.operation(`Setting up configurations for project: ${targetProjectPath}`);
  Logger.debug('CLI Options', {
    config: options.config || 'setup-config.json',
    force: options.force,
    verbose: options.verbose,
    interactive: options.interactive,
    dryRun: options.dryRun
  });

  // Reset batch state for user prompts
  UserPrompt.resetBatchState();

  try {
    // Validate target project path
    const targetValidation = await PathValidator.validateTargetPath(targetProjectPath);
    if (!targetValidation.isValid) {
      throw new ConfigSymlinkerError(targetValidation.error!, ErrorCode.PATH_ERROR);
    }

    // Load configuration
    const config = await ConfigLoader.loadConfiguration(options.config);

    Logger.info(`Loaded ${config.configurations.length} configuration entries`);

    // Allow user to select configuration entries if in interactive mode
    let selectedEntries = config.configurations;
    if (options.interactive && config.configurations.length > 1) {
      selectedEntries = await UserPrompt.selectConfigurationEntry(
        config.configurations,
        'Which configuration entries would you like to process?'
      );

      if (selectedEntries.length === 0) {
        Logger.info('No configuration entries selected. Exiting.');
        return;
      }

      Logger.info(`Selected ${selectedEntries.length} configuration entries for processing`);
    }

    // Process selected configuration entries
    const processingResult: ProcessingResult = {
      totalEntries: selectedEntries.length,
      successfulEntries: 0,
      failedEntries: 0,
      totalLinksCreated: 0,
      results: [],
      errors: []
    };

    // Show progress if not in verbose mode
    if (!options.verbose && selectedEntries.length > 1) {
      Logger.info('Processing configuration entries...');
    }

    for (let i = 0; i < selectedEntries.length; i++) {
      const entry = selectedEntries[i];

      // Show progress
      if (!options.verbose) {
        UserPrompt.displayProgress(i + 1, selectedEntries.length, entry);
      }

      try {
        const result = await SymbolicLinkManager.processConfigurationEntry(
          entry,
          targetProjectPath,
          options.verbose || false,
          options.force || false,
          options.dryRun || false
        );

        processingResult.results.push(result);

        if (result.success) {
          processingResult.successfulEntries++;
          processingResult.totalLinksCreated += result.linksCreated.length;
        } else {
          processingResult.failedEntries++;
          processingResult.errors.push(...result.errors);

          // Check if user wants to continue after error
          if (!options.force && i < selectedEntries.length - 1) {
            const remaining = selectedEntries.length - i - 1;
            const shouldContinue = await UserPrompt.confirmContinueAfterError(
              result.errors.join('; '),
              remaining
            );

            if (!shouldContinue) {
              Logger.info('Operation cancelled by user.');
              break;
            }
          }
        }
      } catch (error) {
        const configError = error instanceof ConfigSymlinkerError
          ? error
          : new ConfigSymlinkerError(
            `Failed to process entry ${entry.original}: ${error}`,
            ErrorCode.SYMLINK_ERROR
          );

        processingResult.failedEntries++;
        processingResult.errors.push(configError.message);
        Logger.error(`Entry processing failed: ${entry.original}`, configError);

        // Check if we should abort on user abort error
        if (configError.code === ErrorCode.USER_ABORT) {
          break;
        }
      }
    }

    // Show detailed summary using UserPrompt
    const skipped = processingResult.totalEntries - processingResult.successfulEntries - processingResult.failedEntries;
    UserPrompt.showSummary(
      processingResult.totalEntries,
      processingResult.successfulEntries,
      processingResult.failedEntries,
      skipped
    );

    if (options.dryRun) {
      Logger.info('[DRY RUN] No actual changes were made.');
    }

    if (processingResult.errors.length > 0 && options.verbose) {
      Logger.error('Detailed error summary:', undefined, {
        errors: processingResult.errors
      });
    }

    if (processingResult.failedEntries > 0) {
      const errorMessage = `Configuration setup completed with ${processingResult.failedEntries} error(s).`;
      Logger.warn(errorMessage);
      process.exit(ErrorCode.SYMLINK_ERROR);
    } else {
      Logger.success('Configuration setup completed successfully!');
    }
  } catch (error) {
    // Let the main error handler deal with it
    throw error;
  }
}

export async function main(): Promise<void> {
  // Set up global error handlers
  ErrorHandler.createProcessExitHandler();

  const version = await getPackageVersion();

  program
    .name('symlinker')
    .description('Links project configurations to target project using symbolic links')
    .version(version)
    .argument('<target_project_path>', 'Path to target project directory')
    .option('-c, --config <config_file>', 'Custom configuration file path (default: setup-config.json)')
    .option('-f, --force', 'Force overwrite existing files/folders without confirmation')
    .option('-i, --interactive', 'Enable interactive mode for selecting configuration entries')
    .option('-n, --dry-run', 'Show what would be done without making any changes')
    .option('-v, --verbose', 'Enable verbose logging and detailed output')
    .action(async (targetProjectPath: string, options: CLIOptions) => {
      try {
        await execSymlinker(targetProjectPath, options);
        process.exit(ErrorCode.SUCCESS);
      } catch (error) {
        ErrorHandler.handleError(error, 'Main command execution');
      }
    });

  program.parse();
}