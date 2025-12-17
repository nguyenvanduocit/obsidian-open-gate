# Release Workflow for Obsidian Open Gate

Execute the complete release workflow for this Obsidian plugin.

## Release Process

### 1. Ensure you're on main branch with latest changes
```bash
git checkout main
git pull origin main
```

### 2. Make sure the fix/feature is committed
If there are uncommitted changes, commit them first using conventional commit format:
```bash
git add <files>
git commit -m "<type>(<scope>): <description>

[optional body explaining why/how]

Fixes #<issue-number>"
```

**Common types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `chore`: Maintenance tasks
- `refactor`: Code refactoring
- `perf`: Performance improvements

### 3. Bump version in package.json
Determine the next version based on semver:
- **Patch** (1.11.10 → 1.11.11): Bug fixes
- **Minor** (1.11.10 → 1.12.0): New features (backward compatible)
- **Major** (1.11.10 → 2.0.0): Breaking changes

Edit `package.json`:
```json
"version": "1.11.11"
```

### 4. Run version bump script
This updates `manifest.json` and `versions.json`:
```bash
bun run version
```

This script:
- Reads version from `package.json`
- Updates `manifest.json` with new version
- Adds entry to `versions.json` with minAppVersion

### 5. Commit version bump changes
```bash
git add package.json manifest.json versions.json
git commit -m "chore(release): bump version to <version>"
```

### 6. Create git tag
```bash
git tag -a <version> -m "v<version>: <Short description>"
```

Example:
```bash
git tag -a 1.11.11 -m "v1.11.11: Fix Android 9 WebView compatibility"
```

### 7. Build the plugin
```bash
bun run build
```

Verify build succeeds and creates `main.js`.

### 8. Push to GitHub
```bash
git push origin main
git push origin --tags
```

**Note:** If you have old local tags that conflict with remote, delete them first:
```bash
git tag -d <old-tag>
```

### 9. Create GitHub Release
```bash
gh release create <version> \
  --title "v<version>: <Title>" \
  --notes "<Release notes in markdown>" \
  main.js manifest.json
```

**Release notes template:**
```markdown
## 🐛 Bug Fixes / ✨ Features

### Category
- **Title**: Description
  - Implementation detail 1
  - Implementation detail 2
  - Impact/benefit

Fixes #<issue-number>

## 📦 Installation

Update through Obsidian Community Plugins or download manually.

**Full Changelog**: https://github.com/nguyenvanduocit/obsidian-open-gate/compare/<previous-version>...<current-version>
```

### 10. Comment on related issues
If the release fixes specific issues, comment on them:
```bash
gh issue comment <issue-number> --body "## ✅ Fixed in v<version>

<Explanation of fix>

### How to get the fix:
Update Open Gate to version <version> from Obsidian Community Plugins.

<Link to release>"
```

## Quick Reference

**Files that need version updates:**
1. `package.json` - Edit manually first
2. `manifest.json` - Updated by `bun run version`
3. `versions.json` - Updated by `bun run version`

**Build artifacts for release:**
- `main.js` (required)
- `manifest.json` (required)
- `styles.css` (optional, if exists)

**GitHub CLI commands:**
- Create release: `gh release create <version>`
- View release: `gh release view <version>`
- Comment on issue: `gh issue comment <number>`
- View issue: `gh issue view <number>`

## Common Issues

### Merge conflicts during git pull
If there are conflicts after `git pull`:
```bash
# For binary files like bun.lockb, use ours
git checkout --ours bun.lockb
git add bun.lockb

# For version files, check which version is higher
git diff manifest.json
# Then manually resolve or use appropriate version
```

### Tag already exists on remote
```bash
# Delete local tag
git tag -d <tag>

# If needed, delete remote tag (careful!)
git push origin :refs/tags/<tag>
```

### Build fails
```bash
# Reinstall dependencies
bun install

# Check for TypeScript errors
bun run build
```

## Version History Pattern

This project follows the pattern:
- Frequent patch releases (1.11.6 → 1.11.7 → 1.11.8...)
- All versions support minAppVersion: `0.15.0`
- Each release documented in `versions.json`

## Automation Potential

Currently manual steps that could be automated:
1. Version bumping (could use `bun version patch/minor/major`)
2. Changelog generation (from conventional commits)
3. Release notes generation (from git log)

For now, keep manual to ensure quality and accuracy.
