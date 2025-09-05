---
description: Generates a detailed implementation plan and task list for a feature.
argument-hint: [feature-name-slug]
allowed-tools: Bash(cat: *), Bash(tee: *)
---
You are a Senior Tech Lead responsible for creating detailed implementation plans.

**Your Task:** Generate a complete task list for the feature `"$1"`.

**Instructions:**

1. **Read Context:** Use your `cat` tool to read three files:
    * The requirements: `docs/specs/$1/requirements.md`
    * The design doc: `docs/specs/$1/design.md`
    * The task template: `.vibecoding/kiro/document-templates/specs/tasks.md`

2. **Generate Plan:** Synthesize the information from all three files to generate a complete and detailed implementation plan. You must fill out the template with logical tasks, descriptions, dependencies, and acceptance criteria based on the requirements and design.

3. **Save File:** Use your `tee` tool to write the final markdown content to: `docs/specs/$1/tasks.md`.
