# Design Phase Templates: Deep Thinking Review (Feedback 3)

## 1. Overall Assessment

Team,

After a deep review of our current template system (`01` through `04`), I can confidently say it is a best-in-class playbook for defining, scoping, and launching lean experiments. The flow from a core assumption to a feasible prototype is clear, fast, and focused. I am making no further changes to these four documents; consider them stable and ready for use.

This deep-thinking review, however, revealed a systemic gap. Our playbook is excellent at starting the Build-Measure-Learn loop, but it lacks a formal process for finishing it. Learning that isn't captured and shared is learning that is lost. We need a dedicated artifact to synthesize results, declare a verdict on our hypothesis, and document our decision.

To close this gap, I am introducing a new, fifth template to our design phase playbook: **`05-experiment-summary.md`**. This document is the critical final step that turns raw data into institutional knowledge.

---

## 2. Analysis of Existing Templates (v2)

* **`01-experiment-brief.md`**: **No Changes.** This is now a sharp tool for defining the "why" and "what" of an experiment.
* **`02-user-journey-map.md`**: **No Changes.** It perfectly maps the critical path and measurement plan.
* **`03-prototype-spec.md`**: **No Changes.** It provides a "good enough" guide for engineering without creating unnecessary overhead.
* **`04-tech-feasibility-check.md`**: **No Changes.** It serves as a fast, effective gate to prevent over-investment.

These templates are working in concert beautifully. The focus of this review is to add the missing piece that completes the system.

---

## 3. Introducing the Missing Link: The Experiment Summary

The purpose of an experiment is not to build a feature; it is to get a validated learning. The `Experiment Summary` is the artifact that banks that learning.

* **Why it's needed:** It forces the team to confront the results honestly, compare them against the original hypothesis, and make a conscious, documented decision. It prevents "zombie projects" that continue indefinitely without a clear verdict.
* **When it's used:** It is created by the Product Owner as soon as the experiment's data collection period is over.
* **Who it's for:** It is for the entire team and for future teams. It becomes a searchable, permanent record of what we've tried, what we've learned, and why we made the decisions we did.

### **New Template: `05-experiment-summary.md`**

```markdown
# Experiment Summary: [Name of Experiment]

**Owner:** [Product Manager Name]
**Status:** [Concluded]
**Date Concluded:** [Date]

**Link to Brief:** [Link to the original `01-experiment-brief.md`]

---

## 1. Executive Summary

**In one sentence, what was the outcome?**

> *Example: The experiment to validate pricing for the "Pro Reporting" feature was successful, exceeding our target conversion rate by 50%.*

> *Example: The experiment to validate demand for a new integration failed, showing that while users were curious, they were not motivated enough to commit.*

---

## 2. Results & Data

### The Hypothesis

*   **Hypothesis:** [Copy the full hypothesis from the `01-experiment-brief.md`]
*   **Success Metric:** [Copy the specific, measurable outcome from the brief]

### The Data

*   **Observed Result:** [State the final, measured number. e.g., "The click-to-email conversion rate was 7.5% over 7 days."]
*   **Quantitative Findings:** [Bulleted list of key metrics and funnel performance. e.g., "- 10,000 users saw the banner (Step 1)", "- 500 users clicked the banner (5% CTR)", "- 75 users submitted their email (15% conversion from pitch page)"]
*   **Qualitative Findings:** [Bulleted list of any user feedback, interview insights, or surprising behaviors observed. e.g., "- Several users commented that they expected to pay immediately.", "- We observed a high drop-off on the pitch page for users on mobile devices."]

---

## 3. Verdict & Learning

### Hypothesis Verdict

**[ ] Validated / [ ] Invalidated / [ ] Inconclusive**

### The Core Learning

**What is the single most important thing we learned about our customers or our solution?**

> *Example: We learned that our most active users not only have a strong intent to pay for advanced reporting, but they perceive the value to be high enough to act immediately.*

> *Example: We learned that while the problem of data export is real, our proposed "integration" solution does not align with our customers' workflow, and they are unwilling to try it.*

---

## 4. The Decision & Next Steps

**Based on the learning, what is the official decision?**

*   **Decision:** [Clearly state the go/no-go decision. e.g., "We will proceed with building a V1 of the Pro Reporting plan.", "We will abandon the integration feature and seek a new solution for the data export problem."]

*   **Next Action:** [What is the immediate next step? Assign an owner.]
    *   [e.g., "Create epics and stories for the V1 Pro Plan." - Owner: @ProductManager]
    *   [e.g., "Schedule 5 new customer interviews to explore alternative solutions for data export." - Owner: @ProductManager]

*   **Justification:** [A brief explanation of why this decision is the right one based on the evidence.]

```
