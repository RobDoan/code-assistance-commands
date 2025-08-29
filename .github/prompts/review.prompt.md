---
mode: 'agent'
description: 'Reviews changed files for code quality, security, performance, testing, and documentation'
---

# Code Review Command

Review code changes in: ${args} (default: `./src`)

## Code Review Process

This command performs a comprehensive review of **changed files only** focusing on code quality, security, performance, testing, and documentation.

## Review Areas

### 1. Security Vulnerabilities
- **Authentication & Authorization**: Check for proper auth implementations
- **Input Validation**: Ensure all user inputs are validated and sanitized
- **Data Exposure**: Review for sensitive data leakage in logs/responses
- **Dependency Security**: Check for vulnerable dependencies
- **XSS Prevention**: Verify proper output encoding and CSP headers
- **SQL Injection**: Review database queries for injection vulnerabilities
- **CORS Configuration**: Ensure proper cross-origin policies
- **API Security**: Check for rate limiting, proper HTTP methods, and error handling

### 2. Performance Issues
- **Bundle Size**: Analyze JavaScript bundle sizes and splitting
- **Memory Leaks**: Check for event listener cleanup and object disposal
- **Re-renders**: Identify unnecessary React re-renders and optimization opportunities

### 3. Code Quality & Maintainability
- **TypeScript Usage**: Ensure proper typing and avoid `any` types
- **Code Duplication**: Identify repeated code that can be refactored
- **Function Complexity**: Review for overly complex functions/methods
- **Naming Conventions**: Check for clear, descriptive variable/function names
- **Error Handling**: Ensure comprehensive error handling and logging
- **SOLID Principles**: Review adherence to software design principles
- **Component Design**: Check React component composition and reusability
- **State Management**: Review Redux/state management patterns
- **Async Operations**: Ensure proper async/await and Promise handling

### 4. Test Coverage Gaps
- **Unit Tests**: Identify untested functions, components, and edge cases
- **Integration Tests**: Check for missing integration test scenarios
- **E2E Tests**: Review critical user flows for E2E test coverage
- **Error Scenarios**: Ensure error conditions are tested
- **Edge Cases**: Identify boundary conditions that need testing
- **Mocking**: Review proper mocking of external dependencies
- **Test Quality**: Check for meaningful assertions and test clarity
- **Snapshot Tests**: Ensure UI component snapshot tests are updated

### 5. Documentation Needs
- **Code Comments**: Check for complex logic that needs inline documentation
- **API Documentation**: Ensure API endpoints are properly documented
- **Component Props**: Review TypeScript interfaces and prop documentation
- **README Updates**: Check if changes require README or docs updates
- **Storybook Stories**: Ensure new UI components have Storybook documentation
- **Architecture Decisions**: Document significant architectural changes
- **Setup Instructions**: Verify setup and deployment documentation is current
- **Changelog**: Ensure user-facing changes are documented

## Review Process

1. **Identify Changed Files**: Analyze git diff to focus only on modified/new files
2. **Security Scan**: Priority review for security vulnerabilities
3. **Performance Analysis**: Check for performance regressions and opportunities
4. **Quality Assessment**: Evaluate code maintainability and standards compliance
5. **Test Coverage**: Identify testing gaps and recommend test additions
6. **Documentation Review**: Ensure changes are properly documented

## Output Format

For each changed file, provide:

```markdown
## 📁 [File Path]

### ✅ Strengths
- [Positive aspects of the code]

### ⚠️ Issues Found
- **Security**: [Critical security concerns]
- **Performance**: [Performance bottlenecks or concerns]
- **Quality**: [Code quality issues]
- **Testing**: [Missing test coverage]
- **Documentation**: [Documentation gaps]

### 🔧 Recommendations
- [Specific, actionable improvement suggestions]
- [Priority ranking: Critical/High/Medium/Low]
```

## Summary Report

- **Critical Issues**: [Count and brief description]
- **Performance Impact**: [Assessment of performance implications]
- **Test Coverage**: [Overall testing adequacy]
- **Documentation Status**: [Documentation completeness]
- **Priority Actions**: [Top 3-5 items to address immediately]
