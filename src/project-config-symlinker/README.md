# Project Config Symlinker

A CLI tool that creates symbolic links between project configuration files/folders and target projects. This is useful for maintaining a centralized set of configuration files and easily applying them to multiple projects.

## Installation

Install the package globally using npm:

```bash
npm install -g project-config-symlinker
```

## Usage

The main command is `symlinker`.

```bash
symlinker <target_project_path> [options]
```

### Arguments

- `<target_project_path>`: The path to the target project directory where the symbolic links will be created.

### Options

- `-c, --config <config_file>`: Path to a custom configuration file (default: `setup-config.json`).
- `-f, --force`: Force overwrite existing files or symbolic links in the target project without prompting for confirmation.
- `-i, --interactive`: Enable interactive mode to select which configuration entries to process.
- `-n, --dry-run`: Show what changes would be made without actually creating any symbolic links.
- `-v, --verbose`: Enable verbose logging for detailed output.

## Configuration

The tool uses a `setup-config.json` file to define the symbolic links to be created.

### Example `setup-config.json`

```json
{
  "configurations": [
    {
      "original": ".claude/commands/prj",
      "target": ".claude/commands/prj",
      "type": "folder"
    },
    {
      "original": ".gemini/commands/prj",
      "target": ".gemini/commands/prj",
      "type": "folder"
    },
    {
      "original": ".github/prompts",
      "type": "files"
    },
    {
      "original": ".vibecoding/kiro",
      "type": "folder"
    }
  ]
}
```

### Configuration Properties

Each entry in the `configurations` array can have the following properties:

- `original`: The path to the source file or folder (relative to the directory where the `symlinker` command is run).
- `target`: (Optional) The path in the target project where the symbolic link will be created. If not provided, it will use the same path as `original`.
- `type`: The type of the configuration. Can be `folder` or `files`.
  - `folder`: Creates a single symbolic link for the entire folder.
  - `files`: Creates individual symbolic links for each file within the `original` directory.

## Development

This project is built with TypeScript and Vite.

### Available Scripts

- `npm run build`: Build the project for production.
- `npm run dev`: Watch for changes and rebuild.
- `npm run test`: Run tests using Vitest.
- `npm run typecheck`: Run the TypeScript compiler to check for type errors.

## License

This project is licensed under the MIT License.
