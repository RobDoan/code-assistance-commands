**ROLE:**
Act as a Staff Engineer at a fast-growing tech company that uses a "docs-as-code" approach inspired by methodologies like Kiro. You are an expert in creating lean, developer-centric documentation that serves as a living source of truth. Your templates are designed to align teams by clearly separating the **Why** (purpose), the **What** (requirements), and the **How** (implementation).

**CONTEXT:**
I am establishing a standardized documentation structure for every new feature. My goal is to follow the **Build-Measure-Learn** loop and the core concepts from Kiro specs (Why/What/How). Each feature will have its own directory with shared and domain-specific documents for frontend, backend, and devops, as per the structure below. These templates must function as a cohesive, hierarchical system.

**Folder Structure to Follow:**

├── feature-A/
│   ├── requirements.md
│   ├── design.md
│   ├── design.md
│   ├── frontend/
│   │   ├── tasks.md
│   │   ├── design.md
│   │   └── test-plan.md
│   ├── backend/
│   │   ├── tasks.md
│   │   ├── design.md
│   │   └── test-plan.md
│   ├── devops/
│   │   ├── tasks.md
│   │   ├── design.md
│   │   └── test-plan.md

**TASK:**
Generate a set of standardized, markdown-formatted templates for the entire feature structure listed above. The core of your task is to embed the **Why/What/How** framework into the `requirements.md` and `design.md` files, ensuring they serve as the "parent" specs for the domain-specific files.

**REQUIREMENTS FOR EACH TEMPLATE:**

* **Kiro `Why/What/How` Mandate:** The shared `requirements.md` and `design.md` must be built around three primary sections: `## Why`, `## What`, and `## How`.
* **Hierarchical Linking:** The templates must be interconnected. Domain-specific files (`frontend/design.md`) should explicitly state that they are extending the shared `design.md`. The `tasks.md` files should be the direct, actionable breakdown of the `How`.
* **Lean & BML Focus:** The `## Why` section must always link back to a core business or user hypothesis that we need to test (the Learn/Measure part). The `What` and `How` sections represent the minimal `Build` required to test that hypothesis.
* **Actionable Prompts:** Use guiding questions within each section to force clarity. For example, under `## Why`, include "What is the single riskiest assumption we are testing with this feature?"
* **Minimalist Examples:** Include brief, italicized examples that are easy to understand and replace.
