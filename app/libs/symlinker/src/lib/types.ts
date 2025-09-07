export interface ConfigurationEntry {
  original: string;
  target?: string;
  type: 'folder' | 'files';
}

export interface ProjectConfiguration {
  configurations: ConfigurationEntry[];
}

export interface CLIOptions {
  config?: string;
  verbose?: boolean;
  force?: boolean;
  interactive?: boolean;
  dryRun?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface LinkOperationResult {
  success: boolean;
  entry: ConfigurationEntry;
  linksCreated: string[];
  errors: string[];
}

export interface ProcessingResult {
  totalEntries: number;
  successfulEntries: number;
  failedEntries: number;
  totalLinksCreated: number;
  results: LinkOperationResult[];
  errors: string[];
}