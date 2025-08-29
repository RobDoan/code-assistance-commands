# Deployment Template Review: The "On-Call @ 2 AM" Edition

## 1. Overall Assessment

Bluntly? These templates would be ignored. We have five separate documents for a single deployment. During a high-pressure release or a production incident, an engineer needs **one** source of truth, not a documentation scavenger hunt.

This collection of templates is a classic example of process for process's sake. It's designed for planning meetings, not for the engineer on call at 2 AM trying to safely push a hotfix. It's too cumbersome, separates critical information, and will be abandoned in favor of ad-hoc Slack messages the first time things get stressful.

The goal is to make doing the right thing the easiest thing. These templates do the opposite. We're replacing them.

## 2. Section-by-Section Analysis

Here's a breakdown of why the current files are impractical.

*   **`release-plan.md`**:
    *   **Problem:** Mostly noise. "Business Goals," "Stakeholders," and "Timeline" are for project managers. The on-call engineer needs to know *what* to deploy, *how* to deploy it, and *what* to watch. The rest is clutter that hides the critical path.
    *   **Verdict:** 90% fluff. The useful 10% (what's being released) will be merged into the new runbook.

*   **`deployment-guide.md`**:
    *   **Problem:** It's a generic guide, but it's separate from the plan and the monitoring steps. An engineer has to switch between three documents to do one job. The steps are likely abstract ("Deploy the service") instead of specific, copy-pasteable commands.
    *   **Verdict:** Critical information, but in the wrong place. This gets merged and made specific.

*   **`release-checklist.md`**:
    *   **Problem:** A checklist is essential, but a separate file guarantees it will be skipped. It adds another step to an already busy process.
    *   **Verdict:** Good intent, bad execution. This becomes a non-negotiable section within the single runbook.

*   **`monitoring-plan.md`**:
    *   **Problem:** This is the most dangerous template of the bunch. It's vague. "Monitor system health" is not a plan; it's a wish. Without direct links to pre-built dashboards and explicit, numeric thresholds for what constitutes "bad," you are guaranteeing inconsistent monitoring and slow incident response.
    *   **Verdict:** The most critical failure. This will be replaced with a highly specific, actionable "Monitoring & Verification" section in the runbook.

*   **`post-release-monitoring-log.md`**:
    *   **Problem:** It looks like a form to be filled out, which feels like homework. Logging observations is good, but the format needs to be dead simple.
    *   **Verdict:** We'll keep the *idea* but simplify it to a running log.

## 3. Revised & Improved Template

We are deleting the five old templates and replacing them with **one** primary document: `release-runbook.md`. It's a single, actionable checklist that contains everything needed for the deployment.

We will also have a simplified `post-release-log.md` for notes.

---

### New Template 1: `release-runbook.md`

```markdown
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

## 2. Pre-Deployment Checklist (MANDATORY)

- [ ] **CI/CD Pipeline Green:** Build and all automated tests are passing.
- [ ] **Secrets & Config Verified:** All necessary environment variables and secrets are confirmed to be in the target environment (`[e.g., Vault, Parameter Store]`).
- [ ] **Rollback Procedure Confirmed:** The command in the "Rollback" section below has been reviewed and is correct.
- [ ] **Announce Deployment:** A message has been posted in the `#engineering-releases` channel: *"Starting deployment of [Service Name] v[Version]. Runbook: [Link to this document]"*

## 3. Deployment Procedure

### Step 1: Canary Rollout (10% Traffic)
*   **Command:**
    ```bash
    # PASTE THE EXACT COMMAND HERE
    helm upgrade --install auth-service ./charts/auth-service --set image.tag=v1.5.2 --set canary.weight=10
    ```

### Step 2: Monitor Canary (10 Minutes)
*   **PRIMARY DASHBOARD:** **[LINK TO PRE-FILTERED DATADOG/GRAFANA DASHBOARD]**

| Metric | Query/Link | Threshold (Success) | **ROLLBACK IF** |
| --- | --- | --- | --- |
| **P99 Latency** | `p99:trace.http.request{service:auth-service}` | `< 150ms` | `> 250ms for 3 mins` |
| **Error Rate** | `sum:trace.http.request.errors{service:auth-service}.as_rate()` | `< 0.1%` | `> 1% for 3 mins` |
| **CPU Usage** | `avg:container.cpu.usage{service:auth-service}` | `< 70%` | `> 85% for 5 mins` |

*If any rollback condition is met, proceed immediately to Section 5.*

## 4. Full Rollout (100% Traffic)

*   **Command:**
    ```bash
    # PASTE THE EXACT COMMAND HERE
    helm upgrade auth-service ./charts/auth-service --set canary.weight=100
    ```
*   **Action:** Monitor the primary dashboard for another 10 minutes.

## 5. Rollback Procedure (EXECUTE IF NEEDED)

*   **Command:**
    ```bash
    # PASTE THE EXACT, TESTED ROLLBACK COMMAND HERE
    helm rollback auth-service <PREVIOUS_VERSION_NUMBER>
    ```
*   **Action:** Post in `#engineering-releases` and `#incidents` channel: *":rotating_light: Rolling back deployment of [Service Name] v[Version]. See runbook for details. :rotating_light:"*

## 6. Post-Deployment Verification

- [ ] **Confirm 100% Rollout:** All pods/instances are running the new version.
- [ ] **Final Health Check:** All metrics on the primary dashboard are within success thresholds.
- [ ] **Announce Success:** A message has been posted in the `#engineering-releases` channel: *"Deployment of [Service Name] v[Version] complete and stable."*
- [ ] **Log Observations:** Add any notable observations to the `post-release-log.md`.

```

---

### New Template 2: `post-release-log.md`

```markdown
# Post-Release Observations Log

*This is a simple, chronological log of observations during and after a release. Add anything noteworthy.*

---

### Release: [Service Name] - [Version] - [Date]

*   **[Timestamp]** - `[Username]` - Deployment started. Canary at 10%.
*   **[Timestamp]** - `[Username]` - P99 latency holding steady at 120ms. Error rate at 0.05%. Looks good.
*   **[Timestamp]** - `[Username]` - Noticed a minor increase in DB connections, but well within limits. Will keep an eye on it.
*   **[Timestamp]** - `[Username]` - Promoted to 100%. All metrics stable.
*   **[Timestamp]** - `[Username]` - Deployment complete.

---
```
