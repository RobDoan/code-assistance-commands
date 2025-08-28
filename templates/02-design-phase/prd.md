# Lean Product Requirements Document (PRD)

**Purpose:** This document defines the smallest possible experiment that will validate our next riskiest assumption in the Build-Measure-Learn loop.

## Experiment Overview

### Core Hypothesis
*What assumption are we testing?*
- **Primary Assumption:** [State the key assumption this experiment will validate/invalidate]
- **Success Metric:** [Single measurable outcome that indicates hypothesis validation]
- **Failure Criteria:** [Clear threshold that indicates hypothesis invalidation]

*Example: "Users will complete onboarding 40% faster with guided tooltips vs. the current static help text"*

### Problem Context
*What problem did we validate in the research phase?*
- **Problem Statement:** [Brief summary from research phase findings]
- **Target User:** [Specific user segment we're designing for]
- **Current Pain Point:** [The specific friction we're addressing]

## Experiment Design

### Solution Hypothesis
*What's the minimal solution we're testing?*
- **Core Feature:** [The one key feature/change we're implementing]
- **Expected User Behavior:** [How we expect users to interact with this solution]
- **Alternative Considered:** [Brief mention of what we're NOT building and why]

*Example: "Add 3-step guided tooltips to replace current help documentation link"*

### Success Criteria
*How will we measure if this experiment succeeds?*

| Metric | Current Baseline | Target | Measurement Method |
|--------|------------------|--------|--------------------|
| [Primary KPI] | [Current value] | [Target value] | [How we'll track it] |
| [Secondary KPI] | [Current value] | [Target value] | [How we'll track it] |

### User Experience Requirements
*What's the minimal experience needed to test our hypothesis?*

**Core User Journey:**
1. [Step 1: Entry point]
2. [Step 2: Key interaction]
3. [Step 3: Success state]

*See `user-flows.md` for detailed step-by-step visualization*

**Essential Features:**
- [ ] [Must-have feature 1]
- [ ] [Must-have feature 2] 
- [ ] [Must-have feature 3]

**Explicitly Out of Scope:**
- [Feature we're intentionally not building]
- [Complexity we're avoiding for this experiment]

## Technical Considerations

### Implementation Approach
*How will this be built with minimal engineering effort?*
- **Development Estimate:** [Time estimate from engineering]
- **Technical Complexity:** [High/Medium/Low]
- **Dependencies:** [Any blockers or prerequisites]

*See `architecture-outline.md` for technical feasibility assessment*

### Design Requirements
*What's the minimal design needed?*
- **Key Screens/Components:** [List of UI elements needed]
- **Design Complexity:** [High/Medium/Low]
- **Existing Components:** [What we can reuse]

*See `wireframes.md` for visual mockups and interaction design*

## Validation Plan

### Timeline
- **Design & Build:** [Duration]
- **User Testing:** [Duration and method]
- **Data Collection:** [How long we'll measure]
- **Decision Point:** [When we'll evaluate results]

### Learning Goals
*What will we learn from this experiment?*
- **If Successful:** [What this proves and next steps]
- **If Unsuccessful:** [What this disproves and pivot options]
- **Edge Cases:** [What unexpected outcomes might teach us]

## Stakeholder Sign-off

- [ ] **Product:** [Name] - Hypothesis and metrics approved
- [ ] **Design:** [Name] - User experience approach confirmed  
- [ ] **Engineering:** [Name] - Technical approach and timeline agreed
- [ ] **Data:** [Name] - Measurement plan validated

---

**Connected Documents:**
- `user-flows.md` - Detailed user journey visualization
- `wireframes.md` - Visual design and interface mockups  
- `architecture-outline.md` - Technical implementation approach