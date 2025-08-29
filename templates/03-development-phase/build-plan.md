> **Our Engineering Philosophy:** This document is a compass, not a map. Its purpose is to align on the "why" and the high-level "what." It is not a project plan. We expect the details to change as we learn. We value clear goals and conscious trade-offs over rigid plans.

# Build Plan: [Feature/Experiment Name]

**Owner:** [Tech Lead] | **Status:** In Progress
**Link to PRD:** [URL] | **Link to Epic:** [URL to Jira/Linear]

## 1. Hypothesis & Goal

- **Hypothesis:** We believe that... 
- **Success Metric:** ...and we'll know we're right if [Metric] hits [Target].

## 2. Technical Plan & Trade-offs

- **Approach:** [Brief overview of the architecture. What's new? What's changing?]
- **Conscious Trade-offs:** [What corners are we cutting *on purpose* for speed? What is the expected cost? e.g., "We are not building admin tooling for this, which means manual DB queries will be needed for support."]
- **Key Dependencies:** [List any blocking items from other teams or services.]

## 3. Risks

| Risk | Mitigation |
|------|------------|
| *e.g., This approach creates tech debt in the billing system* | *e.g., We will schedule a refactor in Q4 if the experiment is successful.* |

