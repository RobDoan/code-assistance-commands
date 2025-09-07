# Coding Standards

This document outlines the coding standards and best practices for this TypeScript-based Nx monorepo. Adhering to these standards ensures consistency, readability, and maintainability across the codebase.

## 1. Formatting

Consistent formatting is enforced using [Prettier](https://prettier.io/).

- **Configuration:** The Prettier configuration is defined in the `.prettierrc` file in the root of the repository.
- **Auto-formatting:** It is highly recommended to configure your IDE to format files on save.
- **CI Check:** A CI check will ensure that all code is formatted correctly before merging.

## 2. Linting

We use [ESLint](https://eslint.org/) with [`typescript-eslint`](https://typescript-eslint.io/) to catch common errors and enforce code style.

- **Configuration:** ESLint rules are defined in the `eslint.config.mjs` file.
- **CI Check:** The `nx affected:lint` command will be run in CI to lint all affected projects.
- **Editor Integration:** Integrate ESLint into your editor to get real-time feedback.

## 3. Naming Conventions

- **Files:** Use kebab-case for file names (e.g., `user-profile.component.ts`).
- **Classes and Interfaces:** Use PascalCase (e.g., `class UserProfileComponent`, `interface User`).
- **Methods and Functions:** Use camelCase (e.g., `getUserProfile()`).
- **Variables and Constants:** Use camelCase for variables. Use SCREAMING_SNAKE_CASE for constants that are truly constant and exported (e.g., `export const MAX_RETRIES = 3;`).
- **Enums:** Use PascalCase for enum names and enum members (e.g., `enum UserRole { Admin, Editor }`).
- **Type Aliases:** Use PascalCase (e.g., `type UserId = string;`).

## 4. TypeScript Best Practices

- **Typing:**
    - Avoid using `any` whenever possible. Use `unknown` for values where the type is not known at compile time and perform type checking.
    - Use specific types over generic ones (e.g., `string` over `any`).
    - Use interfaces to define the shape of objects.
    - Use `readonly` for properties that should not be modified after initialization.

- **Modularity:**
    - Keep files small and focused on a single responsibility.
    - Use ES modules (`import`/`export`) for all new code.

- **Functions:**
    - Keep functions small and pure where possible.
    - Use arrow functions for callbacks and class methods to maintain the correct `this` context.

## 5. Nx Monorepo Best Practices

- **Library Structure:**
    - Follow the principles of a "well-structured" monorepo. Create libraries for different features, UI components, data access logic, and utilities.
    - Use the `@nx/js:lib` generator to create new libraries.

- **Module Boundaries:**
    - Enforce module boundaries using Nx's linting rules in `eslint.config.mjs`. This prevents applications and libraries from depending on each other in unintended ways.
    - Define a clear public API for each library by only exporting what is necessary from the `index.ts` file.

- **Affected Commands:**
    - Use `nx affected` commands (`affected:build`, `affected:test`, `affected:lint`) to only run tasks on the projects that have been changed. This is crucial for CI performance.

- **Code Generation:**
    - Use Nx generators to scaffold new applications, libraries, components, and more. This ensures consistency and adherence to best practices.

## 6. Testing

- **Unit Tests:** All new features should be accompanied by unit tests.
- **Testing Framework:** We use Vitest for unit testing.
- **Test Files:** Test files should be located next to the source files with a `.spec.ts` or `.test.ts` extension.
- **E2E Tests:** End-to-end tests are located in the `apps/<app-name>-e2e` directory.

By following these standards, we can build a more robust and maintainable application.
