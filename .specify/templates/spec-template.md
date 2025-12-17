# Feature Specification: [FEATURE_NAME]

**Version:** 1.0.0
**Created:** [DATE]
**Last Updated:** [DATE]
**Status:** [DRAFT | APPROVED | IMPLEMENTED]

## Overview

[One-paragraph summary of what this feature does and why it exists.]

## User Problem

[Describe the user problem from first principles. What pain point are we solving?]

## Goals

[What are we trying to achieve? Keep focused - YAGNI applies here.]

1. [Primary goal]
2. [Secondary goal]
...

## Non-Goals

[Explicitly state what this feature will NOT do. This prevents scope creep.]

1. [Non-goal 1]
2. [Non-goal 2]
...

## User Experience

### User Flow

[Describe how users will interact with this feature. Keep it simple.]

1. User does [action]
2. System responds with [response]
3. User sees [result]

### UI/UX Design

[If applicable, describe UI changes. Follow Obsidian's design patterns.]

- **Location**: [Where in Obsidian UI]
- **Appearance**: [Visual description]
- **Interaction**: [How users interact]

## Technical Specification

### Architecture

[High-level technical approach. Reference constitution principles.]

**Principle Alignment:**
- **Iteration-First**: [How this design supports easy changes]
- **KISS**: [Why this is the simplest approach]
- **Separation of Concerns**: [How responsibilities are split]

### Data Model

[If applicable, describe data structures. Keep minimal - YAGNI.]

```typescript
// Example structure
interface [InterfaceName] {
  [field]: [type]; // Purpose
}
```

### API Surface

[What functions/methods will be exposed? Only what's needed now.]

```typescript
// Example API
function [functionName]([params]): [returnType] {
  // Single responsibility
}
```

### Obsidian Integration Points

[Which Obsidian APIs will be used?]

- `[API name]` - [Purpose]

## Requirements

### Must Have

[Core requirements - the minimum viable feature]

1. [Requirement 1]
2. [Requirement 2]
...

### Should Have

[Nice-to-have features that can be deferred]

1. [Requirement 1]
2. [Requirement 2]
...

### Won't Have (This Version)

[Explicitly deferred - YAGNI in action]

1. [Deferred feature 1]
2. [Deferred feature 2]
...

## Edge Cases

[List known edge cases and how we'll handle them]

1. **[Edge case]**: [Handling approach]
2. **[Edge case]**: [Handling approach]

## Dependencies

[New dependencies required. Each must be justified.]

- `[dependency]` - [Why it's absolutely necessary]

## Testing Criteria

[How do we know this works?]

### Desktop Testing
- [ ] [Test case 1]
- [ ] [Test case 2]

### Mobile Testing
- [ ] [Test case 1]
- [ ] [Test case 2]

## Documentation Needs

[What documentation must be updated?]

- [ ] README.md - [Section]
- [ ] docs/ - [Page]
- [ ] Code comments - [Where]

## Migration/Breaking Changes

[Will this break existing functionality? How will users migrate?]

- **Breaking**: [Yes/No]
- **Migration Path**: [If applicable]
- **Version Bump**: [Major/Minor/Patch]

## Open Questions

[Unresolved questions that need answers]

1. [Question 1]
2. [Question 2]

## Approval

- [ ] Specification reviewed
- [ ] Constitution compliance verified
- [ ] Open questions resolved
- [ ] Ready for implementation planning

---

**Next Step:** Create implementation plan using `/speckit.plan`
