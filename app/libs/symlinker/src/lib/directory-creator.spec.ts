import { rm, stat, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { emptyFolderExceptGitignore } from '@quydoan/test-utils';
import DirectoryCreator from './directory-creator';

describe('DirectoryCreator.ensureDirectoryExists', () => {
  const sampleDir = path.resolve(__dirname, '../../sample');
  const testPath = path.join(sampleDir, 'a/b/c');

  async function setupTest() {
    // Remove sample folder and recreate it empty
    // Alternative: Remove all contents inside sampleDir without deleting sampleDir itself
    try {
      await emptyFolderExceptGitignore(sampleDir);
    } catch (err: any) {
      if (err && err.code === 'ENOENT') {
        // Directory does not exist, create it
        await rm(sampleDir, { recursive: true, force: true }).catch(() => { });
        await mkdir(sampleDir, { recursive: true });
      } else {
        throw err;
      }
    }
  }

  beforeEach(async () => {
    await setupTest();
  });

  it('should create nested directories when createIfMissing is true', async () => {
    const result = await DirectoryCreator.ensureDirectoryExists(testPath, true);
    expect(result.success).toBe(true);
    const stats = await stat(testPath);
    expect(stats.isDirectory()).toBe(true);
  });

  it('should not create directory when createIfMissing is false', async () => {
    const result = await DirectoryCreator.ensureDirectoryExists(testPath, false);
    expect(result.success).toBe(false);
    await expect(stat(testPath)).rejects.toThrow();
  });

  it('should return error if path exists and is a file', async () => {
    const filePath = path.join(sampleDir, 'file.txt');
    await writeFile(filePath, 'test');
    const result = await DirectoryCreator.ensureDirectoryExists(filePath, true);
    expect(result.success).toBe(false);
    expect(result.errors[0]).toMatch(/not a directory/);
  });
});
