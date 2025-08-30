# ADR Review Reminder Bot

## Purpose
Transforms Architecture Decision Records from static documents into live, accountable records by automating review reminders and tracking validation outcomes against predicted success metrics.

## Functionality
This bot scans ADRs and manages their lifecycle:

1. **Scan Decision Records**: Parses all ADR files in the `decisions/` directory
2. **Extract Review Dates**: Identifies upcoming review milestones:
   - 30-day initial implementation review
   - 90-day full impact assessment
   - Annual strategic alignment review
3. **Check Success Metrics**: Retrieves defined success criteria and metrics
4. **Send Notifications**: Posts reminders to team channels with context:
   - Which ADR needs review
   - What metrics to measure
   - Who owns the decision
   - Links to relevant dashboards/data
5. **Track Outcomes**: Records whether decisions met their success criteria

## Trigger Conditions
- Daily scan for upcoming reviews (within 7 days)
- Weekly summary of overdue reviews
- Triggered when ADR status changes
- Manual check via command

## Input
- decisions/ directory with ADR files
- Team calendar for review scheduling
- Metrics/monitoring systems for validation data

## Output
- Slack/Teams notifications with review reminders
- Updated ADR files with review outcomes
- Review compliance dashboard
- Monthly decision effectiveness report

## Message Templates
```markdown
📊 ADR Review Reminder

**ADR-005: Migrate to Kubernetes** is due for 90-day review this week.

**Success Metric:** "Reduce deployment time by 50%"
**Current Status:** Deployment time reduced by 45%
**Owner:** @platform-team
**Review Date:** 2024-01-15

Please update the ADR with:
- Actual outcomes vs. predictions
- Lessons learned
- Decision to continue/modify/reverse

[View ADR](link) | [View Metrics](dashboard-link)
```

## Configuration
```yaml
# config.yaml
adr_directory: "./decisions"
notification_channels:
  slack: "#engineering"
  email: "tech-leads@company.com"
reminder_windows:
  first_warning: 7  # days before due date
  second_warning: 1
  overdue_alert: 1  # day after due date
metrics_sources:
  - prometheus
  - datadog
  - custom_dashboards
```

## Benefits
- Ensures decisions are validated against outcomes
- Creates accountability for architectural choices
- Builds institutional knowledge about decision quality
- Prevents "set and forget" decision making

## Implementation Notes
- Must parse various ADR formats (maintain backwards compatibility)
- Should handle decisions with no measurable metrics gracefully
- Integrates with team calendar systems
- Respects timezone differences for global teams

## Integration Points
- Communication platforms (Slack, Teams, Discord)
- Calendar systems for scheduling reviews
- Metrics platforms for automated validation
- Version control for ADR updates

## Future Enhancements
- Automatic metric collection from monitoring systems
- Decision quality scoring based on prediction accuracy
- Pattern detection across multiple ADRs
- Automatic status updates based on metric achievement
- Integration with OKR/goal tracking systems