# Change Logs

## Feedback 01

✅ Implemented Changes:

1. Experiment Brief (was PRD)

- Shift from requirements to experiments: Focuses on the riskiest assumption and falsifiable hypothesis
- Radical simplification: Removes feature-list mindset, centers on learning goals
- Clear If/Then structure: Forces hypothesis to be testable and measurable
- Learning plan: Requires upfront planning for both success and failure scenarios

2. User Journey Map (was User Flows)

- Critical path focus: Only the shortest sequence needed to validate hypothesis
- Removes speculation: Eliminated subjective "user feelings" sections
- Risk-focused: Identifies drop-off points as learning opportunities
- Minimal screens: Just the essential UI needed for the test

3. Prototype Spec (was Wireframes)

- Job-to-be-done framing: Each screen has a clear validation purpose
- ASCII simplicity: Enforces low-fidelity thinking
- Copy over pixels: Focuses on messaging rather than design details
- No documentation bloat: Just enough visual guide for engineers

4. Tech Feasibility Check (was Architecture Outline)

- 15-minute assessment: Quick Q&A format instead of detailed planning
- Safety first: Simple checklist for feature flags and rollback
- Traffic light system: Clear Green/Yellow/Red verdict
- Prevents over-engineering: Catches experiments that are too complex

✅ Key Improvements:

- Hypothesis-driven: Every template centers on validating assumptions
- Speed-optimized: Designed for rapid experimentation, not documentation
- Interconnected: Templates reference each other and build on previous decisions
- Learning-focused: Emphasizes validated learning over feature delivery
- Safe to fail: Built-in mechanisms for quick rollback and iteration

## Feedback 02

✅ V2 Refinements Applied:

1. Experiment Brief - Enhanced Assumption Analysis

- Added assumption categorization: Forces teams to identify if their risk is about
Problem/Solution/Usability/Technical/Business Model
- Improved learning statements: More explicit about what was proven/disproven
- Better diagnostic clarity: Helps teams understand what type of experiment they need

2. User Journey Map - Explicit Measurement Plan

- Added Analytics Event tracking: Clear mapping of user actions to specific events (experiment_hook_clicked,
experiment_pitch_accepted, experiment_conversion_completed)
- Enhanced drop-off analysis: More specific learning outcomes for each potential failure point
- Data-product alignment: Ensures measurement requirements are defined upfront

3. Prototype Spec - Centralized Copy Management

- Single source of truth for content: All copy consolidated in one section for easy review and consistency
- Referential design: Wireframes now reference copy variables instead of hardcoding text
- Handoff efficiency: Makes it easier for copywriters, designers, and engineers to collaborate

4. Tech Feasibility Check - Dependency Awareness

- Added dependency check: Surfaces potential blockers from other in-progress work
- Prevents hidden delays: Catches cross-team dependencies that could derail the experiment timeline
- Maintains speed focus: Still keeps the 15-minute completion target

✅ Key Benefits of V2:

- More precise risk diagnosis with assumption categorization
- Clearer measurement strategy with explicit analytics events
- Better content management with centralized copy
- Hidden blocker detection with dependency checking
- Maintains lean principles while adding strategic precision

---

## Feedback 3

✅ New Template: Experiment Summary

Purpose: Turns raw experiment data into institutional knowledge and forces honest confrontation with results.

Key Features:

1. Executive Summary: One-sentence outcome for quick reference
2. Data Section: Copies original hypothesis and compares against actual results
3. Clear Verdict: Forces binary decision (Validated/Invalidated/Inconclusive)
4. Core Learning: Captures the single most important insight
5. Decision & Next Steps: Documents official go/no-go decision with justification

Why This Completes the System:

- Prevents zombie projects: Forces explicit decisions instead of indefinite continuation
- Banks learning: Creates searchable, permanent record of what was tried and learned
- Honest assessment: Compares actual results against original success metrics
- Institutional knowledge: Future teams can learn from past experiments
- Closes the loop: Transforms raw data into actionable decisions

✅ Complete 5-Template System:

1. 01-experiment-brief.md → Define the experiment
2. 02-user-journey-map.md → Map the critical path
3. 03-prototype-spec.md → Design the minimal solution
4. 04-tech-feasibility-check.md → Validate technical approach
5. 05-experiment-summary.md → NEW: Capture learnings and decide next steps
