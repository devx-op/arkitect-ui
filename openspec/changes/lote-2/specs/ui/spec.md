# Delta for UI Components - Lote 2

## ADDED Requirements

### Requirement: AlertDialog Component

The AlertDialog component MUST function identically to Shadcn UI AlertDialog. It MUST be a modal dialog for alerts, confirmations, or actions that require user attention.

#### Scenario: AlertDialog with title and description

- GIVEN an AlertDialog component with AlertDialogTrigger, AlertDialogContent containing AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, and AlertDialogFooter with action buttons
- WHEN the trigger is clicked
- THEN it MUST display a modal with title, description, and action buttons

#### Scenario: AlertDialog open controlled

- GIVEN an AlertDialog with open={true} and onOpenChange handler
- WHEN the component renders
- THEN it MUST display in open state
- AND when user presses Escape or clicks outside, it MUST call onOpenChange with false

#### Scenario: AlertDialog with cancel and action

- GIVEN an AlertDialog with AlertDialogAction and AlertDialogCancel buttons
- WHEN the user clicks Cancel
- THEN it MUST close the dialog
- AND when the user clicks Action
- THEN it MUST execute the action and close

#### Scenario: AlertDialog with custom className

- GIVEN an AlertDialogContent with className="custom-alert"
- WHEN the dialog opens
- THEN it MUST merge custom class with default content classes

#### Scenario: AlertDialog with Portal

- GIVEN an AlertDialogContent
- WHEN the dialog opens
- THEN it MUST render in a Portal (outside DOM hierarchy)

#### Scenario: AlertDialog on mobile

- GIVEN an AlertDialog on a small viewport
- THEN it MUST display properly with appropriate sizing

#### Scenario: AlertDialog with description only

- GIVEN an AlertDialogContent with AlertDialogDescription but no AlertDialogTitle
- WHEN the dialog opens
- THEN it MUST render the description without title

### Requirement: Avatar Component

The Avatar component MUST function identically to Shadcn UI Avatar. It MUST display a user avatar image with fallback support.

#### Scenario: Avatar with image source

- GIVEN an Avatar component with AvatarImage src="avatar.jpg" and AvatarFallback
- WHEN the image loads successfully
- THEN it MUST display the image

#### Scenario: Avatar with failed image load

- GIVEN an Avatar with AvatarImage src="invalid.jpg" and AvatarFallback="JD"
- WHEN the image fails to load
- THEN it MUST display the fallback initials "JD"

#### Scenario: Avatar with delayed image load

- GIVEN an Avatar with AvatarImage that takes time to load and AvatarFallback
- WHEN the component first renders
- THEN it MUST show the fallback immediately
- AND when the image loads, it MUST switch to show the image

#### Scenario: Avatar with custom size

- GIVEN an Avatar with className="w-16 h-16"
- WHEN the avatar displays
- THEN it MUST respect the custom size

#### Scenario: Avatar with custom className on AvatarImage

- GIVEN an AvatarImage with className="object-cover"
- WHEN the avatar displays
- THEN it MUST apply the custom class to the image element

#### Scenario: Avatar fallback with custom className

- GIVEN an AvatarFallback with className="bg-blue-500"
- WHEN the fallback displays
- THEN it MUST apply the custom background class

### Requirement: Collapsible Component

The Collapsible component MUST function identically to Shadcn UI Collapsible. It MUST provide expandable/collapsible content container.

#### Scenario: Collapsible open state

- GIVEN a Collapsible component with CollapsibleContent containing text
- WHEN Collapsible open={true}
- THEN it MUST display the content

#### Scenario: Collapsible closed state

- GIVEN a Collapsible component with CollapsibleContent
- WHEN Collapsible open={false}
- THEN it MUST hide the content

#### Scenario: Collapsible with CollapsibleTrigger

- GIVEN a Collapsible with CollapsibleTrigger as a button
- WHEN the user clicks the trigger
- THEN it MUST toggle the open state

