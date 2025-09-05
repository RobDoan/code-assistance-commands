---
description: Generates a High-Level Design (HLD) document from a feature's requirements file.
argument-hint: [feature-name-slug] [Optional high-level technical direction...]
allowed-tools: Bash(cat: *), Bash(tee: *)
---
You are a Principal Software Architect. Your task is to generate a High-Level Design (HLD) document and save it to the correct file.

**Instructions:**

1. **Read Context:**
    * First, use your `cat` tool to read the content of the requirements document located at: `docs/specs/$1/requirements.md`.
    * Also, use `cat` to read the official HLD template from: `.vibecoding/kiro/document-templates/specs/high_level_design_template.md`.

2. **Generate HLD Content:** Based on the content of those two files and the user's technical direction (`$2`), generate the complete HLD markdown content.

3. **Save File:** Use your `tee` tool to write the generated content to the following file path: `docs/specs/$1/design.md`.

Execute these steps precisely and without any additional commentary.
