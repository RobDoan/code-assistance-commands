# Funeral Automation Script

## Purpose
Automates the process of capturing invalidated experiments and adding them to the Learning Library, turning the "Celebrate Funerals" principle into an effortless, automated habit.

## Functionality
This script/CI job runs periodically to:

1. **Scan Experiment Briefs**: Searches through all `experiment-brief.md` files in the `experiments/` directory
2. **Identify Killed Experiments**: Finds experiments where the Decision is marked as "Kill"
3. **Parse Funeral Data**: Extracts information from the "Funeral Notice" section:
   - Date of Death
   - Cause of Death
   - Value of Death (time/money saved)
   - Memorial (key learning)
4. **Update Learning Library**: Automatically creates a new entry in `learning-library.md` under the appropriate category
5. **Create Pull Request**: Opens a PR with the new learning for team review

## Trigger Conditions
- Runs daily via CI/CD pipeline
- Can be manually triggered after experiment conclusion
- Automatically triggered when experiment status changes to "Kill"

## Input
- Path to experiments directory
- Path to learning-library.md

## Output
- Updated learning-library.md with new funeral entry
- Pull request for review
- Notification to team channel about new learning

## Configuration
```yaml
# config.yaml
scan_directory: "./experiments"
learning_library: "./learning/learning-library.md"
exclude_archived: true
notification_channel: "#learning"
auto_merge_after_approval: true
```

## Benefits
- Zero-friction documentation of learnings
- Consistent capture of invalidated hypotheses
- Automatic calculation of saved resources
- Creates institutional memory without manual effort

## Implementation Notes
- Should preserve existing learning-library.md formatting
- Must handle edge cases (incomplete funeral notices, duplicate entries)
- Should tag relevant team members based on experiment ownership
- Integrates with version control for audit trail

## Future Enhancements
- Generate monthly "Funeral Report" summarizing all invalidated hypotheses
- Track patterns across multiple funerals
- Auto-suggest similar past failures when new experiments are proposed
- Calculate cumulative savings from all killed experiments