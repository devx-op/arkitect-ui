import type { Meta, StoryObj } from "@storybook/react-vite"
import { InputGroup } from "./input-group"
import { Input } from "./input"

const meta: Meta<typeof InputGroup> = {
  title: "React/UI/InputGroup",
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

export const WithLabel: Story = {
  render: () => (
    <InputGroup label="Email">
      <Input type="email" placeholder="Enter your email" className="w-80" />
    </InputGroup>
  ),
}
