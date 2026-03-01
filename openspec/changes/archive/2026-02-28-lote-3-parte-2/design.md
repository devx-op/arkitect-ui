# Design: Lote 3 Parte 2 - Remaining Components

## Technical Approach

Implement 10 components following established Arkitect UI patterns:

- Exceptions (center, grid-pattern, grid): Pure semantic HTML with Tailwind CSS
- Chart: SVG-based implementation
- copy-id-button: Custom button with clipboard API
- infinite-slider: CSS animation-based infinite scroll
- input-group: Wrapper component
- textarea: Custom component with CVA styling
- tooltip: Ark UI Tooltip primitive
- Stack/HStack/VStack: Custom flexbox implementation

## Architecture Decisions

### Decision: Tooltip Implementation

**Choice**: Use @ark-ui/react and @ark-ui/solid Tooltip primitives directly
**Alternatives considered**: Custom CSS-only tooltip
**Rationale**: Ark UI provides proper accessibility, positioning, and animation out of the box

### Decision: Chart Implementation

**Choice**: Simple SVG-based implementation with basic chart types
**Alternatives considered**: Integrate Chart.js or Recharts library
**Rationale**: Keep dependencies minimal; SVG approach provides basic functionality without external library weight

### Decision: Infinite Slider Implementation

**Choice**: CSS transform-based infinite scroll using duplicate content
**Alternatives considered**: JavaScript-based position calculation
**Rationale**: CSS-only approach is more performant and simpler to implement

### Decision: Stack Components

**Choice**: Custom flexbox implementation with direction, alignment, and gap props
**Alternatives considered**: Use existing Box or generic div
**Rationale**: Provides consistent layout primitives that are commonly needed

## File Changes

### React Components (10)

| File                                                   | Action | Description                   |
| ------------------------------------------------------ | ------ | ----------------------------- |
| `packages/react/src/components/ui/center.tsx`          | Create | CSS flexbox centering wrapper |
| `packages/react/src/components/ui/grid-pattern.tsx`    | Create | SVG grid pattern background   |
| `packages/react/src/components/ui/grid.tsx`            | Create | CSS grid container component  |
| `packages/react/src/components/ui/chart.tsx`           | Create | SVG chart visualization       |
| `packages/react/src/components/ui/copy-id-button.tsx`  | Create | Clipboard copy button         |
| `packages/react/src/components/ui/infinite-slider.tsx` | Create | Infinite scrolling slider     |
| `packages/react/src/components/ui/input-group.tsx`     | Create | Input grouping wrapper        |
| `packages/react/src/components/ui/textarea.tsx`        | Create | Styled textarea component     |
| `packages/react/src/components/ui/tooltip.tsx`         | Create | Ark UI Tooltip wrapper        |
| `packages/react/src/components/ui/stack.tsx`           | Create | Stack, HStack, VStack exports |

### React Stories (10)

| File                                                           | Action | Description       |
| -------------------------------------------------------------- | ------ | ----------------- |
| `packages/react/src/components/ui/center.stories.tsx`          | Create | Storybook stories |
| `packages/react/src/components/ui/grid-pattern.stories.tsx`    | Create | Storybook stories |
| `packages/react/src/components/ui/grid.stories.tsx`            | Create | Storybook stories |
| `packages/react/src/components/ui/chart.stories.tsx`           | Create | Storybook stories |
| `packages/react/src/components/ui/copy-id-button.stories.tsx`  | Create | Storybook stories |
| `packages/react/src/components/ui/infinite-slider.stories.tsx` | Create | Storybook stories |
| `packages/react/src/components/ui/input-group.stories.tsx`     | Create | Storybook stories |
| `packages/react/src/components/ui/textarea.stories.tsx`        | Create | Storybook stories |
| `packages/react/src/components/ui/tooltip.stories.tsx`         | Create | Storybook stories |
| `packages/react/src/components/ui/stack.stories.tsx`           | Create | Storybook stories |

### Solid Components (10)

| File                                                   | Action | Description                   |
| ------------------------------------------------------ | ------ | ----------------------------- |
| `packages/solid/src/components/ui/center.tsx`          | Create | CSS flexbox centering wrapper |
| `packages/solid/src/components/ui/grid-pattern.tsx`    | Create | SVG grid pattern background   |
| `packages/solid/src/components/ui/grid.tsx`            | Create | CSS grid container component  |
| `packages/solid/src/components/ui/chart.tsx`           | Create | SVG chart visualization       |
| `packages/solid/src/components/ui/copy-id-button.tsx`  | Create | Clipboard copy button         |
| `packages/solid/src/components/ui/infinite-slider.tsx` | Create | Infinite scrolling slider     |
| `packages/solid/src/components/ui/input-group.tsx`     | Create | Input grouping wrapper        |
| `packages/solid/src/components/ui/textarea.tsx`        | Create | Styled textarea component     |
| `packages/solid/src/components/ui/tooltip.tsx`         | Create | Ark UI Tooltip wrapper        |
| `packages/solid/src/components/ui/stack.tsx`           | Create | Stack, HStack, VStack exports |

### Solid Stories (10)

