<!--
Sync Impact Report
Version change: (template) → 1.0.0
Modified principles: All placeholders replaced
Added sections: Core Principles, Constraints, Workflow, Governance
Removed sections: None
Templates requiring updates: plan-template.md ✅, spec-template.md ✅, tasks-template.md ✅
Follow-up TODOs: TODO(RATIFICATION_DATE): Original ratification date not known
-->

# Skill Tracker Constitution

## Core Principles

### I. Code Quality
All code MUST adhere to project style guides, be readable, maintainable, and free of known code smells. Automated linting and formatting tools MUST be configured and enforced. Code reviews MUST verify clarity, simplicity, and rationale for complex logic.

### II. Testing Standards
Every feature MUST include automated tests covering critical paths, edge cases, and failure modes. Tests MUST be written before implementation (TDD preferred). All code MUST pass tests before merging. Coverage targets: 90%+ for core logic, 100% for business-critical paths.

### III. User Experience Consistency
User interfaces MUST follow a unified design system. Interactions, feedback, and accessibility MUST be consistent across all screens and flows. All user-facing changes MUST be reviewed for usability and accessibility. User feedback MUST be incorporated into iterative improvements.

### IV. Performance Requirements
All features MUST meet defined performance targets: page loads < 1s, API responses < 300ms p95, and memory usage within platform constraints. Performance regressions MUST be detected by automated tests and blocked from release. Optimization MUST NOT compromise code quality or user experience.

## Constraints

Technology stack: All code MUST use approved languages and frameworks. Security standards MUST be followed. Deployment policies MUST be documented and reviewed. Compliance with legal and privacy requirements is mandatory.

## Development Workflow

All changes MUST follow the documented workflow: feature planning, specification, independent user story implementation, and review. Code reviews MUST verify compliance with all principles. Testing gates MUST block non-compliant code. Deployment requires approval from at least one reviewer.

## Governance

This constitution supersedes all other practices. Amendments require documentation, approval, and a migration plan. All PRs and reviews MUST verify compliance with principles. Complexity MUST be justified. Use runtime guidance files for development reference.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE) | **Last Amended**: 2025-11-26
