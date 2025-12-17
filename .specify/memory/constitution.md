<!--
Sync Impact Report:
Version: 0.0.0 → 1.0.0 (MAJOR - Initial Constitution)
Created: 2025-12-17
Modified Principles: N/A (Initial creation)
Added Sections: All (Initial creation)
  - Preamble
  - Project Identity
  - 8 Guiding Principles (Iteration-First, KISS, YAGNI, DRY, First-Principles, Separation of Concerns, Greenfield, Human Guidance)
  - Technical Standards
  - Governance
  - Artifact Dependencies
Removed Sections: None

Templates Status:
  ✅ .specify/templates/plan-template.md - Created with constitution compliance checklist
  ✅ .specify/templates/spec-template.md - Created with principle alignment sections
  ✅ .specify/templates/tasks-template.md - Created with principle-driven task categorization
  ✅ .specify/templates/commands/clarify.md - Created with constitution references
  ✅ .specify/templates/commands/analyze.md - Created with constitutional compliance checks
  ✅ .specify/templates/commands/checklist.md - Created with principle validation

Follow-up TODOs:
  - Consider updating README.md to reference constitution principles
  - Consider adding constitution principles to contributor documentation
  - All templates are now synchronized with constitution v1.0.0
-->

# Obsidian Open Gate - Project Constitution

**Version:** 1.0.0
**Ratification Date:** 2025-12-17
**Last Amended:** 2025-12-17

## Preamble

This constitution establishes the foundational principles, practices, and governance for Obsidian Open Gate, an Obsidian plugin that enables seamless website embedding within the Obsidian ecosystem. This document serves as the single source of truth for architectural decisions, code quality standards, and development practices.

## Project Identity

**Project Name:** Obsidian Open Gate
**Purpose:** Enable users to embed any website into Obsidian, providing a seamless browsing and note-taking experience while maintaining the native Obsidian look and feel.
**Core Value Proposition:** Keep everything you need for research, studying, and web browsing in one place without context switching.

## Guiding Principles

### Principle 1: Iteration-First Development

**Declaration:** Every change MUST be designed for easy iteration, modification, and evolution. Iteration speed takes priority over premature optimization or clever abstractions.

**Requirements:**
- Write code that can be changed quickly without cascading effects
- Avoid tight coupling that makes iteration difficult
- Prefer small, incremental changes over large rewrites
- Design for fast feedback loops
- Before implementing, ask: "How easy would it be to change this tomorrow?"
- NEVER use workaround solutions - they create technical debt and impede future iteration
- NEVER fight framework conventions - work with Obsidian API patterns, not against them

**Rationale:** Fast iteration enables rapid response to user feedback, bug fixes, and feature evolution. Code that resists change becomes a liability in maintaining an active plugin ecosystem.

### Principle 2: KISS - Simplicity Above All

**Declaration:** Simplicity, readability, and maintainability are the top priorities. Complex solutions are rejected in favor of straightforward implementations.

**Requirements:**
- Write obvious code that any contributor can understand
- Avoid clever tricks, complex abstractions, or premature optimizations
- If you can't explain it simply, simplify the implementation
- Reject solutions that require extensive documentation to understand
- Code clarity trumps performance optimization unless performance is demonstrably critical

**Rationale:** Obsidian plugins are maintained by small teams or individuals. Simple code ensures maintainability, reduces bugs, and allows community contributions without extensive onboarding.

### Principle 3: YAGNI - You Aren't Gonna Need It

**Declaration:** Do not build features, abstractions, or utilities until they are actually needed. Speculation about future requirements is forbidden.

**Requirements:**
- Resist the temptation to add "future-proofing" code
- Wait for concrete use cases before creating abstractions
- Delete unused code immediately upon identification
- Three-or-more rule: Extract abstractions only when you have 3+ real occurrences
- Challenge every new dependency - is it absolutely necessary?

**Rationale:** Unused code adds cognitive load, increases bundle size, and creates maintenance burden without delivering user value. Obsidian users value lightweight, focused plugins.

### Principle 4: DRY - Don't Repeat Yourself (Judiciously)

**Declaration:** Eliminate duplication only when it improves clarity and maintainability. Some duplication is acceptable during exploration phases.

**Requirements:**
- Extract repeated logic into functions/components when you have 3+ occurrences
- Do not abstract too early - duplicate code during experimentation is acceptable
- Shared logic MUST have a clear, single purpose
- Abstractions must be simpler than the duplication they replace

**Rationale:** Premature abstraction is worse than duplication. Wait until patterns emerge naturally, then refactor with full context.

### Principle 5: First-Principles Root Cause Analysis

**Declaration:** Always think from first principles to find the true root cause of problems. Surface-level symptoms must not be accepted as the actual problem.

