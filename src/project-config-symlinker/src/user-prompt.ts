import inquirer from 'inquirer';
import type { ConfigurationEntry } from './types.js';

export interface ConfirmationOptions {
  entry: ConfigurationEntry;
  targetPath: string;
  existingType: 'file' | 'directory' | 'symlink' | 'other';
  conflictDetails?: string;
}

export interface ConfirmationResult {
  action: 'overwrite' | 'skip' | 'abort';
  applyToAll?: boolean;
}

export interface BatchConfirmationState {
  overwriteAll: boolean;
  skipAll: boolean;
  aborted: boolean;
}

export default class UserPrompt {
  private static batchState: BatchConfirmationState = {
    overwriteAll: false,
    skipAll: false,
    aborted: false
  };

  static resetBatchState(): void {
    this.batchState = {
      overwriteAll: false,
      skipAll: false,
      aborted: false
    };
  }

  static async confirmOverwrite(
    options: ConfirmationOptions,
    bypassPrompts: boolean = false
  ): Promise<ConfirmationResult> {
    // If prompts are bypassed (--force flag), always overwrite
    if (bypassPrompts) {
      return { action: 'overwrite' };
    }

    // Check batch state
    if (this.batchState.aborted) {
      return { action: 'abort' };
    }

    if (this.batchState.overwriteAll) {
      return { action: 'overwrite' };
    }

    if (this.batchState.skipAll) {
      return { action: 'skip' };
    }

    // Show confirmation dialog
    const { entry, targetPath, existingType, conflictDetails } = options;

    console.log(`\n⚠️  Conflict detected for "${entry.original}":`);
    console.log(`   Target: ${targetPath}`);
    console.log(`   Existing: ${existingType}`);

    if (conflictDetails) {
      console.log(`   Details: ${conflictDetails}`);
    }

    const choices = [
      {
        name: 'Overwrite this item',
        value: 'overwrite'
      },
      {
        name: 'Skip this item',
        value: 'skip'
      },
      {
        name: 'Overwrite all remaining items',
        value: 'overwrite_all'
      },
      {
        name: 'Skip all remaining items',
        value: 'skip_all'
      },
      {
        name: 'Abort operation',
        value: 'abort'
      }
    ];

    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices,
        default: 'skip'
      }
    ]);

    // Handle batch actions
    switch (answer.action) {
      case 'overwrite_all':
        this.batchState.overwriteAll = true;
        return { action: 'overwrite', applyToAll: true };

      case 'skip_all':
        this.batchState.skipAll = true;
        return { action: 'skip', applyToAll: true };

      case 'abort':
        this.batchState.aborted = true;
        return { action: 'abort' };

      default:
        return { action: answer.action };
    }
  }

  static async confirmDirectoryCreation(
    directoryPath: string,
    bypassPrompts: boolean = false
  ): Promise<boolean> {
    if (bypassPrompts) {
      return true;
    }

    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'create',
        message: `Directory "${directoryPath}" does not exist. Create it?`,
        default: true
      }
    ]);

    return answer.create;
  }

  static async selectConfigurationEntry(
    entries: ConfigurationEntry[],
    message: string = 'Which configuration entries would you like to process?'
  ): Promise<ConfigurationEntry[]> {
    if (entries.length === 0) {
      return [];
    }

    if (entries.length === 1) {
      return entries;
    }

    const choices: { name: string; value: string | number; checked: boolean }[] = entries.map((entry, index) => ({
      name: `${entry.original} (${entry.type})${entry.target && entry.target !== entry.original ? ` -> ${entry.target}` : ''}`,
      value: index,
      checked: true
    }));

    choices.unshift({
      name: 'Select all',
      value: 'all',
      checked: true
    });

    choices.push({
      name: 'Select none',
      value: 'none',
      checked: false
    });

    const answer = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedEntries',
        message,
        choices,
        validate: (input: (string | number)[]) => {
          const hasSelectAll = input.includes('all');
          const hasSelectNone = input.includes('none');
          const hasEntries = input.some(item => typeof item === 'number');

          if (hasSelectAll && hasSelectNone) {
            return 'Cannot select both "Select all" and "Select none"';
          }

          if (!hasSelectAll && !hasSelectNone && !hasEntries) {
            return 'Please select at least one configuration entry or use "Select all"/"Select none"';
          }

          return true;
        }
      }
    ]);

    // Handle special selections
    if (answer.selectedEntries.includes('all')) {
      return entries;
    }

    if (answer.selectedEntries.includes('none')) {
      return [];
    }

    // Return selected entries
    const selectedIndices = answer.selectedEntries.filter((item: any) => typeof item === 'number');
    return selectedIndices.map((index: number) => entries[index]);
  }

  static async confirmContinueAfterError(
    error: string,
    remainingCount: number
  ): Promise<boolean> {
    console.log(`\n❌ Error: ${error}`);

    if (remainingCount <= 0) {
      return false;
    }

    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: `Continue processing remaining ${remainingCount} entries?`,
        default: true
      }
    ]);

    return answer.continue;
  }

  static displayProgress(
    current: number,
    total: number,
    currentEntry?: ConfigurationEntry
  ): void {
    const percentage = Math.round((current / total) * 100);
    const progressBar = '█'.repeat(Math.floor(percentage / 5)) + '░'.repeat(20 - Math.floor(percentage / 5));

    const entryInfo = currentEntry
      ? `Processing: ${currentEntry.original} (${currentEntry.type})`
      : 'Processing...';

    process.stdout.write(`\r[${progressBar}] ${percentage}% (${current}/${total}) ${entryInfo}`);

    if (current === total) {
      process.stdout.write('\n');
    }
  }

  static showSummary(
    totalProcessed: number,
    successful: number,
    failed: number,
    skipped: number
  ): void {
    console.log('\n' + '='.repeat(50));
    console.log('🏁 Operation Summary');
    console.log('='.repeat(50));
    console.log(`Total processed: ${totalProcessed}`);
    console.log(`✅ Successful: ${successful}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⏭️  Skipped: ${skipped}`);
    console.log('='.repeat(50));
  }

  static isBatchStateActive(): BatchConfirmationState {
    return { ...this.batchState };
  }
}