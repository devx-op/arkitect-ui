import type { Meta, StoryObj } from "@storybook/react-vite"
import { Chart } from "./chart"

const meta: Meta<typeof Chart> = {
  title: "React/UI/Chart",
  component: Chart,
}

export default meta
type Story = StoryObj<typeof Chart>

const sampleData = [
  { label: "Jan", value: 100 },
  { label: "Feb", value: 200 },
  { label: "Mar", value: 150 },
  { label: "Apr", value: 300 },
  { label: "May", value: 250 },
]

export const Default: Story = {
  render: () => <Chart data={sampleData} className="w-full max-w-md" />,
}

export const BarChart: Story = {
  render: () => <Chart type="bar" data={sampleData} className="w-full max-w-md" />,
}

export const LineChart: Story = {
  render: () => <Chart type="line" data={sampleData} className="w-full max-w-md" />,
}

export const CustomHeight: Story = {
  render: () => <Chart data={sampleData} height={300} className="w-full max-w-md" />,
}
