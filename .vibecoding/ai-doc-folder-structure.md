# Project Documentation Structure Guide

This document provides a complete blueprint for generating documentation at both the product level and individual service level. The documentation is organized into two distinct layers: **product-level documentation** for high-level strategic decisions and **service-level documentation** for specific implementation details within each microservice.

-----

## 📂 Documentation Structure

### Workspace-Level Structure
**Purpose:** All documentation repositories at the same organizational level, with cross-references as needed.

```plaintext
workspace_root/
├── product-docs/                            # Strategic product documentation (standalone repo)
│   ├── README.md                            # Overview of the entire product documentation
│   │
│   ├── 01_product_research/
│   │   ├── market_analysis.md
│   │   ├── competitor_analysis.md
│   │   └── user_research/
│   │
│   ├── 02_requirements/
│   │   └── product_requirements_document.md
│   │
│   ├── 03_design/
│   │   ├── high_level_architecture.md       # System-wide architecture and service interactions
│   │   ├── service_registry.md              # Catalog of all services with their purposes
│   │   └── sequence_diagrams/
│   │       ├── user_authentication_flow.md
│   │       └── end_to_end_user_journey.md
│   │
│   └── project_guides/
│       ├── coding_standards.md              # Guidelines for writing clean, consistent, and maintainable code
│       ├── branching_strategy.md            # Recommended Git branching model for collaborative development
│       ├── ci_cd_overview.md                # Overview of the project's Continuous Integration and Continuous
│       ├── api_style_guide.md               # Rules and best practices for designing new APIs
│       ├── deployment_checklist.md          # Steps to follow before deploying any service to production
│       └── service_development_guide.md     # How to create and document new services
│
├── frontend-service-docs/                   # Frontend service documentation (standalone repo)
│   ├── README.md                            # Service overview and quick start guide
│   ├── product-docs/                        # → Symlink or Git submodule to ../product-docs
│   │
│   ├── setup/
│   │   ├── local_development.md             # How to run this service locally
│   │   ├── environment_variables.md         # Required env vars and configuration
│   │   └── dependencies.md                  # External dependencies and versions
│   │
│   ├── architecture/
│   │   ├── service_architecture.md          # Internal architecture of this service
│   │   ├── data_models.md                   # Data structures and schemas used
│   │   └── component_library.md             # React components and their usage
│   │
│   ├── configuration/
│   │   ├── nginx_config.md                  # Nginx configuration and routing
│   │   ├── docker_setup.md                  # Docker configuration and usage
│   │   └── build_optimization.md            # Webpack/Vite build configurations
│   │
│   ├── guides/
│   │   ├── testing_guide.md                 # How to run tests and testing practices
│   │   ├── debugging_guide.md               # Common issues and troubleshooting
│   │   └── performance_optimization.md      # Frontend-specific performance tips
│   │
│   └── tech_stack/
│       ├── framework_choice.md              # React/Next.js choice rationale
│       ├── library_documentation.md         # Key libraries and their usage
│       └── version_management.md            # Upgrade paths and version compatibility
│
├── backend-api-docs/                        # Backend API service documentation (standalone repo)
│   ├── README.md                            # Service overview and quick start guide
│   ├── product-docs/                        # → Symlink or Git submodule to ../product-docs
│   │
│   ├── setup/
│   │   ├── local_development.md             # How to run this service locally
│   │   ├── database_setup.md                # Database migrations and seeding
│   │   └── environment_variables.md         # Required env vars and configuration
│   │
│   ├── architecture/
│   │   ├── service_architecture.md          # Internal architecture of this service
│   │   ├── data_models.md                   # Database schemas and models
│   │   └── api_documentation.md             # REST/GraphQL API endpoints
│   │
│   ├── configuration/
│   │   ├── docker_setup.md                  # Docker configuration and usage
│   │   ├── database_config.md               # Database connection and optimization
│   │   └── security_config.md               # Authentication and authorization setup
│   │
│   ├── guides/
│   │   ├── testing_guide.md                 # Unit, integration, and e2e testing
│   │   ├── debugging_guide.md               # Common issues and troubleshooting
│   │   └── monitoring_guide.md              # Logging, metrics, and observability
│   │
│   └── tech_stack/
│       ├── framework_choice.md              # Node.js/Express/Fastify choice rationale
│       ├── library_documentation.md         # Key libraries and their usage
│       └── version_management.md            # Upgrade paths and version compatibility
│
└── auth-service-docs/                       # Authentication service documentation (standalone repo)
    ├── README.md                            # Service overview and quick start guide
    ├── product-docs/                        # → Symlink or Git submodule to ../product-docs
    │
    ├── setup/
    │   ├── local_development.md             # How to run this service locally
    │   ├── jwt_configuration.md             # JWT setup and key management
    │   └── oauth_providers.md               # Third-party OAuth configuration
    │
    ├── architecture/
    │   ├── service_architecture.md          # Internal architecture of this service
    │   ├── security_model.md                # Authentication and authorization flows
    │   └── session_management.md            # Session handling and storage
    │
    ├── configuration/
    │   ├── docker_setup.md                  # Docker configuration and usage
    │   ├── redis_config.md                  # Session storage configuration
    │   └── rate_limiting.md                 # Security and rate limiting setup
    │
    ├── guides/
    │   ├── testing_guide.md                 # Security testing practices
    │   ├── debugging_guide.md               # Common auth issues and solutions
    │   └── security_checklist.md            # Security audit checklist
    │
    └── tech_stack/
        ├── framework_choice.md              # Auth framework choice rationale
        ├── library_documentation.md         # Key security libraries
        └── version_management.md            # Security updates and compatibility
```

