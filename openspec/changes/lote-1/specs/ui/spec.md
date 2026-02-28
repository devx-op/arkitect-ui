# Delta for UI Components - Lote 1

## ADDED Requirements

### Requirement: Badge Component

The Badge component MUST function identically to Shadcn UI Badge. It MUST be a small status indicator used to highlight information such as counts, labels, or status.

#### Scenario: Default variant

- GIVEN a Badge component rendered with no variant prop
- WHEN the component is displayed
- THEN it MUST show with the "default" variant styling (primary background with contrasting text)

#### Scenario: Secondary variant

- GIVEN a Badge component rendered with variant="secondary"
- WHEN the component is displayed
- THEN it MUST show with secondary styling (secondary background color)

#### Scenario: Destructive variant

- GIVEN a Badge component rendered with variant="destructive"
- WHEN the component is displayed
- THEN it MUST show with destructive styling (red/destructive background color)

#### Scenario: Outline variant

- GIVEN a Badge component rendered with variant="outline"
- WHEN the component is displayed
- THEN it MUST show with outline styling (border with transparent background)

#### Scenario: Default size

- GIVEN a Badge component rendered with no size prop
- WHEN the component is displayed
- THEN it MUST display with default size (standard padding and font size)

#### Scenario: Small size

- GIVEN a Badge component rendered with size="sm"
- WHEN the component is displayed
- THEN it MUST display with small size (reduced padding and font size)

#### Scenario: Large size

- GIVEN a Badge component rendered with size="lg"
- WHEN the component is displayed
- THEN it MUST display with large size (increased padding and font size)

#### Scenario: With custom className

- GIVEN a Badge component rendered with className="custom-class"
- WHEN the component is displayed
- THEN it MUST merge the custom class with the default classes using cn() utility

#### Scenario: With child content

- GIVEN a Badge component with children "New Feature"
- WHEN the component is displayed
- THEN it MUST render the children text inside the badge

#### Scenario: With asChild prop

- GIVEN a Badge component with asChild={true} wrapping a span element
- WHEN the component is displayed
- THEN it MUST merge its classes onto the child element using Ark UI's asChild pattern

### Requirement: Card Component

The Card component MUST function identically to Shadcn UI Card. It MUST be a container for content with header, title, description, content, and footer parts.

#### Scenario: Basic card structure

- GIVEN a Card component with CardHeader, CardTitle, CardDescription, CardContent, and CardFooter
- WHEN the component is displayed
- THEN it MUST render all parts in the correct order with appropriate spacing

#### Scenario: CardHeader only

- GIVEN a Card component with only CardHeader containing CardTitle
- WHEN the component is displayed
- THEN it MUST render the header with proper styling

#### Scenario: CardContent only

- GIVEN a Card component with only CardContent containing text
- WHEN the component is displayed
- THEN it MUST render the content with proper styling

#### Scenario: Card with custom className on CardContent

- GIVEN a CardContent component with className="custom-content-class"
- WHEN the component is displayed
- THEN it MUST merge the custom class with default CardContent classes

#### Scenario: Card without optional parts

- GIVEN a Card component with only CardContent
- WHEN the component is displayed
- THEN it MUST render correctly without header, title, description, or footer

#### Scenario: CardTitle with custom className

- GIVEN a CardTitle component with className="custom-title"
- WHEN the component is displayed
- THEN it MUST render with default title styling merged with custom class

#### Scenario: CardDescription

- GIVEN a Card component with CardHeader containing CardTitle and CardDescription
- WHEN the component is displayed
- THEN it MUST render description with muted styling below the title

#### Scenario: CardFooter alignment

- GIVEN a CardFooter component
- WHEN the component is displayed
- THEN it MUST render with proper spacing and flex container for alignment

### Requirement: Checkbox Component

The Checkbox component MUST function identically to Shadcn UI Checkbox. It MUST provide a toggleable selection control with checked, unchecked, and indeterminate states.

#### Scenario: Unchecked state

- GIVEN a Checkbox component with checked={false}
- WHEN the component is displayed
- THEN it MUST display an unchecked box visual

#### Scenario: Checked state

- GIVEN a Checkbox component with checked={true}
- WHEN the component is displayed
- THEN it MUST display a checked box with checkmark icon

#### Scenario: Indeterminate state

- GIVEN a Checkbox component with checked="indeterminate"
- WHEN the component is displayed
- THEN it MUST display an indeterminate state with minus/hyphen icon

#### Scenario: Controlled checkbox with onCheckedChange

