# Design: Lote 1 - First Batch UI Components

## Technical Approach

Implement 5 UI components (badge, card, checkbox, select, separator) following the established Arkitect UI pattern: Shadcn UI API externally, Ark UI primitives internally where needed.

**Implementation Order** (by complexity):

1. **Separator** - Simplest, pure CSS, no Ark UI
2. **Badge** - Simple CVA styling, no Ark UI
3. **Card** - Composition of semantic HTML wrappers
4. **Checkbox** - Uses `@ark-ui/react/checkbox`
5. **Select** - Most complex, uses `@ark-ui/react/select` with `createListCollection`

---

## Architecture Decisions

### Decision: Checkbox Indeterminate State Handling

**Choice**: Use Ark UI's native `indeterminate` prop on `Checkbox.Control`, not a separate checked state value.

**Alternatives considered**:

- Using `checked="indeterminate"` as a string value (Shadcn pattern)
- Creating custom indeterminate icon logic

**Rationale**: Ark UI checkbox has built-in `indeterminate` boolean prop that handles the mixed state visually. The Shadcn API accepts `checked="indeterminate"` which we will normalize to the Ark UI pattern by detecting the string value and passing it as a boolean to the Indicator component.

### Decision: Select API Pattern

**Choice**: Support both simple children pattern AND `createListCollection` pattern.

**Alternatives considered**:

- Only support `createListCollection` (strict Ark UI)
- Only support simple children (Shadcn-style)

**Rationale**:

- Shadcn users expect simple `<SelectItem value="x">Label</SelectItem>` pattern
- Ark UI recommends `createListCollection` for better type safety and performance
- Solution: Accept children but also support collection prop for advanced use cases

### Decision: Card Composition Structure

**Choice**: Export all 5 Card parts as separate components (CardHeader, CardTitle, CardDescription, CardContent, CardFooter).

**Alternatives considered**:

- Single Card component with render props
- Object-based API (Card.Header, Card.Title, etc.)

**Rationale**: Follows Shadcn UI pattern exactly - users expect composable components. Uses simple semantic HTML wrappers without Ark UI primitives (no complex state needed).

### Decision: Testing Approach

**Choice**: Story-based testing via Storybook, no additional unit test files.

**Alternatives considered**:

- Vitest unit tests alongside stories
- Only manual testing in Storybook

**Rationale**:

- Existing project uses Storybook stories as primary test coverage
- Stories demonstrate all variants and states
- CVA and simple components don't need extensive unit testing

---

## Data Flow

### Component Hierarchy

```
packages/react/src/components/ui/
├── badge.tsx           # CVA-only, no children composition
├── badge.stories.tsx   # Variant stories
├── card.tsx            # Composition: Card > CardHeader > CardTitle/Description > CardContent > CardFooter
├── card.stories.tsx    # Composition stories
├── checkbox.tsx         # Ark UI: Checkbox.Root > Checkbox.HiddenInput > Checkbox.Control > Checkbox.Indicator
├── checkbox.stories.tsx
├── select.tsx          # Ark UI: Select.Root > Select.Trigger > Select.ValueText | Select.Content > Select.Item
├── select.stories.tsx
├── separator.tsx       # CVA-only, semantic <hr>
└── separator.stories.tsx
```

---

## File Changes

### React Components

| File                                                     | Action | Description                                     |
| -------------------------------------------------------- | ------ | ----------------------------------------------- |
| `packages/react/src/components/ui/badge.tsx`             | Create | Badge component with CVA (4 variants × 3 sizes) |
| `packages/react/src/components/ui/badge.stories.tsx`     | Create | Storybook stories                               |
| `packages/react/src/components/ui/card.tsx`              | Create | Card + 5 sub-components                         |
| `packages/react/src/components/ui/card.stories.tsx`      | Create | Storybook stories                               |
| `packages/react/src/components/ui/checkbox.tsx`          | Create | Ark UI Checkbox with indeterminate              |
| `packages/react/src/components/ui/checkbox.stories.tsx`  | Create | Storybook stories                               |
| `packages/react/src/components/ui/select.tsx`            | Create | Ark UI Select with createListCollection         |
| `packages/react/src/components/ui/select.stories.tsx`    | Create | Storybook stories                               |
| `packages/react/src/components/ui/separator.tsx`         | Create | Separator with orientation variants             |
| `packages/react/src/components/ui/separator.stories.tsx` | Create | Storybook stories                               |
| `packages/react/src/index.ts`                            | Modify | Add 5 exports                                   |

