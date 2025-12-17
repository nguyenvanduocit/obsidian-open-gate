# Generate Feature Checklist

Generate a custom, actionable checklist for the current feature based on user requirements and constitutional principles.

## Process

1. Read the feature specification (`spec.md`)
2. Read the project constitution (`.specify/memory/constitution.md`)
3. Generate a checklist tailored to this specific feature
4. Ensure checklist items validate constitutional compliance

## Checklist Structure

### Constitutional Compliance
- [ ] Iteration-first: Code changes are easy to modify
- [ ] KISS: Solution is as simple as possible
- [ ] YAGNI: No speculative features included
- [ ] DRY: Abstractions only where truly needed
- [ ] First-principles: Root cause/requirement identified
- [ ] Separation of concerns: Single responsibility per module
- [ ] Greenfield: No deprecated code patterns
- [ ] No workarounds: Works with framework, not against it

### Feature-Specific Items
[Generated based on spec.md content]

### Code Quality
- [ ] TypeScript strict mode compliance
- [ ] No ESLint errors
- [ ] Prettier formatting applied
- [ ] Functions are single-purpose
- [ ] No util/helper proliferation

### Obsidian Integration
- [ ] Follows Obsidian API conventions
- [ ] Uses appropriate Obsidian UI components
- [ ] Respects plugin lifecycle (onload/onunload)
- [ ] Tested on desktop
- [ ] Tested on mobile

### Documentation
- [ ] README.md updated (if user-facing)
- [ ] Code comments only where necessary
- [ ] CHANGELOG.md updated
- [ ] Docs site updated (if applicable)

### Release Readiness
- [ ] Version bumped (manifest.json, package.json)
- [ ] Breaking changes documented
- [ ] Manual testing completed
- [ ] No deprecated code remains

## Output

Save the generated checklist as `checklist.md` in the feature directory.
