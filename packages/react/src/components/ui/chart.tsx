import { type ComponentProps, createContext, useContext } from "react"
import { cn } from "@/lib/utils"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

type ChartContextValue = {
  config: Record<string, { label?: string; color?: string }>
}

const ChartContext = createContext<ChartContextValue | null>(null)

function useChart() {
  const context = useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a ChartContainer")
  }
  return context
}

export interface ChartContainerProps extends ComponentProps<"div"> {
  config?: Record<string, { label?: string; color?: string }>
  children: React.ReactNode
}

export function ChartContainer({ className, config = {}, children, ...props }: ChartContainerProps) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </ChartContext.Provider>
  )
}

export interface ChartTooltipProps {
  className?: string
  cursor?: boolean
}

export function ChartTooltip({ className, cursor = true }: ChartTooltipProps) {
  return null
}

export interface ChartTooltipContentProps extends ComponentProps<"div"> {
  indicator?: "line" | "dot" | "dashed"
  hideLabel?: boolean
}

export function ChartTooltipContent({ className, indicator = "dot", hideLabel }: ChartTooltipContentProps) {
  return <div className={cn("rounded-md border bg-background p-2 shadow-sm", className)} />
}

export interface ChartLegendProps {
  className?: string
}

export function ChartLegend({ className }: ChartLegendProps) {
  return null
}

export interface ChartLegendContentProps extends ComponentProps<"div"> {
  payload?: Array<{ value: string; color: string; dataKey?: string }>
}

export function ChartLegendContent({ className, payload }: ChartLegendContentProps) {
  if (!payload) return null

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {payload.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-muted-foreground">{item.value}</span>
        </div>
      ))}
    </div>
  )
}

export type ChartType = "bar" | "line"

export interface ChartProps extends ComponentProps<"div"> {
  type?: ChartType
  data: { label: string; value: number }[]
  height?: number
  colors?: string[]
}

const DEFAULT_COLORS = [
  "hsl(var(--chart-1, 0 72% 51%))",
  "hsl(var(--chart-2, 210 92% 52%))",
  "hsl(var(--chart-3, 160 84% 40%))",
  "hsl(var(--chart-4, 280 65% 60%))",
  "hsl(var(--chart-5, 340 82% 56%))",
]

export function Chart({
  className,
  type = "bar",
  data,
  height = 300,
  colors = DEFAULT_COLORS,
  ...props
}: ChartProps) {
  const chartConfig = {
    value: { label: "Value", color: colors[0] ?? "#000" },
  }

  const CommonAxisProps = {
    stroke: "hsl(var(--muted-foreground))",
    font: { size: 12 },
    tickLine: false,
    axisLine: { stroke: "hsl(var(--border))" },
  }

  return (
    <ChartContainer config={chartConfig} className={className} style={{ height: `${height}px` }} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        {type === "bar" ?
          (
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="label" {...CommonAxisProps} />
              <YAxis {...CommonAxisProps} />
              <Tooltip
                content={<ChartTooltipContent />}
                cursor={false}
              />
              <Legend content={<ChartLegendContent />} />
              <Bar
                dataKey="value"
                fill={colors[0]}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) :
          (
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="label" {...CommonAxisProps} />
              <YAxis {...CommonAxisProps} />
              <Tooltip
                content={<ChartTooltipContent />}
                cursor={false}
              />
              <Legend content={<ChartLegendContent />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={colors[0]}
                strokeWidth={2}
                dot={{ fill: colors[0], strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          )}
      </ResponsiveContainer>
    </ChartContainer>
  )
}
