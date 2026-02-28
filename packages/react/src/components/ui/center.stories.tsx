import type { Meta, StoryObj } from "@storybook/react-vite"
import { Center } from "./center"

const meta: Meta<typeof Center> = {
  title: "React/UI/Center",
  component: Center,
}

export default meta
type Story = StoryObj<typeof Center>

export const Default: Story = {
  render: () => (
    <Center className="h-32 w-64 border bg-muted/20">
      <span className="text-muted-foreground">Centered content</span>
    </Center>
  ),
}

export const WithBackground: Story = {
  render: () => (
    <Center className="h-32 w-64 rounded-md border bg-primary/10">
      <span className="text-primary font-medium">Centered with background</span>
    </Center>
  ),
}
