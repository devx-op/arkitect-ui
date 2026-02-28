import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { toast, Toaster } from "./toast"

const meta: Meta<typeof Toaster> = {
  title: "Solid/UI/Toast",
  component: Toaster,
  parameters: {
    layout: "padded",
  },
}

export default meta
type Story = StoryObj<typeof Toaster>

export const Default: Story = {
  render: () => (
    <div class="space-y-4">
      <Toaster />
      <div class="flex gap-2">
        <button
          type="button"
          onClick={() => toast({ title: "Event has been created" })}
          class="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Show Toast
        </button>
        <button
          type="button"
          onClick={() => toast.success("Event has been created")}
          class="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Success
        </button>
        <button
          type="button"
          onClick={() => toast.error("Event has failed")}
          class="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Error
        </button>
        <button
          type="button"
          onClick={() => toast.warning("Please review your input")}
          class="px-4 py-2 bg-yellow-500 text-white rounded-md"
        >
          Warning
        </button>
      </div>
    </div>
  ),
}
