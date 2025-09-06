# Conventional Commits Guide

This project uses [Conventional Commits](https://www.conventionalcommits.org/) specification for automatic versioning and changelog generation with semantic-release.

## Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

## Types

| Type | Description | Release |
|------|-------------|---------|
| `feat` | New features | **Minor** (1.x.0) |
| `fix` | Bug fixes | **Patch** (1.0.x) |
| `docs` | Documentation only changes | **Patch** (1.0.x) |
| `perf` | Performance improvements | **Patch** (1.0.x) |
| `refactor` | Code changes that neither fix bugs nor add features | **Patch** (1.0.x) |
| `revert` | Reverts a previous commit | **Patch** (1.0.x) |
| `style` | Changes that don't affect meaning (white-space, formatting) | **No release** |
| `test` | Adding missing tests or correcting existing tests | **No release** |
| `build` | Changes that affect build system or external dependencies | **No release** |
| `ci` | Changes to CI configuration files and scripts | **No release** |
| `chore` | Other changes that don't modify src or test files | **No release** |

## Breaking Changes

Add `!` after the type or include `BREAKING CHANGE:` in the footer to trigger a **Major** release (x.0.0).

## Examples

### Minor Release (New Features)
```bash
git commit -m "feat: add interactive mode for configuration selection"
git commit -m "feat(cli): add --dry-run flag for preview mode"
git commit -m "feat(symlink): support custom target path resolution"
```

### Patch Release (Bug Fixes)
```bash
git commit -m "fix: resolve symlink creation permission errors"
git commit -m "fix(config): handle missing configuration file gracefully"
git commit -m "docs: update installation instructions for Windows"
git commit -m "perf: optimize large directory processing"
```

### Major Release (Breaking Changes)
```bash
git commit -m "feat!: change CLI argument structure"
git commit -m "fix!: remove deprecated --legacy-mode flag"

# Or with body
git commit -m "feat: redesign configuration format

BREAKING CHANGE: configuration file structure has changed from arrays to objects"
```

### No Release
```bash
git commit -m "style: fix code formatting"
git commit -m "test: add unit tests for path validation"
git commit -m "ci: update GitHub Actions Node.js version"
git commit -m "chore: update dependencies"
```

## Scopes (Optional)

Common scopes for this project:

- `cli` - Command line interface
- `config` - Configuration handling
- `symlink` - Symbolic link operations
- `path` - Path validation and resolution
- `test` - Testing utilities
- `docs` - Documentation
- `build` - Build system
- `deps` - Dependencies

## Multi-line Messages

For complex changes, use a body and footer:

```bash
git commit -m "feat(symlink): add support for nested directory structures

- Preserves original folder hierarchy in target
- Handles deep nesting up to 10 levels  
- Improves performance for large directory trees

Closes #123"
```

## Tips

1. **Use imperative mood**: "add feature" not "added feature"
2. **No dot at the end**: Keep descriptions concise
3. **Capitalize first letter**: "Add feature" not "add feature"  
4. **Reference issues**: Use "Closes #123" in body or footer
5. **Keep first line under 72 characters**

## Semantic Release Behavior

- **main branch**: Creates production releases with `@latest` tag
- **develop branch**: Creates beta releases with `@next` tag
- **feat commits**: Bump minor version (1.1.0)
- **fix/docs/perf/refactor commits**: Bump patch version (1.0.1)
- **BREAKING CHANGE**: Bump major version (2.0.0)
- **style/test/build/ci/chore**: No release

## Checking Your Commits

Before pushing, verify your commit follows the convention:

```bash
# View recent commits
git log --oneline -5

# Check if commits would trigger a release
npm run semantic-release -- --dry-run
```

For more information, see the [Conventional Commits specification](https://www.conventionalcommits.org/).