import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { CopyIdButton } from "./copy-id-button"

const meta: Meta<typeof CopyIdButton> = {
  title: "Solid/UI/CopyIdButton",
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
