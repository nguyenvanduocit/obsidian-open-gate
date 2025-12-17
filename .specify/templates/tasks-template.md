# Tasks: [FEATURE_NAME]

**Generated:** [DATE]
**Status:** [NOT_STARTED | IN_PROGRESS | COMPLETED]
**Related Spec:** [spec.md link]
**Related Plan:** [plan.md link]

## Task Categories

Tasks are organized by constitutional principle and dependency order.

### Setup & Foundation

Tasks that establish the groundwork. Must be completed first.

- [ ] **[TASK-001]** [Task description]
  - **Principle**: [Which constitution principle applies]
  - **Files**: [File paths]
  - **Estimated Complexity**: [Low/Medium/High]
  - **Dependencies**: None
  - **Validation**: [How to verify completion]

### Core Implementation

Main feature implementation tasks. Follow dependency order.

- [ ] **[TASK-002]** [Task description]
  - **Principle**: [Constitution principle]
  - **Files**: [File paths]
  - **Estimated Complexity**: [Low/Medium/High]
  - **Dependencies**: TASK-001
  - **Validation**: [How to verify completion]

- [ ] **[TASK-003]** [Task description]
  - **Principle**: [Constitution principle]
  - **Files**: [File paths]
  - **Estimated Complexity**: [Low/Medium/High]
  - **Dependencies**: TASK-002
  - **Validation**: [How to verify completion]

### Integration

Obsidian-specific integration tasks.

- [ ] **[TASK-004]** [Task description]
  - **Principle**: [Constitution principle]
  - **Files**: [File paths]
  - **Estimated Complexity**: [Low/Medium/High]
  - **Dependencies**: TASK-003
  - **Validation**: [How to verify completion]

### Testing & Validation

Verification tasks. Can run parallel after core implementation.

- [ ] **[TASK-005]** Test on Obsidian desktop
  - **Principle**: First-Principles (verify root solution works)
  - **Files**: N/A
  - **Estimated Complexity**: Low
  - **Dependencies**: TASK-004
  - **Validation**: [Specific test cases pass]

- [ ] **[TASK-006]** Test on Obsidian mobile
  - **Principle**: First-Principles
  - **Files**: N/A
  - **Estimated Complexity**: Low
  - **Dependencies**: TASK-004
  - **Validation**: [Specific test cases pass]

### Documentation

Documentation tasks. Can run parallel with testing.

- [ ] **[TASK-007]** Update README.md
  - **Principle**: Human Guidance (clear communication)
  - **Files**: README.md
  - **Estimated Complexity**: Low
  - **Dependencies**: TASK-004
  - **Validation**: [Documentation is clear and accurate]

- [ ] **[TASK-008]** Update docs site
  - **Principle**: Human Guidance
  - **Files**: docs/**/*
  - **Estimated Complexity**: Low
  - **Dependencies**: TASK-004
  - **Validation**: [Tutorial is accurate]

### Cleanup & Finalization

Final tasks before release.

- [ ] **[TASK-009]** Remove deprecated code (if any)
  - **Principle**: Greenfield Development
  - **Files**: [Specific files]
  - **Estimated Complexity**: Low
  - **Dependencies**: TASK-004
  - **Validation**: No deprecated code remains

- [ ] **[TASK-010]** Update CHANGELOG.md
  - **Principle**: Human Guidance
  - **Files**: CHANGELOG.md
  - **Estimated Complexity**: Low
  - **Dependencies**: All prior tasks
  - **Validation**: Changelog accurately reflects changes

- [ ] **[TASK-011]** Bump version in manifest.json
  - **Principle**: Greenfield Development
  - **Files**: manifest.json, package.json
  - **Estimated Complexity**: Low
  - **Dependencies**: TASK-010
  - **Validation**: Version follows semver

## Task Execution Rules

1. **Dependency Order**: Complete dependencies before dependent tasks
2. **Iteration First**: Each task should be small enough to complete and test independently
3. **KISS**: If a task feels complex, break it down further
4. **YAGNI**: If a task builds something not immediately needed, defer it
5. **No Workarounds**: If you need a workaround, the task is wrong - redesign it

## Progress Tracking

- **Total Tasks**: [COUNT]
- **Completed**: [COUNT]
- **In Progress**: [COUNT]
- **Blocked**: [COUNT]

## Blockers

[List any tasks that are blocked and why]

- **[TASK-ID]**: [Blocking reason]

## Notes

[Any implementation notes, discoveries, or context that emerged during execution]

---

**To begin implementation:** `/speckit.implement`
