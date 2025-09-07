# Project Folder Structure

This document describes the organization and purpose of folders in the Code Assistance Commands project.

## Root Directory Structure

```
code-assistance-commands/
├── docs/                   # Project documentation
│   ├── project_guides/     # Project setup and development guides
│   └── specs/              # Feature specifications and requirements
├── templates/              # Startup and Research templates
├── app/                    # Nx workspace - all application code
├── support-tools/          # [IGNORE] Tools and utilities (not necessary for coding)
├── .vibecoding/            # [IGNORE] VibecoIding configuration (not necessary for coding)
├── working-notes/          # [IGNORE] Personal development notes (private)
└── [config files]          # Various configuration files
```

## Folder Details

### 📁 `docs/` - Project Documentation
Main documentation directory containing:
- **`project_guides/`** - Development guides, setup instructions, and project guidelines
- **`specs/`** - Feature specifications, requirements, and technical documentation for each feature

### 📁 `templates/` - Templates
Contains startup and research templates for:
- Project initialization templates
- Research document templates
- Development workflow templates

### 📁 `app/` - Nx Workspace 🚀
**Main application development directory** - This is where all application code lives.

**⚠️ IMPORTANT**: To run any Nx commands, you must navigate inside this folder first:
```bash
cd app/
npm run build
npm test
npx nx graph
```

Structure inside `app/`:
```
app/
├── shared/                 # Shared libraries (@app/shared)
├── apps/                   # Applications (sample-app, etc.)
├── packages/               # Additional packages
├── nx.json                 # Nx workspace configuration
├── package.json            # Root package.json with scripts
├── eslint.config.mjs       # ESLint configuration
└── tsconfig.base.json      # Base TypeScript configuration
```

## Folders to Ignore

The following folders should be ignored when working with code:

### 🚫 `support-tools/`
Tools and utilities that are not necessary for main application development.

### 🚫 `.vibecoding/`
VibecoIding-specific configuration files that are not necessary for coding context.

### 🚫 `working-notes/`
Personal development notes and working files. These are private notes and should not be included in coding context.

## Development Workflow

### For Application Development
1. **Navigate to app directory**: `cd app/`
2. **Install dependencies**: `npm install`
3. **Run development commands**: `npm run dev`, `npm test`, etc.

### For Documentation
1. **Feature specs**: Add to `docs/specs/[feature-name]/`
2. **Project guides**: Update files in `docs/project_guides/`

### For Templates
1. **Startup templates**: Add to `templates/startup/`
2. **Research templates**: Add to `templates/research/`

## Key Points for Developers

- ✅ **Primary code location**: `app/` directory (Nx workspace)
- ✅ **Documentation**: `docs/` directory
- ✅ **Templates**: `templates/` directory
- ❌ **Ignore for coding**: `support-tools/`, `.vibecoding/`, `working-notes/`
- 🔧 **Nx commands**: Must run from inside `app/` directory

## Quick Reference

| Purpose | Location | Notes |
|---------|----------|-------|
| Application code | `app/` | Nx workspace, run commands from here |
| Feature specifications | `docs/specs/` | Technical requirements for features |
| Development guides | `docs/project_guides/` | Setup and development instructions |
| Project templates | `templates/` | Startup and research templates |
| Personal notes | `working-notes/` | Private, ignore for coding |
| Support utilities | `support-tools/` | Ignore for main development |