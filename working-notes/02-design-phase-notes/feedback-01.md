# Design Phase Template Review: A Lean Perspective

## 1. Overall Assessment

Team,

I've reviewed the four core templates for our Design Phase: `prd.md`, `user-flows.md`, `wireframes.md`, and `architecture-outline.md`.

**Main Strength:** This is an excellent, interconnected system. The documents are clearly designed to feed into one another, creating a single source of truth for any given experiment. The emphasis on linking between documents (`prd.md` -> `user-flows.md` -> `wireframes.md` -> `architecture-outline.md`) is fantastic and ensures alignment. The structure forces teams to think about the *why* (PRD), the *how* (User Flows), the *what* (Wireframes), and the *can we* (Architecture) in a logical sequence.

**Main Weakness/Gap:** While the templates are well-structured, they are too solution-focused and heavyweight for a truly lean, rapid-validation process. They currently feel more like "Waterfall-lite" than "Lean." The core principles of lean—starting with the riskiest assumption and defining a falsifiable hypothesis—are present but buried. We need to elevate them. The current templates encourage too much documentation and planning upfront, which can lead to analysis paralysis and attachment to a specific solution before it's validated.

Our goal is to move faster and de-risk ideas with minimal effort. The following revisions aim to make these templates lighter, more focused on the underlying assumptions, and more explicitly geared towards validated learning.

---

## 2. Section-by-Section Analysis & Revised Templates

Here is a breakdown of each template with specific feedback and a revised, copy-paste-ready version.

### A. Lean Product Requirements Document (PRD)

This is the most critical document. It sets the foundation for the entire experiment.

* **Strength:** It correctly identifies the need for a hypothesis, success metrics, and stakeholder sign-off. The connection to other documents is clear.
* **Weakness/Gap:** The term "Requirements" itself encourages a feature-list mindset. The "Core Hypothesis" is just one section among many, when it should be the absolute centerpiece. It asks for too much detail on the solution before the problem and assumption are crystal clear.
* **Specific Suggestion:** I'm renaming this to **`Experiment Brief`** to shift the focus from "building features" to "running a test." I'm radically simplifying it to focus almost exclusively on the hypothesis and the learning goal.

---

### **Revised & Improved Template: `01-experiment-brief.md`**

```markdown
# Experiment Brief: [Name of Experiment]

**Owner:** [Product Manager Name]
**Status:** [Draft | In Review | Approved | Running | Concluded]
**Last Updated:** [Date]

---

## 1. The Core Assumption

**What is the single riskiest belief we hold that, if wrong, would cause this entire initiative to fail?**

> *Example: We believe our target users are willing to pay for a standalone version of our reporting feature.*

---

## 2. The Hypothesis

**How will we test this assumption? Frame it as a falsifiable If/Then statement.**

**If we** [build/do X minimal thing],
**Then we expect** [Y user behavior]
**Because** [of Z reason].
**We'll know this is true when we see** [a specific, measurable outcome].

> *Example: **If we** create a simple landing page for a "Pro Reporting" plan and add a "Upgrade" CTA in the app, **Then we expect** users to click the CTA and enter their email on the landing page, **Because** they have repeatedly asked for more advanced reporting. **We'll know this is true when we see** a 5% click-to-email conversion rate from active users within 7 days.*

---

## 3. The Experiment Design (The "Good Enough" Solution)

**What is the absolute minimum we need to build to generate a reliable signal for our hypothesis?**

*   **Key Action/Feature:** [Describe the minimal feature, e.g., "A fake door 'Upgrade' button and a Typeform landing page."]
*   **Target Audience:** [Who will see this? e.g., "All users on the free plan who have created >10 reports."]
*   **Explicitly NOT Building:** [What we are consciously leaving out to maintain speed, e.g., "Actual payment processing, multiple pricing tiers, a feature tour."]

---

## 4. Learning & Next Actions

**What will we do based on the outcome? This forces us to have a plan for all results.**

*   **If Validated (Success):**
    *   **What We Learned:** [e.g., "Users have a strong intent to pay."]
    *   **Next Action:** [e.g., "Greenlight the development of a real billing system and the V1 of the Pro plan."]

*   **If Invalidated (Failure):**
    *   **What We Learned:** [e.g., "Users are curious but not motivated enough to act, or the value prop is unclear."]
    *   **Next Action:** [e.g., "Conduct 5 customer interviews with users who clicked but didn't convert to understand the barrier. Do not build the billing system."]

---
**Connected Documents:**
- `02-user-journey-map.md`
- `03-prototype-spec.md`
- `04-tech-feasibility-check.md`
```