### Solid Components

| File                                                     | Action | Description            |
| -------------------------------------------------------- | ------ | ---------------------- |
| `packages/solid/src/components/ui/badge.tsx`             | Create | Solid badge with CVA   |
| `packages/solid/src/components/ui/badge.stories.tsx`     | Create | Storybook stories      |
| `packages/solid/src/components/ui/card.tsx`              | Create | Solid card composition |
| `packages/solid/src/components/ui/card.stories.tsx`      | Create | Storybook stories      |
| `packages/solid/src/components/ui/checkbox.tsx`          | Create | Solid Ark UI checkbox  |
| `packages/solid/src/components/ui/checkbox.stories.tsx`  | Create | Storybook stories      |
| `packages/solid/src/components/ui/select.tsx`            | Create | Solid Ark UI select    |
| `packages/solid/src/components/ui/select.stories.tsx`    | Create | Storybook stories      |
| `packages/solid/src/components/ui/separator.tsx`         | Create | Solid separator        |
| `packages/solid/src/components/ui/separator.stories.tsx` | Create | Storybook stories      |
| `packages/solid/src/index.tsx`                           | Modify | Add 5 exports          |

### Registry & Config

| File                                                        | Action | Description                         |
| ----------------------------------------------------------- | ------ | ----------------------------------- |
| `registry.json`                                             | Modify | Add 10 entries (5 React + 5 Solid)  |
| `apps/docs/astro.config.ts`                                 | Modify | Add sidebar items for 10 components |
| `apps/docs/src/content/docs/react/components/badge.mdx`     | Create | Documentation                       |
| `apps/docs/src/content/docs/react/components/card.mdx`      | Create | Documentation                       |
| `apps/docs/src/content/docs/react/components/checkbox.mdx`  | Create | Documentation                       |
| `apps/docs/src/content/docs/react/components/select.mdx`    | Create | Documentation                       |
| `apps/docs/src/content/docs/react/components/separator.mdx` | Create | Documentation                       |
| `apps/docs/src/content/docs/solid/components/badge.mdx`     | Create | Documentation                       |
| `apps/docs/src/content/docs/solid/components/card.mdx`      | Create | Documentation                       |
| `apps/docs/src/content/docs/solid/components/checkbox.mdx`  | Create | Documentation                       |
| `apps/docs/src/content/docs/solid/components/select.mdx`    | Create | Documentation                       |
| `apps/docs/src/content/docs/solid/components/separator.mdx` | Create | Documentation                       |

---

## Component Details

### 1. Badge Component

**Technical Approach**: Pure CVA component, no Ark UI primitive.

**CVA Variants**:

```typescript
const badgeVariants = cva("badge-base", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      outline: "border border-input text-foreground",
    },
    size: {
      default: "h-5 px-2.5 text-xs",
      sm: "h-4 px-2 text-[0.65rem]",
      lg: "h-6 px-3 text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})
```

**Icons Needed**: None

**Ark UI Mapping**: None (pure CVA)

**File Structure**:

```
badge.tsx                 # Badge + badgeVariants
badge.stories.tsx        # Default, Secondary, Destructive, Outline × default/sm/lg
```

---

### 2. Card Component

**Technical Approach**: Semantic HTML composition, no Ark UI primitive.

**Exports**:

- `Card` - Main container (div)
- `CardHeader` - Header wrapper (div)
- `CardTitle` - Title element (h3)
- `CardDescription` - Description element (p)
- `CardContent` - Content wrapper (div)
- `CardFooter` - Footer wrapper (div)

**Icons Needed**: None

**Ark UI Mapping**: None (semantic HTML)

**File Structure**:

```
card.tsx                 # All 6 components
card.stories.tsx        # Full card, Header only, Content only, etc.
```

---

### 3. Checkbox Component

**Technical Approach**: Ark UI Checkbox with custom styling to match Shadcn.

**Ark UI Mapping**:

| Shadcn         | Ark UI                 |
| -------------- | ---------------------- |
| `<Checkbox>`   | `Checkbox.Root`        |
| (hidden input) | `Checkbox.HiddenInput` |
| (box)          | `Checkbox.Control`     |
| (checkmark)    | `Checkbox.Indicator`   |

