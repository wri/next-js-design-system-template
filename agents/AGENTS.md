# AI Agent Instructions — WRI Design System

This file provides context for AI coding agents working on WRI projects.
It is the **canonical source of truth** — do not edit the IDE-specific copies directly.
The setup script distributes this file to the correct location for each IDE.

---

## What is the WRI Design System?

`@worldresources/wri-design-systems` is the **standard component library for all World Resources Institute products**. It is built on top of Chakra UI v3 and provides WRI-branded, pre-styled components shared across multiple projects.

Because the library ships its own styles and design tokens, **do not override component styles with custom CSS**. Visual consistency across products depends on this.

| Resource          | URL                                                                      |
| ----------------- | ------------------------------------------------------------------------ |
| Storybook         | https://wri.github.io/wri-design-systems/                                |
| GitHub repo       | https://github.com/wri/wri-design-systems                                |
| GitHub README     | https://github.com/wri/wri-design-systems#readme                         |
| Component READMEs | `src/components/<Category>/<ComponentName>/README.md` in the GitHub repo |
| npm               | https://www.npmjs.com/package/@worldresources/wri-design-systems         |
| Style guide       | https://zeroheight.com/4221801da                                         |

---

## MCP Servers

Two MCP servers are configured for this project. **Query them before writing any component code** — never assume props or token names from memory.

### Storybook MCP

Exposes WRI DS component stories, props, and usage patterns directly from the hosted Storybook.
Use it to verify: which WRI DS components exist, their props, and documented usage examples.

```json
{
  "mcpServers": {
    "wri-storybook": {
      "command": "npx",
      "args": ["-y", "storybook-mcp@latest"],
      "env": {
        "STORYBOOK_URL": "https://wri.github.io/wri-design-systems/index.json"
      }
    }
  }
}
```

### Chakra UI MCP

Exposes Chakra UI v3 component props, design tokens, and migration guidance.
Use it as fallback when a component is not in the WRI DS.

```json
{
  "mcpServers": {
    "chakra-ui": {
      "command": "npx",
      "args": ["-y", "@chakra-ui/react-mcp"]
    }
  }
}
```

> **Note:** The project setup script configures both MCP servers automatically.
> Run it once after cloning — see the README for instructions.

---

## Component Hierarchy — Never Skip a Level

```
1. @worldresources/wri-design-systems  ^2.189.0  — always check first
2. @chakra-ui/react                    ^3.8.1    — fallback only
3. Custom code                                   — last resort; add justification comment
```

### Level 1 — WRI Design System

