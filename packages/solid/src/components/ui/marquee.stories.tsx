import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { Marquee } from "./marquee"

const meta: Meta<typeof Marquee> = {
  title: "Solid/UI/Marquee",
  component: Marquee,
}

export default meta
type Story = StoryObj<typeof Marquee>

export const Default: Story = {
  render: () => (
    <Marquee class="w-full">
      {[1, 2, 3, 4, 5].map((i) => (
        <div class="w-32 h-20 bg-primary/20 rounded mx-2 flex items-center justify-center">
          Item {i}
        </div>
      ))}
    </Marquee>
  ),
}
