import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { createSignal } from "solid-js"
import { Checkbox } from "./checkbox"
import type { CheckboxRootProps } from "@ark-ui/solid"

const meta = {
  title: "Solid/UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div class="flex items-center gap-2">
      <Checkbox id="terms" />
      <label
        for="terms"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
}

export const Unchecked: Story = {
  args: {
    checked: false,
  },
  render: (args: CheckboxRootProps) => (
    <div class="flex items-center gap-2">
      <Checkbox {...args} />
    </div>
  ),
}

export const Checked: Story = {
  args: {
    checked: true,
  },
  render: (args: CheckboxRootProps) => (
    <div class="flex items-center gap-2">
      <Checkbox {...args} />
      <span>Checked option</span>
    </div>
  ),
}

export const Indeterminate: Story = {
  args: {
    checked: "indeterminate",
  },
  render: (args: CheckboxRootProps) => (
    <div class="flex items-center gap-2">
      <Checkbox {...args} />
      <span>Select all (some selected)</span>
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = createSignal(false)
    return (
      <div class="flex items-center gap-2">
        <Checkbox checked={checked()} onCheckedChange={(details) => setChecked(details.checked as boolean)} />
        <label
          for="terms"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
  render: (args: CheckboxRootProps) => (
    <div class="flex items-center gap-2">
      <Checkbox {...args} />
      <span class="text-muted-foreground">Disabled option</span>
    </div>
  ),
}

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
  render: (args: CheckboxRootProps) => (
    <div class="flex items-center gap-2">
      <Checkbox {...args} />
      <span class="text-muted-foreground">Disabled and checked</span>
    </div>
  ),
}
