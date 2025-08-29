# Pre-Flight Checklist: [Feature/Experiment Name]

**Purpose:** Final safety check before launch - assumes all automated CI/CD checks have passed and focuses only on critical, non-automatable steps.

**Release Owner:** [Engineer Name]  
**Release Date:** [YYYY-MM-DD]  
**Build Plan:** [Link to build-plan.md]  

---

## Prerequisites
*This checklist assumes the following automated checks have PASSED:*
- ✅ All unit tests pass
- ✅ All integration tests pass  
- ✅ Code review completed and approved
- ✅ Security scanning completed (no critical issues)
- ✅ Performance tests pass (no degradation)

---

## 1. Safety & Measurement

### Feature Control
- [ ] **Feature Flag Confirmed**  
  - Flag name: `[flag_name]` 
  - Current state: OFF (0% traffic)
  - Can be toggled without deployment: YES
  - Rollback plan: Turn flag OFF (any data cleanup needed?)

### Monitoring & Analytics  
- [ ] **Key Metrics Firing**
  - Primary metric `[metric_name]` tested in staging: ✅
  - Analytics events `[event_1]`, `[event_2]` working: ✅
  - Dashboard link: [URL]

- [ ] **Error Monitoring Ready**  
  - New service/endpoints added to error tracking: ✅
  - Alert thresholds configured: ✅
  - On-call engineer aware: ✅

### Performance Impact
- [ ] **No Performance Degradation**
  - Page load time impact measured: < [X]ms acceptable
  - Database query performance tested: No new slow queries
  - CDN/cache configuration updated (if needed): ✅

---

## 2. Communication

### Team Coordination
- [ ] **Engineering Team Notified**
  - Release window communicated in #engineering
  - Point person for issues identified: [Name]
  - Rollback procedure reviewed with team

- [ ] **Cross-functional Alignment**  
  - Product team knows experiment is launching: [PM Name] ✅
  - Support team briefed on what users might see: [Support Lead] ✅
  - Marketing team aware (if user-facing): [Marketing Lead] ✅

### User Communication (if applicable)
- [ ] **User-facing Changes**
  - Help documentation updated: ✅ / N/A
  - Terms/privacy policy updated: ✅ / N/A  
  - Customer success team prepared: ✅ / N/A

---

## 3. Rollback Plan

### Immediate Rollback Triggers
*Automatically rollback if ANY of these occur:*
- [ ] Error rate increases >50% from baseline
- [ ] Page load time increases >100% from baseline  
- [ ] Primary user flow broken (login, checkout, etc.)
- [ ] Database performance degrades significantly

### Rollback Procedure
1. **Immediate:** Turn OFF feature flag `[flag_name]`
2. **Verify:** Confirm issue is resolved within 5 minutes
3. **Communicate:** Post in #engineering with status
4. **Document:** Log the issue for post-mortem

### Post-Rollback Actions  
- [ ] Investigate root cause
- [ ] Update build plan with learnings
- [ ] Plan fix and re-launch timeline

---

## 4. Success Criteria (First 24 Hours)

### Technical Health
- [ ] No increase in error rates
- [ ] Response times remain within SLA
- [ ] No user-reported critical bugs
- [ ] Database performance stable

### Experiment Validation  
- [ ] Feature flag can be toggled successfully
- [ ] Analytics data is being collected correctly
- [ ] Primary metric shows expected user behavior
- [ ] No unexpected user behavior patterns

---

## Final GO / NO-GO Decision

### Checklist Complete
- [ ] All safety checks above completed
- [ ] Team is prepared for launch and monitoring
- [ ] Rollback plan tested and ready
- [ ] Communication completed

### Decision  
- [ ] **GO** - Ready to launch
- [ ] **NO-GO** - Issues identified, launch postponed

**Final Decision Made By:** [Release Owner]  
**Decision Time:** [YYYY-MM-DD HH:MM]  
**Launch Time:** [YYYY-MM-DD HH:MM]  

---

## 5. Post-Launch (First Hour)

### Immediate Monitoring
- [ ] **T+15 minutes:** Check error rates and performance
- [ ] **T+30 minutes:** Verify analytics events flowing
- [ ] **T+60 minutes:** Confirm feature works as expected

### Status Updates
- [ ] **T+15 minutes:** Quick status to #engineering
- [ ] **T+60 minutes:** Full status to product team
- [ ] **T+24 hours:** Initial results summary

---

## Links
- **Build Plan:** [build-plan.md]
- **Monitoring Dashboard:** [URL]
- **Feature Flag Control:** [URL]  
- **Experiment Results:** [experiment-debrief.md] *(to be created after launch)*

---
*Completed: [Date] by [Release Owner]*