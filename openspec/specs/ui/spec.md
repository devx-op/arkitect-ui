# UI Components Specification

## Purpose

This spec defines the requirements for the Avatar and Textarea UI components in the arkitect-ui design system. It documents the current behavior that MUST be preserved when migrating to Ark UI primitives.

## Requirements

### Requirement: Avatar Root Component

The Avatar component (root) SHALL be a container element that displays user profile images or fallback content. The component MUST support size variants through the `size` prop.

#### Scenario: Avatar with default size

- GIVEN an Avatar component is rendered without a size prop
- WHEN the component displays in the DOM
- THEN it MUST have dimensions of h-10 w-10 (40px × 40px)
- AND it MUST have the class "relative flex shrink-0 overflow-hidden rounded-full"

#### Scenario: Avatar with small size variant

- GIVEN an Avatar component is rendered with size="sm"
- WHEN the component displays in the DOM
- THEN it MUST have dimensions of h-8 w-8 (32px × 32px)

#### Scenario: Avatar with large size variant

- GIVEN an Avatar component is rendered with size="lg"
- WHEN the component displays in the DOM
- THEN it MUST have dimensions of h-12 w-12 (48px × 48px)

#### Scenario: Avatar with extra-large size variant

- GIVEN an Avatar component is rendered with size="xl"
- WHEN the component displays in the DOM
- THEN it MUST have dimensions of h-16 w-16 (64px × 64px)

#### Scenario: Avatar accepts custom className

- GIVEN an Avatar component is rendered with a custom className
- WHEN the component displays in the DOM
- THEN the custom className MUST be merged with the base classes using the cn utility

#### Scenario: Avatar supports ref forwarding

- GIVEN an Avatar component is rendered with a ref
- WHEN the ref is attached to the DOM element
- THEN the ref MUST point to the underlying `<span>` element

---

### Requirement: AvatarImage Component

The AvatarImage component SHALL render an `<img>` element for displaying the profile picture. It MUST use object-cover to maintain aspect ratio.

#### Scenario: AvatarImage displays profile picture

- GIVEN an AvatarImage component is rendered with a valid src attribute
- WHEN the image loads successfully
- THEN it MUST display the image with "aspect-square h-full w-full object-cover" classes
- AND the image MUST maintain its aspect ratio while filling the container

#### Scenario: AvatarImage accepts standard img attributes

- GIVEN an AvatarImage component is rendered with attributes like alt, loading, decoding
- WHEN the component renders
- THEN all standard `<img>` attributes MUST be passed through to the underlying element

#### Scenario: AvatarImage supports ref forwarding

- GIVEN an AvatarImage component is rendered with a ref
- WHEN the ref is attached to the DOM element
- THEN the ref MUST point to the underlying `<img>` element

---

### Requirement: AvatarFallback Component

The AvatarFallback component SHALL render a fallback indicator when the image is loading or unavailable. It MUST display centered text with a muted background.

#### Scenario: AvatarFallback displays fallback content

- GIVEN an AvatarFallback component is rendered with text content
- WHEN the component displays in the DOM
- THEN it MUST have the classes "flex h-full w-full items-center justify-center rounded-full bg-muted"
- AND the text MUST be centered both horizontally and vertically

#### Scenario: AvatarFallback accepts custom className

- GIVEN an AvatarFallback component is rendered with a custom className
- WHEN the component displays in the DOM
- THEN the custom className MUST be merged with the fallback base classes

#### Scenario: AvatarFallback supports ref forwarding

- GIVEN an AvatarFallback component is rendered with a ref
- WHEN the ref is attached to the DOM element
- THEN the ref MUST point to the underlying `<span>` element

---

### Requirement: Avatar Loading State (Post-Migration Enhancement)

After migration to Ark UI primitives, the Avatar component SHOULD support loading state callbacks.

#### Scenario: Avatar reports loading status

- GIVEN an Avatar component is rendered with onStatusChange callback
- WHEN the image begins loading
- THEN the callback MUST be invoked with status "loading"
- AND when the image loads successfully
- THEN the callback MUST be invoked with status "loaded"
- AND when the image fails to load
- THEN the callback MUST be invoked with status "error"

#### Scenario: Avatar uses delayMs for fallback display

- GIVEN an Avatar component has an image with a potential delay
- WHEN the Avatar is rendered with delayMs prop
- THEN the fallback SHOULD NOT display until the delay time has elapsed

---

### Requirement: Textarea Component

The Textarea component SHALL render a multi-line text input. It MUST support variant styling through the `variant` prop and use forwardRef for ref support.

#### Scenario: Textarea with default outline variant

