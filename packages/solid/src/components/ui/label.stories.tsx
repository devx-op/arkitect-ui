import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { Label } from "./label"

const meta = {
  title: "Solid/UI/Label",
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
    <div class="flex flex-col gap-2 max-w-sm">
      <Label for="email">Email</Label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      />
    </div>
  ),
}
