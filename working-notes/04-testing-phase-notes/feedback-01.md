# Data Scientist Review of Testing Phase Templates

**To:** Product Team  
**From:** Senior Data Scientist  
**Date:** 2025-08-29  
**Subject:** Critical Review of `04-testing-phase` Templates for Statistical Rigor

---

## 1. Overall Assessment

Bluntly, these templates are a strong start and are significantly better than what most teams use. They establish a solid process for tracking and execution. However, they currently lean more towards "data theater" than statistically sound decision-making. They create the *appearance* of a rigorous process but contain critical loopholes that allow for confirmation bias, p-hacking, and the championing of vanity metrics.

With the proposed revisions, we can close these loopholes and turn these templates into a powerful defense against wishful thinking.

---

## 2. Section-by-Section Analysis

### `test-plan.md`

This is the most critical document. It's where biases are either introduced or eliminated.

*   **Falsifiability: (Major Loophole)**
    *   **Critique:** The template has a "Hypothesis Statement" and a "Decision Framework," but it never forces the team to explicitly state the **null hypothesis** (H₀). This is the default assumption that the change will have *no effect*. Without stating it, the team is psychologically primed to look for confirmation of their idea, not to challenge it. The goal of a test is to *disprove the null hypothesis*, not to prove the alternative.
    *   **Suggestion:** Add a mandatory "Null Hypothesis" section.

*   **Avoiding Vanity Metrics: (Minor Loophole)**
    *   **Critique:** The "Primary Metric" section is good, but it doesn't challenge the *quality* of the metric itself. A team could choose "clicks on the new button" as a primary metric, which is a classic vanity metric that doesn't guarantee business value.
    *   **Suggestion:** Add an explicit question in the "Primary Metric" section: *"How does this metric causally link to long-term business value (e.g., retention, revenue, user satisfaction)?"*

*   **Segmentation and Nuance: (Critical Loophole - P-Hacking Risk)**
    *   **Critique:** The template has an "Audience Segmentation" section for targeting, but it completely lacks a section for pre-defining user segments for *analysis*. This is the single biggest risk for p-hacking. It allows the team to slice and dice the data *after* the test until they find a segment that "won" (e.g., "It didn't work for all users, but it worked for new users from Canada on iPhones!"). This is statistically invalid.
    *   **Suggestion:** Add a mandatory "Pre-defined Analysis Segments" section where the team must state, *before the test begins*, which specific user segments they will analyze and what their hypothesis is for each.

### `user-feedback-log.md`

This template is well-structured but could do more to separate observation from interpretation.

*   **Qualitative Rigor: (Minor Loophole)**
    *   **Critique:** The template captures verbatim feedback, which is excellent. However, it combines observation and interpretation under "Themes" and "Context." This can lead to an observer's bias coloring the raw data.
    *   **Suggestion:** Within each "Individual Feedback Entry," split the fields to enforce a clearer separation:
        1.  **Observed Behavior:** What did the user *do*? (e.g., "Clicked the back button 3 times.")
        2.  **Verbatim Feedback:** What did the user *say*?
        3.  **Observer's Interpretation (Optional):** What do *you think* this means? (This quarantines the bias.)

### `learning-summary.md`

This template is strong but can be improved to force a more honest synthesis.

*   **Objective Synthesis: (Minor Loophole)**
    *   **Critique:** It does a good job of separating quantitative and qualitative data. However, it doesn't force a clear, final distinction between what the data *proves* versus what the team *believes*. The "What We Learned" section can easily become a narrative that fits the desired outcome.
    *   **Suggestion:** Add a section at the very top called **"Objective Findings vs. Subjective Interpretation."** This forces the author to separate "The data shows a 5% lift in clicks" from "We believe this means users love the new design."

### `bug-tracker.md` & `test-case.md`

These are process-oriented and generally well-structured. They support the goal of data integrity. My only note is to commend the inclusion of the "Impact on Test Validity" section in the `bug-tracker.md`. This is crucial and often overlooked. No statistical complaints here.

---

## 3. Revised & Improved Templates

Here are the revised versions of the templates with the recommended changes to enforce statistical rigor.

### Revised `test-plan.md`

