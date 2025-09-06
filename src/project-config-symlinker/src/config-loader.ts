import { readFile, access } from 'fs/promises';
import { resolve } from 'path';
import type { ProjectConfiguration, ValidationResult } from './types.js';

export default class ConfigLoader {
  private static readonly DEFAULT_CONFIG_FILE = 'setup-config.json';

  static async loadConfiguration(configFilePath?: string): Promise<ProjectConfiguration> {
    const configPath = configFilePath || this.DEFAULT_CONFIG_FILE;
    const resolvedPath = resolve(configPath);

    // Check if file exists
    try {
      await access(resolvedPath);
    } catch {
      throw new Error(`Configuration file not found: ${resolvedPath}`);
    }

    try {
      const configContent = await readFile(resolvedPath, 'utf-8');
      const config = JSON.parse(configContent);
      
      const validation = this.validateConfiguration(config);
      if (!validation.isValid) {
        throw new Error(`Invalid configuration: ${validation.error}`);
      }

      return config as ProjectConfiguration;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error(`Invalid JSON in configuration file: ${configPath}`);
      }
      throw error;
    }
  }

  private static validateConfiguration(config: any): ValidationResult {
    if (!config || typeof config !== 'object') {
      return { isValid: false, error: 'Configuration must be an object' };
    }

    if (!Array.isArray(config.configurations)) {
      return { isValid: false, error: 'Configuration must have a "configurations" array' };
    }

    for (let i = 0; i < config.configurations.length; i++) {
      const entry = config.configurations[i];
      
      if (!entry.original || typeof entry.original !== 'string') {
        return { isValid: false, error: `Entry ${i}: "original" field is required and must be a string` };
      }

      if (entry.target !== undefined && typeof entry.target !== 'string') {
        return { isValid: false, error: `Entry ${i}: "target" field must be a string if provided` };
      }

      if (!entry.type || !['folder', 'files'].includes(entry.type)) {
        return { isValid: false, error: `Entry ${i}: "type" field must be either "folder" or "files"` };
      }
    }

    return { isValid: true };
  }
}