---

### B. User Flows

* **Strength:** The template correctly separates the "happy path" from alternative paths and considers error states. It connects the flow to the hypothesis.
* **Weakness/Gap:** It's a bit too detailed for an initial design phase. The "User State" (how they feel) is speculative and adds cognitive load. The focus should be purely on the behavioral steps required to test the hypothesis.
* **Specific Suggestion:** Rename to **`User Journey Map`** and simplify it to focus on the critical path. Remove subjective fields and merge technical/design needs into a single "Requirements" section.

---

### **Revised & Improved Template: `02-user-journey-map.md`**

```markdown
# User Journey Map: [Name of Experiment]

**Purpose:** To visualize the critical path a user must take to (in)validate our hypothesis from the `01-experiment-brief.md`.

---

## 1. The Critical Path

**This is the shortest sequence of actions that generates the success signal.**

**Entry Point:** [Where/how the user enters the journey. e.g., "Sees a banner on the dashboard."]

1.  **Action:** [User clicks the banner.]
    *   **System Response:** [Redirects to the feature page.]
2.  **Action:** [User reads the value proposition.]
    *   **System Response:** [Page displays features and a single 'Learn More' CTA.]
3.  **Action:** [User clicks 'Learn More'.]
    *   **System Response:** [Shows a 'Coming Soon' modal with an email field.]
4.  **Action:** [User enters their email and clicks 'Submit'.]
    *   **System Response:** [Shows a 'Thank You' confirmation.]

**Success Signal:** The user completes Step 4.

---

## 2. Key Screens & Components

**What UI is absolutely necessary for this journey?**

*   **Screen 1: The Hook** (e.g., Dashboard Banner)
*   **Screen 2: The Pitch** (e.g., Feature Landing Page)
*   **Screen 3: The Ask** (e.g., 'Coming Soon' Modal)
*   **Screen 4: The Confirmation** (e.g., 'Thank You' Message)

---

## 3. Potential Drop-off Points & Risks

**Where could this go wrong?**

| Step # | Risk Description | Mitigation / What We'll Learn |
| :--- | :--- | :--- |
| 1 | User doesn't see or ignores the banner. | We'll learn the hook is ineffective. |
| 3 | User reads the pitch but doesn't click 'Learn More'. | We'll learn the value proposition is weak. |
| 4 | User sees the email form but doesn't submit. | We'll learn the commitment is too high for the perceived value. |

---
**Connected Documents:**
- `01-experiment-brief.md`
- `03-prototype-spec.md`
```

---

### C. Wireframes

* **Strength:** The use of ASCII art is great for enforcing low-fidelity. It correctly links wireframes to the hypothesis.
* **Weakness/Gap:** It's still too much of a "document." It asks for detailed interaction design, mobile considerations, and component lists that are overkill for a quick test. A wireframe's job is to communicate the *what*, not document every detail of it.
* **Specific Suggestion:** Reframe as a **`Prototype Spec`**. This is a lightweight spec, not a formal wireframe document. It should focus on visuals and key interactions only. The goal is to give the engineer just enough information to build the test.

---

### **Revised & Improved Template: `03-prototype-spec.md`**

```markdown
# Prototype Spec: [Name of Experiment]

**Purpose:** To provide a "good enough" visual and interaction guide for the `02-user-journey-map.md`. This is not a pixel-perfect design.

---

## Screen 1: The Hook (e.g., Dashboard Banner)

**Job-to-be-Done:** Grab the user's attention and get them to click.

**Visual:**
```

