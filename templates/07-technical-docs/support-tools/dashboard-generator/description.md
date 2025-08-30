# Mission Control Dashboard Generator

## Purpose
Transforms the static README.md into a dynamic "Mission Control" dashboard that provides real-time visibility into the team's learning process, active experiments, and system health.

## Functionality
This generator creates a live dashboard by:

1. **Scanning Documentation**: Parses all template directories for current state:
   - Active experiments (not yet marked "Keep" or "Kill")
   - Recent learnings from learning-library.md
   - High-priority risks from risk-register.md
   - Upcoming ADR reviews
   - Recent technology experiments
2. **Aggregating Metrics**: Collects learning velocity metrics:
   - Experiments per week
   - Time to validate/invalidate hypotheses
   - Funeral celebration rate
   - Risk prediction accuracy
3. **Generating Visualizations**: Creates charts and graphs:
   - Experiment pipeline status
   - Learning velocity trends
   - Risk heat map
   - Decision validation status
4. **Building Dashboard**: Outputs interactive HTML/Markdown:
   - Can be viewed locally or hosted
   - Auto-refreshes with latest data
   - Mobile-responsive design
5. **Publishing**: Deploys to team-accessible location

## Output Format
```html
<!-- Mission Control Dashboard -->
<div class="dashboard">
  <section class="active-experiments">
    <h2>🧪 Active Experiments (3)</h2>
    <ul>
      <li>checkout-optimization - Day 5/14 - On Track</li>
      <li>ml-recommendations - Day 2/7 - Needs Data</li>
      <li>api-caching - Day 1/5 - Just Started</li>
    </ul>
  </section>
  
  <section class="recent-learnings">
    <h2>💀 Latest Funerals (Last 7 Days)</h2>
    <ul>
      <li>Killed: Complex onboarding flow - Saved 3 months</li>
      <li>Killed: Blockchain integration - Saved $50k</li>
    </ul>
  </section>
  
  <section class="high-risks">
    <h2>🚨 High Priority Risks</h2>
    <ul>
      <li>Database scaling limit - Mitigation in progress</li>
      <li>Key dependency EOL - Planning required</li>
    </ul>
  </section>
  
  <section class="metrics">
    <h2>📊 Learning Velocity</h2>
    <div class="chart">...</div>
  </section>
</div>
```

## Configuration
```yaml
# config.yaml
source_directories:
  experiments: "./experiments"
  decisions: "./decisions"
  learning: "./learning"
  systems: "./systems"
output:
  format: "html"  # or "markdown"
  path: "./dashboard/index.html"
  static_site_generator: "mkdocs"  # or "jekyll", "docusaurus"
refresh_interval: 3600  # seconds
include_sections:
  - active_experiments
  - recent_learnings
  - high_risks
  - upcoming_reviews
  - team_velocity
theme: "light"  # or "dark"
```

## Trigger Conditions
- Runs on every commit to main branch
- Scheduled generation every hour
- Manual trigger via command
- Triggered by significant events (experiment completion, incident)

## Benefits
- Ambient awareness of team's learning state
- Reduces need to search through documents
- Makes learning velocity visible and measurable
- Encourages engagement with documentation system
- Provides executive-friendly view of technical progress

## Implementation Notes
- Should gracefully handle incomplete/malformed templates
- Must be performant even with hundreds of documents
- Caches parsed data to avoid repeated file reads
- Supports both static generation and live updates
- Accessible without special tools (just a browser)

## Integration Points
- Static site generators (MkDocs, Jekyll, Docusaurus)
- CI/CD pipelines for automatic updates
- Team wikis or portals
- Monitoring dashboards (Grafana, Datadog)
- Slack/Teams for snapshot sharing

## Future Enhancements
- Real-time WebSocket updates
- Personalized views based on team role
- Predictive analytics on experiment success
- Integration with project management tools
- Mobile app for on-the-go monitoring
- AI-powered insights and recommendations
- Gamification elements (leaderboards, achievements)