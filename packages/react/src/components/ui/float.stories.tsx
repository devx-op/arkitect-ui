import type { Meta, StoryObj } from "@storybook/react-vite"
import { Float } from "./float"
import { Button } from "./button"

const meta: Meta<typeof Float> = {
  title: "React/UI/Float",
  component: Float,
}

export default meta
type Story = StoryObj<typeof Float>

export const Default: Story = {
  render: () => (
    <div className="relative h-32 w-64 border p-4">
      <span className="text-muted-foreground">Reference element</span>
      <Float placement="bottom-start">
        <div className="rounded-md border bg-background p-2 shadow-lg">
          Floating content
        </div>
      </Float>
    </div>
  ),
}

export const Top: Story = {
  render: () => (
    <div className="relative h-32 w-64 border p-4">
      <span className="text-muted-foreground">Reference element</span>
      <Float placement="top">
        <div className="rounded-md border bg-background p-2 shadow-lg">
          Floats above
        </div>
      </Float>
    </div>
  ),
}

export const Right: Story = {
  render: () => (
    <div className="relative h-32 w-64 border p-4">
      <span className="text-muted-foreground">Reference element</span>
      <Float placement="right">
        <div className="rounded-md border bg-background p-2 shadow-lg">
          Floats right
        </div>
      </Float>
    </div>
  ),
}

export const WithOffset: Story = {
  render: () => (
    <div className="relative h-32 w-64 border p-4">
      <span className="text-muted-foreground">Reference element</span>
      <Float placement="bottom" offset={8}>
        <div className="rounded-md border bg-background p-2 shadow-lg">
          With 8px offset
        </div>
      </Float>
    </div>
  ),
}
