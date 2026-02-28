import type { Meta, StoryObj } from "@storybook/react"
import { DataTable } from "./data-table"

type User = {
  id: number
  name: string
  email: string
  status: "active" | "inactive"
}

const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: User) => (
      <span className={row.status === "active" ? "text-green-500" : "text-red-500"}>
        {row.status}
      </span>
    ),
  },
] as const

const data: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "active" },
]

const meta = {
  title: "React/UI/DataTable",
  component: DataTable,
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    columns: [...columns] as never[],
    data,
  },
}

export const Empty: Story = {
  args: {
    columns: [...columns] as never[],
    data: [],
    emptyMessage: "No users found",
  },
}

export const WithCaption: Story = {
  args: {
    columns: [...columns] as never[],
    data,
    caption: "User List",
  },
}
