---
mode: 'agent'
description: 'Generates comprehensive product requirements documentation from all files in a folder'
---

You are an expert product manager and technical architect. Your task is to analyze all documents in the specified folder and generate comprehensive product requirements documentation.

## Analysis Target
Folder to analyze: ${args} (if not provided, analyze current directory)

## Context Instructions
1. Read and analyze ALL files in the specified folder
2. Pay special attention to product analyst documents, user research, market analysis, and existing specifications
3. Synthesize information from multiple sources to create cohesive requirements
4. Create a `product-docs/02_requirements/` directory if it doesn't exist

## Output Requirements

Generate exactly 2 files:

### File 1: `product-docs/02_requirements/product_requirements_document.md`

Create this file with the following structure:

#### Project Vision
- Write a clear, compelling 2-3 sentence vision statement
- Capture the essence of what the product aims to achieve
- Focus on user value and business impact

#### User Personas
Create 3-5 detailed user personas based on the analyzed documents:
- **Name & Role**: Descriptive title and demographic info
- **Goals**: Primary objectives they want to achieve
- **Pain Points**: Current challenges and frustrations
- **Tech Comfort**: Their technical proficiency level
- **Context**: How/when they would use this product

#### User Stories
- Create HIGH-LEVEL, strategic user stories by persona type
- Focus on business outcomes and user goals rather than specific features
- Format: "As a [persona], I want to [achieve outcome] so that [business value]"
- Keep stories at the EPIC level - avoid detailed feature specifications
- Each story should represent a major user journey or capability
- Limit to 3-5 core stories per persona maximum

Example structure:

```
## Primary User Stories

### For [Persona Type 1]
- As a [persona], I want to...
- As a [persona], I need to...

### For [Persona Type 2]
- As a [persona], I want to...
```

**Story Guidelines:**
- Think "what" not "how" - focus on outcomes, not implementation
- One story should encompass multiple features/functionalities
- Stories should be measurable at a business impact level
- Avoid UI/UX specifics - stay at the capability level

### File 2: `product-docs/03_design/technology-stack.md`

Create this file with:

#### Technology Recommendations
- **Frontend**: Recommended frameworks/libraries with justification
- **Backend**: Server technologies, APIs, database choices
- **Infrastructure**: Hosting, deployment, scaling considerations
- **Development Tools**: Build tools, testing frameworks, CI/CD

#### Architecture Decisions
- High-level system architecture rationale
- Key technical trade-offs and decisions
- Scalability and performance considerations
- Security and compliance requirements

#### Implementation Phases
- Suggested development phases/sprints
- Technical dependencies and critical path items
- Risk mitigation strategies

## Analysis Guidelines

1. **Document Synthesis**: Look for patterns and themes across all documents
2. **Gap Identification**: Note missing information and make reasonable assumptions
3. **High-Level Focus**: Keep user stories at the EPIC level - major capabilities, not individual features
4. **Business Value**: Every user story should tie directly to measurable business outcomes
5. **Strategic Scope**: Focus on what users need to accomplish, not how they'll do it
4. **Feasibility**: Ensure technical recommendations align with project scope
5. **Consistency**: Maintain coherent narrative across both documents

## Quality Standards

- Use clear, professional language suitable for stakeholders
- Include specific, actionable details rather than generic statements
- Ensure technical recommendations are current and well-supported
- Cross-reference information between documents for consistency
- Format using proper Markdown with clear headings and bullet points

## File Processing Priority

When analyzing folder contents, prioritize:
1. Product analyst reports
2. User research and interview notes
3. Market analysis documents
4. Existing technical specifications
5. Business requirements documents
6. Competitive analysis
7. Wireframes or design documents