- GIVEN a controlled Checkbox component with onCheckedChange handler
- WHEN the user clicks the checkbox
- THEN it MUST call onCheckedChange with the new checked state

#### Scenario: Uncontrolled checkbox

- GIVEN an uncontrolled Checkbox component with defaultChecked={true}
- WHEN the component is displayed
- THEN it MUST start in checked state

#### Scenario: Disabled checkbox

- GIVEN a Checkbox component with disabled={true}
- WHEN the component is displayed
- THEN it MUST show disabled styling and NOT respond to clicks

#### Scenario: Checkbox with label

- GIVEN a Checkbox component wrapped in a label with text "Accept terms"
- WHEN the component is displayed
- THEN it MUST render the checkbox with clickable label text

#### Scenario: Checkbox with form disabled

- GIVEN a Checkbox component with form={false}
- WHEN the component is rendered
- THEN it MUST exclude itself from form submission

#### Scenario: Checkbox ref forwarding

- GIVEN a Checkbox component with a ref attached
- WHEN the component is displayed
- THEN the ref MUST point to the underlying HTML input element

#### Scenario: Checkbox with custom className

- GIVEN a Checkbox component with className="custom-checkbox"
- WHEN the component is displayed
- THEN it MUST merge custom class with default checkbox classes

#### Scenario: Checkbox with id

- GIVEN a Checkbox component with id="terms-checkbox"
- WHEN the component is displayed
- THEN the underlying input MUST have the id attribute set

#### Scenario: Checkbox with name

- GIVEN a Checkbox component with name="acceptTerms"
- WHEN the component is displayed
- THEN the underlying input MUST have the name attribute set

### Requirement: Select Component

The Select component MUST function identically to Shadcn UI Select. It MUST provide a dropdown selection control with trigger, value, content, item, group, label, and separator parts.

#### Scenario: Basic single select

- GIVEN a Select component with SelectTrigger, SelectValue, and SelectContent with SelectItem children
- WHEN the user clicks the trigger
- THEN it MUST open the dropdown with selectable items

#### Scenario: Select with placeholder

- GIVEN a SelectValue with placeholder="Choose an option"
- WHEN no value is selected
- THEN it MUST display the placeholder text

#### Scenario: Select with selected value

- GIVEN a SelectValue when a SelectItem is selected
- WHEN the component displays
- THEN it MUST show the selected item's display text

#### Scenario: SelectItem with value and label

- GIVEN a SelectItem with value="react" and children "React"
- WHEN the item is displayed in the dropdown
- THEN it MUST show "React" and select "react" as the value

#### Scenario: SelectItem disabled

- GIVEN a SelectItem with disabled={true}
- WHEN the dropdown is open
- THEN the item MUST be visually disabled and not selectable

#### Scenario: Select with onValueChange

- GIVEN a Select component with onValueChange handler
- WHEN a user selects an item
- THEN it MUST call onValueChange with the selected item's value

#### Scenario: Select with defaultValue

- GIVEN a Select component with defaultValue="solid"
- WHEN the component first renders
- THEN it MUST start with "solid" selected

#### Scenario: Select open controlled

- GIVEN a Select component with open={true} and onOpenChange handler
- WHEN the component renders
- THEN it MUST be in open state
- AND when user clicks outside, it MUST call onOpenChange with false

#### Scenario: SelectGroup with SelectLabel

- GIVEN a SelectGroup containing SelectLabel and SelectItem children
- WHEN the dropdown displays
- THEN it MUST show the label as a group header

#### Scenario: SelectSeparator

- GIVEN SelectContent with SelectSeparator between SelectItem groups
- WHEN the dropdown displays
- THEN it MUST show a visual separator line

#### Scenario: SelectTrigger with custom className

- GIVEN a SelectTrigger with className="custom-trigger"
- WHEN the trigger is displayed
- THEN it MUST merge custom class with default trigger classes

#### Scenario: SelectContent with custom positioning

