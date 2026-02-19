import type { Meta, StoryObj } from "@storybook/react"
import { Label } from "./label"

const meta = {
  title: "React/UI/Label",
  component: Label,
  tags: ["autodocs"],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Label",
  },
}

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2 max-w-sm">
      <Label htmlFor="email">Email</Label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      />
    </div>
  ),
}