#### Scenario: Collapsible controlled with onOpenChange

- GIVEN a Collapsible with onOpenChange handler
- WHEN the open state changes
- THEN it MUST call onOpenChange with the new state

#### Scenario: Collapsible with animation class

- GIVEN a CollapsibleContent with className="animate-collapse"
- WHEN the content expands/collapses
- THEN it MUST apply the animation class

### Requirement: Combobox Component

The Combobox component MUST function identically to Shadcn UI Combobox. It MUST provide a dropdown with search/filter capabilities.

#### Scenario: Combobox with search input

- GIVEN a Combobox with input field and dropdown options
- WHEN the user types in the input
- THEN it MUST filter the displayed options based on the search text

#### Scenario: Combobox with selected value

- GIVEN a Combobox with value="react"
- WHEN the component displays
- THEN it MUST show "react" in the input field

#### Scenario: Combobox open state

- GIVEN a Combobox with open={true}
- WHEN the component renders
- THEN it MUST display the dropdown with options

#### Scenario: Combobox with onValueChange

- GIVEN a Combobox with onValueChange handler
- WHEN a user selects an item
- THEN it MUST call onValueChange with the selected value

#### Scenario: Combobox with placeholder

- GIVEN a ComboboxInput with placeholder="Select framework"
- WHEN no value is selected
- THEN it MUST display the placeholder text

#### Scenario: Combobox filtering case-insensitive

- GIVEN a Combobox with options "React", "Solid", "Vue"
- WHEN the user types "re"
- THEN it MUST filter to show "React"

#### Scenario: Combobox with disabled option

- GIVEN a ComboboxItem with disabled={true}
- WHEN the dropdown shows
- THEN the disabled item MUST not be selectable

#### Scenario: Combobox with custom filtering

- GIVEN a Combobox with filter function
- WHEN the user types search text
- THEN it MUST use the custom filter function

### Requirement: Empty Component

The Empty component MUST function identically to Shadcn UI Empty State. It MUST display a placeholder when no content is available.

#### Scenario: Empty with description

- GIVEN an Empty component with EmptyImage, EmptyTitle, and EmptyDescription
- WHEN rendered
- THEN it MUST display the image, title, and description

#### Scenario: Empty with action button

- GIVEN an Empty with EmptyAction containing a Button
- WHEN rendered
- THEN it MUST display the action button

#### Scenario: Empty with custom className

- GIVEN an Empty with className="custom-empty"
- WHEN rendered
- THEN it MUST merge custom class with default classes

#### Scenario: Empty without optional parts

- GIVEN an Empty component with only EmptyTitle
- WHEN rendered
- THEN it MUST display the title without image or description

### Requirement: Float Component

The Float component MUST function identically to Shadcn UI Popover (floating element). It MUST provide floating content positioned relative to a trigger.

#### Scenario: Float with trigger and content

- GIVEN a Float component with FloatTrigger and FloatContent
- WHEN the user clicks the trigger
- THEN it MUST display the floating content positioned near the trigger

#### Scenario: Float positioning

- GIVEN a FloatContent with placement="bottom-start"
- WHEN the float opens
- THEN it MUST position below and aligned to the start of the trigger

#### Scenario: Float with Portal

- GIVEN a FloatContent with portal={true}
- WHEN the float opens
- THEN it MUST render in a Portal

#### Scenario: Float with sameWidth

- GIVEN a FloatContent with sameWidth={true}
- WHEN the float opens
- THEN it MUST have the same width as the trigger

#### Scenario: Float controlled open state

- GIVEN a Float with open={true} and onOpenChange handler
- WHEN the component renders
- THEN it MUST display in open state

#### Scenario: Float with nested content

- GIVEN a FloatContent containing a Select component
- WHEN the float opens
- THEN the nested Select MUST function normally

### Requirement: Sheet Component

