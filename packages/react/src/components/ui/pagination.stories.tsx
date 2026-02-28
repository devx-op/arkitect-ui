import type { Meta, StoryObj } from "@storybook/react"
import { Pagination } from "./pagination"

const meta = {
  title: "React/UI/Pagination",
  component: Pagination,
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    page: 1,
    totalPages: 10,
    pageSize: 10,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
}

export const WithPageSize: Story = {
  args: {
    page: 1,
    totalPages: 10,
    pageSize: 25,
    pageSizeOptions: [10, 25, 50, 100],
    onPageChange: (page: number) => console.log("Page changed to:", page),
    onPageSizeChange: (size: number) => console.log("Page size changed to:", size),
  },
}

export const MiddlePage: Story = {
  args: {
    page: 5,
    totalPages: 10,
    pageSize: 10,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
}

export const LastPage: Story = {
  args: {
    page: 10,
    totalPages: 10,
    pageSize: 10,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
}
