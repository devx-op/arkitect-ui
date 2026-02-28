# Design: Lote 2 - Arkitect UI Components

## Technical Approach

Implement 10 UI components (alert-dialog, avatar, collapsible, combobox, empty, float, sheet, sidebar, skeleton, sonner) following the established Arkitect UI pattern: Shadcn UI API externally, Ark UI primitives internally where needed.

**Implementation Order** (by complexity):

1. **skeleton** - Simplest, pure CSS, no Ark UI
2. **avatar** - Simple composition, no Ark UI
3. **empty** - Simple composition, no Ark UI
4. **separator** - Already done in Lote 1
5. **collapsible** - Uses Ark UI Accordion (single item mode)
6. **alert-dialog** - Uses Ark UI Dialog
7. **sheet** - Uses Ark UI Dialog with slide animation
8. **float** - Uses Ark UI Popover
9. **combobox** - Uses Ark UI Combobox (complex filtering)
10. **sidebar** - Most complex, multiple sub-components

---

## Architecture Decisions

### Decision: AlertDialog API Pattern

**Choice**: Follow Shadcn UI's AlertDialog pattern with dedicated components for each part.

**Alternatives considered**:

- Single AlertDialog component with props for everything
- Render function pattern

**Rationale**: Shadcn users expect composable components. The AlertDialog parts (Header, Footer, Title, Description, Action, Cancel) should be separate exportable components.

### Decision: Avatar Image Loading

**Choice**: Use CSS-based image/fallback switching with native img loading.

**Alternatives considered**:

- Using useState to track image load status
- Using onError callback to switch to fallback

**Rationale**: Native img with onError is simplest. The fallback shows automatically when image fails to load or hasn't loaded yet.

### Decision: Collapsible Implementation

**Choice**:ion in single-item Use Ark UI Accord mode.

**Alternatives considered**:

- Custom implementation with CSS transitions
- Using Ark UI Collapsible (if available)

**Rationale**: Ark UI's Accordion provides the exact behavior needed (expand/collapse) with built-in accessibility. Use single item mode for single collapsible.

### Decision: Combobox vs Select

**Choice**: Combobox is separate from Select, using Ark UI Combobox primitive.

**Alternatives considered**:

- Combining combobox into Select with a "searchable" prop
- Using custom implementation

**Rationale**: Combobox is distinct from Select - it allows arbitrary text input and filtering. Ark UI provides a dedicated Combobox primitive that should be used.

### Decision: Float (Popover) Naming

**Choice**: Export as "Float" to match Shadcn UI's naming convention.

**Alternatives considered**:

- Using "Popover" as the component name
- Using "Float" internally only

**Rationale**: Shadcn UI uses "Popover" but our naming should be consistent with other components. Check if Shadcn docs show "Float" - if so, use Float; otherwise use Popover.

**Update**: Shadcn UI uses "Popover" - will export as Popover with Float as alias for internal use.

### Decision: Sheet Animation

**Choice**: Use CSS animations for sheet slide-in/out.

**Alternatives considered**:

- Using Framer Motion (React)
- Using CSS only

**Rationale**: Keep dependencies minimal. CSS animations with Tailwind are sufficient for the slide effect.

### Decision: Sidebar Complexity Management

**Choice**: Break into many small sub-components with clear responsibilities.

**Alternatives considered**:

- Single complex Sidebar component
- Using context for state management

**Rationale**: Shadcn's pattern has many sub-components - this follows their pattern exactly. Use React Context/Solid signals for collapsed state management.

### Decision: Skeleton Animation

**Choice**: Use Tailwind's animate-pulse class.

**Alternatives considered**:

- Custom CSS keyframes
- Using a library like framer-motion

**Rationale**: Tailwind's built-in animate-pulse is sufficient and keeps dependencies minimal.

### Decision: Sonner (Toast) Implementation

**Choice**: Use Ark UI Toaster component, create toast() function.

**Alternatives considered**:

- Using a dedicated toast library (sonner, react-hot-toast)
- Custom implementation

**Rationale**: Ark UI provides Toaster which integrates with their system. The toast() function should provide Shadcn-compatible API.

---

## Data Flow

### Component Hierarchy

