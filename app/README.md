# Nx Monorepo Workspace

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

A TypeScript monorepo built with Nx, featuring shared libraries and applications with modern development tooling.

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
├── shared/                 # Shared utility library (@app/shared)
│   ├── src/
│   │   ├── lib/
│   │   │   ├── shared.ts      # Utility functions
│   │   │   └── shared.spec.ts # Unit tests
│   │   └── index.ts           # Library exports
│   ├── dist/                  # Built library output
│   ├── package.json
│   ├── project.json           # Nx project configuration
│   └── vite.config.ts         # Vite configuration
├── apps/
│   └── sample-app/            # Sample Node.js application
│       ├── src/
│       │   └── main.ts        # Application entry point
│       ├── dist/              # Built application output
│       └── project.json       # Nx project configuration
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
npm run build:shared
npm run build:sample-app
```

#### Development Commands
```bash
# Run sample application in development mode
npm run dev
# or
npm run serve:sample-app
```

#### Testing Commands
```bash
# Run all tests
npm test

# Run tests for specific project
npm run test:shared
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
npx nx run @app/shared:build
npx nx run sample-app:serve
```

## Architecture

### Shared Library (@app/shared)

The shared library contains common utilities and functions that can be imported by applications:

- **Built with**: Vite + TypeScript
- **Output**: ES modules with type definitions
- **Location**: `shared/`
- **Import**: `import { functionName } from '@app/shared'`

Example functions:
- `shared()` - Returns 'shared' string
- `formatGreeting(name)` - Formats a greeting message
- `sum(numbers[])` - Calculates sum of numbers array
- `capitalizeWords(text)` - Capitalizes first letter of each word

### Sample Application

A Node.js application demonstrating usage of the shared library:

- **Built with**: ESBuild + TypeScript
- **Output**: CommonJS modules
- **Location**: `apps/sample-app/`
- **Entry**: `apps/sample-app/src/main.ts`

## Development Workflow

1. **Make changes** to library or application code
2. **Run tests**: `npm test` to ensure functionality
3. **Type check**: `npm run typecheck` to verify TypeScript
4. **Lint code**: `npm run lint` for code quality
5. **Build**: `npm run build` to create production builds
6. **Test locally**: `npm run dev` to run the sample app

## Testing Strategy

- **Unit Tests**: Located alongside source files with `.spec.ts` extension
- **Test Framework**: Vitest for fast, TypeScript-native testing
- **Coverage**: Tests cover core utility functions in shared library
- **Running**: Use `npm test` or `npx nx run-many --target=test --all`

## Build System

### Libraries (Vite)
- Fast build times with hot module replacement
- Tree-shakeable ES modules output
- Automatic TypeScript declaration generation
- Source maps for debugging

### Applications (ESBuild)
- Optimized for Node.js runtime
- CommonJS output format
- Fast incremental builds
- Development and production configurations

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
2. **Import errors**: Ensure the shared library is built before running applications
3. **ESLint errors**: Check `eslint.config.mjs` for configuration issues
4. **Test failures**: Verify test file imports use correct file extensions

### Reset and Clean

```bash
# Reset Nx cache
npx nx reset

# Clean build outputs
rm -rf dist/ shared/dist/ apps/*/dist/

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