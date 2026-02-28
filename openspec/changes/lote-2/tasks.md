# Tasks: Lote 2 - Arkitect UI Components

## Overview

Implement 10 UI components: alert-dialog, avatar, collapsible, combobox, empty, popover (float), sheet, sidebar, skeleton, sonner. Each component requires React + Solid implementations, stories, and documentation.

## Phase 1: Simple Components (skeleton, avatar, empty)

- [ ] 1.1 Create `packages/react/src/components/ui/skeleton.tsx` - Skeleton with CVA variants (default, circular), uses animate-pulse
- [ ] 1.2 Create `packages/react/src/components/ui/skeleton.stories.tsx` - Stories: Default, Circular, Custom sizes (MUST include "Default" story)
- [ ] 1.3 Create `packages/solid/src/components/ui/skeleton.tsx` - Skeleton with CVA variants for Solid
- [ ] 1.4 Create `packages/solid/src/components/ui/skeleton.stories.tsx` - Stories: Default, Circular, Custom sizes (MUST include "Default" story)
- [ ] 1.5 Create `packages/react/src/components/ui/avatar.tsx` - Avatar, AvatarImage, AvatarFallback with CVA size variants
- [ ] 1.6 Create `packages/react/src/components/ui/avatar.stories.tsx` - Stories: With image, With fallback, Different sizes (MUST include "Default" story)
- [ ] 1.7 Create `packages/solid/src/components/ui/avatar.tsx` - Avatar, AvatarImage, AvatarFallback for Solid
- [ ] 1.8 Create `packages/solid/src/components/ui/avatar.stories.tsx` - Stories: With image, With fallback, Different sizes (MUST include "Default" story)
- [ ] 1.9 Create `packages/react/src/components/ui/empty.tsx` - Empty, EmptyImage, EmptyTitle, EmptyDescription, EmptyAction components
- [ ] 1.10 Create `packages/react/src/components/ui/empty.stories.tsx` - Stories: Default, With action, Custom image (MUST include "Default" story)
- [ ] 1.11 Create `packages/solid/src/components/ui/empty.tsx` - Empty components for Solid
- [ ] 1.12 Create `packages/solid/src/components/ui/empty.stories.tsx` - Stories: Default, With action, Custom image (MUST include "Default" story)

## Phase 2: Medium Components (collapsible, alert-dialog, sheet)

- [ ] 2.1 Create `packages/react/src/components/ui/collapsible.tsx` - Collapsible, CollapsibleTrigger, CollapsibleContent using Ark UI Accordion (single item mode)
- [ ] 2.2 Create `packages/react/src/components/ui/collapsible.stories.tsx` - Stories: Default, Open state, With trigger (MUST include "Default" story)
- [ ] 2.3 Create `packages/solid/src/components/ui/collapsible.tsx` - Collapsible for Solid using Ark UI Accordion
- [ ] 2.4 Create `packages/solid/src/components/ui/collapsible.stories.tsx` - Stories: Default, Open state, With trigger (MUST include "Default" story)
- [ ] 2.5 Create `packages/react/src/components/ui/alert-dialog.tsx` - AlertDialog with 9 sub-components (Root, Trigger, Content, Header, Footer, Title, Description, Action, Cancel) using Ark UI Dialog
- [ ] 2.6 Create `packages/react/src/components/ui/alert-dialog.stories.tsx` - Stories: Default, With description, With cancel/action (MUST include "Default" story)
- [ ] 2.7 Create `packages/solid/src/components/ui/alert-dialog.tsx` - AlertDialog for Solid using Ark UI Dialog
- [ ] 2.8 Create `packages/solid/src/components/ui/alert-dialog.stories.tsx` - Stories: Default, With description, With cancel/action (MUST include "Default" story)
- [ ] 2.9 Create `packages/react/src/components/ui/sheet.tsx` - Sheet with 6 sub-components (Root, Trigger, Content, Header, Footer, Title, Description), slide animations, side variants (top, bottom, left, right)
- [ ] 2.10 Create `packages/react/src/components/ui/sheet.stories.tsx` - Stories: Right (default), Left, Top, Bottom, With header (MUST include "Default" story)
- [ ] 2.11 Create `packages/solid/src/components/ui/sheet.tsx` - Sheet for Solid with slide animations
- [ ] 2.12 Create `packages/solid/src/components/ui/sheet.stories.tsx` - Stories: Right (default), Left, Top, Bottom, With header (MUST include "Default" story)