```
packages/react/src/components/ui/
├── alert-dialog.tsx           # AlertDialog.Root > AlertDialog.Trigger > AlertDialog.Content
├── alert-dialog.stories.tsx
├── avatar.tsx                  # Avatar > Avatar.Image + Avatar.Fallback
├── avatar.stories.tsx
├── collapsible.tsx             # Collapsible.Root > Collapsible.Trigger + Collapsible.Content
├── collapsible.stories.tsx
├── combobox.tsx               # Combobox.Root > Combobox.Input + Combobox.Trigger + Combobox.Content
├── combobox.stories.tsx
├── empty.tsx                  # Empty > Empty.Image + Empty.Title + Empty.Description + Empty.Action
├── empty.stories.tsx
├── popover.tsx                # Popover.Root > Popover.Trigger + Popover.Content
├── popover.stories.tsx        # (exported as Float per Shadcn)
├── sheet.tsx                  # Sheet > Sheet.Trigger + Sheet.Content
├── sheet.stories.tsx
├── sidebar.tsx                # Sidebar + SidebarTrigger + SidebarRail + SidebarInset + SidebarGroup + SidebarMenu + SidebarSeparator
├── sidebar.stories.tsx
├── skeleton.tsx               # Skeleton with variant
├── skeleton.stories.tsx
└── sonner.tsx                 # Toaster + toast() function
├── sonner.stories.tsx
```

---

## File Changes

### React Components

| File                                                        | Action | Description                          |
| ----------------------------------------------------------- | ------ | ------------------------------------ |
| `packages/react/src/components/ui/alert-dialog.tsx`         | Create | AlertDialog with 9 sub-components    |
| `packages/react/src/components/ui/alert-dialog.stories.tsx` | Create | Storybook stories                    |
| `packages/react/src/components/ui/avatar.tsx`               | Create | Avatar with Image and Fallback       |
| `packages/react/src/components/ui/avatar.stories.tsx`       | Create | Storybook stories                    |
| `packages/react/src/components/ui/collapsible.tsx`          | Create | Collapsible using Ark UI Accordion   |
| `packages/react/src/components/ui/collapsible.stories.tsx`  | Create | Storybook stories                    |
| `packages/react/src/components/ui/combobox.tsx`             | Create | Combobox using Ark UI Combobox       |
| `packages/react/src/components/ui/combobox.stories.tsx`     | Create | Storybook stories                    |
| `packages/react/src/components/ui/empty.tsx`                | Create | Empty state with 4 sub-components    |
| `packages/react/src/components/ui/empty.stories.tsx`        | Create | Storybook stories                    |
| `packages/react/src/components/ui/popover.tsx`              | Create | Popover (Float) using Ark UI Popover |
| `packages/react/src/components/ui/popover.stories.tsx`      | Create | Storybook stories                    |
| `packages/react/src/components/ui/sheet.tsx`                | Create | Sheet with 6 sub-components          |
| `packages/react/src/components/ui/sheet.stories.tsx`        | Create | Storybook stories                    |
| `packages/react/src/components/ui/sidebar.tsx`              | Create | Sidebar with 10+ sub-components      |
| `packages/react/src/components/ui/sidebar.stories.tsx`      | Create | Storybook stories                    |
| `packages/react/src/components/ui/skeleton.tsx`             | Create | Skeleton with variants               |
| `packages/react/src/components/ui/skeleton.stories.tsx`     | Create | Storybook stories                    |
| `packages/react/src/components/ui/sonner.tsx`               | Create | Toaster + toast function             |
| `packages/react/src/components/ui/sonner.stories.tsx`       | Create | Storybook stories                    |
| `packages/react/src/index.ts`                               | Modify | Add 10 exports                       |

### Solid Components

