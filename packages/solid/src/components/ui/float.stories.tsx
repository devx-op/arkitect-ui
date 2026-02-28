import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { Float } from "./float"

const meta: Meta<typeof Float> = {
  title: "Solid/UI/Float",
  component: Float,
}

export default meta
type Story = StoryObj<typeof Float>

export const Default: Story = {
  render: () => (
    <div class="relative h-32 w-64 border p-4">
      <span class="text-muted-foreground">Reference element</span>
      <Float placement="bottom-start">
        <div class="rounded-md border bg-background p-2 shadow-lg">
          Floating content
        </div>
      </Float>
    </div>
  ),
}

export const Top: Story = {
  render: () => (
    <div class="relative h-32 w-64 border p-4">
      <span class="text-muted-foreground">Reference element</span>
      <Float placement="top">
        <div class="rounded-md border bg-background p-2 shadow-lg">
          Floats above
        </div>
      </Float>
    </div>
  ),
}

export const Right: Story = {
  render: () => (
    <div class="relative h-32 w-64 border p-4">
      <span class="text-muted-foreground">Reference element</span>
      <Float placement="right">
        <div class="rounded-md border bg-background p-2 shadow-lg">
          Floats right
        </div>
      </Float>
    </div>
  ),
}

export const WithOffset: Story = {
  render: () => (
    <div class="relative h-32 w-64 border p-4">
      <span class="text-muted-foreground">Reference element</span>
      <Float placement="bottom" offset={8}>
        <div class="rounded-md border bg-background p-2 shadow-lg">
          With 8px offset
        </div>
      </Float>
    </div>
  ),
}
