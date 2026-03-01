# UI Components Specification

## Purpose

This specification defines the requirements and behaviors for the Lote 3 Parte 2 components: center, grid-pattern, grid, chart, copy-id-button, infinite-slider, input-group, textarea, tooltip, and stack (Stack, HStack, VStack).

---

## Exceptions (CSS-only components)

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

## Simple Components

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

### Requirement: Textarea Component

The Textarea component MUST render a styled textarea input.

The component SHALL support standard textarea attributes (placeholder, disabled, rows, etc.).

#### Scenario: Basic textarea

- GIVEN a Textarea component with placeholder="Enter text"
- WHEN rendered
- THEN it MUST display a textarea with the placeholder

#### Scenario: Disabled textarea

- GIVEN a Textarea component with disabled={true}
- WHEN rendered
- THEN the textarea MUST be disabled and not editable

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

## Stack Components

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
