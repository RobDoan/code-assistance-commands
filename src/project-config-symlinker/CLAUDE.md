# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Building and Development
- `npm run build` - Build the project for production using Vite
- `npm run dev` - Watch for changes and rebuild automatically  
- `npm run dev:ts` - Run TypeScript source directly with tsx for development
- `npm run debug:ts` - Run with Node.js debugger attached

### Testing
- `npm run test` - Run tests using Vitest
- `npm run test:coverage` - Run tests with coverage reporting
- `npm run test:debug` - Run tests with Node.js debugger

### Code Quality
- `npm run typecheck` - Run TypeScript compiler to check for type errors (use this before committing)

## Architecture Overview

This is a CLI tool for creating symbolic links between project configuration files/folders and target projects. The architecture follows a modular design with clear separation of concerns:

### Core Components

- **CLI Layer** (`cli.ts`) - Commander.js-based CLI interface with comprehensive option handling
- **Configuration Management** (`config-loader.ts`) - Loads and validates `setup-config.json` files
- **Path Operations** (`path-validator.ts`) - Validates source and target paths with comprehensive checks
- **Symbolic Link Operations** (`symbolic-link-manager.ts`) - Core logic for creating folder and file-level symbolic links
- **User Interaction** (`user-prompt.ts`) - Inquirer.js-based prompts with batch operation support
- **Directory Management** (`directory-creator.ts`) - Creates target directories with proper permissions
- **Error Handling** (`error-handler.ts`) - Centralized error handling with typed error codes and recovery strategies

### Key Design Patterns

- **Static Classes**: All core components use static methods for stateless operations
- **Comprehensive Error Handling**: Custom `ConfigSymlinkerError` class with specific error codes and recovery strategies
- **Validation-First Approach**: Extensive validation before any file system operations
- **Interactive vs Batch Modes**: Support for both interactive prompts and automated batch processing
- **Dry Run Support**: All operations support dry-run mode for safe testing

### Configuration Structure

The tool uses `setup-config.json` files with this structure:
```json
{
  "configurations": [
    {
      "original": "source/path",
      "target": "optional/target/path", 
      "type": "folder" | "files"
    }
  ]
}
```

- `type: "folder"` creates a single symbolic link to the entire directory
- `type: "files"` creates individual symbolic links for each file within the directory

### Build Configuration

- **Vite** for building with dual entry points (`index.ts` for library, `cli.ts` for CLI)
- **TypeScript** with strict configuration and ESNext modules
- **Vitest** for testing with coverage support
- **ESM-only** - uses ES modules throughout with `.js` extensions in imports

The CLI binary is built with a shebang (`#!/usr/bin/env node`) and external dependencies are preserved for Node.js runtime.