import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { DataTable } from "./data-table"

type User = {
  id: number
  name: string
  email: string
  status: "active" | "inactive"
}

const columns = [
  {
    accessorKey: "id" as const,
    header: "ID",
  },
  {
    accessorKey: "name" as const,
    header: "Name",
  },
  {
    accessorKey: "email" as const,
    header: "Email",
  },
  {
    accessorKey: "status" as const,
    header: "Status",
    cell: (row: User) => (row.status === "active" ? "Active" : "Inactive"),
  },
]

const data: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "active" },
]

const meta = {
  title: "Solid/UI/DataTable",
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
