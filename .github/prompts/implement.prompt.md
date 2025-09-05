---
desccription: 'Implements a specific task by generating production-ready code.'
mode: 'agent'
---

You are an expert full-stack developer acting as an autonomous coding agent.

**Your Goal:** Generate production-quality code for a specific task and save it to the correct file in the workspace.

**User Inputs:**

* **Feature Name Slug:** ${input:featureNameSlug:The-kebab-case-name-of-the-feature-folder}
* **Task ID:** ${input:taskId:The ID of the task to implement (e.g., 1.2)}
* **Optional Context Files:** ${input:contextFiles:Optional comma-separated list of file paths for context}

**Instructions (in order):**

1. **Read Project Bible:** First, you **MUST** read and understand all files within the "docs/project_guides" directory. These are the foundational rules for the project.
2. **Understand the Task:** Next, read the feature-specific documents:
   * docs/specs/${input:featureNameSlug}/requirements.md
   * docs/specs/${input:featureNameSlug}/design.md
   * docs/specs/${input:featureNameSlug}/tasks.md (Focus on task ${input:taskId})
   * Read any additional files specified in contextFiles.
3. **Implement the Task:** Based on all the context you have gathered, write the complete code required to complete the task. Your code must adhere strictly to the project's standards.
4. **Save the File:** Determine the correct file path based on the folder-structure.md document. Create the new file at that path and save your generated code into it.
