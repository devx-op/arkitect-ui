import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { Input } from "./input"

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "soft", "plain"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    placeholder: "Outline input",
  },
}

export const Soft: Story = {
  args: {
    variant: "soft",
    placeholder: "Soft input",
  },
}

export const Plain: Story = {
  args: {
    variant: "plain",
    placeholder: "Plain input",
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "Small input",
  },
}

export const Medium: Story = {
  args: {
    size: "md",
    placeholder: "Medium input",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "Large input",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
}
