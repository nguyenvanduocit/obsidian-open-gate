#!/usr/bin/env bash

# Wrapper script that calls the release skill's Discourse posting script
# This keeps the Discourse functionality in the release skill folder

SKILL_DIR="$HOME/.claude/skills/release"
SCRIPT="$SKILL_DIR/open-discourse-post.sh"

if [ ! -f "$SCRIPT" ]; then
    echo "❌ Error: Discourse posting script not found at: $SCRIPT"
    echo "Make sure the release skill is installed."
    exit 1
fi

# Pass all arguments to the skill script
exec "$SCRIPT" "$@"