| File                                                        | Action | Description           |
| ----------------------------------------------------------- | ------ | --------------------- |
| `packages/solid/src/components/ui/alert-dialog.tsx`         | Create | Solid AlertDialog     |
| `packages/solid/src/components/ui/alert-dialog.stories.tsx` | Create | Storybook stories     |
| `packages/solid/src/components/ui/avatar.tsx`               | Create | Solid Avatar          |
| `packages/solid/src/components/ui/avatar.stories.tsx`       | Create | Storybook stories     |
| `packages/solid/src/components/ui/collapsible.tsx`          | Create | Solid Collapsible     |
| `packages/solid/src/components/ui/collapsible.stories.tsx`  | Create | Storybook stories     |
| `packages/solid/src/components/ui/combobox.tsx`             | Create | Solid Combobox        |
| `packages/solid/src/components/ui/combobox.stories.tsx`     | Create | Storybook stories     |
| `packages/solid/src/components/ui/empty.tsx`                | Create | Solid Empty state     |
| `packages/solid/src/components/ui/empty.stories.tsx`        | Create | Storybook stories     |
| `packages/solid/src/components/ui/popover.tsx`              | Create | Solid Popover         |
| `packages/solid/src/components/ui/popover.stories.tsx`      | Create | Storybook stories     |
| `packages/solid/src/components/ui/sheet.tsx`                | Create | Solid Sheet           |
| `packages/solid/src/components/ui/sheet.stories.tsx`        | Create | Storybook stories     |
| `packages/solid/src/components/ui/sidebar.tsx`              | Create | Solid Sidebar         |
| `packages/solid/src/components/ui/sidebar.stories.tsx`      | Create | Storybook stories     |
| `packages/solid/src/components/ui/skeleton.tsx`             | Create | Solid Skeleton        |
| `packages/solid/src/components/ui/skeleton.stories.tsx`     | Create | Storybook stories     |
| `packages/solid/src/components/ui/sonner.tsx`               | Create | Solid Toaster + toast |
| `packages/solid/src/components/ui/sonner.stories.tsx`       | Create | Storybook stories     |
| `packages/solid/src/index.tsx`                              | Modify | Add 10 exports        |

### Registry & Config

| File                                                           | Action | Description                          |
| -------------------------------------------------------------- | ------ | ------------------------------------ |
| `packages/monorepo-tools/src/registry.json`                    | Modify | Add 20 entries (10 React + 10 Solid) |
| `apps/docs/astro.config.ts`                                    | Modify | Add sidebar items for 10 components  |
| `apps/docs/src/content/docs/react/components/alert-dialog.mdx` | Create | Documentation                        |
| `apps/docs/src/content/docs/react/components/avatar.mdx`       | Create | Documentation                        |
| `apps/docs/src/content/docs/react/components/collapsible.mdx`  | Create | Documentation                        |
| `apps/docs/src/content/docs/react/components/combobox.mdx`     | Create | Documentation                        |
| `apps/docs/src/content/docs/react/components/empty.mdx`        | Create | Documentation                        |
| `apps/docs/src/content/docs/react/components/popover.mdx`      | Create | Documentation                        |
| `apps/docs/src/content/docs/react/components/sheet.mdx`        | Create | Documentation                        |
| `apps/docs/src/content/docs/react/components/sidebar.mdx`      | Create | Documentation                        |
| `apps/docs/src/content/docs/react/components/skeleton.mdx`     | Create | Documentation                        |
| `apps/docs/src/content/docs/react/components/sonner.mdx`       | Create | Documentation                        |
| `apps/docs/src/content/docs/solid/components/alert-dialog.mdx` | Create | Documentation                        |
| `apps/docs/src/content/docs/solid/components/avatar.mdx`       | Create | Documentation                        |
| `apps/docs/src/content/docs/solid/components/collapsible.mdx`  | Create | Documentation                        |
| `apps/docs/src/content/docs/solid/components/combobox.mdx`     | Create | Documentation                        |
| `apps/docs/src/content/docs/solid/components/empty.mdx`        | Create | Documentation                        |
| `apps/docs/src/content/docs/solid/components/popover.mdx`      | Create | Documentation                        |
| `apps/docs/src/content/docs/solid/components/sheet.mdx`        | Create | Documentation                        |
| `apps/docs/src/content/docs/solid/components/sidebar.mdx`      | Create | Documentation                        |
| `apps/docs/src/content/docs/solid/components/skeleton.mdx`     | Create | Documentation                        |
| `apps/docs/src/content/docs/solid/components/sonner.mdx`       | Create | Documentation                        |

---

## Component Details

### 1. AlertDialog Component

**Technical Approach**: Ark UI Dialog with AlertDialog-specific styling and components.

**Ark UI Mapping**:

