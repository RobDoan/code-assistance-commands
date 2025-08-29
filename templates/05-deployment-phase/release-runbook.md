# Release Runbook: [Service Name] - [Version/Build ID]

**This is the single source of truth for this deployment. No other documents are needed.**

## 1. Overview

| Item | Details |
| --- | --- |
| **Service** | `[e.g., auth-service]` |
| **Version** | `[e.g., v1.5.2, build-abc123]` |
| **Change Summary** | *One-sentence description of the change.* |
| **Risk Level** | `[Low / Medium / High]` |
| **Jira Ticket(s)**| `[Link to tickets]` |
| **On-Call Engineer**| `[@username]` |
| **Rollback Plan** | `[Previous stable version to rollback to]` |

## 2. Pre-Deployment Checklist (MANDATORY)

- [ ] **CI/CD Pipeline Green:** Build and all automated tests are passing
- [ ] **Secrets & Config Verified:** All necessary environment variables and secrets are confirmed in target environment
- [ ] **Database Migrations Ready:** Migrations tested and rollback plan confirmed (if applicable)
- [ ] **Feature Flags Configured:** Proper targeting and fallback settings verified (if applicable)
- [ ] **Rollback Command Verified:** The command in Section 6 below has been tested and confirmed correct
- [ ] **Monitoring Dashboard Open:** Primary dashboard link verified and accessible
- [ ] **Communication Posted:** Message in `#engineering-releases`: *"Starting deployment of [Service Name] v[Version]. Runbook: [Link]"*

## 3. Deployment Commands

### Stage 1: Canary Rollout (10% Traffic)
```bash
# REPLACE WITH EXACT DEPLOYMENT COMMAND
kubectl set image deployment/auth-service auth-service=registry.company.com/auth-service:v1.5.2
kubectl patch service auth-service-canary --patch '{"spec":{"selector":{"version":"v1.5.2"}}}'
# OR for Helm:
# helm upgrade --install auth-service ./charts/auth-service --set image.tag=v1.5.2 --set canary.weight=10
```

**Wait 10 minutes before proceeding to Stage 2.**

### Stage 2: Full Rollout (100% Traffic)
```bash
# REPLACE WITH EXACT COMMAND FOR FULL DEPLOYMENT
kubectl patch service auth-service --patch '{"spec":{"selector":{"version":"v1.5.2"}}}'
# OR for Helm:
# helm upgrade auth-service ./charts/auth-service --set canary.weight=100
```

## 4. Monitoring & Health Checks

### Primary Dashboard
**LINK:** [DIRECT LINK TO PRE-FILTERED DASHBOARD - REPLACE THIS]

### Critical Metrics & Rollback Thresholds

| Metric | Dashboard Query/Panel | Success Threshold | **ROLLBACK IF** |
|--------|----------------------|-------------------|-----------------|
| **Error Rate** | `sum:trace.http.request.errors{service:auth-service}.as_rate()` | < 0.5% | > 2% for 3 minutes |
| **P99 Latency** | `p99:trace.http.request{service:auth-service}` | < 200ms | > 500ms for 3 minutes |
| **Request Throughput** | `sum:trace.http.request{service:auth-service}.as_rate()` | > 80% of baseline | < 50% of baseline for 5 minutes |
| **CPU Usage** | `avg:container.cpu.usage{service:auth-service}` | < 80% | > 90% for 5 minutes |
| **Memory Usage** | `avg:container.memory.usage{service:auth-service}` | < 85% | > 95% for 3 minutes |
| **Database Connections** | `sum:db.connections{service:auth-service}` | < 80 connections | > 100 connections |

### Health Check Commands
```bash
# Service health endpoint
curl -f https://api.company.com/auth/health

# Pod status check
kubectl get pods -l app=auth-service -o wide

# Service logs (last 50 lines)
kubectl logs -l app=auth-service --tail=50 --timestamps
```

## 5. Progressive Rollout Timeline

### T+0: Canary Start
- [ ] Execute Stage 1 deployment command
- [ ] Verify canary pods are running: `kubectl get pods -l version=v1.5.2`
- [ ] Check health endpoint responds: `curl https://api.company.com/auth/health`
- [ ] **Monitor dashboard for 10 minutes**

### T+10: Canary Assessment
- [ ] **GO/NO-GO DECISION POINT**
- [ ] All metrics within success thresholds
- [ ] No error rate spikes detected
- [ ] Latency stable or improved
- [ ] **If GO:** Proceed to Stage 2
- [ ] **If NO-GO:** Execute Section 6 (Rollback)

### T+15: Full Rollout
- [ ] Execute Stage 2 deployment command
- [ ] Verify all traffic routing to new version
- [ ] **Monitor dashboard for 15 minutes**

### T+30: Final Verification
- [ ] All health checks passing
- [ ] All metrics stable within thresholds
- [ ] No concerning log patterns
- [ ] **DEPLOYMENT COMPLETE**

## 6. Emergency Rollback (EXECUTE IMMEDIATELY IF NEEDED)

### Rollback Command
```bash
# REPLACE WITH EXACT, TESTED ROLLBACK COMMAND
kubectl set image deployment/auth-service auth-service=registry.company.com/auth-service:v1.5.1
# OR for Helm:
# helm rollback auth-service 1
```

### Rollback Verification
```bash
# Verify rollback completed
kubectl get pods -l app=auth-service -o wide
curl -f https://api.company.com/auth/health

# Check metrics returned to baseline
# [Use same dashboard link from Section 4]
```

### Emergency Communication
**Post immediately in #engineering-releases AND #incidents:**
```
🚨 ROLLING BACK deployment of [Service Name] v[Version]
Reason: [Brief reason - error rate spike/latency/etc]
ETA to completion: 5 minutes
Runbook: [Link to this document]
```

## 7. Post-Deployment Actions

### Immediate (Within 30 minutes)
- [ ] **Final Health Confirmation:** All metrics stable for 30+ minutes
- [ ] **Traffic Verification:** 100% of requests routing to new version
- [ ] **Log Review:** No unexpected errors or warnings in application logs
- [ ] **Database Health:** No performance degradation or connection issues

### Success Communication
**Post in #engineering-releases:**
```
✅ Deployment of [Service Name] v[Version] COMPLETE and STABLE
- Error rate: [current %]
- P99 latency: [current ms]
- All health checks: PASSING
Duration: [X] minutes
```

### Documentation
- [ ] **Update post-release-log.md** with any notable observations
- [ ] **File any follow-up tickets** for issues discovered during deployment
- [ ] **Update runbook** with any command corrections or improvements

## 8. Troubleshooting Guide

### If Canary Pods Won't Start
```bash
# Check pod status and events
kubectl describe pods -l version=[new-version]
kubectl get events --sort-by='.metadata.creationTimestamp'

# Check resource constraints
kubectl top nodes
kubectl describe nodes | grep -A5 "Allocated resources"
```

### If Health Checks Fail
```bash
# Check service connectivity
kubectl get svc auth-service -o wide
kubectl get endpoints auth-service

# Test internal connectivity
kubectl run debug --image=curlimages/curl -it --rm -- /bin/sh
# Then: curl http://auth-service.namespace.svc.cluster.local:8080/health
```

### If Metrics Show Degradation
1. **First:** Check if it's related to deployment or external factors
2. **Compare:** Same time yesterday vs current metrics
3. **Investigate:** Application logs for error patterns
4. **Decision:** Rollback if impact is deployment-related

---

**Runbook Owner:** [Engineering Team]  
**Last Updated:** [Date]  
**Next Review:** [After each use - update commands/thresholds as needed]