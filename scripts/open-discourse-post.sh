#!/usr/bin/env bash

# Open Discourse forum with pre-filled release announcement
# This opens the browser - you just click "Create Topic"
# No API key needed!

set -e

VERSION="${1}"

if [ -z "$VERSION" ]; then
    echo "❌ Error: Version argument is required"
    echo "Usage: $0 <version>"
    exit 1
fi

# Get release notes from GitHub
echo "📥 Fetching release notes from GitHub..."
RELEASE_NOTES=$(gh release view "$VERSION" --json body --jq .body 2>/dev/null || echo "")

if [ -z "$RELEASE_NOTES" ]; then
    echo "⚠️  No release notes found on GitHub. Using template..."
    RELEASE_NOTES="See GitHub release for details."
fi

# Construct the topic title
TITLE="Open Gate v${VERSION} Released"

# Construct the full post body
POST_BODY="I'm happy to announce the release of **Open Gate v${VERSION}**!

${RELEASE_NOTES}

---

**Download:**
- Update through Obsidian Community Plugins (Settings → Community Plugins → Browse)
- Or download manually from [GitHub Releases](https://github.com/nguyenvanduocit/obsidian-open-gate/releases/tag/${VERSION})

**GitHub Repository:** https://github.com/nguyenvanduocit/obsidian-open-gate
**Documentation:** https://nguyenvanduocit.github.io/obsidian-open-gate/

Feel free to report any issues or feedback!"

# URL-encode the title and body
TITLE_ENCODED=$(printf %s "$TITLE" | jq -sRr @uri)
BODY_ENCODED=$(printf %s "$POST_BODY" | jq -sRr @uri)

# Category ID for plugin releases
CATEGORY_ID=14

# Construct the URL
FORUM_URL="https://forum.obsidian.md/new-topic?category=${CATEGORY_ID}&title=${TITLE_ENCODED}&body=${BODY_ENCODED}"

# Copy to clipboard for easy pasting
echo "$POST_BODY" | pbcopy 2>/dev/null || echo "$POST_BODY" | xclip -selection clipboard 2>/dev/null || true

echo ""
echo "==================================="
echo "📝 Opening Discourse Forum"
echo "==================================="
echo ""
echo "A browser window will open with your release announcement pre-filled."
echo ""
echo "✅ Steps to complete:"
echo "  1. Review the title and content"
echo "  2. Make any edits you want"
echo "  3. Click 'Create Topic'"
echo ""
echo "📋 The post content has been copied to your clipboard (backup)"
echo ""

# Open in browser
if command -v open >/dev/null 2>&1; then
    open "$FORUM_URL"
elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$FORUM_URL"
else
    echo "Could not open browser automatically."
    echo "Please visit: $FORUM_URL"
fi

echo ""
echo "🔗 Forum URL: https://forum.obsidian.md/c/plugin-releases/14"
echo ""