- GIVEN a SelectContent component
- WHEN the dropdown opens
- THEN it MUST be positioned correctly (using Ark UI's positioning)

#### Scenario: Select value binding

- GIVEN a Select component with value="react" bound to state
- WHEN an item is selected
- THEN the state MUST update with the new value

#### Scenario: Select disabled

- GIVEN a SelectTrigger with disabled={true}
- WHEN the component is displayed
- THEN it MUST show disabled styling and NOT open on click

#### Scenario: Select with multiple selections

- GIVEN a SelectValue that displays multiple selected values
- WHEN multiple items are selected
- THEN it MUST display all selected values (comma-separated or as badges)

### Requirement: Separator Component

The Separator component MUST function identically to Shadcn UI Separator. It MUST be a visual divider with horizontal and vertical orientations.

#### Scenario: Horizontal orientation (default)

- GIVEN a Separator component with no orientation prop
- WHEN the component is displayed
- THEN it MUST render as a horizontal line (left to right)

#### Scenario: Vertical orientation

- GIVEN a Separator component with orientation="vertical"
- WHEN the component is displayed
- THEN it MUST render as a vertical line (top to bottom)

#### Scenario: Separator with decorative prop

- GIVEN a Separator component with decorative={true}
- WHEN the component is rendered
- THEN it MUST include role="none" for accessibility (semantic none)

#### Scenario: Separator without decorative prop

- GIVEN a Separator component with decorative={false} or not set
- WHEN the component is rendered
- THEN it MUST include default accessibility attributes

#### Scenario: Separator with custom className

- GIVEN a Separator with className="custom-separator"
- WHEN the component is displayed
- THEN it MUST merge custom class with default separator classes

#### Scenario: Separator in flex container

- GIVEN a Separator component inside a flex container
- WHEN the component displays vertically
- THEN it MUST properly fill the container height

#### Scenario: Separator with ref

- GIVEN a Separator component with a ref attached
- WHEN the component renders
- THEN the ref MUST point to the underlying hr element

#### Scenario: Separator as li separator in navigation

- GIVEN a navigation list with Separator components between items
- WHEN the list displays
- THEN each separator MUST visually divide list items

## API Compatibility Requirements

All components MUST maintain Shadcn UI API compatibility:

### Badge API

| Prop      | Type                                                   | Default   | Description              |
| --------- | ------------------------------------------------------ | --------- | ------------------------ |
| variant   | "default" \| "secondary" \| "destructive" \| "outline" | "default" | Visual style             |
| size      | "default" \| "sm" \| "lg"                              | "default" | Size of the badge        |
| className | string                                                 | -         | Additional CSS classes   |
| asChild   | boolean                                                | false     | Merge onto child element |

### Card API

| Prop      | Type      | Description                     |
| --------- | --------- | ------------------------------- |
| className | string    | Additional CSS classes for Card |
| children  | ReactNode | Card content                    |

### Checkbox API

| Prop            | Type                                          | Default | Description              |
| --------------- | --------------------------------------------- | ------- | ------------------------ |
| checked         | boolean \| "indeterminate"                    | -       | Controlled checked state |
| defaultChecked  | boolean                                       | -       | Initial unchecked state  |
| disabled        | boolean                                       | false   | Disable the checkbox     |
| form            | string                                        | -       | Associate with form      |
| id              | string                                        | -       | Input id attribute       |
| name            | string                                        | -       | Input name attribute     |
| onCheckedChange | (checked: boolean \| "indeterminate") => void | -       | Change handler           |
| className       | string                                        | -       | Additional CSS classes   |
| asChild         | boolean                                       | false   | Merge onto child         |

### Select API

| Prop          | Type                    | Default | Description            |
| ------------- | ----------------------- | ------- | ---------------------- |
| value         | string                  | -       | Controlled value       |
| defaultValue  | string                  | -       | Initial value          |
| onValueChange | (value: string) => void | -       | Change handler         |
| open          | boolean                 | -       | Controlled open state  |
| onOpenChange  | (open: boolean) => void | -       | Open change handler    |
| disabled      | boolean                 | false   | Disable the select     |
| className     | string                  | -       | Additional CSS classes |

### Separator API

| Prop        | Type                       | Default      | Description            |
| ----------- | -------------------------- | ------------ | ---------------------- |
| orientation | "horizontal" \| "vertical" | "horizontal" | Line direction         |
| decorative  | boolean                    | -            | Accessibility role     |
| className   | string                     | -            | Additional CSS classes |

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

### Badge

- Uses CVA (class-variance-authority) for variant and size management
- No Ark UI primitive required
- Simple semantic HTML (span or div)

### Card

- Composition of semantic HTML elements
- No Ark UI primitive required
- Exports: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter

### Checkbox

- Uses @ark-ui/react/checkbox (React) or @ark-ui/solid/checkbox (Solid)
- Handles checked, unchecked, and indeterminate states
- Uses CVA for styling

### Select

- Uses @ark-ui/react/select (React) or @ark-ui/solid/select (Solid)
- Uses createListCollection for item management
- Most complex component in this batch

### Separator

- Simple HTML hr element
- Uses CVA for orientation variants
- No Ark UI primitive required
