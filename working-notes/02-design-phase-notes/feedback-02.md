# Design Phase Templates: Feedback Round 2

## 1. Overall Assessment

Team,

This is fantastic progress. The shift from a documentation-heavy process to a lean, experiment-driven one is exactly the direction we need to be heading. Renaming the artifacts to `Experiment Brief`, `User Journey Map`, `Prototype Spec`, and `Tech Feasibility Check` has fundamentally and correctly re-centered our work on learning.

The system is now 90% of the way there. For this second round of feedback, I'm focusing on minor but important refinements. My goal is to make the templates even more precise, forcing a higher degree of clarity around our assumptions and metrics. These changes are about moving from "good" to "great."

---

## 2. Section-by-Section Analysis & Revised Templates (V2)

Here are the next-level refinements for each template.

### A. Experiment Brief

This is already very strong. The proposed change is to add more structure to our "Core Assumption" to help teams better categorize their risks.

*   **Strength:** The focus on a single core assumption and a falsifiable hypothesis is now crystal clear.
*   **Weakness/Gap:** Assumptions aren't all the same. Some are about the problem, some about the solution, and some about the customer. Explicitly identifying the *type* of assumption can improve the quality of the experiment.
*   **Specific Suggestion:** I'm adding a "Type of Assumption" field. This forces the team to diagnose their risk more accurately. Is our biggest risk that we've misunderstood the problem, or that our proposed solution won't work?

---

### **Revised & Improved Template: `01-experiment-brief.md` (v2)**

```markdown
# Experiment Brief: [Name of Experiment]

**Owner:** [Product Manager Name]
**Status:** [Draft | In Review | Approved | Running | Concluded]
**Last Updated:** [Date]

---

## 1. The Core Assumption

**What is the single riskiest belief we hold that, if wrong, would cause this entire initiative to fail?**

> *[State the assumption clearly. e.g., We believe our target users are willing to pay for a standalone version of our reporting feature.]*

**Type of Assumption:** [ ] Problem / [ ] Solution / [ ] Usability / [ ] Technical / [ ] Business Model

---

## 2. The Hypothesis

**How will we test this assumption? Frame it as a falsifiable If/Then statement.**

**If we** [build/do X minimal thing],
**Then we expect** [Y user behavior]
**Because** [of Z reason].
**We'll know this is true when we see** [a specific, measurable outcome].

> *Example: **If we** create a simple landing page for a "Pro Reporting" plan and add an "Upgrade" CTA in the app, **Then we expect** users to click the CTA and enter their email on the landing page, **Because** they have repeatedly asked for more advanced reporting. **We'll know this is true when we see** a 5% click-to-email conversion rate from active users within 7 days.*

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
    *   **What We Learned:** [e.g., "The assumption that users have a strong intent to pay was proven correct."]
    *   **Next Action:** [e.g., "Greenlight the development of a real billing system and the V1 of the Pro plan."]

*   **If Invalidated (Failure):**
    *   **What We Learned:** [e.g., "The assumption that users have a strong intent to pay was proven false; the value prop is not strong enough to warrant action."]
    *   **Next Action:** [e.g., "Conduct 5 customer interviews with users who clicked but didn't convert to understand the barrier. Do not build the billing system."]

---
**Connected Documents:**
- `02-user-journey-map.md`
- `03-prototype-spec.md`
- `04-tech-feasibility-check.md`
```

---

### B. User Journey Map

This template is very effective. The key refinement is to make the measurement plan more explicit.

*   **Strength:** The focus on the critical path and potential drop-off points is excellent for keeping the scope tight.
*   **Weakness/Gap:** While it lists risks, it doesn't explicitly state *how* we will measure the user's progression through the funnel.
*   **Specific Suggestion:** I'm adding a `Measurement Plan` section to explicitly link steps in the journey to the analytics events that will be fired. This ensures that our data and product requirements are perfectly aligned from the start.

---

### **Revised & Improved Template: `02-user-journey-map.md` (v2)**

