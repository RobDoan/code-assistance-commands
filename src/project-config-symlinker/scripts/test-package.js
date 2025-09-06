#!/usr/bin/env node

/**
 * Package installation test script for CI/CD environments
 * Tests that the built package works correctly without global installation
 */

import { execSync, spawn } from 'child_process';
import { mkdirSync, writeFileSync, readFileSync, rmSync, existsSync, lstatSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const COLORS = {
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  RESET: '\x1b[0m'
};

const log = (color, message) => {
  console.log(`${color}${message}${COLORS.RESET}`);
};

const logSuccess = (message) => log(COLORS.GREEN, `✅ ${message}`);
const logError = (message) => log(COLORS.RED, `❌ ${message}`);
const logInfo = (message) => log(COLORS.YELLOW, `ℹ️  ${message}`);

async function runTest() {
  const testDir = resolve(__dirname, '../test-temp');
  const packageDir = resolve(__dirname, '..');
  
  try {
    logInfo('Starting package installation test...');
    
    // Clean up any existing test directory
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
    
    // Create test environment
    mkdirSync(testDir, { recursive: true });
    process.chdir(testDir);
    
    logInfo('Test environment created');
    
    // Test 1: Build the package
    logInfo('Testing package build...');
    process.chdir(packageDir);
    execSync('npm run build', { stdio: 'pipe' });
    
    if (!existsSync(join(packageDir, 'dist/cli.js'))) {
      throw new Error('CLI build output not found');
    }
    
    logSuccess('Package built successfully');
    
    // Test 2: Create test scenario in test directory
    process.chdir(testDir);
    
    // Create source files
    mkdirSync('source/.vscode', { recursive: true });
    mkdirSync('source/configs', { recursive: true });
    
    writeFileSync('source/.vscode/settings.json', JSON.stringify({ test: true }, null, 2));
    writeFileSync('source/configs/test.js', 'module.exports = {};');
    
    // Create config file
    const config = {
      configurations: [
        {
          original: 'source/.vscode',
          target: '.vscode',
          type: 'folder'
        },
        {
          original: 'source/configs',
          target: 'configs',
          type: 'files'
        }
      ]
    };
    
    writeFileSync('setup-config.json', JSON.stringify(config, null, 2));
    
    // Create target directory
    mkdirSync('target');
    
    logSuccess('Test scenario created');
    
    // Test 3: Run CLI with node directly (no global install needed)
    logInfo('Testing CLI functionality...');
    const cliPath = join(packageDir, 'dist/cli.js');
    
    // Test help command
    try {
      execSync(`node "${cliPath}" --help`, { stdio: 'pipe' });
      logSuccess('Help command works');
    } catch (error) {
      throw new Error('Help command failed');
    }
    
    // Test version command
    try {
      execSync(`node "${cliPath}" --version`, { stdio: 'pipe' });
      logSuccess('Version command works');
    } catch (error) {
      throw new Error('Version command failed');
    }
    
    // Test dry-run
    try {
      execSync(`node "${cliPath}" target --dry-run`, { stdio: 'pipe' });
      logSuccess('Dry-run mode works');
    } catch (error) {
      throw new Error('Dry-run mode failed');
    }
    
    // Test actual execution
    try {
      execSync(`node "${cliPath}" target --force`, { stdio: 'pipe' });
      logSuccess('Symlink creation executed');
    } catch (error) {
      throw new Error('Symlink creation failed: ' + error.message);
    }
    
    // Verify results
    if (!existsSync('target/.vscode')) {
      throw new Error('Folder symlink not created');
    }
    
    if (!lstatSync('target/.vscode').isSymbolicLink()) {
      throw new Error('Target .vscode is not a symbolic link');
    }
    
    if (!existsSync('target/configs/test.js')) {
      throw new Error('File symlink not created');
    }
    
    if (!lstatSync('target/configs/test.js').isSymbolicLink()) {
      throw new Error('Target test.js is not a symbolic link');
    }
    
    logSuccess('Symlinks verified successfully');
    
    // Test error handling
    logInfo('Testing error handling...');
    
    try {
      execSync(`node "${cliPath}" nonexistent-target`, { stdio: 'pipe' });
      throw new Error('Should have failed with nonexistent target');
    } catch (error) {
      if (error.message.includes('Should have failed')) {
        throw error;
      }
      logSuccess('Error handling works for invalid target');
    }
    
    logSuccess('All tests passed!');
    return true;
    
  } catch (error) {
    logError(`Test failed: ${error.message}`);
    return false;
  } finally {
    // Cleanup
    process.chdir(__dirname);
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  }
}

// Run the test
runTest().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  logError(`Unexpected error: ${error.message}`);
  process.exit(1);
});