import { testUtils, emptyFolderExceptGitignore } from './test-utils.js';
import { readdir, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

describe('testUtils', () => {
  it('should work', () => {
    expect(testUtils()).toEqual('test-utils');
  });
});

describe('emptyFolderExceptGitignore', () => {
  const testSamplePath = join(__dirname, '../../test-sample');

  beforeEach(async () => {
    // Empty the test-sample folder except .gitignore file
    await emptyFolderExceptGitignore(testSamplePath);
  });

  it('should initially have only .gitignore file', async () => {
    // List all elements in the folder, except .gitignore, should return empty array
    const items = await readdir(testSamplePath);
    const nonGitignoreItems = items.filter(item => item !== '.gitignore');
    expect(nonGitignoreItems).toEqual([]);
  });

  it('should empty folder while preserving .gitignore', async () => {
    // Create some files and folders inside test-sample folder
    await writeFile(join(testSamplePath, 'test-file.txt'), 'test content');
    await writeFile(join(testSamplePath, 'another-file.js'), 'console.log("test");');
    await mkdir(join(testSamplePath, 'test-folder'));
    await writeFile(join(testSamplePath, 'test-folder', 'nested-file.txt'), 'nested content');
    await mkdir(join(testSamplePath, 'empty-folder'));

    // Make sure that folder is not empty (not counting .gitignore)
    const itemsBeforeCleanup = await readdir(testSamplePath);
    const nonGitignoreItemsBeforeCleanup = itemsBeforeCleanup.filter(item => item !== '.gitignore');
    expect(nonGitignoreItemsBeforeCleanup.length).toBeGreaterThan(0);

    // Execute the function
    await emptyFolderExceptGitignore(testSamplePath);

    // Check expect folder is empty (not counting .gitignore)
    const itemsAfterCleanup = await readdir(testSamplePath);
    const nonGitignoreItemsAfterCleanup = itemsAfterCleanup.filter(item => item !== '.gitignore');
    expect(nonGitignoreItemsAfterCleanup).toEqual([]);
    
    // Verify .gitignore is still there
    expect(itemsAfterCleanup).toContain('.gitignore');
  });
});