**Requirements:**
- Break down problems to their fundamental truths
- Ask "Why?" repeatedly until reaching the actual root cause
- Question all assumptions - what seems obvious may mask the real issue
- Before implementing a fix, verify you're solving the right problem
- A correct diagnosis is worth more than a quick patch

**Rationale:** Fixing symptoms leads to recurring issues and technical debt. Root cause fixes prevent entire classes of bugs and improve system understanding.

### Principle 6: Separation of Concerns

**Declaration:** Each module, function, and component MUST have ONE clear responsibility. Mixing concerns is prohibited.

**Requirements:**
- Keep data, logic, and presentation separate
- A function that fetches data should not also format it for display
- Changes to one concern should not require changes to unrelated code
- If describing a function's purpose requires "and", split it
- Follow Obsidian's architectural patterns (Views, Modals, Settings)

**Rationale:** Clear separation enables easier testing, debugging, and reusability. It aligns with Obsidian's plugin architecture and makes code predictable.

### Principle 7: Greenfield Development Mindset

**Declaration:** This project operates as a greenfield development. Backwards compatibility is not a priority. Deprecated code must be removed immediately.

**Requirements:**
- Do not keep old code, deprecated functions, or backwards compatibility shims
- Breaking changes are acceptable when they improve the codebase
- Remove unused exports, renamed functions, and obsolete patterns immediately
- Version bumps communicate breaking changes to users
- Migration guides are preferred over code complexity

**Rationale:** Maintaining backwards compatibility creates complexity, slows iteration, and increases bundle size. Clean breaks with clear communication serve users better than code cruft.

### Principle 8: Human Guidance Over Agreement

**Declaration:** Development guidance must prioritize truth and clarity over agreement. Developers are expected to identify blind spots, surface ambiguity, and challenge flawed reasoning.

**Requirements:**
- Correct misconceptions, even if uncomfortable
- Challenge flawed reasoning and point out logical errors
- Provide missing context that may not be immediately obvious
- Question before acting - if something feels unclear, ask
- Lead contributors to clarity rather than executing blindly

**Rationale:** Humans ask for help because they lack full context or are confused. Effective collaboration requires honest feedback, not unconditional validation. This creates better outcomes and shared understanding.

## Technical Standards

### Code Organization
- `/src` contains all plugin source code
- `/src/fns` contains pure utility functions with single responsibilities
- Modal classes handle UI interactions
- Views handle Obsidian pane rendering
- Settings tab handles plugin configuration

### Dependency Management
- Use `bun` as the package manager (NEVER npm)
- Minimize external dependencies
- Prefer native browser APIs over libraries
- All dependencies must be justified by concrete need

### Testing & Quality
- Type safety via TypeScript is mandatory
- No TypeScript errors are acceptable in production builds
- ESLint rules must be followed
- Prettier formatting is enforced via precommit hooks

### Obsidian Integration
- Follow Obsidian API conventions strictly
- Respect Obsidian's lifecycle hooks (onload, onunload)
- Use Obsidian's UI components when available
- Support both desktop and mobile platforms

## Governance

### Amendment Process
1. Proposed changes to this constitution must be documented with rationale
2. Changes must be validated against all dependent templates and command files
3. Version must be incremented according to semantic versioning:
   - **MAJOR**: Backward incompatible governance or principle removals/redefinitions
   - **MINOR**: New principle/section added or materially expanded guidance
   - **PATCH**: Clarifications, wording, typo fixes, non-semantic refinements
4. Sync Impact Report must be generated and prepended to this document
5. All templates and command files must be updated to reflect changes

### Versioning Policy
This constitution follows semantic versioning. All changes increment the version and update the Last Amended date.

### Compliance Review
- All feature specifications must reference applicable principles
- All implementation plans must demonstrate principle adherence
- Code reviews must validate principle compliance
- Principle violations must be corrected or explicitly documented with rationale

### Conflict Resolution
When principles appear to conflict, apply this priority order:
1. Iteration-First Development (enables all other principles)
2. First-Principles Root Cause Analysis (ensures solving right problems)
3. Simplicity (KISS) (prevents complexity creep)
4. YAGNI (prevents unnecessary work)
5. Separation of Concerns (maintains architecture)
6. DRY (reduces duplication judiciously)
7. Greenfield Development (keeps codebase clean)
8. Human Guidance (ensures shared understanding)

## Artifact Dependencies

The following artifacts depend on this constitution and must remain synchronized:

- `.specify/templates/plan-template.md` - Implementation planning template
- `.specify/templates/spec-template.md` - Feature specification template
- `.specify/templates/tasks-template.md` - Task breakdown template
- `.specify/templates/commands/*.md` - All slash command definitions
- `README.md` - Project overview and principles
- `/docs` - Documentation site content

Any amendment to this constitution triggers a validation pass across all dependent artifacts.

---

**Constitution Status:** Active
**Next Review:** As needed based on project evolution
