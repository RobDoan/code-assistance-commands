import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { join } from 'path';

import { emptyFolderExceptGitignore } from '@app/test-utils'

import PathValidator from './path-validator';
// Mock fs/promises globally
vi.mock('fs/promises', async () => {
  const actual = await vi.importActual('fs/promises');
  return {
    ...actual,
    access: vi.fn(),
    stat: vi.fn(),
    constants: {
      F_OK: 1,
      R_OK: 2,
      W_OK: 4
    }
  }
});
import * as fs from 'fs/promises';

describe('PathValidator.validateTargetPath', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const dangerousPaths = [
    '/etc/test',
    '/usr/test',
    '/var/test',
    '/bin/test',
    '/sbin/test',
    '/home/test',
    '/root/test'
  ];

  dangerousPaths.forEach((path) => {
    it(`should reject dangerous system path "${path}"`, async () => {
      const result = await PathValidator.validateTargetPath(path);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Access to system directory is not allowed');
    });
  });

  // Only run Windows path tests on Windows
  if (process.platform === 'win32') {
    [
      'C:\\Windows\\test',
      'C:\\Program Files\\test',
      'C:\\Users\\test'
    ].forEach((path) => {
      it(`should reject dangerous system path "${path}" on Windows`, async () => {
        const result = await PathValidator.validateTargetPath(path);
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('Access to system directory is not allowed');
      });
    });
  }

  it('should call access once with correct params and return valid for normal directory', async () => {
    (fs.access as any).mockResolvedValueOnce(undefined);
    (fs.stat as any).mockResolvedValueOnce({ isDirectory: () => true });
    const result = await PathValidator.validateTargetPath('../../sample');
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ isValid: true });
  });

  it('should return invalid if access throws error', async () => {
    (fs.access as any).mockRejectedValueOnce({ code: 'EACCES', message: 'Permission denied' });
    const result = await PathValidator.validateTargetPath('../../sample');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Permission denied');
  });

  it('returns valid for a short path', () => {
    const result = PathValidator.validatePathLength('/tmp/test');
    expect(result).toEqual({ isValid: true });
  });

  it('returns invalid for a long path', () => {
    const longPath = 'a'.repeat(5000);
    const result = PathValidator.validatePathLength(longPath);
    expect(result.isValid).toBe(false);
    expect(result.error).toMatch(/Path length exceeds maximum allowed length/);
  });

  describe('PathValidator.preventDirectoryTraversal', () => {
    const sampleDir = join(__dirname, '../../sample');
    const base = join(sampleDir, 'testdir');
    const subdir = join(base, 'subdir');
    const testdir2 = join(sampleDir, 'testdir2');
    const fs = require('fs');

    beforeEach(async () => {
      // Remove sampleDir and recreate structure
      await emptyFolderExceptGitignore(sampleDir);
      fs.mkdirSync(subdir, { recursive: true });
      fs.mkdirSync(testdir2, { recursive: true });
    });

    it('should allow a subdirectory inside base', () => {
      const target = 'subdir';
      const result = PathValidator.preventDirectoryTraversal(base, target);
      expect(result).toEqual({ isValid: true });
    });

    it('should block traversal outside base', () => {
      const target = '../testdir2';
      const result = PathValidator.preventDirectoryTraversal(base, target);
      expect(result.isValid).toBe(false);
      expect(result.error).toMatch(/Path traversal detected/);
    });

    it('should block absolute path outside base', () => {
      const target = testdir2;
      const result = PathValidator.preventDirectoryTraversal(base, target);
      expect(result.isValid).toBe(false);
      expect(result.error).toMatch(/Path traversal detected/);
    });
  });
});
