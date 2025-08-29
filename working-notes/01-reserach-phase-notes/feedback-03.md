# Strategic Review: Research Phase Templates

## Advisor's Overview

You have a strong set of templates that are already better than what 90% of startups use. They show a clear commitment to lean principles. However, they can be made sharper, more integrated, and more resilient to cognitive biases.

My review focuses on transforming them from "forms to be filled" into a cohesive "operating system for validated learning." The key changes are designed to:

1. **Force Hypothesis-Driven Thinking:** Every entry on every document is reframed as a testable assumption, not a fact.
2. **Expose Risk & Bias:** The structure is redesigned to make it impossible for the team to hide from their riskiest assumptions or ignore disconfirming data.
3. **Accelerate Decision-Making:** The templates are streamlined to reduce bureaucratic drag and focus solely on the evidence needed for the next `Pivot, Persevere, or Kill` decision.
4. **Create a Learning Flywheel:** The documents are more explicitly linked, ensuring that a learning from one (e.g., an `Experiment Summary`) automatically updates the others (the `Lean Canvas` and `Hypothesis List`).

This revised system will feel more demanding for the team, but it will dramatically increase your velocity of learning and reduce the risk of building something nobody wants.

---

## Critique and Redesign: `lean-canvas.md`

### 1. Overall Strategic Assessment

The Lean Canvas is the cornerstone of your strategic thinking, but its current format allows it to be used as a static business plan, which is its most dangerous failure mode. It's too easy for an optimistic founder to fill it with hopeful guesses and present it as a fact-based plan. The biggest vulnerability is that **the team can become anchored to the initial, unvalidated numbers and solutions,** creating a "plan to be executed" rather than a "map of risks to be tested."

My redesign forces every single box on the canvas to be treated as a hypothesis and explicitly links it to the evidence (or lack thereof).

### 2. Deep-Dive Analysis

* **Section: The Canvas (One-Page Overview)**
  * **Tactical Feedback:** The standard 9-box grid is present. However, it presents all information with equal visual weight, implying all boxes are equally validated.
  * **Strategic Insight:** This format allows the **Eager Founder** to fill in the "Solution" and "Revenue Streams" boxes with pure speculation, which the **Skeptical Engineer** then sees as a feature list to be built and the **Time-Poor Executive** might mistake for a financial projection. It encourages **Solutioneering** and the **Planning Fallacy**.

* **Section: Riskiest Assumptions to Test First**
  * **Tactical Feedback:** It's excellent that this section exists and is separated. However, this separation allows the team to "park" the risks here while still viewing the main canvas as the "plan."
  * **Strategic Insight:** The risk isn't separate from the canvas; the risk *is* the canvas. By separating them, you dilute the core purpose of the tool. The redesign integrates risk assessment directly into each canvas block.

* **Section: Key Metrics Dashboard**
  * **Tactical Feedback:** Using targets for 3 and 12 months is good, but it frames them as a linear progression.
  * **Strategic Insight:** This encourages thinking of metrics as a project plan. The **Eager Founder** will put in ambitious numbers, creating an **Anchoring Bias** for the whole team. It should be reframed as "What metric are we trying to move *in our next experiment*?"

### 3. Strategically Revised Template: `lean-canvas.md`