### Service Repository Integration
Each service repository contains:
```plaintext
<service-repo>/                              # Example: frontend-service/
├── src/
│   ├── package.json                         # Project manifest and dependencies for frontend application
│   ├── libs/ui/                             # Shared UI component library with theme system
│   │   ├── README.md                        # UI library documentation with theme examples
│   │   ├── src/lib/themes/                  # Complete theme system (7 color variants, light/dark mode)
│   │   └── src/lib/components/              # Organized components (cards, forms, layout, widgets, profile, shop)
│   ├── tools/codemods/                      # JavaScript to TypeScript migration tools
│   │   ├── README.md                        # Migration tool documentation
│   │   ├── migrate-components.js            # Main migration runner
│   │   ├── simple-js-to-ts.js              # Core transformation engine
│   │   └── test-migration.js                # Test suite for migration tools
│   └── ...                                  # All frontend application code and assets
├── product-docs/                            # → Symlink or Git submodule to workspace_root/product-docs
└── docs/                                    # → Symlink to workspace_root/<service>-docs
```

-----

## 📝 Documentation Generation Guide

### Product-Level Documentation (`product-docs/`)

#### Path: `product-docs/README.md`
* **Purpose:** A high-level overview of the entire product documentation repository.
* **Instructions:**
  * Generate a "Project Summary" section explaining the product's main goal.
  * Generate an "About This Documentation" section that briefly explains the purpose of the `01_product_research`, `02_requirements`, and `03_design` folders.

#### Path: `product-docs/03_design/service_registry.md`
* **Purpose:** Catalog all services in the system with their purposes and relationships.
* **Instructions:**
  * Create a table with columns: **Service Name**, **Repository**, **Purpose**, **Tech Stack**, **Dependencies**
  * List each microservice with its primary function and how it connects to other services

#### Path: `product-docs/01_product_research/market_analysis.md`
* **Purpose:** To document the target market, trends, and opportunities.
* **Instructions:**
  * Create a "Market Size and Growth" section with key statistics.
  * Create a "Target Audience Demographics" section describing the ideal customer profile.
  * Create a "Key Industry Trends" section listing 3-5 relevant trends in the EdTech space.
  * Create an "Opportunities" section identifying potential gaps in the market.

