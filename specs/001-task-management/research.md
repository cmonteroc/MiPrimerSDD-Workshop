# Research and Technical Decisions

## Node.js runtime

- **Decision**: Support Node.js 18.20 or newer; use the installed Node.js 26.13.0 during development.
- **Rationale**: `node:test` and the planned static server APIs meet the existing guide and the installed runtime.
- **Alternatives considered**: Third-party runner; rejected to avoid dependencies.

## Local server

- **Decision**: Implement a dependency-free static HTTP server in `server.js`.
- **Rationale**: It provides consistent module loading while keeping setup minimal.
- **Alternatives considered**: Opening `index.html` directly; rejected because browser behavior for modules and storage can vary by origin.

## Package scripts

- **Decision**: Define `start` and `test` scripts in `package.json`.
- **Rationale**: `npm start` and `npm test` provide reproducible repository workflows with no packages to install.
- **Alternatives considered**: Editor-specific commands; rejected because they are not repository-level workflows.

## Persistence

- **Decision**: `src/task-store.js` alone reads and writes localStorage.
- **Rationale**: Persistence failures and serialization stay isolated from UI and domain logic.
- **Alternatives considered**: Direct UI writes; rejected because failure handling would be harder to test.

## Application structure

- **Decision**: Separate UI coordination, task behavior, and persistence.
- **Rationale**: It satisfies the constitution with a small, readable module layout.
- **Alternatives considered**: A single script; rejected because independently testable logic would be coupled to the DOM.

## Visual decisions

- **Decision**: Plan CSS structure and accessibility without choosing exact colors, font names, or breakpoints.
- **Rationale**: DEC-001 and DEC-003 remain unresolved in the specification.
- **Alternatives considered**: Inventing defaults; rejected because that would create an unsupported agreement.
