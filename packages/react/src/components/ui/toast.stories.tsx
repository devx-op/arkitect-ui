import type { Meta, StoryObj } from "@storybook/react"
import { toast, Toaster } from "./toast"

const meta = {
  title: "React/UI/Toast",
  component: Toaster,
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <Toaster />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => toast({ title: "Event has been created" })}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Show Toast
        </button>
        <button
          type="button"
          onClick={() => toast.success("Event has been created")}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Success
        </button>
        <button
          type="button"
          onClick={() => toast.error("Event has failed")}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Error
        </button>
        <button
          type="button"
          onClick={() => toast.warning("Please review your input")}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md"
        >
          Warning
        </button>
      </div>
    </div>
  ),
}
