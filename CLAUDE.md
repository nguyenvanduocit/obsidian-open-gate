# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Obsidian Open Gate is an Obsidian plugin that allows users to embed any website into Obsidian as a "Gate". The plugin creates custom views that can display web content either as sidebar panels or inline within notes.

## Build & Development Commands

**Build:**
```bash
bun run build
```
This runs TypeScript type checking and builds the production bundle via esbuild.

**Development:**
```bash
bun run dev
```
Runs esbuild in watch mode for development. Note: This plugin does NOT require running a dev server - it builds the plugin bundle that Obsidian loads directly.

**Format:**
```bash
bun run format
```
Formats code using Prettier.

**Documentation:**
```bash
bun run docs:dev      # Start VitePress docs dev server
bun run docs:build    # Build documentation
bun run docs:preview  # Preview built docs
```

## Architecture

### Core Plugin Architecture

**Entry Point:** `src/main.ts` exports `OpenGatePlugin` class
- Extends Obsidian's `Plugin` class
- Manages plugin lifecycle (`onload`, settings, commands, protocol handlers)
- Settings stored in `PluginSetting` interface containing `uuid` and `gates` (Record<string, GateFrameOption>)
- Each gate is registered with a unique ID and creates a custom Obsidian view

### Key Concepts

**Gate:** A configured website embed with properties defined in `GateFrameOption`:
- `id`: Unique identifier
- `title`: Display name
- `url`: Target URL
- `icon`: SVG code or Lucide icon ID
- `profileKey`: Electron partition key (similar to Chrome profiles)
- `hasRibbon`: Whether to show in left sidebar
- `position`: Where to open ('left', 'center', 'right')
- `userAgent`: Custom user agent string
- `zoomFactor`: Zoom level (0.5 to 2.0)
- `css`: Custom CSS to inject into the page
- `js`: Custom JavaScript to execute in the page

**Gate View:** `GateView` class (extends `ItemView`) renders the actual web content
- Uses Electron `<webview>` tag on desktop for full browser capabilities
- Falls back to `<iframe>` on mobile (limited by browser restrictions)
- Desktop webview supports: DevTools, custom user agents, session isolation, CSS/JS injection
- Each gate type is registered as a unique Obsidian view type

### Frame Rendering Strategy

**Desktop (Electron):** `createWebviewTag()` in `src/fns/createWebviewTag.ts`
- Creates Electron `<webview>` with partition (session isolation)
- Supports CSS/JS injection via `insertCSS()` and `executeJavaScript()`
- Can bypass CORS and iframe restrictions
- Supports DevTools for debugging

**Mobile:** `createIframe()` in `src/fns/createIframe.ts`
- Standard HTML iframe (limited capabilities)
- Subject to browser security restrictions

### Three Ways to Use Gates

1. **Sidebar/Panel Views:** Registered via `registerGate()` which creates:
   - Obsidian view registration
   - Optional ribbon icon (left sidebar)
   - Command palette entry for opening the gate

2. **Inline Embedded in Notes:** Via `gate` code blocks
   - Processed by `registerCodeBlockProcessor()`
   - Supports YAML configuration inside code block
   - Can reference existing gates by title/URL to inherit settings
   - Custom `height` property for inline frames

3. **Protocol Handler:** `obsidian://opengate?url=...&title=...&id=...`
   - Opens gates via URL protocol
   - Can target existing gates or open temp gate with custom URL

### Gate Registration Flow

When a gate is added:
1. User creates gate via modal (`ModalEditGate`) or onboarding (`ModalOnboarding`)
2. `addGate()` normalizes the gate option
3. `registerGate()` registers the view type with Obsidian
4. Optionally adds ribbon icon and command
5. Gate saved to plugin settings

### File Organization

- `src/main.ts`: Main plugin class and lifecycle
- `src/GateView.ts`: Custom view implementation for rendering gates
- `src/GateOptions.d.ts`: TypeScript definitions for gate configuration
- `src/Modal*.ts`: Various modals for creating/editing/listing gates
- `src/SetingTab.ts`: Plugin settings UI
- `src/fns/`: Pure functions (following functional programming principles)
  - `create*.ts`: Factory functions for creating UI elements
  - `register*.ts`: Functions for registering with Obsidian API
  - `setup*.ts`: Setup/initialization functions
  - Helper functions (normalize, fetch, open, unload)

### Functional Programming Approach

Per CONTRIBUTING.md, this codebase prefers pure functions that:
- Have no side effects
- Always return the same output for the same input
- Are easy to test and reuse across projects

Many functions in `src/fns/` are written as pure, reusable utilities.

## Important Implementation Notes

- **Never use npm** - always use `bun` for package management
- **Platform detection:** Use `Platform.isMobileApp` to determine desktop vs mobile
- **Icon handling:** If icon starts with `<svg`, it's custom SVG code; otherwise it's a Lucide icon ID
- **Gate changes:** Most gate modifications require Obsidian reload to take effect (ribbon icons, commands registered on load)
- **Webview partition:** The `profileKey` creates isolated sessions - different gates can have different cookies/storage
- **Custom SVG icons:** Registered via `addIcon()` using the gate ID as the icon name
- **Temp gate:** A special gate (`id: 'temp-gate'`) is registered for protocol handler use when opening URLs without existing gate config
