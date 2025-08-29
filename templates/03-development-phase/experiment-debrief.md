# Experiment Debrief: [Feature/Experiment Name]

**Purpose:** Learn from experiment results to make evidence-based decisions about whether to persevere, pivot, or kill the feature.

**Owner:** [Product Manager]  
**Date:** [YYYY-MM-DD]  
**Experiment Duration:** [X days]  
**Build Plan:** [Link to build-plan.md]

---

## 1. Hypothesis & Goal

### Original Hypothesis
*We believed that...*

*Example: "We believed busy professionals would use a feedback widget because they want to report issues quickly without disrupting their workflow."*

### Success Criteria
*We knew we were right if...*

**Primary Success Metric:** [Metric] reached [Target]  
*Example: Widget click-through rate > 15%*

**Secondary Metrics:**
- [Metric 2]: [Target] - *Example: Form completion rate > 80%*
- [Metric 3]: [Target] - *Example: Average feedback quality score > 3.5/5*

### Test Parameters
- **Traffic Split:** [X% test, Y% control]
- **Sample Size:** [X users in test group]  
- **Statistical Power:** [95% confidence required]

---

## 2. The Results

### The Numbers
| Metric | Target | Actual | Result | Confidence |
|--------|--------|--------|--------| -----------|
| *Widget CTR* | 15% | [X]% | ✅/❌ | 95% |
| *Form Completion* | 80% | [X]% | ✅/❌ | 90% |
| *User Satisfaction* | 3.5/5 | [X]/5 | ✅/❌ | 85% |

### Key Performance Indicators
- **Total Interactions:** [X clicks / X impressions]
- **Feedback Quality:** [X actionable pieces / X total submissions]
- **Technical Performance:** [Page load impact: +Xms / Error rate: X%]

### Unexpected Data Points
*Anything that surprised us or wasn't in our original metrics?*
- *Example: 60% of feedback came from mobile users (expected 30%)*
- *Example: Users mostly reported UI bugs, not feature requests*

---

## 3. Qualitative Insights

### What Users Said
*Direct feedback from users (support tickets, surveys, interviews)*
- *"The widget was easy to find and use"*
- *"Finally, a way to report bugs without opening a new tab!"*
- *"The form was too long - I just wanted to say something was broken"*

### What We Observed  
*Behavioral patterns we noticed in the data*
- *Users mostly clicked widget during error states (404 pages, failed actions)*
- *High abandonment on the "describe the problem" text field*
- *Mobile users had 50% lower completion rates*

### Team Learnings
*What did the engineering/product team learn during this build?*
- *Building the widget was easier than expected (2 days vs 5 day estimate)*
- *Most complexity was in spam prevention, not the core functionality*
- *Our analytics setup made measuring success straightforward*

---

## 4. Decision & Next Steps

### What We Learned About Our Hypothesis
*Was our core assumption right or wrong?*

**Hypothesis Status:** ✅ VALIDATED / 🔁 PARTIALLY VALIDATED / ❌ INVALIDATED

**Key Evidence:**
- *[Primary metric result and what it tells us about user behavior]*
- *[Supporting qualitative evidence that confirms/contradicts our assumption]*
- *[Unexpected insight that changes our understanding]*

### Root Cause Analysis  
*If results were negative - why did users not behave as expected?*
- *Was the problem real? (Do users actually want to give feedback?)*
- *Was our solution good? (Is a widget the right UI pattern?)*  
- *Was our execution good? (Did technical issues affect results?)*

### Final Decision
**✅ PERSEVERE** / **🔁 PIVOT** / **❌ KILL**

**One-Sentence Rationale:**  
*Example: "Users clearly want to give feedback (15% CTR exceeded goal) but our form is too complex (60% abandonment rate)."*

### Immediate Next Steps
Based on the decision above:

**If PERSEVERE:**
- [ ] Plan improvements: *[Specific changes to make based on learnings]*
- [ ] Full rollout timeline: *[When/how to release to 100% of users]*
- [ ] Success metrics for next iteration: *[How we'll measure improvement]*

**If PIVOT:**
- [ ] New hypothesis: *[Updated assumption to test]*  
- [ ] Next experiment: *[What we'll build/test differently]*
- [ ] Timeline: *[When we'll run the new test]*

**If KILL:**
- [ ] Rollback plan: *[How/when we'll remove the feature]*
- [ ] User communication: *[If we need to tell users anything]*
- [ ] Resource reallocation: *[Where the team will focus instead]*

---

## 5. Process Learnings

### What Worked Well
*About our experiment process, tools, or team collaboration*
- *Feature flag rollout was smooth and gave us confidence*
- *Analytics setup was comprehensive and gave clear answers*
- *Team collaboration between eng/product/design was efficient*

### What We'd Do Differently
*Process improvements for next experiment*
- *Should have tested mobile experience more thoroughly*
- *Need better user research before building (assumptions were partly wrong)*
- *Could have shipped MVP faster by skipping advanced spam protection*

### Impact on Product Strategy
*How do these results inform our broader product direction?*
- *Users want more feedback mechanisms → prioritize user research tools*
- *Mobile experience gaps → audit other mobile UI patterns*  
- *High engagement during error states → invest in better error handling*

---

## Appendix

### Statistical Details
- **Sample Size Calculation:** [Link to analysis]
- **A/B Test Results:** [Link to testing platform results]  
- **Raw Data:** [Link to analytics dashboard / data export]

### Supporting Evidence
- **User Feedback Collection:** [Link to support tickets / user interviews]
- **Technical Performance:** [Link to monitoring dashboards]
- **Design/UX Observations:** [Link to user session recordings if available]

---

*Completed by [Owner] on [Date]*
*Reviewed by [Tech Lead] and [Product Lead]*