```markdown
# User Journey Map: [Name of Experiment]

**Purpose:** To visualize the critical path a user must take to (in)validate our hypothesis and to define how we will measure it.

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

## 2. Measurement Plan

**How will we track progress through this journey?**

| Step # | Action | Analytics Event Name |
| :--- | :--- | :--- |
| 1 | Clicks banner | `experiment_hook_clicked` |
| 3 | Clicks 'Learn More' | `experiment_pitch_accepted` |
| 4 | Submits email | `experiment_conversion_completed` |

---

## 3. Potential Drop-off Points & Risks

**Where could this go wrong?**

| Step # | Risk Description | What We'll Learn If Users Drop Off Here |
| :--- | :--- | :--- |
| 1 | User doesn't click the banner. | The hook is ineffective or poorly placed. |
| 3 | User doesn't click 'Learn More'. | The value proposition is weak or unclear. |
| 4 | User doesn't submit their email. | The commitment is too high for the perceived value. |

---
**Connected Documents:**
- `01-experiment-brief.md`
- `03-prototype-spec.md`
```

---

### C. Prototype Spec

This is nearly perfect for its purpose. The only refinement is to create a single, consolidated home for all the copy.

*   **Strength:** The "Job-to-be-Done" framing and low-fidelity ASCII visuals are excellent for maintaining speed and focus.
*   **Weakness/Gap:** The key copy is scattered across different sections. While this works, a centralized copy section ensures consistency and makes it easier for review.
*   **Specific Suggestion:** I'm adding a `Content & Copy` section at the top. This becomes the single source of truth for all strings in the prototype, making it easier to manage and hand off.

---

### **Revised & Improved Template: `03-prototype-spec.md` (v2)**

```markdown
# Prototype Spec: [Name of Experiment]

**Purpose:** To provide a "good enough" visual and interaction guide for the `02-user-journey-map.md`. This is not a pixel-perfect design.

---

## 1. Content & Copy

**This is the single source of truth for all text in the prototype.**

*   **Hook Headline:** "New! Supercharge your reports."
*   **Hook CTA:** "Learn More"
*   **Pitch Headline:** "Unlock Advanced Reporting"
*   **Pitch CTA:** "Get Early Access"
*   **Ask Headline:** "Coming Soon!"
*   **Ask Body:** "Enter your email to be notified."
*   **Ask CTA:** "Notify Me"

---

## 2. Screens

### Screen 1: The Hook (e.g., Dashboard Banner)

**Job-to-be-Done:** Grab the user's attention and get them to click.

**Visual:**
```
+------------------------------------------------------+
| ✨ [Hook Headline]              [ Hook CTA ]         |
+------------------------------------------------------+
```

### Screen 2: The Pitch (e.g., Feature Landing Page)

**Job-to-be-Done:** Convince the user the feature is valuable enough to take the next step.

**Visual:**
```
+----------------------------------+
|      [Product Screenshot]        |
|                                  |
| # [Pitch Headline]               |
| - Feature 1                      |
| - Feature 2                      |
|                                  |
|       [ Pitch CTA ]              |
|                                  |
+----------------------------------+
```

### Screen 3: The Ask (e.g., 'Coming Soon' Modal)

**Job-to-be-Done:** Capture the user's email as a signal of high intent.

**Visual:**
```
+----------------------------------+
| # [Ask Headline]                 |
|                                  |
| [Ask Body]                       |
| [ your.email@example.com   ]     |
|                                  |
|       [ Ask CTA ]                |
|                                  |
+----------------------------------+
```

---
**Connected Documents:**
- `01-experiment-brief.md`
- `02-user-journey-map.md`
- `04-tech-feasibility-check.md`
```

---

### D. Tech Feasibility Check

This template is rock-solid. Just one minor addition to prevent unforeseen blockers.

*   **Strength:** It's fast, simple, and forces a clear "Green/Yellow/Red" decision from engineering.
*   **Weakness/Gap:** It doesn't account for external dependencies on other ongoing work.
*   **Specific Suggestion:** Add one question: `"Does this experiment depend on any other work in progress?"` This can surface hidden blockers early.

---

### **Revised & Improved Template: `04-tech-feasibility-check.md` (v2)**

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

*   **Does this experiment depend on any other work in progress?**
    *   [ ] No / [ ] Yes, it depends on:

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