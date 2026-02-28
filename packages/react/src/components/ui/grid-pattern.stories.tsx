import type { Meta, StoryObj } from "@storybook/react-vite"
import { GridPattern } from "./grid-pattern"

const meta: Meta<typeof GridPattern> = {
  title: "React/UI/GridPattern",
  component: GridPattern,
}

export default meta
type Story = StoryObj<typeof GridPattern>

export const Default: Story = {
  render: () => (
    <div className="relative h-40 w-64 overflow-hidden rounded-md border bg-background">
      <GridPattern />
    </div>
  ),
}

export const CustomColor: Story = {
  render: () => (
    <div className="relative h-40 w-64 overflow-hidden rounded-md border bg-background">
      <GridPattern color="blue" />
    </div>
  ),
}

export const CustomSize: Story = {
  render: () => (
    <div className="relative h-40 w-64 overflow-hidden rounded-md border bg-background">
      <GridPattern width={20} height={20} color="gray" />
    </div>
  ),
}
