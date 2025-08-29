# Deployment Guide

> **Purpose:** This guide provides step-by-step instructions for executing a deployment safely, ensuring consistency across releases and enabling quick resolution of deployment issues.

## Pre-Deployment Setup

### Environment Verification
```bash
# Verify you're targeting the correct environment
kubectl config current-context
# Expected output: production-cluster

# Check cluster health
kubectl get nodes
kubectl get pods --all-namespaces | grep -v Running | grep -v Completed
```

### Access & Permissions Check
- [ ] **VPN Connected** - Production network access established
- [ ] **kubectl configured** - Kubernetes context set to production
- [ ] **Docker registry access** - Can pull deployment images
- [ ] **Database access verified** - Migration privileges confirmed
- [ ] **Monitoring tools accessible** - Dashboards and alerting available

*Example: Test database connection with read-only query before proceeding*

## Deployment Procedure

### Step 1: Pre-Deployment Health Check
```bash
# Record baseline metrics
curl -s https://api.yourapp.com/health | jq '.'
# Expected: {"status": "healthy", "services": {"db": "ok", "cache": "ok"}}

# Check current error rates
# Navigate to monitoring dashboard and record baseline values
```

**Baseline Metrics to Record:**
- Current error rate: _____%
- P99 latency: _____ms  
- Request throughput: _____/min
- Active user sessions: _____

### Step 2: Database Migrations (if required)
```bash
# Backup current database state
kubectl exec -it $(kubectl get pods -l app=db-backup -o name) -- \
  pg_dump production_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Run migrations in dry-run mode first
kubectl apply -f k8s/migration-job.yaml --dry-run=server

# Execute actual migration
kubectl apply -f k8s/migration-job.yaml

# Verify migration completion
kubectl logs -f job/db-migration
```

**Migration Checkpoints:**
- [ ] Backup completed successfully
- [ ] Dry-run validation passed
- [ ] Migration job completed
- [ ] Schema changes verified
- [ ] No data loss confirmed

### Step 3: Application Deployment

#### For Canary Deployment:
```bash
# Deploy canary version (5% traffic)
kubectl apply -f k8s/canary-deployment.yaml

# Wait for pods to be ready
kubectl wait --for=condition=ready pod -l version=canary --timeout=300s

# Verify canary health
kubectl get pods -l version=canary
curl -H "X-Canary: true" https://api.yourapp.com/health
```

#### For Blue-Green Deployment:
```bash
# Deploy green environment
kubectl apply -f k8s/green-deployment.yaml

# Wait for green environment readiness
kubectl wait --for=condition=ready pod -l color=green --timeout=300s

# Verify green environment health
kubectl exec -it $(kubectl get pods -l color=green -o name | head -1) -- \
  curl localhost:8080/health
```

### Step 4: Traffic Migration

#### Gradual Traffic Shift (Canary):
```bash
# Increase canary traffic to 25%
kubectl patch virtualservice api-vs -p '{"spec":{"http":[{"match":[{"headers":{"canary":{"exact":"true"}}}],"route":[{"destination":{"host":"api-canary","subset":"canary"}}],"weight":25}]}}'

# Monitor for 15 minutes, then proceed to next stage
# If issues detected, rollback immediately
```

#### Blue-Green Traffic Switch:
```bash
# Switch traffic from blue to green
kubectl patch service api-service -p '{"spec":{"selector":{"color":"green"}}}'

# Verify traffic is flowing to green environment
curl -v https://api.yourapp.com/health
```

### Step 5: Health Verification
```bash
# Check application logs for errors
kubectl logs -l app=api --tail=100 | grep -i error

# Verify key endpoints
curl -s https://api.yourapp.com/api/v1/status | jq '.'
curl -s https://api.yourapp.com/api/v1/users/me -H "Authorization: Bearer $TEST_TOKEN"

# Check database connectivity
kubectl exec -it $(kubectl get pods -l app=api -o name | head -1) -- \
  nc -zv postgres-service 5432
```

**Health Check Results:**
- [ ] Application logs show no new errors
- [ ] All critical endpoints responding
- [ ] Database connections stable
- [ ] External API integrations working
- [ ] Background jobs processing

## Progressive Rollout Timeline

### Phase 1: Initial Deployment (T+0)
- **Duration:** 15 minutes
- **Scope:** 5% of traffic or specific user cohort
- **Success Criteria:** Error rate <0.1%, P99 latency <500ms
- **Actions:** Deploy, monitor, verify health

### Phase 2: Limited Expansion (T+15)
- **Duration:** 30 minutes  
- **Scope:** 25% of traffic
- **Success Criteria:** No degradation from Phase 1
- **Actions:** Increase traffic, extended monitoring

### Phase 3: Majority Rollout (T+45)
- **Duration:** 60 minutes
- **Scope:** 75% of traffic
- **Success Criteria:** Business metrics stable
- **Actions:** Near-full deployment, comprehensive checks

