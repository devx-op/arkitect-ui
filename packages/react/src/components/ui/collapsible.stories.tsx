import type { Meta, StoryObj } from "@storybook/react-vite"
import { Collapsible, CollapsibleContent, CollapsibleItem, CollapsibleTrigger } from "./collapsible"

const meta: Meta<typeof Collapsible> = {
  title: "React/UI/Collapsible",
  component: Collapsible,
}

export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  render: () => (
    <Collapsible defaultValue={["item-1"]} collapsible>
      <CollapsibleItem value="item-1">
        <CollapsibleTrigger>Is it accessible?</CollapsibleTrigger>
        <CollapsibleContent>
          Yes. It uses Ark UI Accordion with collapsible prop for single-item behavior.
        </CollapsibleContent>
      </CollapsibleItem>
    </Collapsible>
  ),
}
