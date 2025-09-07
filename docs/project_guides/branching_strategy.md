# Branching Strategy

This document outlines the branching strategy for this project. We use a simplified GitFlow model to manage our codebase.

## Main Branches

The repository has two main long-lived branches:

- `main`: This branch represents the production-ready code. It should always be stable and deployable.
- `develop`: This is the main development branch. All feature branches are merged into `develop`. This branch contains the latest development changes.

## Supporting Branches

We use several types of supporting branches for development, releases, and hotfixes. These branches are temporary and are deleted after they are merged.

### Feature Branches (`feature/*`)

- **Purpose:** To develop new features.
- **Branched from:** `develop`
- **Merged to:** `develop`
- **Naming convention:** `feature/<feature-name>` (e.g., `feature/user-authentication`)

**Workflow:**
1. Create a new branch from `develop`: `git checkout -b feature/my-new-feature develop`
2. Work on the feature and commit your changes.
3. Push the feature branch to the remote repository: `git push -u origin feature/my-new-feature`
4. When the feature is complete, create a pull request to merge it into `develop`.

### Release Branches (`release/*`)

- **Purpose:** To prepare for a new production release. This branch is used for final bug fixes, documentation, and other release-related tasks.
- **Branched from:** `develop`
- **Merged to:** `main` and `develop`
- **Naming convention:** `release/<version-number>` (e.g., `release/v1.2.0`)

**Workflow:**
1. Create a release branch from `develop`: `git checkout -b release/v1.2.0 develop`
2. Perform final testing and make any necessary bug fixes on this branch.
3. Once the release is ready, merge the release branch into `main` and tag the release:
   ```bash
   git checkout main
   git merge --no-ff release/v1.2.0
   git tag -a v1.2.0
   ```
4. Merge the release branch back into `develop` to ensure any changes made in the release branch are incorporated into future development:
   ```bash
   git checkout develop
   git merge --no-ff release/v1.2.0
   ```
5. Delete the release branch.

### Hotfix Branches (`hotfix/*`)

- **Purpose:** To fix critical bugs in production.
- **Branched from:** `main`
- **Merged to:** `main` and `develop`
- **Naming convention:** `hotfix/<issue-name>` (e.g., `hotfix/login-bug`)

**Workflow:**
1. Create a hotfix branch from `main`: `git checkout -b hotfix/login-bug main`
2. Fix the bug and commit your changes.
3. Merge the hotfix branch into `main` and tag the release:
   ```bash
   git checkout main
   git merge --no-ff hotfix/login-bug
   git tag -a v1.2.1
   ```
4. Merge the hotfix branch into `develop` to ensure the fix is included in future development:
   ```bash
   git checkout develop
   git merge --no-ff hotfix/login-bug
   ```
5. Delete the hotfix branch.

## Pull Requests

All merges into `main` and `develop` must be done through pull requests. This allows for code review and ensures that our main branches remain stable.