### Phase 4: Full Deployment (T+105)
- **Duration:** Ongoing
- **Scope:** 100% of traffic
- **Success Criteria:** All success criteria met
- **Actions:** Complete rollout, post-deployment monitoring

*Example: E-commerce site might use user segments: internal employees → beta users → premium customers → all users*

## Rollback Procedures

### Immediate Rollback (Emergency)
```bash
# For Canary: Route all traffic back to stable version
kubectl patch virtualservice api-vs -p '{"spec":{"http":[{"route":[{"destination":{"host":"api-stable"}}]}]}}'

# For Blue-Green: Switch back to previous version
kubectl patch service api-service -p '{"spec":{"selector":{"color":"blue"}}}'

# Verify rollback completed
curl -s https://api.yourapp.com/version
# Should show previous version number
```

### Gradual Rollback
```bash
# Reduce traffic to new version gradually
kubectl patch virtualservice api-vs -p '{"spec":{"http":[{"route":[{"destination":{"host":"api-canary"},"weight":10},{"destination":{"host":"api-stable"},"weight":90}]}]}}'

# Continue reducing until fully rolled back
# Monitor metrics during gradual rollback
```

### Database Rollback (if required)
```bash
# Stop application traffic to prevent writes
kubectl scale deployment api --replicas=0

# Restore database from backup
kubectl exec -it $(kubectl get pods -l app=db-restore -o name) -- \
  psql production_db < backup_YYYYMMDD_HHMMSS.sql

# Restart application with previous version
kubectl set image deployment/api api=api:previous-version
kubectl scale deployment api --replicas=3
```

## Verification Commands

### System Health
```bash
# Pod status across all environments
kubectl get pods -o wide

# Service mesh health (if using Istio)
istioctl proxy-status

# Ingress controller status  
kubectl get ingress -o wide

# Resource utilization
kubectl top pods
kubectl top nodes
```

### Application Health
```bash
# API endpoint testing
for endpoint in /health /api/v1/status /api/v1/ready; do
  echo "Testing $endpoint"
  curl -s -o /dev/null -w "Status: %{http_code}, Time: %{time_total}s\n" \
    https://api.yourapp.com$endpoint
done

# Database query performance
kubectl exec -it $(kubectl get pods -l app=db -o name) -- \
  psql -c "SELECT count(*) FROM users WHERE created_at > NOW() - INTERVAL '1 hour';"
```

## Monitoring During Deployment

### Key Dashboards to Watch
- **Application Dashboard:** Error rates, latency, throughput
- **Infrastructure Dashboard:** CPU, memory, disk usage
- **Database Dashboard:** Query performance, connection pools
- **Business Metrics:** Conversion rates, active users

### Alert Thresholds
- **Error Rate:** >1% for 5 minutes → Investigate
- **P99 Latency:** >2x baseline for 10 minutes → Consider rollback  
- **Memory Usage:** >85% for 15 minutes → Scale resources
- **Database Connections:** >80% of pool → Check for leaks

*Example: Set up PagerDuty alert for "API error rate >0.5% for 3 consecutive minutes during deployment"*

## Troubleshooting Common Issues

### Deployment Stuck
```bash
# Check deployment status
kubectl describe deployment api

# Check for resource constraints
kubectl describe nodes | grep -A 5 "Allocated resources"

# Review events for errors
kubectl get events --sort-by=.metadata.creationTimestamp
```

### Pod Crashes
```bash
# Get crash logs
kubectl logs <pod-name> --previous

# Check resource limits
kubectl describe pod <pod-name> | grep -A 10 Resources

# Verify image availability
docker pull <image-name>
```

### Database Connection Issues
```bash
# Test database connectivity
kubectl run -it --rm debug --image=postgres:13 --restart=Never -- \
  psql -h postgres-service -U username -d database

# Check connection pool status
kubectl exec -it $(kubectl get pods -l app=api -o name | head -1) -- \
  curl localhost:8080/metrics | grep db_pool
```

## Post-Deployment Actions

### Immediate (T+15 minutes)
- [ ] **Verify all health checks passing**
- [ ] **Confirm metrics within expected ranges**
- [ ] **Update `post-release-monitoring-log.md`**
- [ ] **Notify stakeholders of successful deployment**

### Extended (T+1 hour)
- [ ] **Review comprehensive metrics**
- [ ] **Check for any error spikes**  
- [ ] **Verify business metrics unchanged**
- [ ] **Scale down old deployment resources**

### Follow-up (T+24 hours)
- [ ] **Complete monitoring review**
- [ ] **Document any issues encountered**
- [ ] **Clean up deployment artifacts**
- [ ] **Update deployment procedures if needed**

---

**Deployment Executed By:** [Name]  
**Deployment Date/Time:** [YYYY-MM-DD HH:MM]  
**Deployment Method:** [ ] Canary [ ] Blue-Green [ ] Rolling [ ] Big Bang  
**Final Status:** [ ] Success [ ] Rolled Back [ ] Partial  
**Issues Encountered:** [Brief description of any problems]