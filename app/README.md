# Nx Monorepo Workspace

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

A TypeScript monorepo built with Nx, featuring utility libraries with modern development tooling and CLI capabilities.

## Features

- ✅ **Nx Workspace**: Modern monorepo management with intelligent caching and dependency graph
- ✅ **TypeScript**: Full TypeScript support with strict type checking
- ✅ **Vite**: Lightning-fast builds and development server for libraries
- ✅ **ESBuild**: Optimized bundling for Node.js applications
- ✅ **ESLint**: Code quality and consistency with modern flat config
- ✅ **Vitest**: Fast unit testing with native TypeScript support
- ✅ **Code Sharing**: Seamless library sharing between applications

## Project Structure

```
app/
├── libs/
│   ├── symlinker/             # Symlinker CLI library (@quydoan/symlinker)
│   │   ├── src/               # Source code
│   │   ├── dist/              # Built library output
│   │   ├── examples/          # Usage examples
│   │   ├── package.json       # Package configuration
│   │   └── vite.config.ts     # Vite configuration
│   └── test-utils/            # Testing utilities library (@quydoan/test-utils)
│       ├── src/               # Source code
│       ├── dist/              # Built library output
│       ├── package.json       # Package configuration
│       └── vite.config.ts     # Vite configuration
├── apps/                      # Applications directory (currently empty)
├── nx.json                    # Nx workspace configuration
├── package.json               # Root package.json with scripts
├── eslint.config.mjs          # ESLint configuration
└── tsconfig.base.json         # Base TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
# Install dependencies
npm install
```

### Available Commands

#### Build Commands
```bash
# Build all projects
npm run build

# Build specific projects
npx nx run @quydoan/symlinker:build
npx nx run @quydoan/test-utils:build
```

#### Development Commands
```bash
# No applications currently available for development mode
# Libraries can be built and tested individually
```

#### Testing Commands
```bash
# Run all tests
npm test

# Run tests for specific library
npx nx run @quydoan/symlinker:test
npx nx run @quydoan/test-utils:test
```

#### Quality Commands
```bash
# Run TypeScript type checking
npm run typecheck

# Run ESLint on all projects
npm run lint
```

### Nx Commands

You can also use Nx commands directly:

```bash
# Show project graph
npx nx graph

# Run specific target for all projects
npx nx run-many --target=build --all
npx nx run-many --target=test --all
npx nx run-many --target=lint --all

# Run target for specific project
npx nx run @quydoan/symlinker:build
npx nx run @quydoan/test-utils:build
```

## Architecture

### Symlinker Library (@quydoan/symlinker)

A CLI tool and library for creating symbolic links with interactive prompts:

- **Built with**: Vite + TypeScript
- **Output**: ES modules with type definitions and CLI executable
- **Location**: `libs/symlinker/`
- **Import**: `import { functionName } from '@quydoan/symlinker'`
- **CLI**: Available as `symlinker` command after build
- **Dependencies**: inquirer, commander

### Test Utils Library (@quydoan/test-utils)

A utility library providing common testing utilities and helpers:

- **Built with**: Vite + TypeScript
- **Output**: ES modules with type definitions
- **Location**: `libs/test-utils/`
- **Import**: `import { functionName } from '@quydoan/test-utils'`

## Development Workflow

1. **Make changes** to library code
2. **Run tests**: `npm test` to ensure functionality
3. **Type check**: `npm run typecheck` to verify TypeScript
4. **Lint code**: `npm run lint` for code quality
5. **Build**: `npm run build` to create production builds
6. **Test CLI tools**: Build symlinker and test CLI functionality

## Testing Strategy

- **Unit Tests**: Located alongside source files with `.spec.ts` extension
- **Test Framework**: Vitest for fast, TypeScript-native testing
- **Coverage**: Tests cover utility functions in both libraries
- **Running**: Use `npm test` or `npx nx run-many --target=test --all`

## Build System

### Libraries (Vite)
- Fast build times with hot module replacement
- Tree-shakeable ES modules output
- Automatic TypeScript declaration generation
- Source maps for debugging

### CLI Tools
- Symlinker provides executable CLI interface
- ES module output with proper bin configuration
- Interactive prompts using inquirer
- Command-line argument parsing with commander

## Configuration

### TypeScript
- Strict type checking enabled
- Path mapping for clean imports
- Shared base configuration

### ESLint
- Modern flat configuration format (ESLint v9+)
- TypeScript-aware linting
- Consistent code style enforcement

### Nx
- Intelligent caching for faster builds
- Task dependency management  
- Project boundary enforcement

## Troubleshooting

### Common Issues

1. **Build failures**: Run `npm run typecheck` to identify TypeScript errors
2. **Import errors**: Ensure libraries are built before importing from other packages
3. **ESLint errors**: Check `eslint.config.mjs` for configuration issues
4. **Test failures**: Verify test file imports use correct file extensions
5. **CLI issues**: Ensure symlinker is built before testing CLI functionality

### Reset and Clean

```bash
# Reset Nx cache
npx nx reset

# Clean build outputs
rm -rf libs/*/dist/ dist/

# Reinstall dependencies
rm -rf node_modules/ && npm install
```

## Contributing

1. Follow the existing code style and conventions
2. Add tests for new functionality
3. Ensure all commands pass: `npm run build && npm test && npm run typecheck && npm run lint`
4. Update documentation as needed

## Nx Resources

Learn more about Nx:

- [Learn more about this workspace setup](https://nx.dev/nx-api/js?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

Join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## License

MIT