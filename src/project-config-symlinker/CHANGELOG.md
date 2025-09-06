# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-01

### Added
- Initial release of Project Config Symlinker
- CLI tool for creating symbolic links between configuration files/folders and target projects
- Support for folder-level symbolic links (entire directories)
- Support for file-level symbolic links with preserved directory structure
- Interactive mode for selective configuration application
- Dry-run mode for previewing changes before execution
- Force mode for batch operations without interactive prompts
- Comprehensive path validation and security checks
- User-friendly prompts with clear confirmations for overwrite operations
- Verbose logging option for detailed output and debugging
- Custom configuration file support with `--config` option
- Built-in help and version commands
- TypeScript support with full type definitions
- Vite-based build system for optimal performance
- Comprehensive test suite with Vitest
- Example configuration files for common use cases:
  - Development environment setup (ESLint, Prettier, VSCode, TypeScript)
  - AI assistant configurations (Claude, Gemini, GitHub prompts)
  - Frontend project setup (Webpack, Babel, Storybook, Cypress)
  - Backend Node.js setup (Docker, Jest, Prisma, environments)
  - CI/CD GitHub Actions setup (workflows, templates, scripts)
  - Minimal configuration setup (basic essentials)
- Installation testing scripts for package validation
- Comprehensive documentation with troubleshooting guide
- MIT License

### Technical Features
- Node.js >= 16.0.0 compatibility
- ESM-only package structure
- Commander.js for CLI argument parsing
- Inquirer.js for interactive user prompts
- Robust error handling with specific exit codes
- Security measures to prevent directory traversal attacks
- Cross-platform support for Unix-like systems (Linux, macOS)
- Global npm installation support
- Local project usage with npx

### Configuration Schema
```json
{
  "configurations": [
    {
      "original": "path/to/source",
      "target": "path/in/target",
      "type": "folder" | "files"
    }
  ]
}
```

### CLI Options
- `<target_project_path>` - Target project directory (required)
- `-c, --config <config_file>` - Custom configuration file path
- `-f, --force` - Force overwrite without prompting
- `-i, --interactive` - Interactive mode for selective processing
- `-n, --dry-run` - Preview mode without making changes
- `-v, --verbose` - Detailed logging output
- `-h, --help` - Display help information
- `--version` - Show version information

### Performance
- Processes up to 100 configuration entries in under 5 seconds
- Memory usage under 50MB during execution
- Support for deeply nested directory structures (up to 10 levels)

### Security
- Path validation to prevent directory traversal attacks
- Symlink targets restricted to target project directory
- Input sanitization for configuration file paths
- Comprehensive error handling for permission issues

## [Unreleased]

### Planned Features
- Windows support with junction links
- Configuration file templates generator
- Rollback/undo functionality
- Integration with popular development tools
- Plugin system for extensibility
- Web-based configuration builder
- Docker container support
- CI/CD pipeline integrations

---

For more information about releases and breaking changes, see the [GitHub Releases page](https://github.com/your-username/project-config-symlinker/releases).