The Sheet component MUST function identically to Shadcn UI Sheet. It MUST provide a slide-out panel/drawer.

#### Scenario: Sheet from right (default)

- GIVEN a Sheet with SheetTrigger and SheetContent (no side prop)
- WHEN the user clicks the trigger
- THEN it MUST slide in from the right side

#### Scenario: Sheet from left

- GIVEN a SheetContent with side="left"
- WHEN the sheet opens
- THEN it MUST slide in from the left

#### Scenario: Sheet from top

- GIVEN a SheetContent with side="top"
- WHEN the sheet opens
- THEN it MUST slide in from the top

#### Scenario: Sheet from bottom

- GIVEN a SheetContent with side="bottom"
- WHEN the sheet opens
- THEN it MUST slide in from the bottom

#### Scenario: Sheet with SheetHeader, SheetTitle, SheetDescription

- GIVEN a SheetContent with SheetHeader containing SheetTitle and SheetDescription
- WHEN the sheet opens
- THEN it MUST display the header, title, and description

#### Scenario: Sheet with SheetFooter

- GIVEN a SheetContent with SheetFooter containing action buttons
- WHEN the sheet opens
- THEN it MUST display the footer at the bottom

#### Scenario: Sheet with overlay close

- GIVEN a Sheet with SheetContent
- WHEN the user clicks the overlay
- THEN it MUST close the sheet

#### Scenario: Sheet with onOpenChange

- GIVEN a Sheet with onOpenChange handler
- WHEN the open state changes
- THEN it MUST call onOpenChange with the new state

#### Scenario: Sheet with custom className

- GIVEN a SheetContent with className="custom-sheet"
- WHEN the sheet opens
- THEN it MUST merge custom class with default classes

### Requirement: Sidebar Component

The Sidebar component MUST function identically to Shadcn UI Sidebar. It MUST provide a collapsible navigation sidebar.

#### Scenario: Sidebar with navigation items

- GIVEN a Sidebar component with SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, and SidebarMenuButton
- WHEN rendered
- THEN it MUST display the navigation structure

#### Scenario: Sidebar collapsed state

- GIVEN a Sidebar with collapsed={true}
- WHEN rendered
- THEN it MUST display in collapsed mode (narrower width)

#### Scenario: Sidebar with SidebarTrigger

- GIVEN a Sidebar with SidebarTrigger
- WHEN the user clicks the trigger
- THEN it MUST toggle the collapsed state

#### Scenario: Sidebar with SidebarRail

- GIVEN a Sidebar with SidebarRail
- WHEN the sidebar is collapsed
- THEN it MUST display a rail icon for expand on hover

#### Scenario: Sidebar with SidebarInset

- GIVEN a SidebarInset component
- WHEN rendered
- THEN it MUST provide inset spacing for main content

#### Scenario: Sidebar with custom width

- GIVEN a Sidebar with className="w-64"
- WHEN rendered
- THEN it MUST respect the custom width

#### Scenario: Sidebar responsive (mobile)

- GIVEN a Sidebar on a small viewport
- THEN it MUST handle responsive behavior appropriately

#### Scenario: Sidebar with SidebarGroupLabel

- GIVEN a SidebarGroup with SidebarGroupLabel
- WHEN rendered
- THEN it MUST display the group label

#### Scenario: Sidebar with SidebarSeparator

- GIVEN SidebarSeparator between SidebarGroup items
- WHEN rendered
- THEN it MUST display a visual separator

### Requirement: Skeleton Component

The Skeleton component MUST function identically to Shadcn UI Skeleton. It MUST display loading placeholders.

#### Scenario: Skeleton as loading card

- GIVEN a Skeleton with className matching a card shape
- WHEN rendered
- THEN it MUST display a pulse animation placeholder

#### Scenario: Skeleton with custom dimensions

- GIVEN a Skeleton with className="w-32 h-4"
- WHEN rendered
- THEN it MUST display with those dimensions

