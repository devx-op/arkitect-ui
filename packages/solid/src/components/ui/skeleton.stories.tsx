import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { Skeleton } from "./skeleton"

const meta = {
  title: "Solid/UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "circular"],
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    class: "h-4 w-full",
  },
}

export const Circular: Story = {
  args: {
    variant: "circular",
    class: "h-12 w-12",
  },
}
