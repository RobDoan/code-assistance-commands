# Development Phase Templates: Systems Critique

## 1. Strategic Assessment

**Long-Term Risks:**
- **Cultural:** If templates become rigid, they risk creating a compliance-driven culture, stifling initiative and slowing pivots.
- **Technical:** Anchoring to initial plans may increase technical debt if trade-offs are not revisited. Confirmation bias may affect experiment results.
- **Adaptability:** Bureaucratic perception may lead engineers to bypass templates, reducing their effectiveness and trust.

**Most Likely Failure Mode:** Ritual compliance and "ticket-pushing" replace rapid learning and conscious trade-offs.

---

## 2. Deep-Dive Analysis

### build-plan.md
- **Tactical Feedback:** Prompts for hypothesis, trade-offs, and risks. May anchor teams to initial plans.
- **Systemic Insight:** If "Conscious Trade-offs" are not revisited, unnoticed technical debt can accumulate. Recommend regular review and updates.

### experiment-debrief.md
- **Tactical Feedback:** Focuses on learning and decision-making. Celebrates both success and failure.
- **Systemic Insight:** Without explicit prompts for negative results and surprises, confirmation bias may occur. Add sections for "What did not work?" and "Unexpected outcomes."

### pre-flight-checklist.md
- **Tactical Feedback:** Empowers release owners to halt launches. Risks becoming a rubber stamp.
- **Systemic Insight:** Checklist should be dynamic. Encourage teams to update based on incidents and learning.

---

## 3. Strategically Revised Template Example

### build-plan.md (Revised)

> **Our Engineering Philosophy:** This document is a compass, not a map. Its purpose is to align on the "why" and the high-level "what." It is not a project plan. We expect the details to change as we learn. We value clear goals and conscious trade-offs over rigid plans.

# Build Plan: [Feature/Experiment Name]

**Owner:** [Tech Lead] | **Status:** In Progress
**Link to PRD:** [URL] | **Link to Epic:** [URL to Jira/Linear]

## 1. Hypothesis & Goal
- **Hypothesis:** We believe that...
- **Success Metric:** ...and we'll know we're right if [Metric] hits [Target].

## 2. Technical Plan & Trade-offs
- **Approach:** [Brief overview of the architecture. What's new? What's changing?]
- **Conscious Trade-offs:** [What corners are we cutting *on purpose* for speed? What is the expected cost?]
- **Key Dependencies:** [List any blocking items from other teams or services.]

## 3. Risks
| Risk | Mitigation |
|------|------------|
| *e.g., This approach creates tech debt in the billing system* | *e.g., We will schedule a refactor in Q4 if the experiment is successful.* |
