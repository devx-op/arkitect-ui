import type { Meta, StoryObj } from "@storybook/react-vite"
import { Marquee } from "./marquee"

const meta: Meta<typeof Marquee> = {
  title: "React/UI/Marquee",
  component: Marquee,
}

export default meta
type Story = StoryObj<typeof Marquee>

export const Default: Story = {
  render: () => (
    <Marquee className="w-full">
      {[1, 2, 3, 4, 5].map((i) => (
        <div className="w-32 h-20 bg-primary/20 rounded mx-2 flex items-center justify-center">
          Item {i}
        </div>
      ))}
    </Marquee>
  ),
}
