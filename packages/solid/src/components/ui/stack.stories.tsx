import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { HStack, Stack, VStack } from "./stack"

const meta: Meta<typeof Stack> = {
  title: "Solid/UI/Stack",
  component: Stack,
}

export default meta
type Story = StoryObj<typeof Stack>

export const Default: Story = {
  render: () => (
    <Stack gap={4}>
      <div class="p-4 bg-muted rounded">Item 1</div>
      <div class="p-4 bg-muted rounded">Item 2</div>
      <div class="p-4 bg-muted rounded">Item 3</div>
    </Stack>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <HStack gap={2}>
      <div class="p-4 bg-muted rounded">Item 1</div>
      <div class="p-4 bg-muted rounded">Item 2</div>
      <div class="p-4 bg-muted rounded">Item 3</div>
    </HStack>
  ),
}

export const Vertical: Story = {
  render: () => (
    <VStack gap={3}>
      <div class="p-4 bg-muted rounded">Item 1</div>
      <div class="p-4 bg-muted rounded">Item 2</div>
      <div class="p-4 bg-muted rounded">Item 3</div>
    </VStack>
  ),
}