#### Scenario: Skeleton with animation

- GIVEN a Skeleton (default)
- WHEN rendered
- THEN it MUST have a pulse animation

#### Scenario: Skeleton without animation

- GIVEN a Skeleton with animation={false}
- WHEN rendered
- THEN it MUST display without animation

#### Scenario: Skeleton variant

- GIVEN a Skeleton with variant="circular"
- WHEN rendered
- THEN it MUST display as a circle

#### Scenario: Skeleton with ref

- GIVEN a Skeleton with ref attached
- WHEN rendered
- THEN the ref MUST point to the underlying div

#### Scenario: Skeleton in loading list

- GIVEN multiple Skeleton components representing a loading list
- WHEN rendered
- THEN they MUST display as placeholder items

### Requirement: Sonner (Toast) Component

The Sonner component MUST function identically to Shadcn UI Toast (Sonner). It MUST provide toast notification system.

#### Scenario: Toast with title and description

- GIVEN a toast() call with title="Saved" and description="Changes saved successfully"
- WHEN the toast displays
- THEN it MUST show the title and description

#### Scenario: Toast with action button

- GIVEN a toast() call with action button
- WHEN the toast displays
- THEN it MUST show the action button

#### Scenario: Toast with dismiss

- GIVEN a toast with dismiss button
- WHEN the user clicks dismiss
- THEN the toast MUST be removed

#### Scenario: Toast with promise

- GIVEN a toast.promise() with async function
- THEN it MUST show loading, success, or error states

#### Scenario: Toast positioning

- GIVEN toast() calls with position="bottom-right"
- WHEN toasts display
- THEN they MUST appear in the bottom-right corner

#### Scenario: Toast with custom duration

- GIVEN a toast with duration={5000}
- WHEN displayed
- THEN it MUST auto-dismiss after 5 seconds

#### Scenario: Toast with onAutoClose

- GIVEN a toast with onAutoClose handler
- WHEN the toast auto-closes
- THEN it MUST call the handler

#### Scenario: Toast types (success, error, warning, info)

- GIVEN toast({ variant: "success" }) and other variants
- WHEN displayed
- THEN each MUST show appropriate styling

#### Scenario: Multiple toasts

- GIVEN multiple toast() calls
- WHEN they display
- THEN they MUST stack appropriately

#### Scenario: Toaster component

- GIVEN a Toaster component in the app
- THEN it MUST render the toast container

## API Compatibility Requirements

All components MUST maintain Shadcn UI API compatibility:

### AlertDialog API

| Prop         | Type                    | Default | Description            |
| ------------ | ----------------------- | ------- | ---------------------- |
| open         | boolean                 | -       | Controlled open state  |
| onOpenChange | (open: boolean) => void | -       | Open change handler    |
| defaultOpen  | boolean                 | -       | Initial open state     |
| className    | string                  | -       | Additional CSS classes |

### Avatar API

| Prop      | Type   | Description            |
| --------- | ------ | ---------------------- |
| className | string | Additional CSS classes |

### Collapsible API

| Prop         | Type                    | Default | Description           |
| ------------ | ----------------------- | ------- | --------------------- |
| open         | boolean                 | -       | Controlled open state |
| onOpenChange | (open: boolean) => void | -       | Open change handler   |
| defaultOpen  | boolean                 | -       | Initial open state    |

### Combobox API

| Prop          | Type                    | Default | Description          |
| ------------- | ----------------------- | ------- | -------------------- |
| value         | string                  | -       | Controlled value     |
| onValueChange | (value: string) => void | -       | Change handler       |
| placeholder   | string                  | -       | Input placeholder    |
| disabled      | boolean                 | false   | Disable the combobox |

### Empty API

| Prop      | Type   | Description            |
| --------- | ------ | ---------------------- |
| className | string | Additional CSS classes |

### Float (Popover) API