| Shadcn                     | Ark UI               |
| -------------------------- | -------------------- |
| `<AlertDialog>`            | `Dialog.Root`        |
| `<AlertDialogTrigger>`     | `Dialog.Trigger`     |
| `<AlertDialogContent>`     | `Dialog.Content`     |
| `<AlertDialogHeader>`      | `div` (styled)       |
| `<AlertDialogFooter>`      | `div` (styled)       |
| `<AlertDialogTitle>`       | `Dialog.Title`       |
| `<AlertDialogDescription>` | `Dialog.Description` |
| `<AlertDialogAction>`      | `Button` (styled)    |
| `<AlertDialogCancel>`      | `Button` (styled)    |

**Exports**:

- `AlertDialog` - Root component
- `AlertDialogTrigger` - Trigger button
- `AlertDialogContent` - Modal content wrapper
- `AlertDialogHeader` - Header section
- `AlertDialogFooter` - Footer section with buttons
- `AlertDialogTitle` - Dialog title
- `AlertDialogDescription` - Dialog description
- `AlertDialogAction` - Action button
- `AlertDialogCancel` - Cancel button

**Icons Needed**: None (uses Button styling)

**File Structure**:

```
alert-dialog.tsx              # All 9 components
alert-dialog.stories.tsx     # Default, With description, With cancel/action
```

---

### 2. Avatar Component

**Technical Approach**: Pure CSS/HTML composition, no Ark UI primitive.

**Exports**:

- `Avatar` - Container (div)
- `AvatarImage` - Image element (img)
- `AvatarFallback` - Fallback (div)

**CVA Variants**:

```typescript
const avatarVariants = cva("relative flex shrink-0 overflow-hidden rounded-full", {
  variants: {
    size: {
      default: "h-10 w-10",
      sm: "h-8 w-8",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    },
  },
  defaultVariants: {
    size: "default",
  },
})
```

**Icons Needed**: None

**File Structure**:

```
avatar.tsx                  # Avatar + AvatarImage + AvatarFallback + variants
avatar.stories.tsx          # With image, With fallback, Different sizes
```

---

### 3. Collapsible Component

**Technical Approach**: Use Ark UI Accordion in single-item mode.

**Ark UI Mapping**:

| Shadcn                 | Ark UI                    |
| ---------------------- | ------------------------- |
| `<Collapsible>`        | `Accordion.Root` (single) |
| `<CollapsibleTrigger>` | `Accordion.ItemTrigger`   |
| `<CollapsibleContent>` | `Accordion.ItemContent`   |

**Exports**:

- `Collapsible` - Root component
- `CollapsibleTrigger` - Toggle button
- `CollapsibleContent` - Content container

**Icons Needed**:

- `IconChevronDown` from `@tabler/icons-react` - for expand indicator

**File Structure**:

```
collapsible.tsx            # Collapsible + CollapsibleTrigger + CollapsibleContent
collapsible.stories.tsx   # Default, Open state, With trigger
```

---

### 4. Combobox Component

**Technical Approach**: Ark UI Combobox with search/filter.

**Ark UI Mapping**:

| Shadcn               | Ark UI                                     |
| -------------------- | ------------------------------------------ |
| `<Combobox>`         | `Combobox.Root`                            |
| `<ComboboxInput>`    | `Combobox.Input`                           |
| `<ComboboxTrigger>`  | `Combobox.Trigger`                         |
| `<ComboboxContent>`  | `Combobox.Positioner` > `Combobox.Content` |
| `<ComboboxItem>`     | `Combobox.Item`                            |
| `<ComboboxItemText>` | `Combobox.ItemText`                        |
| `<ComboboxGroup>`    | `Combobox.ItemGroup`                       |
| `<ComboboxLabel>`    | `Combobox.ItemGroupLabel`                  |

**Exports**:

- `Combobox` - Root
- `ComboboxInput` - Search input
- `ComboboxTrigger` - Dropdown trigger
- `ComboboxContent` - Dropdown content
- `ComboboxItem` - Option item
- `ComboboxItemText` - Item text
- `ComboboxGroup` - Item group
- `ComboboxLabel` - Group label

**Icons Needed**:

- `IconChevronDown` from `@tabler/icons-react` - for trigger

**File Structure**:

```
combobox.tsx               # Combobox + 7 sub-components
combobox.stories.tsx      # Basic, With groups, With disabled, Filter
```

---

### 5. Empty Component

**Technical Approach**: Pure HTML composition, no Ark UI primitive.

**Exports**:

- `Empty` - Container (div)
- `EmptyImage` - Image placeholder (div or img)
- `EmptyTitle` - Title (p or h3)
- `EmptyDescription` - Description (p)
- `EmptyAction` - Action button wrapper (div)

