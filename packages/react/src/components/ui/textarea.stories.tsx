import type { Meta, StoryObj } from "@storybook/react-vite"
import { Textarea } from "./textarea"

const meta: Meta<typeof Textarea> = {
  title: "React/UI/Textarea",
  component: Textarea,
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: () => <Textarea placeholder="Enter your message" className="w-80" />,
}

export const WithValue: Story = {
  render: () => (
    <Textarea className="w-80">
      This is a pre-filled textarea with some content.
    </Textarea>
  ),
}

export const Disabled: Story = {
  render: () => <Textarea disabled placeholder="Disabled textarea" className="w-80" />,
}