| Prop         | Type                    | Description            |
| ------------ | ----------------------- | ---------------------- |
| open         | boolean                 | Controlled open state  |
| onOpenChange | (open: boolean) => void | Open change handler    |
| className    | string                  | Additional CSS classes |

### Sheet API

| Prop         | Type                                   | Default | Description            |
| ------------ | -------------------------------------- | ------- | ---------------------- |
| open         | boolean                                | -       | Controlled open state  |
| onOpenChange | (open: boolean) => void                | -       | Open change handler    |
| side         | "top" \| "bottom" \| "left" \| "right" | "right" | Sheet position         |
| className    | string                                 | -       | Additional CSS classes |

### Sidebar API

| Prop              | Type                         | Default | Description                |
| ----------------- | ---------------------------- | ------- | -------------------------- |
| collapsed         | boolean                      | -       | Controlled collapsed state |
| onCollapsedChange | (collapsed: boolean) => void | -       | Collapsed change handler   |
| className         | string                       | -       | Additional CSS classes     |

### Skeleton API

| Prop      | Type                    | Default   | Description            |
| --------- | ----------------------- | --------- | ---------------------- |
| className | string                  | -         | Additional CSS classes |
| variant   | "default" \| "circular" | "default" | Skeleton shape         |

### Sonner (Toast) API

| Prop        | Type                                                         | Default        | Description           |
| ----------- | ------------------------------------------------------------ | -------------- | --------------------- |
| title       | string                                                       | -              | Toast title           |
| description | string                                                       | -              | Toast description     |
| variant     | "default" \| "success" \| "error" \| "warning"               | "default"      | Toast type            |
| duration    | number                                                       | 5000           | Auto-dismiss duration |
| position    | "top-left" \| "top-right" \| "bottom-left" \| "bottom-right" | "bottom-right" | Toast position        |
| action      | { label: string, onClick: () => void }                       | -              | Action button         |

## Cross-Framework Requirements

Both React and Solid implementations MUST:

1. Export the same component APIs
2. Use identical prop names and types (within framework conventions)
3. Render visually identical output
4. Support the same variants, sizes, and states
5. Use the same CSS class patterns from Shadcn UI
6. Use Ark UI primitives internally where applicable
7. Use Tabler Icons instead of Lucide
8. Use the cn() utility for class merging

## Implementation Notes

### AlertDialog

- Uses @ark-ui/react/dialog (React) or @ark-ui/solid/dialog (Solid)
- Exports: AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel

### Avatar

- Pure CSS component, no Ark UI primitive
- Exports: Avatar, AvatarImage, AvatarFallback
- Uses CSS for image/fallback switching

### Collapsible

- Uses @ark-ui/react/accordion in single-item mode (React) or @ark-ui/solid/accordion (Solid)
- Exports: Collapsible, CollapsibleTrigger, CollapsibleContent

### Combobox

- Uses @ark-ui/react/combobox (React) or @ark-ui/solid/combobox (Solid)
- Most similar to Select but with search/filter capability

### Empty

- Pure composition component, no Ark UI primitive
- Exports: Empty, EmptyImage, EmptyTitle, EmptyDescription, EmptyAction

### Float

- Uses @ark-ui/react/popover (React) or @ark-ui/solid/popover (Solid)
- Exports: Float, FloatTrigger, FloatContent
- Provides positioning via Ark UI's positioning system

### Sheet

- Uses @ark-ui/react/dialog (React) or @ark-ui/solid/dialog (Solid)
- Exports: Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription

### Sidebar

- Complex component using Ark UI's collapsible patterns
- Multiple sub-components: Sidebar, SidebarTrigger, SidebarRail, SidebarInset, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator

### Skeleton

- Pure CSS component, no Ark UI primitive
- Uses CSS animation (pulse) for loading state

### Sonner

- Uses @ark-ui/react/toaster (React) or @ark-ui/solid/toaster (Solid)
- Toast function API for triggering toasts
- Exports: Toaster, toast (function)