**Icons Needed**: None (user provides their own)

**File Structure**:

```
empty.tsx                  # Empty + 4 sub-components
empty.stories.tsx         # Default, With action, Custom image
```

---

### 6. Float (Popover) Component

**Technical Approach**: Ark UI Popover.

**Ark UI Mapping**:

| Shadcn             | Ark UI                                   |
| ------------------ | ---------------------------------------- |
| `<Popover>`        | `Popover.Root`                           |
| `<PopoverTrigger>` | `Popover.Trigger`                        |
| `<PopoverContent>` | `Popover.Positioner` > `Popover.Content` |

**Exports**:

- `Popover` - Root
- `PopoverTrigger` - Trigger
- `PopoverContent` - Floating content

**CVA Variants** (for PopoverContent):

```typescript
const popoverContentVariants = cva(
  "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {},
  },
)
```

**Icons Needed**: None

**File Structure**:

```
popover.tsx                # Popover + PopoverTrigger + PopoverContent
popover.stories.tsx       # Default, With form, Different placement
```

---

### 7. Sheet Component

**Technical Approach**: Ark UI Dialog with slide animations.

**Ark UI Mapping**:

| Shadcn               | Ark UI               |
| -------------------- | -------------------- |
| `<Sheet>`            | `Dialog.Root`        |
| `<SheetTrigger>`     | `Dialog.Trigger`     |
| `<SheetContent>`     | `Dialog.Content`     |
| `<SheetHeader>`      | `div` (styled)       |
| `<SheetFooter>`      | `div` (styled)       |
| `<SheetTitle>`       | `Dialog.Title`       |
| `<SheetDescription>` | `Dialog.Description` |

**Exports**:

- `Sheet` - Root
- `SheetTrigger` - Trigger
- `SheetContent` - Slide panel
- `SheetHeader` - Header section
- `SheetFooter` - Footer section
- `SheetTitle` - Title
- `SheetDescription` - Description

**Sheet Slide Animation**:

```typescript
// SheetContent variants based on side
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left:
          "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
)
```

**Icons Needed**: None (Dialog handles close)

**File Structure**:

```
sheet.tsx                  # Sheet + 6 sub-components + variants
sheet.stories.tsx         # Right, Left, Top, Bottom, With header
```

---

### 8. Sidebar Component

**Technical Approach**: Complex component with multiple sub-components and state management.

**Ark UI Mapping**: Uses a combination of patterns:

- Ark UI's collapsible for collapse functionality
- Context for state management

**Exports**:

- `Sidebar` - Main container
- `SidebarTrigger` - Toggle button
- `SidebarRail` - Collapse rail
- `SidebarInset` - Main content inset
- `SidebarGroup` - Group container
- `SidebarGroupLabel` - Group label
- `SidebarGroupContent` - Group content
- `SidebarMenu` - Menu container
- `SidebarMenuItem` - Menu item
- `SidebarMenuButton` - Menu button
- `SidebarSeparator` - Separator

**Icons Needed**:

- `IconPanelLeft` from `@tabler/icons-react` - for sidebar toggle

**File Structure**:

```
sidebar.tsx                # All sidebar components
sidebar.stories.tsx       # Default, Collapsed, With groups
```

---

### 9. Skeleton Component

**Technical Approach**: Pure CSS, no Ark UI primitive.

**CVA Variants**:

```typescript
const skeletonVariants = cva("animate-pulse rounded-md bg-muted", {
  variants: {
    variant: {
      default: "",
      circular: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})
```

**Exports**:

- `Skeleton` - Loading placeholder

**Icons Needed**: None

**File Structure**:

```
skeleton.tsx               # Skeleton + variants
skeleton.stories.tsx      # Default, Circular, Custom sizes
```

---

### 10. Sonner (Toast) Component

**Technical Approach**: Ark UI Toaster with custom toast() function.

**Exports**:

- `Toaster` - Toast container component
- `toast` - Toast triggering function

**Toast Function API**:

```typescript
interface ToastOptions {
  title?: string
  description?: string
  variant?: "default" | "success" | "error" | "warning"
  duration?: number
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  action?: {
    label: string
    onClick: () => void
  }
}

function toast(options: ToastOptions): void
function toast.success(title: string, options?: ToastOptions): void
function toast.error(title: string, options?: ToastOptions): void
function toast.warning(title: string, options?: ToastOptions): void
function toast.info(title: string, options?: ToastOptions): void
```