```markdown
# Lean Canvas: [Product Name]
**Version:** `[vX.X]`
**Date:** `[YYYY-MM-DD]`
**Status:** `[e.g., Initial Hypotheses, Post-Problem Validation, Post-MVP]`

---

### Our Guiding Principles
> This canvas is not a business plan; it is a map of our assumptions. Its job is to expose the riskiest parts of our idea so we can test them systematically. Each box contains a **hypothesis**, not a fact. Our goal is not to create a perfect plan, but to learn faster than our competition by invalidating the wrong assumptions. Treat every entry with skepticism.

---

## The Hypothesis-Driven Canvas

| 1. Customer Segments & Problem | 2. Unique Value Proposition (UVP) | 3. Solution |
| :--- | :--- | :--- |
| **SEGMENT HYPOTHESIS:**<br>We believe our ideal early adopters are:<br>*- [e.g., Tech freelancers (25-40)]*<br><br>**PROBLEM HYPOTHESIS:**<br>They struggle with:<br>1. *[Top problem]*<br>2. *[Second problem]*<br><br>**EXISTING ALTERNATIVES:**<br>Today, they solve this by:<br>*- [e.g., Using complex spreadsheets]*<br><br>---<br>**EVIDENCE:** `[Link to interviews, surveys, etc.]`<br>**RISKIEST ASSUMPTION:** `[e.g., That this is a top-3 problem for them]` | **UVP HYPOTHESIS:**<br>The single, clear message that will cut through the noise is:<br>**"[e.g., Get paid 2x faster with 5-minute setup]"**<br><br>It's a "must-have" because it delivers:<br>*- [e.g., 10+ hours saved per week]*<br><br>---<br>**EVIDENCE:** `[Link to landing page test results, etc.]`<br>**RISKIEST ASSUMPTION:** `[e.g., That "speed of payment" is the #1 motivator]` | **MVP HYPOTHESIS:**<br>The absolute minimum features to prove our UVP are:<br>1. *[Core feature 1]*<br>2. *[Core feature 2]*<br><br>This is NOT:<br>*- [Feature we are explicitly NOT building yet]*<br><br>---<br>**EVIDENCE:** `[Link to prototype feedback, etc.]`<br>**RISKIEST ASSUMPTION:** `[e.g., That these features can actually deliver the promised UVP]` |
| **4. Channels** | **5. Revenue Streams & Pricing** | **6. Key Metrics** |
| **CHANNEL HYPOTHESIS:**<br>We will reach our first 100 customers through:<br>*- [e.g., Direct outreach to Reddit communities]*<br>*- [e.g., Content marketing on topic X]*<br><br>---<br>**EVIDENCE:** `[Link to pilot channel tests]`<br>**RISKIEST ASSUMPTION:** `[e.g., That our target segment actually hangs out on Reddit]` | **PRICING HYPOTHESIS:**<br>Customers will pay:<br>*- [e.g., $29/month (SaaS)]*<br><br>**REVENUE MODEL HYPOTHESIS:**<br>The primary model will be:<br>*- [e.g., Per-seat subscription]*<br><br>---<br>**EVIDENCE:** `[Link to pricing experiment]`<br>**RISKIEST ASSUMPTION:** `[e.g., That customers are willing to pay at all]` | **THE ONE METRIC THAT MATTERS (Right Now):**<br>*- [e.g., 7-day retention rate]*<br><br>**SUCCESS CRITERIA HYPOTHESIS:**<br>We are succeeding if this metric reaches:<br>*- [e.g., >40% by end of month]*<br><br>---<br>**EVIDENCE:** `[Link to analytics dashboard]`<br>**RISKIEST ASSUMPTION:** `[e.g., That retention is the right proxy for value]` |
| **7. Cost Structure** | **8. Unfair Advantage** | **9. Canvas Evolution Log** |
| **STARTUP COSTS (Pre-PMF):**<br>*- Dev Team: $[X]/mo*<br>*- Burn Rate: $[Y]/mo*<br>*- Runway: [Z] months*<br><br>**SCALE-UP COSTS (Post-PMF):**<br>*- CAC Hypothesis: <$[A]*<br>*- LTV Hypothesis: >$[B]*<br><br>---<br>**RISKIEST ASSUMPTION:** `[e.g., That we can acquire customers for less than $A]` | **ADVANTAGE HYPOTHESIS:**<br>Our real, defensible advantage is:<br>*- [e.g., Proprietary dataset that gets better with each user]*<br><br>This is NOT:<br>*- "Being first"*<br>*- "Better design"*<br><br>---<br>**EVIDENCE:** `[e.g., Patent filed, exclusive partnership signed]`<br>**RISKIEST ASSUMPTION:** `[e.g., That this advantage is actually hard to copy]` | **v1.0 -> v1.1:**<br>*- **Pivot:** From SMBs to Freelancers.<br>- **Learning:** SMBs have a long sales cycle; we need faster feedback loops.<br>- **Evidence:** `[Link to Problem Validation Sprint]`<br><br>**v1.1 -> v1.2:**<br>*- **Persevere:** Pricing model validated.<br>- **Learning:** Users will pay, but want a trial.<br>- **Evidence:** `[Link to Experiment Summary]` |

```

---

## Critique and Redesign: `hypothesis-list.md`

### 1. Overall Strategic Assessment

This is an excellent, comprehensive template. It's the engine room for your learning process. Its strength is its rigor. Its weakness is that its rigor could lead to **bureaucratic drag**. The **Eager Founder** might feel it's too much paperwork to spin up a quick test, potentially leading them to run "off the books" experiments, which defeats the purpose of a central learning repository.

The strategic redesign focuses on maintaining the rigor while adding a "fast lane" for new ideas and simplifying the view to focus on decisions.

### 2. Deep-Dive Analysis

* **Section: Hypothesis Framework & Prioritization**
  * **Tactical Feedback:** The `(Impact × Risk) / Effort` formula is a classic, but can lead to long debates over scoring.
  * **Strategic Insight:** This is where **Analysis Paralysis** can creep in. The goal is to be roughly right, quickly. The formula is a guide, not gospel. The redesign will add a note to this effect.

* **Section: Active Experiments**
  * **Tactical Feedback:** The structure is very detailed, which is good for rigor but can be visually noisy when you're trying to make a quick decision.
  * **Strategic Insight:** The **Time-Poor Executive** needs to see the status and the "so what?" immediately. The current format requires them to read through the whole block. The redesign will hoist the `Verdict` and `Decision` to the top.

* **Section: Learning Library**
  * **Tactical Feedback:** This is the most valuable part of the document for long-term learning. Separating validated, invalidated, and inconclusive is perfect.
  * **Strategic Insight:** This is a powerful guard against institutional amnesia and the **Sunk Cost Fallacy**. It celebrates learning from failure, which is critical for culture. No changes needed here, it's fantastic.

### 3. Strategically Revised Template: `hypothesis-list.md`

```markdown
# The Hypothesis Engine
**Purpose:** The single source of truth for what we believe, what we're testing, and what we've learned. This is the log of our journey to Product-Market Fit.
**Owner:** `[Product Team]`
**Last Updated:** `[YYYY-MM-DD]`

---

### Our Guiding Principles
> This document is our defense against wishful thinking. Its purpose is to accelerate learning by forcing us to be intellectually honest. Speed and decisiveness are paramount. A well-documented failure is more valuable than a poorly-understood success. If a test isn't in here, it didn't happen.

---

## 1. Idea Triage (The "Napkin Sketch" Zone)
*Got a new idea? Drop it here first. No detailed format required. Low friction entry-point. We review this list weekly to promote promising ideas into the backlog.*

- *Idea: What if we used AI to write invoices?*
- *Idea: Could we build a community feature?*
- *Idea: Test a "pay what you want" model for the first 3 months.*

---

## 2. Hypothesis Backlog (Prioritized for Action)
*Prioritized by **Risk & Impact**. What's the most important thing to learn next? Don't over-analyze the score; it's a conversation starter.*
**Priority Score = (Impact × Risk) / Effort**

| Priority | Hypothesis | Impact | Risk | Effort | Score | Decision Maker |
|:---:|:---|:---:|:---:|:---:|:---:|:---|
| 1 | Personalized onboarding increases activation 25% | 5 | 4 | 2 | 10 | PM |
| 2 | Mobile app drives 2x engagement | 4 | 5 | 3 | 6.7 | CEO |
| 3 | *[Hypothesis]* | [1-5] | [1-5] | [1-5] | [Score] | [Owner] |

---

## 3. Active & Recent Experiments
*What we're testing now and what we've just learned. Focus on the DECISION.*

### HYPOTHESIS #X: `[Short, Memorable Title of Test]`
- **Status:** `[🔴 Not Started | 🟡 Testing | ✅ Concluded]`
- **Decision:** `[🚀 Ship It | 🔄 Pivot & Retest | 🛑 Kill & Learn | ⏳ Awaiting Decision]`
- **Key Learning:** `[The single most important insight in one sentence]`
- **Evidence:** `[→ Link to Experiment Summary]`

<details>
<summary>Click to expand details for Hypothesis #X</summary>

**Hypothesis Statement:**
**We believe that** `[specific change/feature]`
**For** `[target user segment]`
**Will achieve** `[expected outcome]`
**We will know this is true when** `[success metric and target]`

**Riskiest Assumption Being Tested:** `[e.g., Users will trust us with their email]`

**Minimum Viable Test:**
- **Method:** `[e.g., Fake door test]`
- **Success Criteria:** Primary: `[Metric > X%]`, Guardrail: `[Metric must not drop below Y]`
- **What We're NOT Testing:** `[e.g., Full OAuth implementation]`

</details>

---
*(Copy and paste the block above for each new hypothesis)*
---

## 4. The Learning Library (Our Proven Truths)

### ✅ Validated Assumptions (What we know is TRUE)
1.  **Assumption:** Users prefer gradual onboarding over upfront configuration.
    -   **Evidence:** Hypothesis #2 showed 50% increase in completion.
    -   **Impact:** Became a core principle of our UX design.

### ❌ Invalidated Assumptions (What we know is FALSE - just as valuable!)
1.  **Assumption:** Advanced features drive initial adoption.
    -   **Evidence:** Hypothesis #1 showed no change in signups.
    -   **Impact:** Saved us 3 months of dev time; we pivoted to focus on simplicity.

### ❓ Inconclusive Tests (What we need to re-test)
1.  **Test:** Pricing sensitivity.
    -   **Issue:** Sample size was too small (n=20).
    -   **Next Action:** Re-run with a landing page test targeting 200+ users.

---

## 5. Team Rituals & Cadence
- **Weekly Hypothesis Review (30 min):** Review active tests, make `Ship/Pivot/Kill` decisions, and select the next test from the backlog.
- **Monthly Learning Review (60 min):** Review the Learning Library. What are the strategic implications of what we've learned? Update the Lean Canvas.

```

---

## Critique and Redesign: `problem-validation-sprint.md`

### 1. Overall Strategic Assessment

This is an outstanding template. It's a powerful antidote to the #1 startup killer: building a solution to a problem nobody has. It correctly forces the team to "fall in love with the problem." Its primary strength is its disciplined, time-boxed structure that culminates in a clear Go/No-Go decision. It is the most effective tool you have for killing bad ideas cheaply.

My revisions are minor but aim to sharpen the focus on the *pain* and *emotion* behind the problem, as these are the true indicators of urgency and willingness to pay.

### 2. Deep-Dive Analysis

* **Section: Problem Validation Criteria**
  * **Tactical Feedback:** The criteria are specific and measurable. Excellent.
  * **Strategic Insight:** This is the core of the document's power. It forces the **Eager Founder** to define failure upfront, which is psychologically difficult but managerially essential. It provides a clear contract for the team.

* **Section: Problem Interview Script**
  * **Tactical Feedback:** A very solid script that focuses on past behavior over future speculation.
  * **Strategic Insight:** This script is a fantastic tool to disarm the **Eager Founder's** instinct to sell. It forces them to listen. For the **Skeptical Engineer**, the question "How do you handle this today?" is gold, as the answer (the workaround) often contains the seeds of the right solution.

* **Section: Evidence Collection**
  * **Tactical Feedback:** The separation of quantitative and qualitative evidence is perfect.
  * **Strategic Insight:** The "Powerful Quotes" section is critical. The **Time-Poor Executive** may not read the whole report, but a single, painful quote can convey the market need more effectively than any chart. It provides the emotional texture needed to truly understand the user.

### 3. Strategically Revised Template: `problem-validation-sprint.md`

```markdown
# Problem Validation Sprint: [Problem Area]
**Sprint Duration:** `[3-5 days]`
**Owner:** `[Name]`
**Date:** `[YYYY-MM-DD]`

---

### Our Guiding Principles
> Our mission in this sprint is to find pain. We are not looking for feature ideas or validation for our solution. We are looking for evidence that a specific problem is so acute that people are already trying (and failing) to solve it. We must be dispassionate detectives, not hopeful salespeople. A "No-Go" decision based on evidence is a huge win.

---

## 1. The Problem Hypothesis
**We believe that** `[User segment]`
**Struggles with** `[the problem]`
**Which causes them to feel** `[the core emotion - e.g., anxious, incompetent, overwhelmed]`
**We will know this is true when we observe** `[a specific, observable behavior - e.g., they use a messy spreadsheet to compensate]`

**Riskiest Assumption:** That this problem is in their top 3 professional/personal pains.

---

## 2. Go/No-Go Criteria (The Kill Switch)
*We define success BEFORE we start. Be brutally honest.*

**✅ GO (Problem Validated) if ALL of the following are met:**
- [ ] **Pain:** >7/10 interviewees describe the problem as "very painful" or "a top frustration."
- [ ] **Behavior:** >5/10 show us a "hacky" workaround they currently use.
- [ ] **Willingness to Act:** >3/10 say they have recently searched for or tried a solution.

**❌ NO-GO (Problem Invalidated) if ANY of the following are true:**
- The problem is consistently described as a "minor annoyance."
- Most users say "I just live with it."
- Existing free/good-enough solutions are frequently mentioned.

---

## 3. Sprint Plan (Max 5 Days)
- **Day 1:** Internal research (forums, reviews, competitor sites).
- **Day 2-3:** Conduct 5-10 "Problem Interviews."
- **Day 4:** Synthesize findings & fill out "Evidence Locker."
- **Day 5:** Hold Go/No-Go decision meeting.

---

## 4. The Problem Interview Script (Listen, Don't Pitch)
1.  **Intro:** "I'm researching how [segment] handles [topic]. I'm not selling anything, I just want to learn from your experience."
2.  **Context:** "Tell me about the last time you dealt with [topic]."
3.  **Pain Probe:** "What's the most frustrating part of that process?"
4.  **Emotional Impact:** "How does that make you feel when that happens?" (Listen for words like "stupid," "anxious," "frustrated").
5.  **Quantify Pain:** "And how much time/money does that cost you?"
6.  **Behavior Probe:** "What have you tried to do to solve this?" (The most important question!).
7.  **Consequence:** "What happens if you do nothing?"
8.  **Magic Wand:** "If you could wave a magic wand and fix it, what would change?"
9.  **Urgency:** "On a scale of 'hair on fire' to 'minor leak,' how urgent is this for you to solve?"

---

## 5. The Evidence Locker
*No opinions, just data and direct quotes.*

| Metric | Target | Actual |
|:---|:---:|:---:|
| % Ranking Problem as "Top Frustration" | >70% | [%] |
| % Showing a Current Workaround | >50% | [%] |
| % Actively Seeking a Solution | >30% | [%] |
| Average "Hair on Fire" Score (1-5) | >3.5 | [Score] |

**Most Damning Quotes (Evidence of Pain):**
- *"I feel like an idiot every time I have to build that report. It takes hours and I know it's wrong." - User A*
- *"[Quote]" - User B*

**Observed Workarounds (Evidence of Motivation):**
- *User C showed me a 15-tab spreadsheet held together with Zapier.*
- *User D pays for three separate tools to do this one job.*

---

## 6. The Verdict

### Decision: ✅ GO / ❌ NO-GO

**Synthesis:** In one sentence, what is the final verdict?
*e.g., "The problem is validated; users feel deep anxiety about it and are actively trying to solve it with inadequate tools."*
OR
*e.g., "The problem is invalidated; while a minor annoyance, no one is motivated enough to change their behavior."*

---

## 7. Next Steps

*   **If ✅ GO:**
    1.  **Action:** Create a "Solution Hypothesis" in the `hypothesis-list.md`.
    2.  **Action:** Update the `lean-canvas.md` with the validated Problem and Customer Segment.
    3.  **Next Sprint:** Solution Prototyping & Testing.
*   **If ❌ NO-GO:**
    1.  **Action:** Add the invalidated problem to the `hypothesis-list.md` "Learning Library."
    2.  **Action:** Hold a 1-hour "What Did We Learn?" retro.
    3.  **Next Sprint:** Select the next problem from the `opportunity-landscape.md` and start a new validation sprint.

```

---

## Critique and Redesign: `opportunity-landscape.md`

### 1. Overall Strategic Assessment

This document serves a critical purpose: pointing the ship in the right direction before you start rowing. It's your strategic radar. The current template is good, focusing on action and avoiding the "100-page market report" trap. However, it could be more effective at forcing a single, cohesive **strategic thesis**—a strong opinion about how to win. Right now, it's a collection of opportunities, but it doesn't force the team to connect them into a coherent strategy.

The redesign reframes this as a "Strategy Sprint" artifact that culminates in a clear, opinionated "Thesis" that guides all subsequent actions.

### 2. Deep-Dive Analysis

* **Section: Market Opportunities & Unmet Needs**
  * **Tactical Feedback:** Good for brainstorming, but can lead to a scattered list of unrelated ideas.
  * **Strategic Insight:** The **Eager Founder** loves this section and might generate 20 ideas, leading to a lack of focus. It needs a forcing function to converge these opportunities into a strategic direction.

* **Section: Competitor Teardown**
  * **Tactical Feedback:** Focusing on "Exploitable Weaknesses" is smart.
  * **Strategic Insight:** This is a great way to avoid the **Feature Parity Trap**. It frames competitors not as a list of features to copy, but as a set of assumptions to attack. The **Skeptical Engineer** can use this to define what *not* to build.

* **Section: Actionable Hypotheses**
  * **Tactical Feedback:** Excellent that it translates insights directly into testable hypotheses.
  * **Strategic Insight:** This is the bridge from abstract strategy to concrete action. It connects the "why" (the opportunity) to the "what" (the test), which is crucial for team alignment.

### 3. Strategically Revised Template: `opportunity-landscape.md`

```markdown
# Strategy Sprint: [Area of Focus]
**Purpose:** To form an opinionated strategy on where to play and how to win. This is a 3-day exercise, not a 3-month research project. The output is a strategic thesis and a set of initial problem hypotheses to validate.
**Last Updated:** `[YYYY-MM-DD]`

---

### Our Guiding Principles
> Good strategy is about what you choose *not* to do. Our goal here is to develop a strong, falsifiable point of view on the market. We are looking for an unfair advantage, an underserved niche, and a competitor's weakness we can exploit. A scattered list of ideas is a failed outcome; a single, focused strategic thesis is a win.

---

## 1. The Strategic Thesis
*Based on the research below, this is our core belief about how we will win. This should be a strong, opinionated statement.*

**We believe we can win by** `[e.g., providing a dead-simple, mobile-first tool]`
**For** `[an underserved niche, e.g., creative agencies]`
**Who are currently stuck with** `[an over-served/unhappy incumbent, e.g., complex enterprise software]`
**Because we have an unfair advantage in** `[e.g., our team's deep design expertise and network]`

---

## 2. Market Judo: Finding Leverage
*Where are the cracks in the market we can exploit?*

- **Market Shift:** `[e.g., The rise of asynchronous work]`
- **Customer Complaint:** `[e.g., Users of Competitor X are furious about the new UI]`
- **Technology Inflection:** `[e.g., New APIs from Stripe enable embedded payments easily]`

---

## 3. Competitor Analysis (Attack Vectors)
*Focus on their strategic weaknesses, not their feature list.*

### **Competitor A: `[The 800lb Gorilla]`**
-   **Their Strategy Relies On:** `[e.g., Long-term enterprise contracts and complex onboarding]`
-   **Our Attack Vector:** `[e.g., Attack from below with a product-led, self-serve model they can't replicate without cannibalizing their sales team]`

### **Competitor B: `[The Scrappy Startup]`**
-   **Their Strategy Relies On:** `[e.g., A freemium model that is struggling to convert]`
-   **Our Attack Vector:** `[e.g., Offer a more compelling free tier that solves one job perfectly, stealing their user base before they can monetize it]`

---

## 4. Prioritized Problems to Validate
*Based on our thesis, these are the first problems we will validate with a `Problem Validation Sprint`.*

1.  **Problem Hypothesis:** `[e.g., Creative agencies struggle to get timely feedback from clients using email and Slack]`
    -   **Why this first?** It directly attacks Competitor A's weakness (clumsy collaboration) and aligns with our thesis of a simple, focused tool.
    -   **Next Step:** Launch `Problem Validation Sprint` for this.

2.  **Problem Hypothesis:** `[e.g., Freelancers lose 10% of their income due to forgotten invoices]`
    -   **Why this second?** Aligns with our thesis, but we believe the agency problem is more acute and has a higher willingness to pay.

---

## 5. What We Are Explicitly NOT Doing (Strategic Focus)
*A strategy is defined by what it excludes.*
- **We will NOT:** `[e.g., Build a full project management suite]`
- **We will NOT:** `[e.g., Target enterprise customers for the first 18 months]`
- **We will NOT:** `[e.g., Compete on price]`

---

## 6. Evolution Log
*Track how our strategic understanding evolves.*

| Date | What We Learned | Impact on Thesis |
|:---|:---|:---|
| `[Date]` | Initial thesis formed. | - |
| `[Date]` | Problem #1 was invalidated. Users don't see feedback as a major pain point. | **PIVOT:** Our thesis was wrong. We are now focusing on the billing problem for freelancers. |

```

---

## Critique and Redesign: `experiment-summary.md`

### 1. Overall Strategic Assessment

This is a world-class template. It's the perfect communication tool to close the learning loop. It balances the need for a quick, executive-level summary with the depth required for full transparency. It masterfully forces intellectual honesty by including guardrail metrics and a clear verdict. This document is the drumbeat that keeps your entire product development process moving at pace.

My revisions are minimal and focused on making it even more potent by adding the cost of the experiment and a reflection on the longevity of the learning.

### 2. Deep-Dive Analysis

* **Section: Executive Summary (60-Second Read)**
  * **Tactical Feedback:** The table format is brilliant. It's scannable and forces conciseness.
  * **Strategic Insight:** This is the perfect tool for the **Time-Poor Executive**. It respects their time while giving them the critical information. For the **Eager Founder**, it prevents them from burying bad news in a long report.

* **Section: Decision & Next Actions**
  * **Tactical Feedback:** Clear, action-oriented, and includes crucial housekeeping steps like updating other documents.
  * **Strategic Insight:** This section ensures that learning is immediately translated into action, preventing insights from sitting on a shelf. It closes the loop back to the `hypothesis-list.md` and `lean-canvas.md`, creating a true system.

* **Section: Most Important Learning**
  * **Tactical Feedback:** Framing this as a quote is a powerful way to make the learning memorable.
  * **Strategic Insight:** This is the narrative core of the document. It's the "why" behind the data. It helps the **Skeptical Engineer** understand the user impact of the numbers they see in the metrics table.

### 3. Strategically Revised Template: `experiment-summary.md`

```markdown
# Experiment Summary: [Experiment Name]
**Hypothesis Link:** `[→ Hypothesis #X]`
**Date Concluded:** `[YYYY-MM-DD]`

---

## 📊 Executive Summary (The 60-Second Debrief)

| | |
|:---|:---|
| **Hypothesis** | *We believed that [brief description of hypothesis]* |
| **Verdict** | ✅ **Validated** / ❌ **Invalidated** / 🔄 **Inconclusive** |
| **Key Insight** | *[The single, most surprising and important thing we learned, in one sentence]* |
| **Decision** | 🚀 **Ship & Scale** / 🔄 **Iterate & Retest** / 🛑 **Kill & Learn** |
| **Next Action** | *[The very next thing we will do, e.g., "Launch follow-up test on user onboarding"]* |
| **Cost of Learning** | *[e.g., 3 days, $50 in ad spend]* |

---

## The Story Behind the Numbers

### What We Believed vs. What We Now Know
> **We believed...** *[The original assumption, e.g., "that reducing signup friction was the most important factor for growth."]*
> **But we discovered...** *[The new, more nuanced truth, e.g., "that users who face a little friction are more committed and retain better. Our job isn't to eliminate friction, but to justify it with immediate value."]*

This learning has a **half-life** of `[e.g., ~6 months]`, after which we should consider re-testing this assumption as the market evolves.

---

## Decision & Justification

### The Verdict: `[Repeat Verdict, e.g., ✅ VALIDATED]`

**What the data says:**
- **Primary Metric:** `[e.g., Signup Completion]` increased by `[X%]` (Target was `Y%`).
- **Guardrail Metric:** `[e.g., 7-Day Retention]` decreased by `[A%]` (Threshold was `B%`).

**Net Assessment:** `[e.g., The gain in signups outweighs the small retention dip, which we believe we can fix with a follow-up experiment.]`

### Immediate Actions
1.  **Decision:** `[e.g., Ship the winning variant to 100% of users.]`
2.  **Housekeeping:** Update `hypothesis-list.md` with verdict and learning for Hypothesis #X.
3.  **Housekeeping:** Update `lean-canvas.md` with the new, validated learning.
4.  **Next Test:** Add `[New Hypothesis Y]` to the `hypothesis-list.md` backlog.

---

## Appendix: The Data

<details>
<summary>Click for Detailed Metrics & Analysis</summary>

| Metric | Control | Variant | Change | Confidence |
|:---|:---:|:---:|:---:|:---:|
| **[Primary Metric]** | X% | Y% | +Z% | 99% |
| **[Guardrail Metric]** | A% | B% | -C% | 90% |

**Qualitative Insights:**
- *"I finally signed up because I could try it without my credit card." - User #123*
- *"I signed up but then got lost and didn't know what to do." - User #456*

**What We'd Do Differently Next Time:**
- `[e.g., We would add a third variant to test a different onboarding flow simultaneously.]`

**Raw Data Links:**
- [Analytics Dashboard](#)
- [User Interview Notes](#)

</details>
```
