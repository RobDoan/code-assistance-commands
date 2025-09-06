# Configuration Examples

This directory contains example configuration files for common use cases. These files demonstrate different ways to use the Project Config Symlinker tool.

## Available Examples

### 1. `development-setup.json`
**Purpose:** Basic development environment setup with common tooling configurations.

**Use case:** Setting up consistent linting, formatting, and editor configurations across projects.

**Usage:**
```bash
symlinker ../my-project --config examples/development-setup.json
```

**Includes:**
- ESLint configuration
- Prettier formatting rules
- EditorConfig settings
- VSCode workspace settings
- TypeScript configuration
- Git ignore rules
- Custom build scripts

---

### 2. `ai-assistant-config.json`
**Purpose:** Configuration for AI coding assistants and development tools.

**Use case:** Sharing AI assistant commands, prompts, and configurations across projects.

**Usage:**
```bash
symlinker ../my-project --config examples/ai-assistant-config.json
```

**Includes:**
- Claude commands and configurations
- Gemini assistant setup
- GitHub prompt templates
- Cursor IDE rules
- Custom prompt collections

---

### 3. `frontend-project.json`
**Purpose:** Frontend-specific build tools and testing configurations.

**Use case:** Setting up React, Vue, or other frontend projects with consistent tooling.

**Usage:**
```bash
symlinker ../frontend-app --config examples/frontend-project.json
```

**Includes:**
- Webpack configuration
- Babel transpiler settings
- Storybook setup
- Cypress testing configuration
- Tailwind CSS setup
- PostCSS configuration
- Environment templates

---

### 4. `backend-nodejs.json`
**Purpose:** Node.js backend development configurations.

**Use case:** Setting up Express, NestJS, or other Node.js backend projects.

**Usage:**
```bash
symlinker ../api-server --config examples/backend-nodejs.json
```

**Includes:**
- Nodemon development setup
- Docker and Docker Compose configurations
- Jest testing configuration
- Prisma database schema
- Environment variable templates

---

### 5. `cicd-github-actions.json`
**Purpose:** CI/CD pipeline configurations and GitHub repository settings.

**Use case:** Setting up consistent deployment and automation across repositories.

**Usage:**
```bash
symlinker ../my-repo --config examples/cicd-github-actions.json
```

**Includes:**
- GitHub Actions workflows
- Dependabot configuration
- Issue and PR templates
- Contributing guidelines
- Code of conduct
- CI scripts and utilities

---

### 6. `minimal-config.json`
**Purpose:** Minimal essential configurations for any project.

**Use case:** Quick setup for new projects with basic essentials.

**Usage:**
```bash
symlinker ../quick-project --config examples/minimal-config.json
```

**Includes:**
- Git ignore rules
- Editor configuration
- License file

## Using These Examples

### Option 1: Direct Usage
Use any example directly with the `--config` flag:

```bash
symlinker ../target-project --config examples/development-setup.json
```

### Option 2: Copy and Customize
Copy an example to create your own configuration:

```bash
cp examples/development-setup.json my-custom-config.json
# Edit my-custom-config.json to fit your needs
symlinker ../target-project --config my-custom-config.json
```

### Option 3: Combine Multiple Examples
Create a comprehensive setup by combining configurations:

```bash
# Apply development setup first
symlinker ../project --config examples/development-setup.json

# Then add CI/CD configurations
symlinker ../project --config examples/cicd-github-actions.json
```

## Customization Tips

### Modify Paths
Adjust the `original` and `target` paths to match your source structure:

```json
{
  "original": "my-configs/eslint.json",
  "target": ".eslintrc.json",
  "type": "files"
}
```

### Change Link Types
Switch between `"files"` and `"folder"` based on your needs:

- Use `"folder"` for complete directory linking
- Use `"files"` for granular file control with structure preservation

### Add Your Own Configurations
Extend any example with additional configurations:

```json
{
  "configurations": [
    // ... existing configurations
    {
      "original": "my-custom-tool.config.js",
      "type": "files"
    }
  ]
}
```

## Testing Your Configuration

Always test configurations before applying to important projects:

```bash
# Preview what would be created
symlinker ../test-project --config examples/your-config.json --dry-run --verbose

# Apply interactively to choose specific items
symlinker ../test-project --config examples/your-config.json --interactive
```

## Contributing Examples

If you have useful configuration examples that others might benefit from, consider contributing them back to the project. Good examples should be:

1. **Well-documented** - Clear purpose and use case
2. **Broadly applicable** - Useful for common scenarios
3. **Self-contained** - Work independently without dependencies
4. **Tested** - Verified to work correctly

Feel free to submit a pull request with your example configuration and documentation!