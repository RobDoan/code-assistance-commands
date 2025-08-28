# User Flows

**Purpose:** This document visualizes the step-by-step user journey for the experiment defined in our PRD, focusing on the critical path that validates our core hypothesis.

## Flow Overview

### Hypothesis Connection
*How does this flow test our core assumption from `prd.md`?*
- **Testing Assumption:** [Restate the primary assumption from PRD]
- **Critical Interaction:** [The key user action that proves/disproves our hypothesis]
- **Success Indicator:** [What user behavior indicates the experiment succeeded]

## Primary User Flow

### Happy Path Flow
*The ideal journey that validates our hypothesis*

**Flow Name:** [Descriptive name for this user journey]

**Entry Point:** [Where/how users enter this flow]

**Steps:**
1. **[Step Name]**
   - User Action: [What the user does]
   - System Response: [What happens next]
   - User State: [How the user feels/what they're thinking]

2. **[Step Name]**
   - User Action: [What the user does]
   - System Response: [What happens next]  
   - User State: [How the user feels/what they're thinking]

3. **[Success State]**
   - User Action: [Final action that indicates success]
   - System Response: [Confirmation/result shown]
   - Measurement: [How we'll track this completion]

*Example:*
*1. User lands on pricing page → 2. Clicks "Start Free Trial" → 3. Completes single-field signup → 4. Sees dashboard welcome message*

### Alternative Paths
*Key variations or edge cases we need to account for*

**Exit Points:**
- **Step [X] Exit:** [Where users might leave and why]
  - Trigger: [What causes this exit]
  - Recovery: [How we might re-engage them]

**Error States:**
- **[Error Scenario]:** [What goes wrong]
  - User Experience: [What the user sees/experiences]
  - Resolution: [How we help them recover]

## Flow Validation

### Measurement Points
*Where in the flow will we collect data?*

| Step | Event Name | Success Metric | Drop-off Risk |
|------|------------|----------------|---------------|
| [Step 1] | [tracking_event] | [what success looks like] | [potential friction] |
| [Step 2] | [tracking_event] | [what success looks like] | [potential friction] |
| [Step 3] | [tracking_event] | [what success looks like] | [potential friction] |

### User Testing Focus
*What specific interactions need user validation?*
- **Critical Decision Point:** [Step where users might hesitate/confusion]
- **Test Questions:** 
  - [Question about user understanding]
  - [Question about user motivation]
  - [Question about perceived value]

## Design Requirements

### Screen/Component Needs
*What UI elements does this flow require?*

**Required Screens:**
1. **[Screen Name]** - [Purpose in the flow]
2. **[Screen Name]** - [Purpose in the flow] 
3. **[Screen Name]** - [Purpose in the flow]

*See `wireframes.md` for detailed mockups of each screen*

### Interaction Requirements
*Key interactive elements needed for this flow*
- **Primary CTA:** [Main action button/link]
- **Secondary Actions:** [Supporting interactions]
- **Navigation:** [How users move between steps]
- **Feedback:** [How we confirm user actions]

## Technical Considerations

### Flow Dependencies
*What technical requirements does this flow create?*
- **Data Requirements:** [What user data we need to capture/display]
- **Integrations:** [External services or APIs needed]
- **Performance:** [Any speed/loading considerations]

*See `architecture-outline.md` for technical implementation details*

### Analytics Implementation
*How will we track this flow?*
- **Event Tracking:** [List of events to log]
- **Conversion Funnel:** [How we'll measure drop-offs]
- **A/B Testing:** [Variations we might test]

## Success Scenarios

### Experiment Success
*If the flow validates our hypothesis:*
- **Evidence:** [What user behavior confirms our assumption]
- **Next Steps:** [How we'd expand or iterate on this flow]
- **Scale Considerations:** [What changes if this becomes permanent]

### Experiment Failure  
*If the flow invalidates our hypothesis:*
- **Evidence:** [What user behavior disproves our assumption]
- **Learning:** [What this teaches us about user needs]
- **Pivot Options:** [Alternative approaches to consider]

---

**Connected Documents:**
- `prd.md` - Core hypothesis and success criteria this flow tests
- `wireframes.md` - Visual design of screens used in this flow
- `architecture-outline.md` - Technical requirements for implementing this flow