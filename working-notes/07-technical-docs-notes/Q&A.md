# Q&A: Evolution of Technical Documentation

## Q: Why are files like `architecture-guide.md`, `coding-standards.md`, and `deployment-guide.md` no longer present as standalone documents in the `07-technical-docs` templates?

**Context:** The original plan for the technical documentation included several specific files that seem to be missing from the final template structure.

---

## A: This was a deliberate evolution. The concepts from those files were integrated into more dynamic, workflow-oriented templates to better align with the "Docs as Code" and "Guardrails, Not Handcuffs" principles

Instead of having static, descriptive documents that can get stale, the concepts have been embedded into the actual development process. Here is the mapping:

* **`deployment-guide.md`** evolved into **`runbooks/release-runbook.md`**.
  * **Why:** A "guide" is something you read. A "runbook" with copy-pasteable scripts is something you *do*. It's an executable process, which is far more valuable and less prone to error.

* **`testing-standards.md`** evolved into **`practices/testing-manifesto.md`**.
  * **Why:** A list of "standards" can feel like a chore. A "manifesto" explains the *philosophy* and purpose, framing testing as a tool for speed and learning, which is more motivating and aligned with the culture.

* **`coding-standards.md`** and **`development-guidelines.md`** were absorbed into **`practices/development-workflow.md`**.
  * **Why:** Standards are most effective when they are part of the workflow. Instead of a separate file, the guidelines are now in the PR template, the branch naming conventions, and the process checklist. It puts the guardrails directly in the developer's path.

* **`security-compliance.md`** is now handled as a cross-cutting concern.
  * **Why:** Security isn't a single document; it's a factor in every decision. It's now captured in the **`decisions/adr-template.md`** (as a `Constraint`) and managed explicitly in the **`learning/risk-register.md`**.

* **`tech-stack.md`** still exists, but it's now **`systems/tech-stack.md`**.
  * **Why:** It was moved into the `systems` directory to group it with other high-level system architecture documents, as per the `arc42` structure.

* **`architecture-guide.md`** was intentionally broken apart.
  * **Why:** A single, monolithic "architecture guide" is difficult to maintain. The `Lean Technical Documentation Structure` document specifies that architecture should be described using the C4 model and captured in ADRs. The `systems` folder is where those diagrams would live, and the `decisions` folder captures the critical "why."

In short, the system was intentionally designed to move away from a collection of static files and toward a set of interconnected, action-oriented templates that are woven directly into the engineering workflow. This reduces documentation friction and ensures the information is alive and useful.
