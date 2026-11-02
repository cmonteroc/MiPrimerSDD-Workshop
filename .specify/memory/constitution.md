<!--
Sync Impact Report
- Version change: unversioned -> 1.0.0
- Modified principles: none; all template principles replaced by project principles.
- Added sections: Scope and Product Constraints; Development Workflow and Evidence.
- Removed sections: none.
- Follow-up TODOs: RATIFICATION_DATE is unknown and requires confirmation.
-->

# Taller de Spec-Driven Development Constitution

## Core Principles

### I. Scope and Simplicity
Implementation MUST include only functions requested by the approved requirements. The
solution MUST remain as simple as the available requirements permit, and unnecessary features
or abstractions MUST NOT be introduced.

### II. Separation of Concerns
The user interface, application logic, and persistence MUST be separate responsibilities. Data
flow and dependencies MUST preserve these boundaries so that behavioral changes are testable
without coupling presentation or storage details to application rules.

### III. Clear and Deliberate Code
Names MUST communicate purpose, and comments MUST explain relevant decisions, constraints, or
tradeoffs that are not evident from the code itself. Comments MUST NOT restate implementation.

### IV. Requirements-Test Traceability
Approved requirements, implementation tasks, and tests MUST have explicit, maintained links.
Every implemented behavior MUST be traceable to a requirement and evidence of its verification.

### V. Test-Driven Logic
For each implementable logic behavior, development MUST follow the failing-test cycle:
write a test that exposes the missing behavior, implement the smallest change that makes it pass,
then refactor while preserving the verified behavior. Unit tests are required for new logic;
integration coverage MUST be added when boundaries or contracts change.

### VI. Artifact Consistency Before Implementation
Before implementation begins, specification, plan, tasks, and related requirements MUST be
reviewed for contradictions, omissions, and unsupported assumptions. Material inconsistencies
MUST be resolved or explicitly deferred before dependent work proceeds.

### VII. Ambiguity Escalation
Ambiguities that affect behavior, scope, compatibility, or acceptance MUST be identified and
presented for resolution before relying on an assumption. Minor implementation details MAY be
resolved by the implementer when they do not alter approved intent.

### VIII. Evidence-Based Verification
A test MUST NOT be reported as passing unless it was executed and its result is known. Reports
MUST distinguish executed results from unexecuted checks, inferred outcomes, and future work.

### IX. Transparent Limitations
Limitations, failed checks, unexecuted verification, environmental constraints, and pending
decisions MUST be recorded in the relevant deliverable or work log. Hidden uncertainty MUST NOT
be represented as completed work.

## Scope and Product Constraints

The product is a simple personal task application. A task MUST have a required title, an optional
description, and a completion status. Tasks MUST remain available after the application closes and
reopens. The approved interfaces and visual requirements MUST take precedence over unrequested
features.

Accounts, categories, due dates, priorities, search, synchronization, and other functions not
approved in the requirements are out of scope. The implementation MUST preserve a minimal,
accessible, responsive experience consistent with the approved task list and task detail screens.

## Development Workflow and Evidence

Work MUST proceed by resolving scope and ambiguity, validating artifact consistency, defining
testable requirements, and maintaining traceability through tasks and verification.

Implementation evidence MUST include the executed test command or method, observable result,
remaining limitations, and any verification that could not be completed. Ambiguities, tradeoffs,
and deferrals MUST be documented rather than silently resolved.

## Governance

This constitution supersedes conflicting project practices for work governed by Spec Kit. An
amendment MUST document the reason, update the governance version and dates, and provide a
migration or communication plan when existing artifacts become inconsistent.

Version changes MUST follow semantic versioning: MAJOR for incompatible governance or principle
changes, MINOR for new principles or materially expanded sections, and PATCH for clarifications
or non-semantic refinements. Compliance MUST be reviewed for specifications, plans, tasks, and
implemented changes before work is considered complete. Reviews MUST record unresolved
exceptions and pending verification explicitly.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): confirm the original project adoption date | **Last Amended**: 2026-11-02
