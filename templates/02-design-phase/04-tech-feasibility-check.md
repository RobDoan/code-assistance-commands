# Tech Feasibility Check: [Name of Experiment]

**Purpose:** A quick (under 15 min) assessment by Engineering to confirm the prototype from `03-prototype-spec.md` is low-effort and safe to build. This is not a detailed architecture plan.

**Engineer:** [Engineer Name]
**Date:** [Date]

---

### 1. The Build: A Quick Q&A

* **Can we build this using existing components/UI patterns?**
  * [ ] Yes / [ ] Mostly / [ ] No, this requires significant new UI.
  * *Notes:*

* **Are there any new backend services or complex data models required?**
  * [ ] No, this is frontend-only or uses existing endpoints.
  * [ ] Yes, and here's the minimal change needed:
  * *Notes:*

* **How will we track the success metric from the `01-experiment-brief.md`?**
  * [ ] With existing analytics events.
  * [ ] We need to add one new event: `[event_name]`
  * *Notes:*

---

### 2. The Release: Safety Checklist

* **Can this be deployed behind a feature flag?**
  * [ ] Yes / [ ] No

* **Does this experiment depend on any other work in progress?**
  * [ ] No / [ ] Yes, it depends on:

* **Is there any risk to existing users or system performance?**
  * [ ] No / [ ] Yes, here's the risk:

* **If the experiment fails, how quickly can we remove it?**
  * [ ] Instantly (disable feature flag).
  * [ ] Requires a new deployment.

---

### 3. The Verdict

* **Rough Time Estimate (Dev work only):**
  * [ ] < 1 day
  * [ ] 1-3 days
  * [ ] > 3 days *(This might be too big for a simple experiment!)*

* **Overall Assessment:**
  * [ ] **Green:** This is a simple, safe experiment. Let's do it.
  * [ ] **Yellow:** This is doable, but has some complexity we should discuss.
  * [ ] **Red:** This is much bigger than a simple experiment. We need to simplify the prototype.

---

**Connected Documents:**
- `01-experiment-brief.md`
- `03-prototype-spec.md`