#### Path: `product-docs/01_product_research/competitor_analysis.md`
* **Purpose:** To analyze direct and indirect competitors.
* **Instructions:**
  * Generate a markdown table to compare 3-5 key competitors.
  * Use the following columns: **Competitor**, **Key Features**, **Pricing Model**, **Strengths**, and **Weaknesses**.

#### Path: `product-docs/02_requirements/product_requirements_document.md`
* **Purpose:** The single source of truth for **what** the product must do, based on research.
* **Instructions:** Generate a document with the following sections:
  * **1. Project Vision:** A concise, one-paragraph mission statement.
  * **2. User Personas:** Create 2-3 detailed user personas based on the findings in `01_product_research`.
  * **3. Core Features & User Stories:** List the main features. For each feature, write user stories in the format: "As a `[persona]`, I want to `[action]` so that `[benefit]`."
  * **4. Non-Functional Requirements:** Define initial requirements for **Performance**, **Security**, and **Scalability**.

#### Path: `product-docs/03_design/high_level_architecture.md`
* **Purpose:** To document the system-wide architecture and cross-service interactions.
* **Instructions:** Generate a document with the following sections:
  * **1. Architectural Overview:** Describe the chosen pattern (e.g., Microservices, Serverless). Include a simple text-based diagram showing the main components and service interactions.
  * **2. Service Boundaries:** Define responsibilities of each service and their communication patterns.
  * **3. Data Flow:** Explain how data moves through the system for critical cross-service processes.

---

### Service-Level Documentation (`<service>-docs/`)

#### Path: `<service>-docs/README.md`
* **Purpose:** Service overview and quick start guide for developers.
* **Instructions:**
  * Create a "Service Overview" section explaining what this service does.
  * Create a "Quick Start" section with basic setup and run commands.
  * Create a "Documentation Index" section linking to other docs in this service.
  * Include reference to `product-docs/` for high-level context.

#### Path: `<service>-docs/setup/local_development.md`
* **Purpose:** Step-by-step guide for setting up the service locally.
* **Instructions:**
  * List prerequisites (Node.js version, database, etc.).
  * Provide installation commands.
  * Include configuration steps and common troubleshooting.
  * Reference product-docs for overall architecture context.

#### Path: `<service>-docs/architecture/service_architecture.md`
* **Purpose:** Internal architecture and design patterns used in this service.
* **Instructions:**
  * Describe folder structure and code organization.
  * Document key design patterns and architectural decisions.
  * Include internal data flow diagrams if complex.
  * Reference product-docs for how this service fits in the overall system.

#### Path: `<service>-docs/tech_stack/framework_choice.md`
* **Purpose:** Explain technology choices and their rationale.
* **Instructions:**
  * Document why specific frameworks/libraries were chosen.
  * List alternatives considered and reasons for rejection.
  * Include version compatibility information.
  * Reference product-docs tech stack decisions for consistency.

#### Path: `<service>-docs/configuration/nginx_config.md` (Frontend services)
* **Purpose:** Document Nginx configuration and routing setup.
* **Instructions:**
  * Provide sample nginx.conf files.
  * Document routing rules and reverse proxy setup.
  * Include SSL and performance optimization settings.

#### Path: `<service>-docs/guides/testing_guide.md`
* **Purpose:** Testing practices and how to run tests.
* **Instructions:**
  * Document test structure and naming conventions.
  * Provide commands for running different test types.
  * Include coverage requirements and best practices.
  * Reference product-docs coding standards for consistency.

---

## 🔗 Cross-Repository Linking Strategy

### Git Submodules (Recommended)
```bash
# In each service documentation repo
git submodule add ../product-docs product-docs

# In each service repository
git submodule add ../product-docs product-docs
git submodule add ../<service>-docs docs
```

### Symlinks (Alternative)
```bash
# In each service documentation repo
ln -s ../product-docs product-docs

# In each service repository
ln -s ../product-docs product-docs
ln -s ../<service>-docs docs
```

### Documentation References
* Service docs should always reference relevant product-docs sections
* Include links like: `See [High Level Architecture](./product-docs/03_design/high_level_architecture.md)`
* Maintain consistency with product-level decisions and standards

