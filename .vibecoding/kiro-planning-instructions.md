# Kiro Planning Mode Instructions

These instructions guide the vibe coding tool through the three phases of Kiro specification development. The goal is to create clear, actionable plans for building software.

## General Instructions

*   **Clarity is Key**: Ensure all outputs are clear, concise, and unambiguous.
*   **Ask Questions**: If a user's request is unclear, ask clarifying questions to eliminate ambiguity.
*   **Stay Focused**: Each phase has a specific objective. Stick to it and avoid mixing concerns.

---

## Folder Structure

All Kiro specifications are stored in the `.kiro` directory, following this structure:

```
project-root/
├── CLAUDE.md                  # Main Claude Code guide (references Kiro)
└── .kiro/
    ├── specs/                 # Feature specifications
    │   └── [feature-name]/    # One directory per major feature
    │       ├── requirements.md    # User stories and acceptance criteria
    │       ├── design.md          # Technical architecture
    │       └── tasks.md           # Implementation checklist
    └── steering/              # Project-wide guidance
        ├── product.md         # Product overview and vision
        ├── tech.md            # Technology stack and choices
        ├── structure.md       # Project structure guide
        ├── patterns.md        # Code patterns and conventions
        ├── api-standards.md   # Common API patterns
        ├── data-models.md     # Shared data structures
        └── security.md        # Security policies and practices
```

*   **`.kiro/`**: The main directory for all Kiro-related files.
*   **`.kiro/specs/`**: Contains all feature specifications.
    *   **`[feature-name]/`**: A directory for each feature.
        *   `requirements.md`: Feature requirements.
        *   `design.md`: Technical design.
        *   `tasks.md`: Implementation tasks.
*   **`.kiro/steering/`**: Contains documents that guide the project's direction.
    *   `product.md`: Product vision and strategy.
    *   `tech.md`: Technical guidelines and principles.
    *   `structure.md`: Project structure and organization.
    *   `patterns.md`: Common design patterns to be used.
    *   `api-standards.md`: Standards for API design.
    *   `data-models.md`: Core data models of the application.
    *   `security.md`: Security guidelines and requirements.

## Phase Selection

When the user specifies a phase (Requirements, Design, or Implementation), follow the corresponding instructions below.

## 📋 Requirements Phase

**Objective**: Capture user stories and acceptance criteria using EARS notation.

**Folder Structure to Use**:
```
.kiro/specs/[feature-name]/
└── requirements.md
```
*   **`.kiro/specs`**: This directory contains all the specifications for different features of the project.
*   **`[feature-name]`**: Each feature should have its own directory inside `specs`.
*   **`requirements.md`**: This file captures the user stories and acceptance criteria for the feature.

**Output Format**:
1. **Feature Overview**: Brief description of the feature
2. **User Stories**: Written in EARS format:
   - `WHEN [condition/event] THE SYSTEM SHALL [expected behavior]`
3. **Acceptance Criteria**: Testable conditions for completion
4. **Dependencies**: Other features or systems required
5. **Assumptions**: Key assumptions made during requirements gathering

**Instructions**:
- Use EARS notation for all requirements
- Focus on clarity, testability, and traceability
- Ensure requirements are complete before proceeding to Design Phase
- Ask clarifying questions to eliminate ambiguity

---

## 🎨 Design Phase

**Objective**: Document technical architecture and system interactions.

**Folder Structure to Use**:
```
.kiro/specs/[feature-name]/
├── requirements.md (reference existing)
└── design.md
```
*   **`design.md`**: This file contains the technical design and architecture for the feature.

**Output Format**:
1. **Architecture Overview**: High-level system design
2. **Component Breakdown**: Individual system components
3. **Data Models**: Required data structures
4. **API Specifications**: Endpoints and contracts
5. **Sequence Diagrams**: User flow and system interactions
6. **Technology Considerations**: Framework/library choices
7. **Security Considerations**: Authentication, authorization, data protection

**Instructions**:
- Reference existing requirements.md for context
- Create detailed technical specifications
- Include visual diagrams where helpful
- Consider existing project patterns from `.kiro/steering/`
- Ensure design completeness before proceeding to Implementation Phase

---

## 🔧 Implementation Phase

**Objective**: Break work into discrete, trackable tasks with clear outcomes.

**Folder Structure to Use**:
```
.kiro/specs/[feature-name]/
├── requirements.md (reference)
├── design.md (reference)
└── tasks.md
```
*   **`tasks.md`**: This file breaks down the implementation of the feature into smaller, manageable tasks.

**Output Format**:
1. **Task Breakdown**: Discrete implementation tasks
2. **Task Format**:
   ```markdown
   ## Task: [Task Name]
   **Status**: [ ] Pending / [x] Complete
   **Description**: What needs to be done
   **Outcome**: Expected deliverable
   **Dependencies**: Other tasks that must complete first
   **Estimated Effort**: Time/complexity estimate
   ```
3. **Implementation Order**: Recommended sequence
4. **Testing Strategy**: How to validate each task
5. **Rollback Plan**: How to revert if needed

**Instructions**:
- Reference both requirements.md and design.md
- Create specific, actionable tasks
- Include clear success criteria for each task
- Consider dependencies between tasks
- Provide real-time status tracking capability

---

## Phase Transition Guidelines

- **Requirements → Design**: Only proceed when all requirements are clear and testable
- **Design → Implementation**: Only proceed when architecture is complete and technical decisions are made
- **Within Implementation**: Update task status in real-time, refine specifications as needed

## Decision Points

At the end of each phase, ask:
1. Are all objectives for this phase complete?
2. Are there any gaps or ambiguities?
3. Is the team ready to proceed to the next phase?

Only advance to the next phase when all decision criteria are met.
