# User Journey Map: [Name of Experiment]

**Purpose:** To visualize the critical path a user must take to (in)validate our hypothesis from the `01-experiment-brief.md`.

---

## 1. The Critical Path

**This is the shortest sequence of actions that generates the success signal.**

**Entry Point:** [Where/how the user enters the journey. e.g., "Sees a banner on the dashboard."]

1. **Action:** [User clicks the banner.]
   * **System Response:** [Redirects to the feature page.]
2. **Action:** [User reads the value proposition.]
   * **System Response:** [Page displays features and a single 'Learn More' CTA.]
3. **Action:** [User clicks 'Learn More'.]
   * **System Response:** [Shows a 'Coming Soon' modal with an email field.]
4. **Action:** [User enters their email and clicks 'Submit'.]
   * **System Response:** [Shows a 'Thank You' confirmation.]

**Success Signal:** The user completes Step 4.

---

## 2. Key Screens & Components

**What UI is absolutely necessary for this journey?**

* **Screen 1: The Hook** (e.g., Dashboard Banner)
* **Screen 2: The Pitch** (e.g., Feature Landing Page)
* **Screen 3: The Ask** (e.g., 'Coming Soon' Modal)
* **Screen 4: The Confirmation** (e.g., 'Thank You' Message)

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