**CVA Variants**:

```typescript
const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  {
    variants: {},
  },
)
```

**Icons Needed**:

- `IconCheck` from `@tabler/icons-react` - for checked state

**Indeterminate Handling**:

```typescript
// Shadcn API: checked="indeterminate"
// Convert to Ark UI:
<Checkbox.Control>
  <Checkbox.Indicator>
    {indeterminate ? <MinusIcon /> : <CheckIcon />}
  </Checkbox.Indicator>
</Checkbox.Control>
```

**File Structure**:

```
checkbox.tsx             # Checkbox + checkboxVariants
checkbox.stories.tsx   # Unchecked, Checked, Indeterminate, Disabled
```

---

### 4. Select Component

**Technical Approach**: Ark UI Select with `createListCollection` for items.

**Ark UI Mapping**:

| Shadcn              | Ark UI                                 |
| ------------------- | -------------------------------------- |
| `<Select>`          | `Select.Root` (with collection)        |
| `<SelectTrigger>`   | `Select.Trigger`                       |
| `<SelectValue>`     | `Select.ValueText`                     |
| `<SelectContent>`   | `Select.Positioner` > `Select.Content` |
| `<SelectItem>`      | `Select.Item`                          |
| `<SelectItemText>`  | `Select.ItemText`                      |
| `<SelectGroup>`     | `Select.ItemGroup`                     |
| `<SelectLabel>`     | `Select.ItemGroupLabel`                |
| `<SelectSeparator>` | `Select.Separator`                     |

**Collection Pattern**:

```typescript
import { createListCollection } from "@ark-ui/react/collection"

const collection = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid", value: "solid" },
  ],
})

// Usage
<Select.Root collection={collection}>
  <Select.Trigger>
    <Select.ValueText placeholder="Select framework" />
  </Select.Trigger>
  <Select.Positioner>
    <Select.Content>
      <Select.Item itemValue="react">
        <Select.ItemText>React</Select.ItemText>
      </Select.Item>
    </Select.Content>
  </Select.Positioner>
</Select.Root>
```

**Icons Needed**:

- `IconChevronDown` from `@tabler/icons-react` - for trigger indicator

**Alternative Simple Children Pattern** (for Shadcn compatibility):

```typescript
// Support both patterns
<Select.Root>
  <Select.Trigger>
    <Select.ValueText placeholder="Select..." />
  </Select.Trigger>
  <Select.Positioner>
    <Select.Content>
      {/* If no collection, parse children for items */}
      <Select.Item itemValue="react">
        <Select.ItemText>React</Select.ItemText>
      </Select.Item>
    </Select.Content>
  </Select.Positioner>
</Select.Root>
```

**File Structure**:

```
select.tsx              # Select + 8 sub-components
select.stories.tsx     # Basic, Grouped, With placeholder, Disabled
```

---

### 5. Separator Component

**Technical Approach**: Simple semantic `<hr>` with CVA variants.

**CVA Variants**:

```typescript
const separatorVariants = cva("bg-border shrink-0", {
  variants: {
    orientation: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})
```

**Accessibility**:

- `decorative={true}` → `role="none"`
- Default → no additional ARIA (separator role implicit on `<hr>`)

**Icons Needed**: None

**Ark UI Mapping**: None (semantic HTML)

**File Structure**:

```
separator.tsx           # Separator + separatorVariants
separator.stories.tsx  # Horizontal, Vertical, With decorative
```

---

## Registry Entries

Add to `registry.json`:

```json
// Badge
{ "name": "r/badge", "type": "registry:ui", "title": "React badge", "dependencies": [], "files": [{ "path": "packages/react/src/components/ui/badge.tsx", "type": "registry:ui" }] },
{ "name": "s/badge", "type": "registry:ui", "title": "Solid badge", "dependencies": [], "files": [{ "path": "packages/solid/src/components/ui/badge.tsx", "type": "registry:ui" }] },

// Card
{ "name": "r/card", "type": "registry:ui", "title": "React card", "dependencies": [], "files": [{ "path": "packages/react/src/components/ui/card.tsx", "type": "registry:ui" }] },
{ "name": "s/card", "type": "registry:ui", "title": "Solid card", "dependencies": [], "files": [{ "path": "packages/solid/src/components/ui/card.tsx", "type": "registry:ui" }] },

// Checkbox
{ "name": "r/checkbox", "type": "registry:ui", "title": "React checkbox", "dependencies": ["@ark-ui/react", "@tabler/icons-react"], "files": [{ "path": "packages/react/src/components/ui/checkbox.tsx", "type": "registry:ui" }] },
{ "name": "s/checkbox", "type": "registry:ui", "title": "Solid checkbox", "dependencies": ["@ark-ui/solid", "@tabler/icons-solidjs"], "files": [{ "path": "packages/solid/src/components/ui/checkbox.tsx", "type": "registry:ui" }] },

// Select
{ "name": "r/select", "type": "registry:ui", "title": "React select", "dependencies": ["@ark-ui/react", "@tabler/icons-react"], "files": [{ "path": "packages/react/src/components/ui/select.tsx", "type": "registry:ui" }] },
{ "name": "s/select", "type": "registry:ui", "title": "Solid select", "dependencies": ["@ark-ui/solid", "@tabler/icons-solidjs"], "files": [{ "path": "packages/solid/src/components/ui/select.tsx", "type": "registry:ui" }] },

// Separator
{ "name": "r/separator", "type": "registry:ui", "title": "React separator", "dependencies": [], "files": [{ "path": "packages/react/src/components/ui/separator.tsx", "type": "registry:ui" }] },
{ "name": "s/separator", "type": "registry:ui", "title": "Solid separator", "dependencies": [], "files": [{ "path": "packages/solid/src/components/ui/separator.tsx", "type": "registry:ui" }] }
```

---

## Sidebar Updates

Update `apps/docs/astro.config.ts` - add to React components list:

```typescript
"react/components/badge",
"react/components/card",
"react/components/checkbox",
"react/components/select",
"react/components/separator",
```

Add to Solid components list:

```typescript
"solid/components/badge",
"solid/components/card",
"solid/components/checkbox",
"solid/components/select",
"solid/components/separator",
```

---

## Export Updates

**packages/react/src/index.ts** - Add:

```typescript
export * from "./components/ui/badge"
export * from "./components/ui/card"
export * from "./components/ui/checkbox"
export * from "./components/ui/select"
export * from "./components/ui/separator"
```

**packages/solid/src/index.tsx** - Add:

```typescript
export * from "./components/ui/badge"
export * from "./components/ui/card"
export * from "./components/ui/checkbox"
export * from "./components/ui/select"
export * from "./components/ui/separator"
```

---

## Testing Strategy

| Layer     | What to Test                             | Approach               |
| --------- | ---------------------------------------- | ---------------------- |
| Stories   | All variants/states                      | Storybook render tests |
| Badge     | 4 variants × 3 sizes                     | Storybook visual       |
| Card      | Composition                              | Storybook visual       |
| Checkbox  | unchecked/checked/indeterminate/disabled | Storybook visual       |
| Select    | Open/close, selection, disabled          | Storybook visual       |
| Separator | horizontal/vertical/decorative           | Storybook visual       |

---

## Open Questions

- [ ] **Select collection parsing**: Should we automatically create a collection from simple children, or require explicit collection prop?
  - Recommendation: Support both - if `collection` prop provided, use it; otherwise, parse children
- [ ] **Checkbox ref type**: Should ref point to hidden input or control div?
  - Recommendation: Hidden input (matches Shadcn behavior)
- [ ] **CardFooter alignment**: Default to `justify-content: flex-end` or `space-between`?
  - Recommendation: `flex` (neutral, user controls via className)

---

## Dependencies Summary

| Component | @ark-ui                                         | @tabler/icons   | CVA |
| --------- | ----------------------------------------------- | --------------- | --- |
| Badge     | -                                               | -               | Yes |
| Card      | -                                               | -               | -   |
| Checkbox  | @ark-ui/react/checkbox                          | IconCheck       | Yes |
| Select    | @ark-ui/react/select + @ark-ui/react/collection | IconChevronDown | -   |
| Separator | -                                               | -               | Yes |

---

## Next Steps

1. Run `sdd-tasks` to create task breakdown
2. Implement in order: separator → badge → card → checkbox → select
3. Create stories for each component
4. Update exports, registry, and sidebar
5. Create documentation MDX files
