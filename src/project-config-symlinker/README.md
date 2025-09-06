# Project Config Symlinker

A CLI tool that creates symbolic links between project configuration files/folders and target projects. This enables developers to maintain a centralized set of configuration files and easily synchronize them across multiple projects while avoiding duplication.

## Features

- ✅ **Folder-level symbolic links** - Link entire configuration directories 
- ✅ **File-level symbolic links** - Link individual files while preserving directory structure
- ✅ **Interactive mode** - Selectively choose which configurations to apply
- ✅ **Dry-run mode** - Preview changes before making them
- ✅ **Force mode** - Batch operations without interactive prompts
- ✅ **Path validation** - Comprehensive validation and security checks
- ✅ **User-friendly prompts** - Clear confirmations for overwrite operations
- ✅ **Verbose logging** - Detailed output for debugging and monitoring

## Installation

### Global Installation (Recommended)

Install the package globally using npm:

```bash
npm install -g project-config-symlinker
```

After installation, the `symlinker` command will be available globally.

### Local Installation

For project-specific usage:

```bash
npm install project-config-symlinker
npx symlinker --help
```

## Usage

### Basic Usage

The main command is `symlinker`:

```bash
symlinker <target_project_path> [options]
```

### Quick Start Example

1. Create a configuration file in your centralized config repository:

```json
// setup-config.json
{
  "configurations": [
    {
      "original": ".eslintrc.json",
      "type": "files"
    },
    {
      "original": ".vscode",
      "type": "folder"
    }
  ]
}
```

2. Run the symlinker command:

```bash
symlinker ../my-new-project
```

### Arguments

- `<target_project_path>`: The path to the target project directory where symbolic links will be created.

### Options

- `-c, --config <config_file>`: Path to a custom configuration file (default: `setup-config.json`)
- `-f, --force`: Force overwrite existing files/folders without prompting
- `-i, --interactive`: Enable interactive mode to select configurations
- `-n, --dry-run`: Show what changes would be made without executing them
- `-v, --verbose`: Enable detailed logging output
- `-h, --help`: Display help information
- `--version`: Show version information

## Configuration

The tool uses a JSON configuration file to define which files and folders should be linked to target projects.

### Configuration File Structure

```json
{
  "configurations": [
    {
      "original": "path/to/source",
      "target": "path/in/target", // Optional
      "type": "folder" | "files"
    }
  ]
}
```

### Configuration Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `original` | string | ✅ | Path to source file/folder (relative to config file location) |
| `target` | string | ❌ | Target path in destination project (defaults to `original` if omitted) |
| `type` | string | ✅ | Link type: `"folder"` or `"files"` |

### Configuration Types

#### `type: "folder"`
Creates a single symbolic link to the entire directory:

```json
{
  "original": ".vscode",
  "target": ".vscode",
  "type": "folder"
}
```

**Result:** `target/.vscode` → `source/.vscode` (single symlink)

#### `type: "files"`
Creates individual symbolic links for each file, preserving directory structure:

```json
{
  "original": "configs",
  "target": "configs", 
  "type": "files"
}
```

**Result:** 
- `target/configs/file1.json` → `source/configs/file1.json`
- `target/configs/subfolder/file2.json` → `source/configs/subfolder/file2.json`

## Examples

### Example 1: Development Environment Setup

```json
{
  "configurations": [
    {
      "original": ".eslintrc.json",
      "type": "files"
    },
    {
      "original": ".prettierrc",
      "type": "files"
    },
    {
      "original": ".vscode",
      "type": "folder"
    },
    {
      "original": "tsconfig.json",
      "type": "files"
    }
  ]
}
```

Usage:
```bash
symlinker ../my-new-project --verbose
```

### Example 2: AI Assistant Configuration

```json
{
  "configurations": [
    {
      "original": ".claude/commands",
      "target": ".claude/commands",
      "type": "folder"
    },
    {
      "original": ".github/prompts",
      "type": "files"
    },
    {
      "original": "CLAUDE.md",
      "type": "files"
    }
  ]
}
```

### Example 3: Custom Target Paths

```json
{
  "configurations": [
    {
      "original": "shared-configs/eslint.json",
      "target": ".eslintrc.json",
      "type": "files"
    },
    {
      "original": "shared-configs/vscode-settings",
      "target": ".vscode",
      "type": "folder"
    }
  ]
}
```

## Common Use Cases

### 1. **Multi-project Development Setup**
```bash
# Set up consistent tooling across projects
symlinker ../frontend-project
symlinker ../backend-project  
symlinker ../mobile-project
```

### 2. **Interactive Configuration Selection**
```bash
# Pick and choose which configs to apply
symlinker ../new-project --interactive
```

### 3. **Safe Preview Mode**
```bash
# See what would be changed before applying
symlinker ../project --dry-run --verbose
```

### 4. **Automated CI/CD Setup**
```bash
# Apply configurations without prompts
symlinker ./deployment-target --force --config production-config.json
```

## Example Configurations

The `examples/` directory contains pre-built configuration files for common use cases:

- **`examples/development-setup.json`** - ESLint, Prettier, VSCode, TypeScript configurations
- **`examples/ai-assistant-config.json`** - Claude, Gemini, and other AI tool configurations  
- **`examples/frontend-project.json`** - Webpack, Babel, Storybook, Cypress configurations
- **`examples/backend-nodejs.json`** - Docker, Jest, Prisma, environment configurations
- **`examples/cicd-github-actions.json`** - GitHub workflows, issue templates, CI scripts
- **`examples/minimal-config.json`** - Basic .gitignore, .editorconfig, LICENSE

### Using Example Configurations

```bash
# Use a pre-built configuration
symlinker ../my-project --config examples/development-setup.json

# Combine multiple configurations
symlinker ../my-project --config examples/development-setup.json
symlinker ../my-project --config examples/cicd-github-actions.json

# Preview before applying
symlinker ../my-project --config examples/frontend-project.json --dry-run
```

See `examples/README.md` for detailed documentation of each configuration.

## Troubleshooting

### Common Issues

#### ❌ Error: "Target project path does not exist"

**Problem:** The specified target directory doesn't exist.

**Solution:** 
```bash
# Create the target directory first
mkdir -p path/to/target/project
symlinker path/to/target/project
```

#### ❌ Error: "Configuration file not found" 

**Problem:** The `setup-config.json` file is missing or path is incorrect.

**Solutions:**
```bash
# Use default config file name in current directory
ls setup-config.json

# Or specify custom config file
symlinker ../project --config path/to/my-config.json

# Or create a basic config file
echo '{"configurations":[]}' > setup-config.json
```

#### ❌ Error: "Permission denied" when creating symlinks

**Problem:** Insufficient file system permissions.

**Solutions:**
```bash
# Check target directory permissions
ls -la path/to/target/project

# Run with appropriate permissions (use caution)
sudo symlinker ../project

# Or change target directory ownership
sudo chown -R $USER:$USER path/to/target/project
```

#### ⚠️ Warning: "Target already exists"

**Problem:** Files or folders already exist at target location.

**Solutions:**
```bash
# Use interactive mode to choose per item
symlinker ../project --interactive

# Force overwrite all conflicts
symlinker ../project --force

# Preview changes first  
symlinker ../project --dry-run
```

#### ❌ Error: "Source path not found"

**Problem:** The `original` path in configuration doesn't exist.

**Solution:** Verify paths in your configuration file:
```json
{
  "configurations": [
    {
      "original": "path/that/exists",  // ← Check this path exists
      "type": "files"
    }
  ]
}
```

#### ❌ Symlinks not working on Windows

**Problem:** Symbolic links require special permissions on Windows.

**Solutions:**
- Run terminal as Administrator
- Enable Developer Mode in Windows Settings
- Use WSL (Windows Subsystem for Linux)
- Consider using junction links instead

### Performance Issues

#### Slow execution with many files

For configurations with 100+ files:

```bash
# Use verbose mode to monitor progress
symlinker ../project --verbose

# Consider using folder-type instead of files-type for large directories
```

### Debugging

#### Enable detailed logging
```bash
symlinker ../project --verbose --dry-run
```

#### Check symbolic link creation
```bash
# Verify symlinks were created correctly (Unix/Linux/macOS)
ls -la target/path
file target/path  # Shows if it's a symbolic link

# Check link target
readlink target/path
```

#### Validate configuration file
```bash
# Check JSON syntax
cat setup-config.json | jq .

# Or use any JSON validator online
```

### Getting Help

- Use the built-in help: `symlinker --help`
- Check version: `symlinker --version`
- Run in dry-run mode first: `symlinker ../project --dry-run --verbose`

If you encounter issues not covered here, please check the [project repository](https://github.com/your-org/project-config-symlinker) for known issues and solutions.

## Requirements

- **Node.js**: >= 16.0.0
- **Operating System**: Unix-like systems (Linux, macOS) with symbolic link support
- **Permissions**: Read access to source files, write access to target directories

## Development

This project is built with TypeScript and Vite.

### Available Scripts

- `npm run build` - Build the project for production using Vite
- `npm run dev` - Watch for changes and rebuild automatically
- `npm run dev:ts` - Run TypeScript source directly with tsx for development
- `npm run test` - Run tests using Vitest
- `npm run test:coverage` - Run tests with coverage reporting
- `npm run typecheck` - Run TypeScript compiler to check for type errors
- `npm run debug:ts` - Run with Node.js debugger attached

### Project Structure

```
src/
├── cli.ts                    # CLI entry point
├── index.ts                  # Library entry point  
├── config-loader.ts          # Configuration file handling
├── path-validator.ts         # Path validation and security
├── symbolic-link-manager.ts  # Core symlink operations
├── user-prompt.ts           # Interactive prompts
├── directory-creator.ts     # Directory management
└── error-handler.ts         # Error handling utilities
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b my-feature`
3. Make changes and add tests
4. Run tests: `npm test`
5. Check types: `npm run typecheck`
6. Build: `npm run build`
7. Commit changes: `git commit -am 'Add feature'`
8. Push to branch: `git push origin my-feature`
9. Create Pull Request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Changelog

### v1.0.0
- Initial release
- Folder and file-level symbolic linking
- Interactive and batch modes
- Comprehensive path validation
- Dry-run and verbose options
