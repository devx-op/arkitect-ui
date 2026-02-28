import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { GridPattern } from "./grid-pattern"

const meta: Meta<typeof GridPattern> = {
  title: "Solid/UI/GridPattern",
  component: GridPattern,
}

export default meta
type Story = StoryObj<typeof GridPattern>

export const Default: Story = {
  render: () => (
    <div class="relative h-40 w-64 overflow-hidden rounded-md border bg-background">
      <GridPattern />
    </div>
  ),
}

export const CustomColor: Story = {
  render: () => (
    <div class="relative h-40 w-64 overflow-hidden rounded-md border bg-background">
      <GridPattern color="blue" />
    </div>
  ),
}

export const CustomSize: Story = {
  render: () => (
    <div class="relative h-40 w-64 overflow-hidden rounded-md border bg-background">
      <GridPattern width={20} height={20} color="gray" />
    </div>
  ),
}
