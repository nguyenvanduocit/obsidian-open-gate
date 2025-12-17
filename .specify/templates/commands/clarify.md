# Clarify Feature Specification

You are helping clarify underspecified areas in the current feature specification (`spec.md`).

## Process

1. Read the current `spec.md` file
2. Identify areas that are vague, ambiguous, or underspecified
3. Reference the project constitution at `.specify/memory/constitution.md` to ensure questions align with project principles
4. Generate 3-5 highly targeted clarification questions
5. Present questions to the user using AskUserQuestion tool
6. Encode answers back into `spec.md`

## Question Guidelines

- **First-Principles Thinking**: Ask "why" questions that get to root requirements
- **YAGNI Validation**: Challenge features that might not be needed
- **KISS Enforcement**: If something seems complex, ask if there's a simpler approach
- **Separation of Concerns**: Clarify responsibility boundaries
- **Iteration-First**: Ask about change scenarios - "what if X changes?"

## Example Questions

- "What is the root problem this feature solves for users?"
- "Is [complex feature X] actually needed, or can we defer it?"
- "What's the simplest version that delivers core value?"
- "Which Obsidian API should handle [responsibility X]?"
- "If this requirement changes, which code would need to update?"

## Output

Update `spec.md` with clarified information, removing ambiguity and adding concrete details based on user responses.
