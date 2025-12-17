# Fix Issue Workflow for Obsidian Open Gate

Complete workflow for investigating and fixing GitHub issues.

## Quick Start

When a user reports an issue:

```bash
# 1. Fetch issue details
gh issue view <issue-number>

# 2. Investigate and fix
# 3. Test the fix
# 4. Commit using conventional commits
# 5. (Optional) Release if critical
```

## Step-by-Step Workflow

### 1. Fetch and Understand the Issue

```bash
# Get issue details with comments
gh issue view <issue-number> --json title,body,author,createdAt,state,labels,comments --jq '{title, body, author: .author.login, createdAt, state, labels: [.labels[].name], comments: [.comments[] | {author: .author.login, body: .body, createdAt: .createdAt}]}'
```

**Key things to identify:**
- What's the actual problem?
- What platform? (Desktop/Mobile/Android/iOS)
- What version of Obsidian?
- What version of Open Gate?
- Steps to reproduce
- Error messages or screenshots

### 2. Root Cause Analysis (First Principles)

**Ask these questions:**
1. **What is the symptom?** (e.g., `ERR_BLOCKED_BY_RESPONSE`)
2. **What is the immediate cause?** (e.g., browser blocking the response)
3. **Why is that happening?** (e.g., unsupported iframe attributes)
4. **What's the fundamental cause?** (e.g., Android 9 WebView doesn't support experimental features)

**Don't stop at surface-level fixes!** Keep asking "why?" until you reach the root cause.

### 3. Locate Relevant Code

**For mobile/iframe issues:**
```bash
# Check iframe implementation
cat src/fns/createIframe.ts

# Check webview implementation (desktop)
cat src/fns/createWebviewTag.ts

# Check the view that uses them
cat src/GateView.ts
```

**For gate registration/configuration issues:**
```bash
# Gate registration
cat src/fns/registerGate.ts

# Gate options
cat src/GateOptions.d.ts

# Main plugin logic
cat src/main.ts
```

**For UI/modal issues:**
```bash
# Settings tab
cat src/SetingTab.ts

# Modals
cat src/Modal*.ts
```

**Search for keywords:**
```bash
# Find where error might occur
grep -r "error keyword" src/

# Find function definitions
grep -r "function name" src/
```

### 4. Understand Platform Differences

**Desktop vs Mobile:**
- Desktop uses Electron `<webview>` tag (full browser capabilities)
- Mobile uses standard `<iframe>` (limited by browser security)

**Check platform detection:**
```typescript
Platform.isMobileApp // true on mobile, false on desktop
```

**Key files:**
- `src/fns/createWebviewTag.ts` - Desktop implementation
- `src/fns/createIframe.ts` - Mobile implementation
- `src/GateView.ts` - Decides which to use (line 20)

### 5. Implement the Fix

**Follow these principles:**

✅ **DO:**
- Use feature detection for browser APIs
- Keep it simple (KISS principle)
- Fix the root cause, not the symptom
- Maintain backward compatibility
- Add comments explaining WHY (not what)

❌ **DON'T:**
- Add workarounds (they create technical debt)
- Fight the framework (use Obsidian/Electron APIs properly)
- Add unnecessary abstractions
- Break existing functionality
- Assume all browsers support modern features

**Example fix pattern:**
```typescript
// Bad - assumes feature exists
iframe.setAttribute('credentialless', 'true')

// Good - feature detection
if ('credentialless' in iframe) {
    iframe.setAttribute('credentialless', 'true')
}
```

### 6. Test the Fix

**Build and verify:**
```bash
bun run build
```

**Manual testing checklist:**
- Does it fix the reported issue?
- Does it work on both desktop and mobile?
- Does it break any existing functionality?
- Does it work with the specific test case mentioned in the issue?

**If possible, test on the affected platform:**
- Android 9 for Android issues
- iOS for iOS issues
- Specific Obsidian versions if version-related

### 7. Commit the Fix

**Use conventional commit format:**

```bash
git add <files>
git commit -m "fix(<scope>): <description>

<optional body explaining the fix>

Fixes #<issue-number>"
```

