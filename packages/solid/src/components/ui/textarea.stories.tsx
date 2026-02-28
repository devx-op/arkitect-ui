import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { Textarea } from "./textarea"

const meta: Meta<typeof Textarea> = {
  title: "Solid/UI/Textarea",
  component: Textarea,
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: () => <Textarea placeholder="Enter your message" class="w-80" />,
}

export const WithValue: Story = {
  render: () => (
    <Textarea class="w-80">
      This is a pre-filled textarea with some content.
    </Textarea>
  ),
}
