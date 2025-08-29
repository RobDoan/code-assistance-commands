# Release Checklist

> **Purpose:** This checklist ensures no critical step is missed during deployment, providing a systematic approach to safe releases and enabling rapid identification of any issues.

## Pre-Deployment Checks

### Code & Build Quality
- [ ] **All CI/CD pipelines green** - No failing tests or build issues
- [ ] **Security scans passed** - No critical vulnerabilities detected
- [ ] **Code review approved** - All required approvals obtained
- [ ] **Release notes prepared** - Clear documentation of changes
- [ ] **Version tagged** - Proper semantic versioning applied

### Environment Preparation
- [ ] **Production environment health verified** - All services running normally
- [ ] **Database migrations tested** - Dry-run completed successfully
- [ ] **Feature flags configured** - Proper targeting and fallback set
- [ ] **Dependencies updated** - All required services/libraries deployed
- [ ] **Capacity verified** - Sufficient resources available for expected load

*Example: Verify payment service has <70% CPU usage before deploying checkout changes*

### Monitoring & Alerting
- [ ] **Dashboards configured** - Key metrics visible and baselined
- [ ] **Alerts configured** - Threshold-based alerts active
- [ ] **On-call rotation confirmed** - Engineer available for release window
- [ ] **Runbooks updated** - Troubleshooting guides current
- [ ] **Communication channels ready** - Slack/Teams channels configured

### Documentation & Communication
- [ ] **Release plan approved** - `release-plan.md` signed off by stakeholders
- [ ] **Deployment guide ready** - `deployment-guide.md` reviewed and accessible
- [ ] **Monitoring plan active** - `monitoring-plan.md` implemented
- [ ] **Rollback procedure verified** - Tested and documented
- [ ] **Stakeholders notified** - Engineering, product, and support teams informed

## Deployment Execution

### Deployment Start
- [ ] **Deployment window initiated** - Start time logged
- [ ] **Initial health check passed** - Pre-deployment baseline confirmed
- [ ] **Communication posted** - Status update shared (#releases channel)
- [ ] **Monitoring dashboard open** - Key metrics visible
- [ ] **Deployment command executed** - Following `deployment-guide.md`

### Progressive Rollout (if applicable)
- [ ] **Stage 1 deployed** - Initial percentage/cohort deployed
- [ ] **Stage 1 health verified** - Metrics within acceptable range
- [ ] **Stage 2 deployed** - Next percentage/cohort deployed  
- [ ] **Stage 2 health verified** - Continued stability confirmed
- [ ] **Full rollout completed** - 100% deployment achieved

*Example: 5% → 25% → 100% with 15-minute health checks between stages*

### Health Validation
- [ ] **Error rates normal** - Within expected thresholds
- [ ] **Latency acceptable** - P95/P99 within SLA bounds
- [ ] **Throughput maintained** - Request volume handling properly
- [ ] **Dependencies stable** - Downstream services unaffected
- [ ] **User experience verified** - Critical user journeys working

## Post-Deployment Verification

### Immediate Verification (T+15 minutes)
- [ ] **Application responding** - Health endpoints returning 200
- [ ] **Critical paths functional** - Key user flows tested
- [ ] **No elevated error rates** - Error metrics below alert thresholds
- [ ] **Performance stable** - Latency within expected bounds
- [ ] **Logs clean** - No unexpected errors or warnings

### Extended Monitoring (T+1 hour)
- [ ] **Metrics trending positively** - No degradation detected
- [ ] **User feedback positive** - No spike in support tickets
- [ ] **Resource utilization normal** - CPU/memory within bounds
- [ ] **Database performance stable** - Query performance unchanged
- [ ] **External dependencies healthy** - Third-party services responding

### Success Confirmation (T+4 hours)
- [ ] **All success criteria met** - As defined in `release-plan.md`
- [ ] **No rollback triggers activated** - All thresholds maintained
- [ ] **Business metrics positive** - Conversion/engagement stable
- [ ] **Team confidence high** - No concerns from engineering/product
- [ ] **Monitoring log updated** - `post-release-monitoring-log.md` current

## Rollback Decision Points

### Automatic Rollback Triggers
- [ ] **Error rate threshold breached** - Immediate rollback initiated
- [ ] **Latency SLA violated** - Performance unacceptable
- [ ] **Health check failures** - Service unavailability detected
- [ ] **Business metric degradation** - Revenue/engagement impacted

### Manual Rollback Considerations
- [ ] **T+15min checkpoint** - Initial stability assessment
- [ ] **T+1hour checkpoint** - Extended stability review
- [ ] **Stakeholder concerns** - Product/business feedback incorporated
- [ ] **Customer feedback** - Support ticket volume/severity reviewed

*Example: Rollback if mobile app crash rate increases by >20% within first 30 minutes*

## Post-Release Actions

### Immediate (T+24 hours)
- [ ] **Final health confirmation** - All metrics stable
- [ ] **Success notification sent** - All stakeholders informed
- [ ] **Monitoring schedule established** - Extended watch period defined
- [ ] **Initial learnings captured** - Quick wins and issues noted

### Follow-up (Within 1 week)
- [ ] **Performance review completed** - Detailed metrics analysis
- [ ] **Retrospective scheduled** - Team learning session planned
- [ ] **Documentation updated** - Runbooks/guides improved
- [ ] **Process improvements identified** - Next release optimizations noted

## Emergency Procedures

### If Rollback Required
- [ ] **Rollback initiated immediately** - Following documented procedure
- [ ] **Incident declared** - Severity level assigned
- [ ] **War room established** - Key personnel assembled
- [ ] **Communication escalated** - Leadership and customers notified
- [ ] **Post-incident review scheduled** - Learning opportunity planned

### If Rollback Fails
- [ ] **Incident commander assigned** - Clear leadership established
- [ ] **Alternative mitigation deployed** - Circuit breakers/feature flags
- [ ] **Engineering resources mobilized** - Additional team members engaged
- [ ] **Customer communication prepared** - Transparency maintained

---

**Checklist Completed By:** [Name]  
**Completion Date/Time:** [YYYY-MM-DD HH:MM]  
**Release Result:** [ ] Success [ ] Rolled Back [ ] Partial Success  
**Notes:** [Any deviations from plan or lessons learned]