import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { Separator } from "./separator"

const meta = {
  title: "Solid/UI/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div class="w-full space-y-4">
      <div class="text-sm text-muted-foreground">Separator between items</div>
      <Separator />
      <div class="text-sm text-muted-foreground">Item 1</div>
      <Separator />
      <div class="text-sm text-muted-foreground">Item 2</div>
      <Separator />
      <div class="text-sm text-muted-foreground">Item 3</div>
    </div>
  ),
}

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
  render: () => <Separator class="w-full" />,
}

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: () => (
    <div class="flex h-20 items-center space-x-4">
      <span>Item 1</span>
      <Separator orientation="vertical" />
      <span>Item 2</span>
      <Separator orientation="vertical" />
      <span>Item 3</span>
    </div>
  ),
}