## Phase 3: Complex Components (combobox, sidebar, sonner, popover)

- [ ] 3.1 Create `packages/react/src/components/ui/popover.tsx` - Popover (Float), PopoverTrigger, PopoverContent using Ark UI Popover with CVA positioning variants
- [ ] 3.2 Create `packages/react/src/components/ui/popover.stories.tsx` - Stories: Default, With form, Different placement (MUST include "Default" story)
- [ ] 3.3 Create `packages/solid/src/components/ui/popover.tsx` - Popover for Solid using Ark UI Popover
- [ ] 3.4 Create `packages/solid/src/components/ui/popover.stories.tsx` - Stories: Default, With form, Different placement (MUST include "Default" story)
- [ ] 3.5 Create `packages/react/src/components/ui/combobox.tsx` - Combobox with 8 sub-components (Root, Input, Trigger, Content, Item, ItemText, Group, Label) using Ark UI Combobox
- [ ] 3.6 Create `packages/react/src/components/ui/combobox.stories.tsx` - Stories: Basic, With groups, With disabled, Filter (MUST include "Default" story)
- [ ] 3.7 Create `packages/solid/src/components/ui/combobox.tsx` - Combobox for Solid using Ark UI Combobox
- [ ] 3.8 Create `packages/solid/src/components/ui/combobox.stories.tsx` - Stories: Basic, With groups, With disabled, Filter (MUST include "Default" story)
- [ ] 3.9 Create `packages/react/src/components/ui/sidebar.tsx` - Sidebar with 11 sub-components (Sidebar, SidebarTrigger, SidebarRail, SidebarInset, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator), using context for collapsed state
- [ ] 3.10 Create `packages/react/src/components/ui/sidebar.stories.tsx` - Stories: Default, Collapsed, With groups (MUST include "Default" story)
- [ ] 3.11 Create `packages/solid/src/components/ui/sidebar.tsx` - Sidebar for Solid with context-based collapsed state
- [ ] 3.12 Create `packages/solid/src/components/ui/sidebar.stories.tsx` - Stories: Default, Collapsed, With groups (MUST include "Default" story)
- [ ] 3.13 Create `packages/react/src/components/ui/sonner.tsx` - Toaster component and toast() function with variants (default, success, error, warning), positions, duration, action support
- [ ] 3.14 Create `packages/react/src/components/ui/sonner.stories.tsx` - Stories: Default, Success, Error, Warning, With action (MUST include "Default" story)
- [ ] 3.15 Create `packages/solid/src/components/ui/sonner.tsx` - Toaster and toast function for Solid
- [ ] 3.16 Create `packages/solid/src/components/ui/sonner.stories.tsx` - Stories: Default, Success, Error, Warning, With action (MUST include "Default" story)

## Phase 4: Exports & Config

- [ ] 4.1 Update `packages/react/src/index.ts` - Add exports for: alert-dialog, avatar, collapsible, combobox, empty, popover, sheet, sidebar, skeleton, sonner
- [ ] 4.2 Update `packages/solid/src/index.tsx` - Add exports for: alert-dialog, avatar, collapsible, combobox, empty, popover, sheet, sidebar, skeleton, sonner
- [ ] 4.3 Update `registry.json` - Add 20 entries (10 React + 10 Solid) for all components with proper dependencies
- [ ] 4.4 Update `apps/docs/astro.config.ts` - Add sidebar entries for all 10 React components and all 10 Solid components

## Phase 5: Documentation