| File                                                           | Action | Description       |
| -------------------------------------------------------------- | ------ | ----------------- |
| `packages/solid/src/components/ui/center.stories.tsx`          | Create | Storybook stories |
| `packages/solid/src/components/ui/grid-pattern.stories.tsx`    | Create | Storybook stories |
| `packages/solid/src/components/ui/grid.stories.tsx`            | Create | Storybook stories |
| `packages/solid/src/components/ui/chart.stories.tsx`           | Create | Storybook stories |
| `packages/solid/src/components/ui/copy-id-button.stories.tsx`  | Create | Storybook stories |
| `packages/solid/src/components/ui/infinite-slider.stories.tsx` | Create | Storybook stories |
| `packages/solid/src/components/ui/input-group.stories.tsx`     | Create | Storybook stories |
| `packages/solid/src/components/ui/textarea.stories.tsx`        | Create | Storybook stories |
| `packages/solid/src/components/ui/tooltip.stories.tsx`         | Create | Storybook stories |
| `packages/solid/src/components/ui/stack.stories.tsx`           | Create | Storybook stories |

### Documentation (20 MDX files)

| File                                                              | Action | Description |
| ----------------------------------------------------------------- | ------ | ----------- |
| `apps/docs/src/content/docs/react/components/center.mdx`          | Create | React docs  |
| `apps/docs/src/content/docs/react/components/grid-pattern.mdx`    | Create | React docs  |
| `apps/docs/src/content/docs/react/components/grid.mdx`            | Create | React docs  |
| `apps/docs/src/content/docs/react/components/chart.mdx`           | Create | React docs  |
| `apps/docs/src/content/docs/react/components/copy-id-button.mdx`  | Create | React docs  |
| `apps/docs/src/content/docs/react/components/infinite-slider.mdx` | Create | React docs  |
| `apps/docs/src/content/docs/react/components/input-group.mdx`     | Create | React docs  |
| `apps/docs/src/content/docs/react/components/textarea.mdx`        | Create | React docs  |
| `apps/docs/src/content/docs/react/components/tooltip.mdx`         | Create | React docs  |
| `apps/docs/src/content/docs/react/components/stack.mdx`           | Create | React docs  |
| `apps/docs/src/content/docs/solid/components/center.mdx`          | Create | Solid docs  |
| `apps/docs/src/content/docs/solid/components/grid-pattern.mdx`    | Create | Solid docs  |
| `apps/docs/src/content/docs/solid/components/grid.mdx`            | Create | Solid docs  |
| `apps/docs/src/content/docs/solid/components/chart.mdx`           | Create | Solid docs  |
| `apps/docs/src/content/docs/solid/components/copy-id-button.mdx`  | Create | Solid docs  |
| `apps/docs/src/content/docs/solid/components/infinite-slider.mdx` | Create | Solid docs  |
| `apps/docs/src/content/docs/solid/components/input-group.mdx`     | Create | Solid docs  |
| `apps/docs/src/content/docs/solid/components/textarea.mdx`        | Create | Solid docs  |
| `apps/docs/src/content/docs/solid/components/tooltip.mdx`         | Create | Solid docs  |
| `apps/docs/src/content/docs/solid/components/stack.mdx`           | Create | Solid docs  |

### Exports & Registry

| File                              | Action | Description                                |
| --------------------------------- | ------ | ------------------------------------------ |
| `packages/react/src/index.ts`     | Modify | Add exports for all 10 React components    |
| `packages/solid/src/index.ts`     | Modify | Add exports for all 10 Solid components    |
| `apps/docs/public/r/index.json`   | Modify | Add registry entries for all 20 components |
| `apps/docs/src/content/config.ts` | Modify | Update sidebar navigation                  |

## Interface Definitions

### Center Component Props

```typescript
interface CenterProps extends HTMLAttributes<HTMLDivElement> {
  // Uses all standard div props + custom className
}
```

### Grid Component Props

```typescript
interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number
  gap?: number | string
}
```

### CopyIdButton Component Props

```typescript
interface CopyIdButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string
  label?: string
}
```

### Textarea Component Props

```typescript
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "outline" | "soft" | "plain"
  size?: "sm" | "md" | "lg"
}
```

### Stack/HStack/VStack Props

```typescript
interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: number | string
  align?: "start" | "center" | "end" | "stretch"
  justify?: "start" | "center" | "end" | "between" | "around"
}
```

### Tooltip Props (using Ark UI)

```typescript
// Uses Ark UI Tooltip props
type TooltipProps = Tooltip.RootProps
type TooltipTriggerProps = Tooltip.TriggerProps
type TooltipContentProps = Tooltip.ContentProps
```

## Testing Strategy

| Layer      | What to Test        | Approach                                       |
| ---------- | ------------------- | ---------------------------------------------- |
| Unit       | Component rendering | Verify each component renders with basic props |
| Stories    | Visual testing      | Storybook stories provide visual verification  |
| TypeScript | Type safety         | TypeScript compilation validates types         |

## Migration / Rollback Plan

No migration required. This is a pure addition of new components.

To rollback:

1. Remove all created component files
2. Revert index.ts exports
3. Remove registry entries and sidebar items

## Open Questions

- None - all components follow existing patterns or are straightforward implementations
