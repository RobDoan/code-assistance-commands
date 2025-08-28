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

> *Example: **If we** create a simple landing page for a "Pro Reporting" plan and add a "Upgrade" CTA in the app, **Then we expect** users to click the CTA and enter their email on the landing page, **Because** they have repeatedly asked for more advanced reporting. **We'll know this is true when we see** a 5% click-to-email conversion rate from active users within 7 days.*

---

## 3. The Experiment Design (The "Good Enough" Solution)

**What is the absolute minimum we need to build to generate a reliable signal for our hypothesis?**

* **Key Action/Feature:** [Describe the minimal feature, e.g., "A fake door 'Upgrade' button and a Typeform landing page."]
* **Target Audience:** [Who will see this? e.g., "All users on the free plan who have created >10 reports."]
* **Explicitly NOT Building:** [What we are consciously leaving out to maintain speed, e.g., "Actual payment processing, multiple pricing tiers, a feature tour."]

---

## 4. Learning & Next Actions

**What will we do based on the outcome? This forces us to have a plan for all results.**

* **If Validated (Success):**
  * **What We Learned:** [e.g., "The assumption that users have a strong intent to pay was proven correct."]
  * **Next Action:** [e.g., "Greenlight the development of a real billing system and the V1 of the Pro plan."]

* **If Invalidated (Failure):**
  * **What We Learned:** [e.g., "The assumption that users have a strong intent to pay was proven false; the value prop is not strong enough to warrant action."]
  * **Next Action:** [e.g., "Conduct 5 customer interviews with users who clicked but didn't convert to understand the barrier. Do not build the billing system."]

---

**Connected Documents:**
- `02-user-journey-map.md`
- `03-prototype-spec.md`
- `04-tech-feasibility-check.md`