Check the [Storybook](https://wri.github.io/wri-design-systems/) or query the Storybook MCP first. For detailed props and usage notes, also check the component's individual README in the [GitHub repo](https://github.com/wri/wri-design-systems) at `src/components/<Category>/<ComponentName>/README.md` — for example: [`Panel/README.md`](https://github.com/wri/wri-design-systems/blob/main/src/components/Containers/Panel/README.md).

```tsx
// ✅ Correct
import { Button } from "@worldresources/wri-design-systems";

<Button variant="primary">Save</Button>;
```

### Level 2 — Chakra UI (fallback only)

Only use Chakra directly if there is **no WRI DS equivalent**. Use the Chakra MCP to verify props — do not rely on memory. Chakra v3 has breaking changes from v2.

```tsx
// ✅ Acceptable — no WRI DS equivalent exists
import { Skeleton } from "@chakra-ui/react";
```

### Level 3 — Custom Code (last resort)

When neither the WRI DS nor Chakra covers the use case, you **must**:

1. Add a `// [CUSTOM COMPONENT]` comment on the line above the definition.
   This is a searchable marker — find all custom components with "Find in Files" → `[CUSTOM COMPONENT]`.
2. Add a brief justification explaining why no DS or Chakra component was used.

```tsx
// [CUSTOM COMPONENT] — No WRI DS or Chakra equivalent for map tooltip overlay
const MapTooltip = ({ lat, lng, children }: MapTooltipProps) => {
  ...
}
```

---

## Design Tokens

WRI DS tokens are defined as Chakra semantic tokens. **Never hardcode values** that have a token equivalent.

```tsx
// ❌ Wrong — hardcoded colour
<Box bg="#2C7D6E" />

// ✅ Correct — semantic token
<Box bg="brand.primary" />
```

If unsure what tokens exist, use the Chakra MCP (`get_theme`) or check the [style guide](https://zeroheight.com/4221801da).

### Color Palette — Authoritative Source

The project's `ChakraProvider` in `src/components/Providers/index.tsx` is the **single source of truth for all color overrides** in this project. Before suggesting or using any color token, read that file to see which palette scales are defined and what values they map to.

**Do not invent, assume, or guess color token names or values.** The provider only extends the following palette scales:

| Scale        | Defined steps                     | Notes                                     |
| ------------ | --------------------------------- | ----------------------------------------- |
| `neutral`    | 300, 500, 700                     | Overrides Chakra defaults                 |
| `primary`    | 100, 200, 500, 600, 700, 800, 900 | Overrides Chakra defaults                 |
| `secondary`  | 500                               | Overrides Chakra defaults                 |
| `success`    | _(none currently overridden)_     | Falls back to WRI DS `designSystemStyles` |
| `warning`    | _(none currently overridden)_     | Falls back to WRI DS `designSystemStyles` |
| `error`      | _(none currently overridden)_     | Falls back to WRI DS `designSystemStyles` |
| `accessible` | _(none currently overridden)_     | Falls back to WRI DS `designSystemStyles` |

For scales marked as "not overridden", their values come from the WRI DS `designSystemStyles` system context — **do not guess these values**. Query the Storybook MCP to verify what values are available.

### How to Use Color Tokens — `getThemedColor`

Colors must always be accessed via `getThemedColor` exported from `@worldresources/wri-design-systems`. **Never use raw token strings as JSX prop values.**

```tsx
import { getThemedColor } from "@worldresources/wri-design-systems";

// ❌ Wrong — raw token string
<Box bg="primary.500" />

// ✅ Correct — use getThemedColor
<Box bg={getThemedColor('primary', 500)} />
<Box color={getThemedColor('neutral', 300)} />
<Box borderColor={getThemedColor('success', 500)} />
```

**Full function signature:**

```typescript
getThemedColor(
  variant: "neutral" | "primary" | "secondary" | "success" | "warning" | "error" | "accessible",
  index:
    | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
    | "text-on-primary-mids"
    | "text-on-secondary-mids"
    | "controls-on-neutral-lights"
    | "controls-on-neutral-darks"
): string
```

**Rules:**

- Only call `getThemedColor` with a `variant`/`index` combination that is confirmed to exist.
- For overridden scales (`neutral`, `primary`, `secondary`), valid steps are listed in the table above.
- For non-overridden scales (`success`, `warning`, `error`, `accessible`), query the Storybook MCP before using any step — do not assume which steps are defined.

---

## What NOT to Do

```tsx
// ❌ Do not use a Chakra component that the WRI DS already wraps
import { Button } from "@chakra-ui/react"  // → use WRI DS Button

// ❌ Do not override WRI DS styles
<Button sx={{ backgroundColor: "red" }}>Delete</Button>

// ❌ Do not hardcode design values
<Text fontSize="14px" color="#333333">Label</Text>

// ❌ Do not use raw token strings as color props — always use getThemedColor
<Box bg="primary.500" />  // → use getThemedColor('primary', 500)

// ❌ Do not create custom components without the searchable marker
const MyButton = () => <button style={{ background: "blue" }}>Click</button>

// ❌ Do not skip the hierarchy — always check WRI DS and Chakra before going custom

// ❌ Do not use Chakra v2 API — v3 has breaking changes (e.g. colorScheme is removed)
//    Always verify props via the Chakra MCP
```

---

## Quick Reference

| Question                                      | Where to look                                                              |
| --------------------------------------------- | -------------------------------------------------------------------------- |
| Does a WRI DS component exist?                | [Storybook](https://wri.github.io/wri-design-systems/) or Storybook MCP    |
| Detailed props / usage for a WRI DS component | Component README in GitHub: `src/components/<Category>/<Name>/README.md`   |
| What props does a Chakra component accept?    | Chakra MCP → `get_component_props`                                         |
| What design tokens are available?             | Chakra MCP → `get_theme` or [Zeroheight](https://zeroheight.com/4221801da) |
| Which color scales/steps are overridden here? | Read `src/components/Providers/index.tsx` — that is the source of truth    |
| Which steps exist for non-overridden scales?  | Query Storybook MCP — do not guess                                         |
| How do I use a color in JSX?                  | `getThemedColor('scale', step)` from `@worldresources/wri-design-systems`  |
| Where are all custom components in this repo? | "Find in Files" → `[CUSTOM COMPONENT]`                                     |