```markdown
# Test Plan

**Purpose:** Define the hypothesis, success metrics, and experimental design to enable objective decision-making through controlled testing.

## Test Overview
...

## 1. Hypothesis Framework

### Null Hypothesis (H₀)
> **The change we are introducing will have no statistically significant effect on the primary metric.** Our primary goal is to gather enough evidence to confidently reject this statement.

### Alternative Hypothesis (H₁)
**We believe that:** [specific user segment]  
**Will:** [expected behavior change]  
**Because:** [underlying assumption about user needs]  
**Resulting in:** [measurable business outcome]

*Example: We believe that new users will complete onboarding 25% faster because simplified navigation reduces cognitive load, resulting in a 15% increase in Day-1 retention.*

## 2. Success Metrics

### Primary Metric
- **Metric:** [Specific KPI]
- **How this metric causally links to business value:** [Explain why this isn't a vanity metric. E.g., "Increased activation rate is a leading indicator of long-term retention, which drives LTV."]
- **Current Baseline:** [Current performance]
- **Target (Minimum Detectable Effect):** [e.g., +5%]
- **Statistical Thresholds:**
    - **Confidence Level:** 95% (p-value < 0.05)
    - **Statistical Power:** 80%

### Secondary Metrics
...

### Guardrail Metrics
...

## 3. Experimental Design

**Test Type:** [A/B Test / Multivariate / etc.]  
**Sample Size Required:** [Number based on power analysis for the MDE]  
**Estimated Duration:** [Start Date] to [End Date] ([X days/weeks])  
**Traffic Allocation:** [X% to control, Y% to variant(s)]

### Audience Targeting
- **Include:** [Specific user criteria]
- **Exclude:** [Users to exclude and why]
...

### **Pre-defined Analysis Segments (To Prevent P-Hacking)**
> State any user segments you plan to analyze *before* the test starts. If a segment is not listed here, it cannot be used to declare victory later.

| Segment | Hypothesis for this Segment | Why We Expect a Difference |
|---|---|---|
| New vs. Returning Users | We expect a stronger effect for New Users. | They have not yet formed habits around the old UI. |
| Mobile vs. Desktop Users | No difference expected. | The change is platform-agnostic. |
| [Other pre-defined segment] | [Hypothesis] | [Justification] |


### Variants
...

## 4. Decision Framework (Pre-commitment)

**If the primary metric for the overall population shows a statistically significant improvement ≥ [MDE]:**
- **Action:** SHIP. Begin phased rollout.

**If the primary metric shows no significant change OR the change is less than the MDE:**
- **Action:** ABANDON. The change did not have the desired effect. Analyze secondary metrics and pre-defined segments for learnings, but do not ship.

**If a pre-defined segment shows a significant improvement but the overall population does not:**
- **Action:** ITERATE. Form a new hypothesis specifically for that segment and design a new, targeted experiment. Do not ship to everyone.

**If any guardrail metric shows a statistically significant degradation:**
- **Action:** HALT & REVERT. Immediate rollback and root cause analysis.

...
```

### Revised `user-feedback-log.md`

```markdown
# User Feedback Log
...

## Individual Feedback Entries

### Entry #001
**Date:** [YYYY-MM-DD]  
**User ID:** [Anonymized ID]  
**Variant:** [Control/Variant A/B]  
**User Segment:** [New/Returning/Power User]

**1. Observed Behavior (The "What"):**
> What did the user *do*? Describe their actions without interpretation.
- *Example: "User scrolled to the bottom of the page, then back to the top. Hovered over the 'Save' button for 5 seconds without clicking. Clicked the 'Back' browser button."*

**2. Verbatim Feedback (The "Why" - User's Words):**
> Quote the user directly. Do not paraphrase.
- *Example: "I don't get it. Where am I supposed to click to save my changes?"*

**3. Observer's Interpretation (The "I Think" - Your Analysis):**
> Your interpretation of the behavior and feedback. This section quarantines your bias.
- *Example: "I think the user was confused because the primary CTA button lacks contrast and is placed in an unconventional position, leading to uncertainty."*

**Context:**
- Task Attempted: [What user was trying to do]
- Task Success: [Yes/No/Partial]

**Sentiment:** [Positive/Neutral/Negative]  
**Themes:** [Theme tags]  
**Action Required:** [Yes/No - if yes, describe]

---
```

### Revised `learning-summary.md`

```markdown
# Learning Summary
...

## 1. Executive Summary & Decision

**Hypothesis Status:** ✅ VALIDATED / ❌ INVALIDATED / ⚠️ INCONCLUSIVE
**Recommendation:** [SHIP / ITERATE / ABANDON]
**Business Impact:** [Brief summary of the key result and its financial or strategic implication.]

## 2. Objective Findings vs. Subjective Interpretation

### Objective Findings (What the data says)
> Stick to the facts. Report the quantitative results and direct qualitative observations.
- The primary metric [Metric Name] showed a relative change of [+/-X.X%] ([Confidence Interval]), with a p-value of [0.XX]. This result [is/is not] statistically significant at our 95% confidence threshold.
- Guardrail metric [Metric Name] changed by [+/-Y.Y%], which [did/did not] breach our pre-defined limit.
- [X%] of users in the variant group mentioned [Theme Name] in feedback surveys.

### Subjective Interpretation (What we think it means)
> This is where we build our narrative and connect the dots.
- We believe the improvement in the primary metric is because [our interpretation of user behavior].
- Although the result wasn't statistically significant, the qualitative feedback suggests we are on the right track with [concept]. Our next iteration should focus on [specific change] to amplify the effect.

## 3. Quantitative Results
...

## 4. Qualitative Insights
...

## 5. Decision & Next Steps
...
```
