# Experiment Summary: `[Experiment Name]`

**Owner:** `[Name]`  
**Date Completed:** `[YYYY-MM-DD]`  
**Hypothesis Link:** `[→ Hypothesis #X in hypothesis-list.md]`

---

## 📊 Executive Summary (60-Second Read)

| | |
|---|---|
| **What We Tested** | *We believed removing the payment wall would increase signups by 50%* |
| **Verdict** | ✅ **Partially Validated** |
| **Key Insight** | *Signups increased 73% (wow!), but 7-day retention dropped 11%. Traded quantity for quality.* |
| **Decision** | 🚀 **Ship & Iterate** - Keep the change but fix retention immediately |
| **Next Experiment** | *Test 3-step onboarding checklist to restore retention* `[→ New Hypothesis #Y]` |
| **Time to Decision** | *5 days from start to decision* |

---

## Decision & Next Actions

### The Verdict: ✅ PARTIALLY VALIDATED

**What we got right:** Removing payment barrier dramatically increased signups (+73%)  
**What surprised us:** Quality of signups decreased (retention -11%)  
**Net assessment:** Worth shipping but needs immediate follow-up

### Immediate Actions (Do Today)
1. [x] Ship winning variant to production
2. [x] Update `hypothesis-list.md` with verdict for Hypothesis #X
3. [x] Add retention fix hypothesis #Y to backlog
4. [x] Update `lean-canvas.md` assumptions about user behavior
5. [ ] Schedule team debrief (15 min)

### Next Sprint
- Launch retention improvement experiment (Hypothesis #Y)
- Interview 5 churned users from this test

---

## Key Metrics (For Those Who Want Details)

| Metric | Control | Variant | Change | Statistical Confidence |
|--------|---------|---------|--------|------------------------|
| **Signup Completion** | 45% | 78% | **+73%** | 99% ✅ |
| **Time to Signup** | 180s | 95s | -47% | 95% ✅ |
| **7-Day Retention** | 35% | 31% | **-11%** | 90% ⚠️ |

**Success Criteria Results:**
- ✅ Primary goal (>60% signup): EXCEEDED at 78%
- ⚠️ Guardrail (maintain 35% retention): FAILED at 31%

---

## Most Important Learning

> 💡 **"Users who skip payment are 3x more likely to explore features but 2x less likely to stick around. They're browsers, not buyers. We need to convert browsers into buyers within the first session."**

This changes our entire onboarding strategy from "reduce friction" to "demonstrate value fast."

---

## Appendix: Additional Details

<details>
<summary>Click for Full Analysis</summary>

### Test Design
- **Method:** A/B test, 50/50 split
- **Sample:** 1,000 users (500 per variant)
- **Duration:** 5 days (reached significance)

### User Feedback Highlights
- *"Finally, a product that lets me try before asking for my card"* - User #132
- *"I signed up just to explore, wasn't serious at first"* - User #89
- 40% of no-payment users added payment voluntarily when hitting premium features

### What Worked Well
✅ Clean A/B test setup reached significance quickly  
✅ Guardrail metrics caught the retention issue  
✅ Decision made within 1 week as planned

### What We'd Do Differently
🔄 Include qualitative interviews during the test  
🔄 Track engagement metrics beyond just retention  
🔄 Test multiple variants (delayed payment, limited free tier)

### Raw Data Links
- [Analytics Dashboard](#)
- [User Interview Notes](#)
- [Statistical Analysis](#)

</details>

---

*"The only way to win is to learn faster than anyone else." - Eric Ries*

*Template Version: 2.1 - Streamlined for rapid decision-making*