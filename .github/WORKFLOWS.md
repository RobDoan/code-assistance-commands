# GitHub Actions Workflows

This repository uses GitHub Actions for automated continuous integration, releases, and maintenance. Here's an overview of each workflow and how to use them.

## 🚀 Workflows Overview

### 1. `ci.yml` - Continuous Integration
**Triggers:** Push to `main`/`develop`, Pull Requests
**Purpose:** Validates code quality, runs tests, and ensures package integrity

**Jobs:**
- **Lint & Format Check** - TypeScript validation
- **Test Suite** - Unit and package tests across multiple Node.js versions and OS
- **Build & Validate** - Builds package and validates structure
- **Security Audit** - Checks for vulnerabilities
- **Compatibility Test** - Tests package installation (PR only)

### 2. `release.yml` - Automated Package Release with Semantic Release
**Triggers:** Push to `main` or `develop` branches 
**Purpose:** Uses semantic-release for automated versioning and publishing

**Jobs:**
- **Test & Build** - Multi-version testing across Node.js versions
- **Security Scan** - Comprehensive security validation
- **Semantic Release** - Automated versioning, changelog, GitHub releases, and NPM publishing
- **Post-Release Actions** - Package validation and notifications

### 3. `maintenance.yml` - Automated Maintenance
**Triggers:** Weekly schedule (Mondays 9 AM UTC), Manual dispatch
**Purpose:** Keeps dependencies updated and monitors package health

**Jobs:**
- **Dependency Update** - Creates PRs for dependency updates
- **Security Check** - Creates issues for security vulnerabilities
- **Package Health** - Monitors package size and code quality

## 📋 Setup Requirements

### Required Secrets

Add these secrets in your GitHub repository settings:

```
NPM_TOKEN - Your NPM publish token
```

### Optional Secrets

```
DISCORD_WEBHOOK_URL - For release notifications
SLACK_WEBHOOK_URL - For release notifications
```

### NPM Token Setup

1. Go to [npmjs.com](https://npmjs.com) → Account Settings → Access Tokens
2. Create a new **Automation** token
3. Add it as `NPM_TOKEN` secret in GitHub repository settings

## 🎯 How to Use

### Making a Release with Semantic Release

**Semantic Release** automatically determines the next version number, generates changelog, and publishes based on commit messages.

1. **Use conventional commit messages:**
   ```bash
   git commit -m "feat: add new symlink validation feature"     # → Minor release
   git commit -m "fix: resolve path resolution bug"            # → Patch release  
   git commit -m "feat!: change CLI interface"                 # → Major release
   git commit -m "docs: update installation instructions"      # → Patch release
   ```

2. **Push to main or develop:**
   ```bash
   git push origin main      # → Production release
   git push origin develop   # → Beta pre-release
   ```

3. **GitHub Actions will automatically:**
   - Analyze commit messages 
   - Determine version bump (major/minor/patch)
   - Run comprehensive tests
   - Generate changelog
   - Create GitHub release
   - Publish to NPM (latest or next tag)
   - Update package.json version

### Development Workflow

1. **Create feature branch:**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes and push:**
   ```bash
   git push origin feature/my-feature
   ```

3. **Create Pull Request** - CI will automatically run

4. **After PR approval and merge** - CI runs again on main

### Manual Maintenance

Run maintenance workflow manually:

1. Go to **Actions** tab in GitHub
2. Select **Maintenance & Updates** workflow  
3. Click **Run workflow**

## 🔧 Workflow Configuration

### Node.js Versions Tested

- **CI:** Node.js 20.x (optimized for faster CI)
- **Release:** Node.js 16.x, 18.x, 20.x (full compatibility)

### Supported Operating Systems

- **Ubuntu Latest** (primary)
- **macOS Latest** (compatibility testing)

### Security Levels

- **Moderate** - Warnings in CI
- **High/Critical** - Blocks release, creates issues

## 📊 Monitoring

### CI Status

Check the status badges in README.md or visit the Actions tab.

### Release Status

- **GitHub Releases** - Automated releases with changelog
- **NPM** - Package automatically published
- **Tags** - Version tags created automatically

### Maintenance Alerts

- **Dependency Updates** - Weekly PRs for updates
- **Security Issues** - Automatic issue creation
- **Health Reports** - Package size and code quality monitoring

## 🛠️ Customization

### Adding New Steps

1. Edit the appropriate workflow file in `.github/workflows/`
2. Follow the existing pattern for new jobs or steps
3. Test changes in a feature branch PR

### Notifications

Uncomment and configure webhook sections in `release.yml` for:
- Discord notifications
- Slack notifications
- Email alerts

### Coverage Reports

Add coverage service integration by uncommenting sections in `ci.yml`:
- Codecov
- Coveralls
- Or your preferred service

## 🚨 Troubleshooting

### Release Failed

1. Check if NPM_TOKEN is valid and has publish permissions
2. Verify package version matches git tag
3. Ensure all tests pass locally first

### CI Failures

1. Run tests locally: `npm run ci`
2. Check Node.js version compatibility
3. Verify all required files exist

### Security Alerts

1. Check created issues for vulnerability details
2. Run `npm audit` locally
3. Update dependencies with `npm audit fix`

## 📚 Best Practices

### Commit Messages

Use conventional commits for better changelog generation:
```
feat: add new feature
fix: resolve bug
docs: update documentation
chore: update dependencies
```

### Version Management

- **Patch** (`1.0.1`) - Bug fixes
- **Minor** (`1.1.0`) - New features
- **Major** (`2.0.0`) - Breaking changes

### Release Process

1. Always test locally before releasing
2. Update CHANGELOG.md with release notes
3. Use semantic versioning consistently
4. Tag releases from main branch only

---

For more information, see the individual workflow files or GitHub Actions documentation.