import type { Meta, StoryObj } from "@storybook/react-vite"
import { HStack, Stack, VStack } from "./stack"

const meta: Meta<typeof Stack> = {
  title: "React/UI/Stack",
  component: Stack,
}

export default meta
type Story = StoryObj<typeof Stack>

export const Default: Story = {
  render: () => (
    <Stack gap={4}>
      <div className="p-4 bg-muted rounded">Item 1</div>
      <div className="p-4 bg-muted rounded">Item 2</div>
      <div className="p-4 bg-muted rounded">Item 3</div>
    </Stack>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <HStack gap={2}>
      <div className="p-4 bg-muted rounded">Item 1</div>
      <div className="p-4 bg-muted rounded">Item 2</div>
      <div className="p-4 bg-muted rounded">Item 3</div>
    </HStack>
  ),
}

export const Vertical: Story = {
  render: () => (
    <VStack gap={3}>
      <div className="p-4 bg-muted rounded">Item 1</div>
      <div className="p-4 bg-muted rounded">Item 2</div>
      <div className="p-4 bg-muted rounded">Item 3</div>
    </VStack>
  ),
}

export const Centered: Story = {
  render: () => (
    <Stack gap={4} justify="center" align="center" className="h-40 border rounded">
      <div className="p-4 bg-muted rounded">Item 1</div>
      <div className="p-4 bg-muted rounded">Item 2</div>
    </Stack>
  ),
}
