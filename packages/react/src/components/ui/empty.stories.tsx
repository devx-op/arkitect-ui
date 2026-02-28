import type { Meta, StoryObj } from "@storybook/react"
import { Empty, EmptyDescription, EmptyImage, EmptyTitle, IconFolderOff } from "./empty"

const meta = {
  title: "React/UI/Empty",
  component: Empty,
  tags: ["autodocs"],
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyImage>
        <IconFolderOff className="h-12 w-12 text-muted-foreground" />
      </EmptyImage>
      <EmptyTitle>No results found</EmptyTitle>
      <EmptyDescription>
        Try adjusting your search or filter to find what you are looking for.
      </EmptyDescription>
    </Empty>
  ),
}
