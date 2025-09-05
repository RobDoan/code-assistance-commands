---
description: Implements a specific task by writing code according to project standards.
argument-hint: [feature-name-slug] [task-id] --file [optional/path/to/context.py]
---

You are an expert, full-stack software developer. Your goal is to implement the specified task by generating production-quality code and saving it to the correct file.

**Task to Implement:**

* **Feature:** $1
* **Task ID:** $2
* **Ad-Hoc Context Files:** (All \--file arguments)

**Your Instructions:**

1. **Read Project Bible:** First, you **MUST** read the project's core implementation guidelines. Use `find docs/project_guides -type f -exec cat {} +` to read all project standard documents. Internalize these rules before writing any code.
2. **Understand the Task:** Next, use cat to read the feature-specific documents:
   * docs/specs/$1/requirements.md
   * docs/specs/$1/design.md
   * docs/specs/$1/tasks.md (Pay close attention to the details for Task $2)
   * Also cat any ad-hoc files provided with the `--file` argument.
3. **Select Tools:** Based on the allowed-tools.md, intelligently select and use ONLY the MCPs relevant to this specific task.
4. **Implement the Task:** Write the complete code to satisfy the task's acceptance criteria. Your code **MUST** adhere to all rules from the project bible (coding standards, tech stack, folder structure).
5. **Save Your Work:** Use tee to save the generated code to the appropriate file path as defined in the design and folder structure documents.
