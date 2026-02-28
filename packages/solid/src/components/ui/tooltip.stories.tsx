import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

const meta: Meta<typeof Tooltip> = {
  title: "Solid/UI/Tooltip",
  component: Tooltip,
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>
        <button class="px-4 py-2 bg-primary text-primary-foreground rounded">Hover me</button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
}
