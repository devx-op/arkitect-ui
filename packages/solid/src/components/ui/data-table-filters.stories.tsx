import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { DataTableFilters, type FilterConfigType } from "./data-table-filters"

const filters: FilterConfigType[] = [
  { id: "name", type: "text", label: "Name", placeholder: "Search by name..." },
  {
    id: "status",
    type: "select",
    label: "Status",
    placeholder: "Select status",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
]

const meta = {
  title: "Solid/UI/DataTableFilters",
  component: DataTableFilters,
  tags: ["autodocs"],
} satisfies Meta<typeof DataTableFilters>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    filters,
    values: {},
    onFilterChange: (values: Record<string, string>) => console.log("Filter values:", values),
  },
}

export const WithValues: Story = {
  args: {
    filters,
    values: { name: "John", status: "active" },
    onFilterChange: (values: Record<string, string>) => console.log("Filter values:", values),
  },
}