+------------------------------------------------------+
| ✨ New! Supercharge your reports. [ Learn More ]      |
+------------------------------------------------------+

```
**Key Copy:** "New! Supercharge your reports."
**CTA Text:** "Learn More"

---

## Screen 2: The Pitch (e.g., Feature Landing Page)

**Job-to-be-Done:** Convince the user the feature is valuable enough to take the next step.

**Visual:**
```

+----------------------------------+
|      [Product Screenshot]        |
|                                  |
| # Unlock Advanced Reporting      |
| - Feature 1                      |
| - Feature 2                      |
|                                  |
|       [ Get Early Access ]       |
|                                  |
+----------------------------------+

```
**Key Copy:** "Unlock Advanced Reporting"
**CTA Text:** "Get Early Access"

---

## Screen 3: The Ask (e.g., 'Coming Soon' Modal)

**Job-to-be-Done:** Capture the user's email as a signal of high intent.

**Visual:**
```

+----------------------------------+
| # Coming Soon!                   |
|                                  |
| Enter your email to be notified. |
| [ your.email@example.com   ]     |
|                                  |
|       [ Notify Me ]              |
|                                  |
+----------------------------------+

```
**Key Copy:** "Coming Soon! Enter your email to be notified."
**CTA Text:** "Notify Me"

---
**Connected Documents:**
- `01-experiment-brief.md`
- `02-user-journey-map.md`
- `04-tech-feasibility-check.md`
```

---

### D. Architecture Outline

* **Strength:** It correctly thinks about feasibility, risk, and safe deployment via feature flags.
* **Weakness/Gap:** This document is dangerously heavyweight for a lean experiment. It encourages significant upfront technical planning, which can kill momentum and create waste if the hypothesis is invalidated. An "outline" should not include detailed API endpoints, data models, and phased implementation plans.
* **Specific Suggestion:** Rename to **`Tech Feasibility Check`**. This is not a plan; it's a quick gut check from engineering. It should be a short, simple Q&A format that can be filled out in 15 minutes. Its only job is to answer: "Can we build this test quickly and safely?"

---

### **Revised & Improved Template: `04-tech-feasibility-check.md`**

```markdown
# Tech Feasibility Check: [Name of Experiment]

**Purpose:** A quick (under 15 min) assessment by Engineering to confirm the prototype from `03-prototype-spec.md` is low-effort and safe to build. This is not a detailed architecture plan.

**Engineer:** [Engineer Name]
**Date:** [Date]

---

### 1. The Build: A Quick Q&A

*   **Can we build this using existing components/UI patterns?**
    *   [ ] Yes / [ ] Mostly / [ ] No, this requires significant new UI.
    *   *Notes:*

*   **Are there any new backend services or complex data models required?**
    *   [ ] No, this is frontend-only or uses existing endpoints.
    *   [ ] Yes, and here's the minimal change needed:
    *   *Notes:*

*   **How will we track the success metric from the `01-experiment-brief.md`?**
    *   [ ] With existing analytics events.
    *   [ ] We need to add one new event: `[event_name]`
    *   *Notes:*

---

### 2. The Release: Safety Checklist

*   **Can this be deployed behind a feature flag?**
    *   [ ] Yes / [ ] No

*   **Is there any risk to existing users or system performance?**
    *   [ ] No / [ ] Yes, here's the risk:

*   **If the experiment fails, how quickly can we remove it?**
    *   [ ] Instantly (disable feature flag).
    *   [ ] Requires a new deployment.

---

### 3. The Verdict

*   **Rough Time Estimate (Dev work only):**
    *   [ ] < 1 day
    *   [ ] 1-3 days
    *   [ ] > 3 days *(This might be too big for a simple experiment!)*

*   **Overall Assessment:**
    *   [ ] **Green:** This is a simple, safe experiment. Let's do it.
    *   [ ] **Yellow:** This is doable, but has some complexity we should discuss.
    *   [ ] **Red:** This is much bigger than a simple experiment. We need to simplify the prototype.

---
**Connected Documents:**
- `01-experiment-brief.md`
- `03-prototype-spec.md`
```
