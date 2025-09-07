import { readdir, rm, stat } from 'fs/promises';
import { join } from 'path';

export function testUtils(): string {
  return 'test-utils';
}

export async function emptyFolderExceptGitignore(folderPath: string): Promise<void> {
  try {
    const items = await readdir(folderPath);

    const deletePromises = items
      .filter(item => item !== '.gitignore')
      .map(async (item) => {
        const itemPath = join(folderPath, item);
        try {
          const itemStat = await stat(itemPath);

          if (itemStat?.isDirectory()) {
            await rm(itemPath, { recursive: true, force: true });
          } else {
            await rm(itemPath, { force: true });
          }
        } catch {
          // If stat fails, try to remove as file first, then as directory
          try {
            await rm(itemPath, { force: true });
          } catch {
            await rm(itemPath, { recursive: true, force: true });
          }
        }
      });

    await Promise.all(deletePromises);
  } catch (error) {
    throw new Error(`Failed to empty folder ${folderPath}: ${error}`);
  }
}
