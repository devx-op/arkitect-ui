import type { Meta, StoryObj } from "@storybook/react-vite"
import { CopyIdButton } from "./copy-id-button"

const meta: Meta<typeof CopyIdButton> = {
  title: "React/UI/Copy ID Button",
  component: CopyIdButton,
}

export default meta
type Story = StoryObj<typeof CopyIdButton>

export const Default: Story = {
  render: () => <CopyIdButton id="12345" />,
}

export const CustomLabel: Story = {
  render: () => <CopyIdButton id="abc-123" label="Copy ID" />,
}
