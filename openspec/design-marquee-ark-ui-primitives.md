# Design: Marquee Refactoring to Ark UI Primitives

## Technical Approach

Refactor the existing custom Marquee component to use Ark UI's `@ark-ui/react` and `@ark-ui/solid` Marquee primitives while preserving backward compatibility. The goal is to leverage Ark's built-in functionality (autoFill, spacing, pause controls) while maintaining the existing API surface and behavior.

## Architecture Decisions

### Decision: Use Ark UI Marquee Primitives

**Choice**: Import and wrap Ark UI primitives (`Marquee.Root`, `Marquee.Viewport`, `Marquee.Content`) rather than building from scratch.

**Alternatives considered**:

- Keep custom implementation with CSS animations only
- Use only `Marquee.Root` and compose manually

**Rationale**: Ark UI primitives provide:

- Built-in `autoFill` prop to auto-duplicate content
- `spacing` prop for gap control
- Proper ARIA attributes and accessibility
- Context API for programmatic control (`useMarquee` hook)
- Consistent patterns with other Ark UI components in the codebase

---

### Decision: Preserve Existing Props API

**Choice**: Maintain `speed`, `direction`, `children`, and add `gap` prop while mapping to Ark UI equivalents.

**Alternatives considered**:

- Change API to match Ark UI (`duration` instead of `speed`, etc.)
- Add all Ark UI props (`autoFill`, `pauseOnHover`, etc.)

**Rationale**:

- Current component is already in production (documented in docs)
- Breaking API changes would require migration guide
- The docs already mention `gap` prop that wasn't implemented — this is the chance to add it

---

### Decision: CSS Keyframes Injection Strategy

**Choice**: Export CSS keyframes to a dedicated CSS file (e.g., `marquee.css`) imported at component level, rather than runtime DOM injection.

**Alternatives considered**:

- Keep runtime `document.createElement("style")` injection (current approach)
- Use inline CSS-in-JS with keyframes

**Rationale**:

- Runtime injection causes hydration mismatches and flashes
- CSS file can be imported once and works with SSR frameworks
- Follows project pattern (other components have dedicated CSS files for complex styles)

---

### Decision: SSR Handling

**Choice**: Import CSS in component module (ES module side-effect) and use CSS-only animation without JS-dependent behavior on first render.

**Alternatives considered**:

- Use `typeof window !== "undefined"` guards
- Dynamic import of CSS

**Rationale**:

- Ark UI Marquee animates via CSS, not JS
- No client-only behavior needed for basic marquee
- Importing CSS at module level works with SSR (Next.js, Astro, etc.)

---

### Decision: Solid.js Implementation Strategy

**Choice**: Implement Solid version using `@ark-ui/solid` primitives with the same API surface as React.

**Alternatives considered**:

- Use different approach for Solid (signals-based animation)
- Share single implementation

**Rationale**:

- Ark UI provides Solid primitives
- Components should have consistent behavior across frameworks
- Solid component structure already follows similar patterns (splitProps)

---

## Data Flow

```
User Component
     │
     ▼
Marquee (wrapper)
     │
     ├─► Marquee.Root (Ark) ──► Root CSS (animations, variables)
     │
     ├─► Marquee.Viewport (Ark) ──► overflow-hidden
     │
     └─► Marquee.Content (Ark) ──► animated content with spacing
            │
            └─► Children duplicated via autoFill or manual
```

## File Changes

| File                                           | Action | Description                                 |
| ---------------------------------------------- | ------ | ------------------------------------------- |
| `packages/react/src/components/ui/marquee.tsx` | Modify | Refactor to use Ark UI primitives           |
| `packages/react/src/styles/marquee.css`        | Create | CSS keyframes and base styles               |
| `packages/solid/src/components/ui/marquee.tsx` | Modify | Refactor to use Ark UI primitives           |
| `packages/solid/src/styles/marquee.css`        | Create | CSS keyframes and base styles (or share)    |
| `packages/shared/src/styles/marquee.css`       | Create | Shared CSS (optional - consider extracting) |

## Interfaces / Contracts

### React Marquee Props

```typescript
import { type ComponentProps } from "react"

export interface MarqueeProps extends ComponentProps<"div"> {
  /** Animation speed (items per second), default: 50 */
  speed?: number
  /** Scroll direction, default: "left" */
  direction?: "left" | "right"
  /** Gap between items, default: 16 (1rem) */
  gap?: number
  /** Auto-fill viewport with duplicated content, default: true */
  autoFill?: boolean
  /** Pause animation on hover, default: true */
  pauseOnHover?: boolean
}
```

### Component Structure

```typescript
import { Marquee as MarqueePrimitive } from "@ark-ui/react/marquee"
import "@/styles/marquee.css"

export function Marquee({
  speed = 50,
  direction = "left",
  gap = 16,
  autoFill = true,
  pauseOnHover = true,
  children,
  ...props
}: MarqueeProps) {
  // Convert speed to duration: speed=50 means 50 items/sec
  // Duration formula: 1000ms / speed * items
  const duration = () => 1000 / speed

  return (
    <MarqueePrimitive.Root
      data-slot="marquee"
      animationDuration={duration()}
      direction={direction === "right" ? "reverse" : "normal"}
      spacing={gap}
      autoFill={autoFill}
      pauseOnHover={pauseOnHover}
      {...props}
    >
      <MarqueePrimitive.Viewport className="overflow-hidden">
        <MarqueePrimitive.Content>
          {children}
        </MarqueePrimitive.Content>
      </MarqueePrimitive.Viewport>
    </MarqueePrimitive.Root>
  )
}
```

### CSS Required

```css
/* packages/*/src/styles/marquee.css */
@layer utilities {
  @keyframes marquee-x {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(var(--marquee-translate, -100%));
    }
  }

  @keyframes marquee-y {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(var(--marquee-translate, -100%));
    }
  }

  [data-part="content"] {
    animation: marquee-x var(--marquee-duration, 30s) linear infinite;
  }

  [data-part="content"][data-reverse] {
    animation-direction: reverse;
  }
}
```

## Testing Strategy

| Layer       | What to Test                         | Approach                            |
| ----------- | ------------------------------------ | ----------------------------------- |
| Unit        | Props pass-through to Ark primitives | Vitest - verify props map correctly |
| Unit        | CSS keyframes exist and are valid    | Vitest - check CSS file contents    |
| Integration | Direction "right" maps to "reverse"  | Vitest - verify animation direction |
| Integration | Gap value maps to CSS variable       | Vitest - verify spacing prop        |
| Integration | Children render inside viewport      | Vitest - render and inspect DOM     |
| E2E         | Animation runs without jank          | Playwright - visual regression      |
| E2E         | Pause on hover works                 | Playwright - hover and check state  |

## Migration / Rollout

1. **Phase 1**: Create new implementation alongside existing
2. **Phase 2**: Add CSS file with keyframes
3. **Phase 3**: Swap implementation (keep same exports)
4. **Phase 4**: Update docs to use new `gap` prop
5. **Phase 5**: Deprecate any removed props

No data migration required — purely UI refactor.

## Open Questions

- [ ] Should `gap` default to `0` (current behavior) or `16` (new reasonable default)?
- [ ] Should we export sub-components (`MarqueeItem`, `MarqueeContent`) like docs show?
- [ ] Should the Solid CSS be shared with React (in monorepo shared package) or duplicated?
- [ ] Do we need to support `vertical` direction (not in current implementation)?
