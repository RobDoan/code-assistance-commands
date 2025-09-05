## Feature 1: Unified AI Code Assistance Configuration System

To streamline the setup and management of AI-powered code assistance tools (e.g., GitHub Copilot, Claude Code, Gemini CLI), I want to create a general configuration framework that provides:

1. **Custom Slash Commands:** Define a consistent set of slash commands for all tools, ensuring uniform interaction and automation across platforms.
2. **Centralized Prompt Management:** Maintain a single source of truth for all prompts, making it easy to update and synchronize instructions for every tool.
3. **Flexible Formatting:** Support tool-specific formatting requirements (e.g., `.tom` for Gemini, `.md` for Claude) by generating configuration files in the appropriate format from the unified prompt source.
4. **Project Folder Structure:** Standardize the project directory layout to ensure all code assistance tools operate with the same organizational conventions.
5. **Project Management Instructions:** Provide clear guidelines for AI tools on project workflows, documentation standards, and integration points.

**Goal:** Enable seamless onboarding and consistent usage of AI code assistance tools, regardless of their formatting or platform-specific requirements, by managing all prompts and configurations centrally and generating tool-specific files as needed.

---

## Feature 2: Bootstrapping a Lean Project Documentation System

As a developer aiming to streamline project setup and documentation, I want to automate the creation of a well-structured folder and template system for every new project. My goal is to:

1. Ensure every project starts with the same clear documentation structure.
2. Make it easy for contributors to find requirements, designs, and technical standards.
3. Support multiple project types (web, mobile, backend, devops) with service-specific templates.
4. Enable AI tools to work with consistent prompts and formats.

```text
project-steering/
  goals.md
  roadmap.md
  milestones.md
  decisions/
    2025-08-28-choose-tech-stack.md
    2025-09-01-api-design-decision.md
  meetings/
    2025-08-28-kickoff.md
    2025-09-05-retrospective.md
project-docs/
  core-docs/
    01-research-phase/
      problem-statement.md
      lean-canvas.md
      user-research-summary.md
      competitive-analysis.md
      hypothesis-list.md
    02-design-phase/
      prd.md
      wireframes.md
      user-flows.md
      architecture-outline.md
    03-development-phase/
      sprint-backlog.md
      api-contracts.md
      code-review-checklist.md
      change-log.md
    04-testing-phase/
      test-plan.md
      test-cases.md
      bug-tracker.md
      user-feedback-summary.md
    05-deployment-phase/
      release-checklist.md
      deployment-guide.md
      monitoring-plan.md
      post-release-review.md
  features/
    feature-A/
      requirements.md        # Shared feature requirements
      design.md              # Shared feature design
      frontend/
        requirements.md      # Frontend-specific requirements (optional)
        tasks.md             # Frontend-specific tasks
        design.md            # Frontend-specific design (optional)
        test-plan.md         # Frontend-specific tests
      backend/
        requirements.md      # Backend-specific requirements (optional)
        tasks.md
        design.md
        test-plan.md
      devops/
        requirements.md      # DevOps-specific requirements (optional)
        tasks.md
        design.md
        test-plan.md
  technical-docs/
    tech-stack.md
    architecture-guide.md
    coding-standards.md
    development-guidelines.md
    testing-standards.md
    deployment-guide.md
    security-compliance.md
```
