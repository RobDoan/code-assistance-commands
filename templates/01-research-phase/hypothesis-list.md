# Hypothesis List

## Document Overview

**Purpose:** A living document to track all assumptions, experiments, and learnings. This is the engine of our Build-Measure-Learn loop.  
**Last Updated:** `[YYYY-MM-DD]`  
**Owner:** `[Product Manager/Team Name]`  
**Review Cadence:** Weekly *(Lean teams review weekly, adjust if needed)*

> ⚠️ **Remember:** The goal is to test our riskiest assumptions first. Focus on learning, not being right.

---

## Hypothesis Framework

### Standard Format
*Every hypothesis must follow this structure:*

**We believe that** `[specific change/feature]`  
**For** `[target user segment]`  
**Will achieve** `[expected outcome]`  
**We will know this is true when** `[success metric and target]`

### Prioritization Formula
**Priority Score = (Impact × Risk) / Effort**
- **Impact:** 1-5 (5 = transforms the business)
- **Risk:** 1-5 (5 = we're completely guessing)
- **Effort:** 1-5 (5 = months of work)

---

## Active Experiments

### Experiment #1: `[Short Title]`
**Status:** 🟡 Testing  
**Priority Score:** `[Score]` *(Impact: X, Risk: Y, Effort: Z)*  
**Riskiest Assumption:** *Example: Users will pay for this feature at all*  
**Test Dates:** `[Start]` → `[End]` *(Keep it short!)*

#### Hypothesis Statement
**We believe that** *Example: Adding one-click social login*  
**For** *Example: new users during signup*  
**Will achieve** *Example: reduced friction and increased conversion*  
**We will know this is true when** *Example: signup conversion increases from 45% to 60%*

#### Minimum Viable Test
**Method:** *Example: Fake door test - Add button, measure clicks*  
**Success Criteria:**
| Metric | Current | Success Threshold |
|--------|---------|------------------|
| *Primary: Signup conversion* | *45%* | *>60%* |
| *Guardrail: 7-day retention* | *35%* | *≥35% (don't break this!)* |

**What We're NOT Testing Yet:** *Example: Full OAuth implementation - just measuring intent first*

#### Results & Decision
*Fill this out as soon as test completes:*
- **Assumption Verdict:** ⏳ Pending / ✅ Validated / ❌ Invalidated / ❓ Inconclusive
- **Key Learning:** *What was the most surprising/important thing we learned?*
- **Decision:** 🚀 Ship It / 🔄 Pivot / 🛑 Kill It
- **Next Action:** *Example: Move to Hypothesis #4 to test pricing sensitivity*

---

### Experiment #2: `[Short Title]`
**Status:** 🔴 Not Started  
**Priority Score:** `[Score]` *(Impact: X, Risk: Y, Effort: Z)*  
**Riskiest Assumption:** *[What we're most uncertain about]*  
**Planned Dates:** `[Start]` → `[End]`

#### Hypothesis Statement
**We believe that** *[specific change]*  
**For** *[target users]*  
**Will achieve** *[expected outcome]*  
**We will know this is true when** *[success criteria]*

#### Minimum Viable Test
**Method:** *[Simplest way to test]*  
**Success Criteria:**
| Metric | Current | Success Threshold |
|--------|---------|------------------|
| *Primary:* | *[Current]* | *[Must exceed]* |

**What We're NOT Testing Yet:** *[Scope boundaries]*

---

## Learning Library

### ✅ Validated Assumptions
*What we've proven to be true:*

1. **Assumption:** *Example: Users prefer gradual onboarding over upfront configuration*
   - **Evidence:** *Hypothesis #2 showed 50% increase in completion with progressive disclosure*
   - **Confidence:** High (tested with 500+ users)
   - **Implementation:** Shipped in v2.1

2. **Assumption:** *[What we proved true]*
   - **Evidence:** *[How we proved it]*
   - **Confidence:** High / Medium
   - **Implementation:** Shipped / Planned / Building

### ❌ Invalidated Assumptions  
*What we've proven to be false (equally valuable!):*

1. **Assumption:** *Example: Advanced features drive initial adoption*
   - **Evidence:** *Hypothesis #1 showed no change in signups despite adding 5 power features*
   - **The Pivot:** We now believe simplicity drives adoption → See Hypothesis #4
   - **Saved Us:** 3 months of unnecessary feature development

2. **Assumption:** *[What we proved false]*
   - **Evidence:** *[How we disproved it]*
   - **The Pivot:** *[New direction based on learning]*
   - **Saved Us:** *[Time/resources saved by learning this early]*

### ❓ Inconclusive Tests
*Tests that didn't give clear answers (and what we'll do differently):*

1. **Test:** *Example: Pricing sensitivity test*
   - **Issue:** Sample size too small (n=20)
   - **Next Attempt:** Re-run with 200+ users using landing page test

---

## Hypothesis Backlog

*Prioritized by Impact × Risk / Effort. What's the riskiest thing we need to learn next?*

### 🔥 Next Up (Start this week)
| Priority | Hypothesis | Impact | Risk | Effort | Score | Why Now? |
|----------|------------|--------|------|--------|-------|----------|
| 1 | *Personalized onboarding increases activation 25%* | 5 | 4 | 2 | 10 | *40% drop-off in onboarding* |
| 2 | *Mobile app drives 2x engagement* | 4 | 5 | 3 | 6.7 | *60% try to use mobile browser* |
| 3 | *[Hypothesis]* | [1-5] | [1-5] | [1-5] | [Score] | *[Urgent reason]* |

### 📋 On Deck (Next 2-4 weeks)
1. **Hypothesis:** *Example: Freemium tier increases paid conversions*
   - **Why Wait:** Need to validate core value prop first
   - **Dependency:** Complete Hypothesis #1 first

### 🗄️ Icebox (Interesting but not urgent)
- *AI-powered features* - Wait until core product is validated
- *International expansion* - Focus on local market first
- *Enterprise features* - Not our initial target

---

## Quick Test Recipes

*Copy these templates for common test types:*

### 🚪 Fake Door Test
```
1. Add feature button/link to product
2. Track clicks for 1 week
3. Show "Coming Soon" message
4. Success = >10% click rate
```

### 📄 Landing Page Test
```
1. Create landing page with value prop
2. Drive 100+ visitors via ads/email
3. Measure email signups
4. Success = >15% conversion
```

### 🎭 Wizard of Oz Test
```
1. Promise automated solution
2. Do it manually behind scenes
3. Measure satisfaction & retention
4. Success = Users can't tell it's manual
```

### 💬 Customer Interview Sprint
```
1. Interview 5-10 target users
2. Ask about problem, not solution
3. Look for emotional responses
4. Success = 7/10 confirm problem is painful
```

---

## Monthly Metrics Review

*Track hypothesis success rate to improve our prediction abilities:*

| Month | Tests Run | Validated | Invalidated | Inconclusive | Success Rate | Avg Test Duration |
|-------|-----------|-----------|-------------|--------------|--------------|-------------------|
| *[Month]* | *[#]* | *[#]* | *[#]* | *[#]* | *[%]* | *[Days]* |

**Target:** 30-40% validation rate *(Too high = not taking enough risks, too low = poor assumptions)*

---

## Team Learning Rituals

### Weekly Hypothesis Review (Every Friday, 30 min)
- Review active experiments
- Make go/no-go decisions  
- Prioritize next week's tests
- Share surprising learnings

### Monthly Pivot-or-Persevere (First Monday, 2 hours)
- Review all validated/invalidated assumptions
- Update product strategy based on learnings
- Adjust hypothesis backlog priorities
- Celebrate failures (we learned something!)

---

*Document Version: 2.0 - Lean-focused*
*Next Review: [Every Friday]*
*Remember: If you're not embarrassed by your first test, you waited too long!*