**Icons Needed**:

- `IconCheck` from `@tabler/icons-react` - for success
- `IconX` from `@tabler/icons-react` - for error/close
- `IconAlertCircle` from `@tabler/icons-react` - for warning

**File Structure**:

```
sonner.tsx                 # Toaster + toast function
sonner.stories.tsx        # Default, Success, Error, Warning, With action
```

---

## Registry Entries

Add to `registry.json`:

```json
// AlertDialog
{ "name": "r/alert-dialog", "type": "registry:ui", "title": "React alert-dialog", "dependencies": ["@ark-ui/react", "@tabler/icons-react"], "files": [{ "path": "packages/react/src/components/ui/alert-dialog.tsx", "type": "registry:ui" }] },
{ "name": "s/alert-dialog", "type": "registry:ui", "title": "Solid alert-dialog", "dependencies": ["@ark-ui/solid", "@tabler/icons-solidjs"], "files": [{ "path": "packages/solid/src/components/ui/alert-dialog.tsx", "type": "registry:ui" }] },

// Avatar
{ "name": "r/avatar", "type": "registry:ui", "title": "React avatar", "dependencies": [], "files": [{ "path": "packages/react/src/components/ui/avatar.tsx", "type": "registry:ui" }] },
{ "name": "s/avatar", "type": "registry:ui", "title": "Solid avatar", "dependencies": [], "files": [{ "path": "packages/solid/src/components/ui/avatar.tsx", "type": "registry:ui" }] },

// Collapsible
{ "name": "r/collapsible", "type": "registry:ui", "title": "React collapsible", "dependencies": ["@ark-ui/react", "@tabler/icons-react"], "files": [{ "path": "packages/react/src/components/ui/collapsible.tsx", "type": "registry:ui" }] },
{ "name": "s/collapsible", "type": "registry:ui", "title": "Solid collapsible", "dependencies": ["@ark-ui/solid", "@tabler/icons-solidjs"], "files": [{ "path": "packages/solid/src/components/ui/collapsible.tsx", "type": "registry:ui" }] },

// Combobox
{ "name": "r/combobox", "type": "registry:ui", "title": "React combobox", "dependencies": ["@ark-ui/react", "@tabler/icons-react"], "files": [{ "path": "packages/react/src/components/ui/combobox.tsx", "type": "registry:ui" }] },
{ "name": "s/combobox", "type": "registry:ui", "title": "Solid combobox", "dependencies": ["@ark-ui/solid", "@tabler/icons-solidjs"], "files": [{ "path": "packages/solid/src/components/ui/combobox.tsx", "type": "registry:ui" }] },

// Empty
{ "name": "r/empty", "type": "registry:ui", "title": "React empty", "dependencies": [], "files": [{ "path": "packages/react/src/components/ui/empty.tsx", "type": "registry:ui" }] },
{ "name": "s/empty", "type": "registry:ui", "title": "Solid empty", "dependencies": [], "files": [{ "path": "packages/solid/src/components/ui/empty.tsx", "type": "registry:ui" }] },

// Popover (Float)
{ "name": "r/popover", "type": "registry:ui", "title": "React popover", "dependencies": ["@ark-ui/react"], "files": [{ "path": "packages/react/src/components/ui/popover.tsx", "type": "registry:ui" }] },
{ "name": "s/popover", "type": "registry:ui", "title": "Solid popover", "dependencies": ["@ark-ui/solid"], "files": [{ "path": "packages/solid/src/components/ui/popover.tsx", "type": "registry:ui" }] },

// Sheet
{ "name": "r/sheet", "type": "registry:ui", "title": "React sheet", "dependencies": ["@ark-ui/react"], "files": [{ "path": "packages/react/src/components/ui/sheet.tsx", "type": "registry:ui" }] },
{ "name": "s/sheet", "type": "registry:ui", "title": "Solid sheet", "dependencies": ["@ark-ui/solid"], "files": [{ "path": "packages/solid/src/components/ui/sheet.tsx", "type": "registry:ui" }] },

// Sidebar
{ "name": "r/sidebar", "type": "registry:ui", "title": "React sidebar", "dependencies": ["@ark-ui/react", "@tabler/icons-react"], "files": [{ "path": "packages/react/src/components/ui/sidebar.tsx", "type": "registry:ui" }] },
{ "name": "s/sidebar", "type": "registry:ui", "title": "Solid sidebar", "dependencies": ["@ark-ui/solid", "@tabler/icons-solidjs"], "files": [{ "path": "packages/solid/src/components/ui/sidebar.tsx", "type": "registry:ui" }] },

// Skeleton
{ "name": "r/skeleton", "type": "registry:ui", "title": "React skeleton", "dependencies": [], "files": [{ "path": "packages/react/src/components/ui/skeleton.tsx", "type": "registry:ui" }] },
{ "name": "s/skeleton", "type": "registry:ui", "title": "Solid skeleton", "dependencies": [], "files": [{ "path": "packages/solid/src/components/ui/skeleton.tsx", "type": "registry:ui" }] },

// Sonner
{ "name": "r/sonner", "type": "registry:ui", "title": "React sonner", "dependencies": ["@ark-ui/react", "@tabler/icons-react"], "files": [{ "path": "packages/react/src/components/ui/sonner.tsx", "type": "registry:ui" }] },
{ "name": "s/sonner", "type": "registry:ui", "title": "Solid sonner", "dependencies": ["@ark-ui/solid", "@tabler/icons-solidjs"], "files": [{ "path": "packages/solid/src/components/ui/sonner.tsx", "type": "registry:ui" }] }
```

