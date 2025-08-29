# Build Plan: [Feature/Experiment Name]

**Purpose:** This lean plan aligns the team on what we're building, why it matters, and how we'll know if it worked - without bureaucratic overhead.

**Status:** ☐ In Progress ☐ Done ☐ Shipped  
**Owner:** [Tech Lead]  
**Link to PRD:** [Link]  
**Created:** [YYYY-MM-DD]  

---

## 1. The "Why"

### Hypothesis
*What specific assumption are we validating with this build?*

*Example: "We believe busy professionals will use a feedback widget because they want to report issues quickly without leaving their current workflow."*

### Core Goal(s)
*What one or two things must be true for this to be a success?*
- *Example: 15%+ of widget viewers will click to open the form*
- *Example: 80%+ of form openers will complete submission*

### Success Metrics
*How will we measure if our hypothesis is correct?*
- **Primary:** [Specific metric and target] - *Example: Widget click-through rate > 15%*
- **Secondary:** [Supporting metric] - *Example: Form completion rate > 80%*
- **Measurement:** [Tool/method] - *Example: Google Analytics custom events*

### Out of Scope
*What we are explicitly NOT doing this sprint.*
- *Example: Multi-language support*
- *Example: Advanced form validation*
- *Example: Admin dashboard for feedback*

---

## 2. The "How"

### Technical Approach
*A brief overview of the plan. What new services, components, or database changes are needed?*

*Example: "Add a floating feedback button (React component) that opens a modal form. New API endpoint `/api/feedback` stores submissions in existing database. No authentication required - anonymous feedback only."*

### Architecture Changes
*What's different about our system after this build?*
- **Frontend:** *Example: New FeedbackWidget component in shared UI library*  
- **Backend:** *Example: New feedback service with POST /api/feedback endpoint*
- **Database:** *Example: Add feedback table (id, rating, comment, timestamp, user_agent)*
- **Infrastructure:** *Example: No changes - uses existing hosting*

### Key Dependencies
*What do we need from others before we can complete this?*
- [ ] *Example: Final widget design assets from Design team*
- [ ] *Example: Email integration API keys from DevOps*
- [ ] *Example: Legal approval for data collection terms*

### Issue Tracker
*Detailed tasks live in our project management tool, not in this document.*
- **Epic/Initiative:** [Link to Jira/Linear/GitHub Epic]
- **Estimated Effort:** [Story points or days]
- **Sprint:** [Sprint number/name]

---

## 3. The "Gotchas"

### Technical Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| *Widget blocks page performance* | Medium | High | *Load widget asynchronously, measure page speed* |
| *High spam/abuse via anonymous form* | Low | Medium | *Add rate limiting, simple captcha* |
| *Mobile UX issues with floating button* | High | Medium | *Test on actual devices, not just dev tools* |

### Key Assumptions
*What are we assuming that could break our plan?*
- *Users actually want to give feedback (vs. just complain privately)*
- *A simple 1-5 rating + comment is sufficient for actionable feedback*
- *Our current hosting can handle the additional database writes*

---

## 4. Go-Live Plan

### Feature Flag Strategy
- **Flag Name:** `enable_feedback_widget`
- **Initial State:** OFF (0% traffic)
- **Rollout Plan:** 
  1. Internal team (5% traffic) → 
  2. Beta users (20% traffic) → 
  3. All users (100% traffic)
- **Rollback:** Turn flag OFF immediately

### Success Validation
*How will we know within 48 hours if this is working?*
- [ ] Widget appears and functions on target pages
- [ ] Analytics events are firing correctly  
- [ ] No increase in page load time or error rates
- [ ] First feedback submissions are being captured

### Communication
- **Team:** Slack #engineering when going live
- **Stakeholders:** Email product team with go-live date
- **Users:** No announcement - silent launch for testing

---

## Links & Context
- **Original PRD:** [Link]
- **Design Mockups:** [Link]  
- **Technical Spike:** [Link to any research/POC work]
- **Pre-Flight Checklist:** [pre-flight-checklist.md]
- **Experiment Results:** [experiment-debrief.md] *(created after launch)*

---
*Last Updated: [Date] by [Name]*