**Scopes for this project:**
- `mobile` - Mobile platform issues
- `desktop` - Desktop-specific issues
- `iframe` - Iframe/webview issues
- `gate` - Gate registration/configuration
- `ui` - User interface/modals
- `settings` - Settings tab
- `protocol` - Protocol handler (obsidian://)
- `codeblock` - Code block processor

**Example commits:**
```bash
# Bug fix
git commit -m "fix(mobile): resolve android 9 webview compatibility issue

Add feature detection for credentialless iframe attribute and remove
invalid crossorigin attribute to fix ERR_BLOCKED_BY_RESPONSE errors.

Fixes #92"

# Feature
git commit -m "feat(gate): add custom icon support

Allow users to specify custom SVG icons for gates.

Closes #45"

# Performance
git commit -m "perf(webview): reduce memory usage in iframe rendering

Optimize iframe creation by removing unnecessary event listeners.

Fixes #78"
```

### 8. Update Issue Status

**Comment on the issue:**
```bash
gh issue comment <issue-number> --body "## 🔍 Investigation

Found the root cause: <explanation>

## 🛠️ Fix

Implemented: <what you did>

The fix will be available in the next release."
```

**For critical fixes, release immediately:**
```bash
# Follow /release workflow
# Then comment with release info
gh issue comment <issue-number> --body "## ✅ Fixed in v<version>

<Explanation>

### How to get the fix:
Update Open Gate to version <version> from Obsidian Community Plugins.

Release: https://github.com/nguyenvanduocit/obsidian-open-gate/releases/tag/<version>"
```

**Close the issue:**
```bash
# If fixed and released
gh issue close <issue-number> --reason completed

# If it's a duplicate
gh issue close <issue-number> --reason "not planned"

# If it's not a bug/won't fix
gh issue close <issue-number> --reason "not planned"
```

## Common Issue Patterns

### Android/iOS Compatibility Issues

**Symptoms:**
- `ERR_BLOCKED_BY_RESPONSE`
- `ERR_ACCESS_DENIED`
- Blank iframe/webview

**Common causes:**
- Unsupported browser features
- Invalid iframe attributes
- CORS/CSP violations
- Old WebView versions

**Investigation:**
1. Check `src/fns/createIframe.ts` for mobile
2. Verify iframe attributes are valid
3. Check browser feature support (caniuse.com)
4. Test on the specific platform/version

### Desktop-Only Issues

**Symptoms:**
- DevTools not working
- Custom user agent not applying
- Session isolation issues

**Investigation:**
1. Check `src/fns/createWebviewTag.ts`
2. Verify Electron webview API usage
3. Check partition/session configuration

### Gate Registration Issues

**Symptoms:**
- Gate not appearing in sidebar
- Command not showing in palette
- Icon not displaying

**Investigation:**
1. Check `src/fns/registerGate.ts`
2. Verify `src/main.ts` registration logic
3. Check icon handling in `src/fns/getSvgIcon.ts`
4. Verify settings in `PluginSetting` interface

### Protocol Handler Issues

**Symptoms:**
- `obsidian://opengate` links not working
- Wrong gate opening
- Parameters not being parsed

**Investigation:**
1. Check protocol registration in `src/main.ts`
2. Verify URL parsing logic
3. Check temp-gate handling

## Code Architecture Reference

### Key Files and Their Roles

**Core:**
- `src/main.ts` - Plugin entry point, lifecycle, settings
- `src/GateView.ts` - View implementation, renders gates
- `src/GateOptions.d.ts` - TypeScript definitions

**Frame Rendering:**
- `src/fns/createWebviewTag.ts` - Desktop (Electron webview)
- `src/fns/createIframe.ts` - Mobile (standard iframe)

**Registration:**
- `src/fns/registerGate.ts` - Registers view type, ribbon, commands
- `src/fns/registerCodeBlockProcessor.ts` - Code block support

**UI:**
- `src/SetingTab.ts` - Settings UI
- `src/Modal*.ts` - Various modals
- `src/fns/createFormEditGate.ts` - Gate edit form

**Utilities:**
- `src/fns/normalizeGateOption.ts` - Normalizes gate config
- `src/fns/openView.ts` - Opens gates programmatically
- `src/fns/getSvgIcon.ts` - Icon handling

### Functional Programming Principles

This codebase prefers:
- Pure functions (no side effects)
- Functions in `src/fns/` should be reusable
- Avoid complex abstractions
- Keep functions focused on one task

## Testing Strategy

**Before committing:**
1. ✅ Build succeeds: `bun run build`
2. ✅ TypeScript compiles: No errors in build output
3. ✅ Fix addresses the root cause
4. ✅ No new issues introduced
5. ✅ Works on reported platform/version

**Manual test cases:**
- Open gate from sidebar
- Open gate from command palette
- Open gate via protocol handler
- Open gate in code block
- Test on mobile (if mobile issue)
- Test with custom settings (CSS, JS, zoom, etc.)

## Quick Commands Reference

```bash
# View issue
gh issue view <number>

# Comment on issue
gh issue comment <number> --body "message"

# Close issue
gh issue close <number> --reason completed

# Search code
grep -r "keyword" src/

# Build
bun run build

# Format code
bun run format

# Run tests (if available)
bun test
```

## Tips

1. **Always think from first principles** - Don't accept surface explanations
2. **Test on the actual platform** - Emulators may not show all issues
3. **Read browser error messages carefully** - They often reveal the root cause
4. **Check browser compatibility** - Use caniuse.com for feature support
5. **Look for similar issues** - Search closed issues for patterns
6. **Ask the user for more info** - Don't guess, get specifics
7. **Document your reasoning** - Help future you understand why

## When to Release

**Release immediately for:**
- Critical bugs (crashes, data loss)
- Security issues
- Major platform compatibility issues (like Android 9)

**Batch with other changes for:**
- Minor UI issues
- Non-critical bugs
- Feature requests
- Documentation updates

Use your judgment based on impact and severity.