- GIVEN a Textarea component is rendered without a variant prop
- WHEN the component displays in the DOM
- THEN it MUST have classes "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
- AND it MUST include variant classes "border-base-400 border bg-transparent"

#### Scenario: Textarea with soft variant

- GIVEN a Textarea component is rendered with variant="soft"
- WHEN the component displays in the DOM
- THEN it MUST have the soft variant classes "bg-base-100"
- AND it SHOULD NOT have border styling (unlike outline variant)

#### Scenario: Textarea with plain variant

- GIVEN a Textarea component is rendered with variant="plain"
- WHEN the component displays in the DOM
- THEN it MUST have the plain variant classes "bg-transparent border-none"
- AND it MUST NOT display any border

#### Scenario: Textarea accepts standard textarea attributes

- GIVEN a Textarea component is rendered with attributes like placeholder, rows, disabled, required
- WHEN the component renders
- THEN all standard `<textarea>` HTML attributes MUST be passed through to the underlying element

#### Scenario: Textarea supports ref forwarding

- GIVEN a Textarea component is rendered with a ref
- WHEN the component mounts
- THEN the ref MUST point to the underlying `<textarea>` DOM element

#### Scenario: Textarea accepts custom className

- GIVEN a Textarea component is rendered with a custom className
- WHEN the component displays in the DOM
- THEN the custom className MUST be merged with the variant classes using the cn utility

---

### Requirement: Cross-Framework Consistency

The Avatar and Textarea components MUST maintain consistent behavior across React and Solid.js frameworks.

#### Scenario: React and Solid Avatar produce equivalent DOM structure

- GIVEN an Avatar component is rendered in React with the same props as in Solid
- WHEN both frameworks render to the DOM
- THEN the resulting DOM structure SHOULD be equivalent (same element types, same data attributes)

#### Scenario: React and Solid Textarea produce equivalent DOM structure

- GIVEN a Textarea component is rendered in React with the same props as in Solid
- WHEN both frameworks render to the DOM
- THEN the resulting DOM structure SHOULD be equivalent

#### Scenario: API compatibility between frameworks

- GIVEN the Avatar component in React has props: size (default|sm|lg|xl)
- WHEN the same component is rendered in Solid
- THEN the Solid version MUST accept the same size values with identical behavior
- AND GIVEN the Textarea component in React has props: variant (outline|soft|plain)
- WHEN the same component is rendered in Solid
- THEN the Solid version MUST accept the same variant values with identical behavior

---

### Requirement: Accessibility

The components MUST maintain proper accessibility attributes.

#### Scenario: Avatar has accessible data attributes

- GIVEN an Avatar component after migration to Ark UI
- WHEN rendered in the DOM
- THEN it SHOULD have proper `data-part` and `data-scope` attributes for accessibility tooling

#### Scenario: Textarea maintains accessibility

- GIVEN a Textarea component with associated label
- WHEN rendered with proper label associations
- THEN it MUST maintain screen reader accessibility

---

## Lote 3 - Additional Components

### Requirement: Center Component

The Center component MUST render its children centered within a container using CSS flexbox or grid.

The Center component SHALL accept className for custom styling and all standard HTML div attributes.

#### Scenario: Basic center alignment

- GIVEN a Center component with children
- WHEN rendered
- THEN children MUST be centered both horizontally and vertically

#### Scenario: Center with custom className

- GIVEN a Center component with custom className="bg-secondary p-4"
- WHEN rendered
- THEN it MUST apply both the custom classes and maintain center alignment

---

### Requirement: Grid Pattern Component

The GridPattern component MUST render a CSS grid pattern background using SVG or CSS.

The component SHALL accept parameters for grid line color, spacing, and line width.

#### Scenario: Default grid pattern

- GIVEN a GridPattern component with default props
- WHEN rendered
- THEN it MUST display a visible grid pattern

#### Scenario: Grid pattern with custom color

- GIVEN a GridPattern component with color="red" and width={2}
- WHEN rendered
- THEN it MUST display a grid with red lines of width 2

---

### Requirement: Grid Component

The Grid component MUST provide a CSS grid container for layout purposes.

The Grid component SHALL accept standard CSS grid properties (columns, gap, etc.) as props.

#### Scenario: Basic grid layout

- GIVEN a Grid component with columns={3}
- WHEN rendered
- THEN it MUST create a 3-column grid layout

#### Scenario: Grid with gap

- GIVEN a Grid component with columns={2} and gap={4}
- WHEN rendered
- THEN it MUST create a 2-column grid with gap-4 spacing

---

### Requirement: Chart Component

