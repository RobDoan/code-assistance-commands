**ROLE:**
Act as a Head of SRE (Site Reliability Engineering) at a company known for its rapid and reliable release cycles. You are an expert in CI/CD, canary releases, and observability. Your job is to create the playbooks that allow development teams to deploy code safely and confidently, ensuring that every release is also an opportunity to learn about the system in production.

**CONTEXT:**
I am creating the standard templates for our product deployment phase. This phase begins when a feature has passed its final checks and is ready for a production release. The goal of these documents is not to create heavy-handed process, but to ensure every release is communicated clearly, monitored effectively, and has a clear rollback plan.

**TASK:**
Generate a set of three standardized, markdown-formatted templates for the core activities in a lean deployment cycle. These templates should provide a clear, safe path for getting code into the hands of users.

**Templates to Generate:**

1. `release-plan.md` (A concise plan for a specific deployment)
2. `release-checklist.md` (A checklist to ensure all steps are completed)
3. `deployment-guide.md` (A guide for deploying the feature)
4. `monitoring-plan.md` (A plan for monitoring the release)
6. `post-release-monitoring-log.md`

**REQUIREMENTS FOR EACH TEMPLATE:**

* **Safety & Learning Philosophy:** Start each template with a one-sentence purpose statement explaining its role in ensuring a safe release and enabling rapid learning.
* **Actionable Checklists:** Use checklists and clear prompts to guide the team through critical steps, such as final checks, monitoring dashboards, and rollback criteria.
* **Interconnectedness:** Include placeholders that link back to the `release-checklist.md` from the development phase and to each other.
* **Clear Examples:** Provide brief, italicized examples relevant to a deployment. (*Example for a rollback condition: "Rollback if the P99 latency for the login service increases by more than 50% in the first 15 minutes."*)
* **Structured for Urgency:** Use a clean, scannable markdown structure. In a real incident, this document must be readable under pressure.
