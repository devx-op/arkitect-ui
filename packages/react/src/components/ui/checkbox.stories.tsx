import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Checkbox } from "./checkbox"

const meta = {
  title: "React/UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
}

export const Unchecked: Story = {
  args: {
    checked: false,
    children: "Remember me",
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
    </div>
  ),
}

export const Checked: Story = {
  args: {
    checked: true,
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <span>Checked option</span>
    </div>
  ),
}

export const Indeterminate: Story = {
  args: {
    checked: "indeterminate",
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <span>Select all (some selected)</span>
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex items-center gap-2">
        <Checkbox checked={checked} onCheckedChange={(details) => setChecked(details.checked as boolean)} />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <span className="text-muted-foreground">Disabled option</span>
    </div>
  ),
}

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <span className="text-muted-foreground">Disabled and checked</span>
    </div>
  ),
}