The Chart component MUST render a chart visualization.

The Chart component SHOULD support at least bar and line chart types.

The component MAY use SVG for rendering or integrate with a chart library.

#### Scenario: Bar chart rendering

- GIVEN a Chart component with type="bar" and data
- WHEN rendered
- THEN it MUST display a bar chart visualization

#### Scenario: Line chart rendering

- GIVEN a Chart component with type="line" and data
- WHEN rendered
- THEN it MUST display a line chart visualization

---

### Requirement: Copy ID Button Component

The CopyIdButton component MUST render a button that copies text to clipboard when clicked.

The component SHALL accept an id prop that specifies what text to copy.

The component SHOULD display feedback (visual or text) when copied.

#### Scenario: Click to copy

- GIVEN a CopyIdButton with id="12345"
- WHEN the user clicks the button
- THEN the text "12345" MUST be copied to clipboard
- AND the component SHOULD show feedback (e.g., "Copied!")

#### Scenario: Copy with custom label

- GIVEN a CopyIdButton with id="test-id" and label="Copy ID"
- WHEN rendered
- THEN it MUST display "Copy ID" as the button text

---

### Requirement: Infinite Slider Component

The InfiniteSlider component MUST display an infinitely scrolling horizontal list of items.

The component SHALL support both auto-scroll and manual drag interaction.

#### Scenario: Auto-scrolling slider

- GIVEN an InfiniteSlider with multiple items
- WHEN rendered
- THEN it MUST automatically scroll the content in a loop

#### Scenario: Manual drag interaction

- GIVEN an InfiniteSlider with multiple items
- WHEN the user drags the content
- THEN it MUST respond to drag gestures

---

### Requirement: Input Group Component

The InputGroup component MUST group multiple input components together with consistent styling.

The component SHALL accept children (multiple inputs) and optional label.

#### Scenario: Group multiple inputs

- GIVEN an InputGroup containing two Input components
- WHEN rendered
- THEN both inputs MUST be rendered within a grouped container

#### Scenario: Input group with label

- GIVEN an InputGroup with label="Personal Info" and children
- WHEN rendered
- THEN it MUST display the label above the grouped inputs

---

### Requirement: Tooltip Component

The Tooltip component MUST display additional information on hover using Ark UI Tooltip primitive.

The component SHALL support positioning (top, bottom, left, right) and delay timing.

#### Scenario: Show tooltip on hover

- GIVEN a Tooltip with content="Help text" and a trigger element
- WHEN the user hovers over the trigger
- THEN the tooltip MUST appear with "Help text" content

#### Scenario: Tooltip positioning

- GIVEN a Tooltip with placement="left"
- WHEN the user hovers over the trigger
- THEN the tooltip MUST appear on the left side of the trigger

---

### Requirement: Stack Component

The Stack component MUST provide a flexbox container with configurable direction and spacing.

The component SHALL support vertical (Stack) and horizontal (HStack, VStack) layouts.

The component SHALL accept gap property for spacing between children.

#### Scenario: Vertical stack layout

- GIVEN a Stack with gap={4} and three children
- WHEN rendered
- THEN children MUST be stacked vertically with gap-4 between each

#### Scenario: Horizontal stack layout (HStack)

- GIVEN an HStack with gap={2} and three children
- WHEN rendered
- THEN children MUST be arranged horizontally with gap-2 between each

#### Scenario: Vertical stack layout (VStack)

- GIVEN a VStack with gap={3} and three children
- WHEN rendered
- THEN children MUST be arranged vertically with gap-3 between each

#### Scenario: Stack with alignment

- GIVEN a Stack with justify="center" and align="center"
- WHEN rendered
- THEN children MUST be centered both horizontally and vertically

---

### Requirement: Migration to Ark UI Primitives

The components MUST be migrated to use Ark UI primitives while preserving existing behavior.

#### Scenario: Avatar uses Ark UI AvatarPrimitives

- GIVEN an Avatar component is implemented using @ark-ui/react or @ark-ui/solid primitives
- WHEN the component renders
- THEN it MUST use AvatarPrimitives.Root, AvatarPrimitives.Image, and AvatarPrimitives.Fallback
- AND the public API MUST remain unchanged (same props interface)
- AND the visual output MUST be identical to the pre-migration version

#### Scenario: Textarea uses Ark UI FieldPrimitives

- GIVEN a Textarea component is implemented using @ark-ui/react or @ark-ui/solid field primitives
- WHEN the component renders
- THEN it MUST use FieldPrimitives.Textarea
- AND the public API MUST remain unchanged (same props interface)
- AND the visual output MUST be identical to the pre-migration version