---

## Sidebar Updates

Update `apps/docs/astro.config.ts` - add to React components list:

```typescript
"react/components/alert-dialog",
"react/components/avatar",
"react/components/collapsible",
"react/components/combobox",
"react/components/empty",
"react/components/popover",
"react/components/sheet",
"react/components/sidebar",
"react/components/skeleton",
"react/components/sonner",
```

Add to Solid components list:

```typescript
"solid/components/alert-dialog",
"solid/components/avatar",
"solid/components/collapsible",
"solid/components/combobox",
"solid/components/empty",
"solid/components/popover",
"solid/components/sheet",
"solid/components/sidebar",
"solid/components/skeleton",
"solid/components/sonner",
```

---

## Export Updates

**packages/react/src/index.ts** - Add:

```typescript
export * from "./components/ui/alert-dialog"
export * from "./components/ui/avatar"
export * from "./components/ui/collapsible"
export * from "./components/ui/combobox"
export * from "./components/ui/empty"
export * from "./components/ui/popover"
export * from "./components/ui/sheet"
export * from "./components/ui/sidebar"
export * from "./components/ui/skeleton"
export * from "./components/ui/sonner"
```

**packages/solid/src/index.tsx** - Add:

```typescript
export * from "./components/ui/alert-dialog"
export * from "./components/ui/avatar"
export * from "./components/ui/collapsible"
export * from "./components/ui/combobox"
export * from "./components/ui/empty"
export * from "./components/ui/popover"
export * from "./components/ui/sheet"
export * from "./components/ui/sidebar"
export * from "./components/ui/skeleton"
export * from "./components/ui/sonner"
```

---

## Dependencies Summary

| Component   | @ark-ui                     | @tabler/icons    | CVA |
| ----------- | --------------------------- | ---------------- | --- |
| AlertDialog | @ark-ui/react/dialog        | -                | Yes |
| Avatar      | -                           | -                | Yes |
| Collapsible | @ark-ui/react/accordion     | IconChevronDown  | -   |
| Combobox    | @ark-ui/react/combobox      | IconChevronDown  | -   |
| Empty       | -                           | -                | -   |
| Popover     | @ark-ui/react/popover       | -                | Yes |
| Sheet       | @ark-ui/react/dialog        | -                | Yes |
| Sidebar     | @ark-ui/react (collapsible) | IconPanelLeft    | -   |
| Skeleton    | -                           | -                | Yes |
| Sonner      | @ark-ui/react/toaster       | IconCheck, IconX | -   |

---

## Next Steps

1. Run `sdd-tasks` to create task breakdown
2. Implement in order: skeleton → avatar → empty → collapsible → alert-dialog → sheet → popover → combobox → sidebar → sonner
3. Create stories for each component (ALWAYS include "Default" story)
4. Update exports, registry, and sidebar
5. Create documentation MDX files