- [ ] 5.1 Create `apps/docs/src/content/docs/react/components/alert-dialog.mdx` - MDX documentation for React AlertDialog
- [ ] 5.2 Create `apps/docs/src/content/docs/react/components/avatar.mdx` - MDX documentation for React Avatar
- [ ] 5.3 Create `apps/docs/src/content/docs/react/components/collapsible.mdx` - MDX documentation for React Collapsible
- [ ] 5.4 Create `apps/docs/src/content/docs/react/components/combobox.mdx` - MDX documentation for React Combobox
- [ ] 5.5 Create `apps/docs/src/content/docs/react/components/empty.mdx` - MDX documentation for React Empty
- [ ] 5.6 Create `apps/docs/src/content/docs/react/components/popover.mdx` - MDX documentation for React Popover
- [ ] 5.7 Create `apps/docs/src/content/docs/react/components/sheet.mdx` - MDX documentation for React Sheet
- [ ] 5.8 Create `apps/docs/src/content/docs/react/components/sidebar.mdx` - MDX documentation for React Sidebar
- [ ] 5.9 Create `apps/docs/src/content/docs/react/components/skeleton.mdx` - MDX documentation for React Skeleton
- [ ] 5.10 Create `apps/docs/src/content/docs/react/components/sonner.mdx` - MDX documentation for React Sonner
- [ ] 5.11 Create `apps/docs/src/content/docs/solid/components/alert-dialog.mdx` - MDX documentation for Solid AlertDialog
- [ ] 5.12 Create `apps/docs/src/content/docs/solid/components/avatar.mdx` - MDX documentation for Solid Avatar
- [ ] 5.13 Create `apps/docs/src/content/docs/solid/components/collapsible.mdx` - MDX documentation for Solid Collapsible
- [ ] 5.14 Create `apps/docs/src/content/docs/solid/components/combobox.mdx` - MDX documentation for Solid Combobox
- [ ] 5.15 Create `apps/docs/src/content/docs/solid/components/empty.mdx` - MDX documentation for Solid Empty
- [ ] 5.16 Create `apps/docs/src/content/docs/solid/components/popover.mdx` - MDX documentation for Solid Popover
- [ ] 5.17 Create `apps/docs/src/content/docs/solid/components/sheet.mdx` - MDX documentation for Solid Sheet
- [ ] 5.18 Create `apps/docs/src/content/docs/solid/components/sidebar.mdx` - MDX documentation for Solid Sidebar
- [ ] 5.19 Create `apps/docs/src/content/docs/solid/components/skeleton.mdx` - MDX documentation for Solid Skeleton
- [ ] 5.20 Create `apps/docs/src/content/docs/solid/components/sonner.mdx` - MDX documentation for Solid Sonner

## Phase 6: Verification

- [ ] 6.1 Run `pnpm run build` - Build all packages
- [ ] 6.2 Run `pnpm run typecheck` - Check for TypeScript errors
- [ ] 6.3 Run `pnpm run lint` - Lint all files
- [ ] 6.4 Verify each component has a "Default" story in both React and Solid
- [ ] 6.5 Verify ComponentPreview works with new components in docs

---

## Implementation Order

**Recommended order by complexity:**

1. **Phase 1 (Simple)** - Start with skeleton, avatar, empty - these are pure CSS/composition with no Ark UI primitives
2. **Phase 2 (Medium)** - collapsible (Ark UI Accordion), alert-dialog (Ark UI Dialog), sheet (Ark UI Dialog + animations)
3. **Phase 3 (Complex)** - popover (Ark UI Popover), combobox (Ark UI Combobox), sidebar (multiple sub-components + state), sonner (Toaster + toast function)
4. **Phase 4 (Exports)** - Update indexes, registry, sidebar after all components exist
5. **Phase 5 (Docs)** - Create MDX after components are complete
6. **Phase 6 (Verify)** - Build, typecheck, lint

## Component Dependencies

| Component    | Ark UI Primitive      | Icons Needed                      |
| ------------ | --------------------- | --------------------------------- |
| skeleton     | None                  | None                              |
| avatar       | None                  | None                              |
| empty        | None                  | None                              |
| collapsible  | @ark-ui/accordion     | IconChevronDown                   |
| alert-dialog | @ark-ui/dialog        | None                              |
| sheet        | @ark-ui/dialog        | None                              |
| popover      | @ark-ui/popover       | None                              |
| combobox     | @ark-ui/combobox      | IconChevronDown                   |
| sidebar      | @ark-ui (collapsible) | IconPanelLeft                     |
| sonner       | @ark-ui/toaster       | IconCheck, IconX, IconAlertCircle |

## Key Requirements (from Lote 1)

- **Every component MUST have "Default" story** - Required for ComponentPreview compatibility
- **Every component MUST have MDX docs** - Both React and Solid versions
- **Check ComponentPreview works** - Verify in docs after implementation
- Use Tabler Icons instead of Lucide
- Use cn() utility for class merging
- Follow Shadcn UI API patterns exactly
