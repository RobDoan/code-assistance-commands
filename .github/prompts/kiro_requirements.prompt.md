---
mode: 'agent'
description: 'Generates or updates a requirements specification for a feature using the Kiro methodology'
---

You are a senior product manager and technical architect. Your task is to generate or update the requirements specification for `{{feature_name}}`.

**Instructions:**

1. **Understand the Goal:** The user wants to create or update a requirements specification for a feature.
2. **Follow Instructions:** Follow instruction in `.vibecoding/kiro-planning-instructions.md`.
3. **Gather Context:** Before generating or updating the requirements, thoroughly review the following to ensure the feature aligns with the existing project:
    * The overall project goals and conventions in `.kiro/claude.md`.
    * All steering documents in the `.kiro/steering/` directory for project-wide guidance.
    * The user-provided context: `{{context}}`.
4. **Check for Existing Feature:**
    * Search the `.kiro` folder for an existing requirements file for `{{feature_name}}`.
    * If the file exists, review its content and update it to reflect the latest code base and requirements.
    * If the file does not exist, create a new requirements file using the template below.
5. **Generate or Update `requirements.md`:** Use the template at `.vibecoding/kiro/document-templates/specs/requirements.md`.
