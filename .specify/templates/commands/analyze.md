# Analyze Cross-Artifact Consistency

You are performing a non-destructive consistency and quality analysis across specification artifacts.

## Artifacts to Analyze

1. `.specify/memory/constitution.md` - Project principles
2. `spec.md` - Feature specification
3. `plan.md` - Implementation plan (if exists)
4. `tasks.md` - Task breakdown (if exists)

## Analysis Dimensions

### Constitutional Compliance

For each artifact, verify:
- [ ] References appropriate constitutional principles
- [ ] Demonstrates iteration-first thinking
- [ ] Follows KISS - no unnecessary complexity
- [ ] Applies YAGNI - no speculative features
- [ ] Uses first-principles reasoning
- [ ] Maintains separation of concerns
- [ ] Adheres to greenfield mindset (no backwards-compat cruft)

### Cross-Artifact Consistency

Check for:
- [ ] Spec goals align with plan approach
- [ ] Plan steps match task breakdown
- [ ] Task dependencies are logical and constitutional
- [ ] File modifications are consistent across artifacts
- [ ] No contradictions between spec, plan, and tasks

### Quality Checks

- [ ] Spec is concrete, not vague
- [ ] Plan justifies architectural decisions
- [ ] Tasks are small, testable, and independent
- [ ] Dependencies are explicitly stated
- [ ] Obsidian API usage is correct

## Output Format

Generate a report with:

### ✅ Strengths
[What's well-aligned and constitutional]

### ⚠️ Warnings
[Potential issues, inconsistencies, or principle violations]

### 🔍 Recommendations
[Suggested improvements based on constitution]

### 📊 Metrics
- Constitutional principle coverage: X/8
- Artifact consistency score: [High/Medium/Low]
- YAGNI violations detected: [Count]
- Complexity red flags: [Count]

Do NOT modify any files. This is a read-only analysis.
