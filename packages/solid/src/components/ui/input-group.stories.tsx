import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { InputGroup } from "./input-group"
import { Input } from "./input"

const meta: Meta<typeof InputGroup> = {
  title: "Solid/UI/InputGroup",
  component: InputGroup,
}

export default meta
type Story = StoryObj<typeof InputGroup>

export const Default: Story = {
  render: () => (
    <InputGroup label="Personal Info">
      <Input placeholder="First Name" />
      <Input placeholder="Last Name" />
    </InputGroup>
  ),
}
