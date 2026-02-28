import { type ComponentProps, createContext, createEffect, onCleanup, onMount, useContext } from "solid-js"
import { cn } from "@/lib/utils"
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  type ChartData,
  type ChartOptions,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  LineController,
  PointElement,
  Title,
  Tooltip,
  Legend,
)

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
  children?: any
}

export function ChartContainer(props: ChartContainerProps) {
  const { config = {}, children, class: className, ...rest } = props

  return (
    <ChartContext.Provider value={{ config }}>
      <div class={cn("w-full", className)} {...rest}>
        {children}
      </div>
    </ChartContext.Provider>
  )
}

export interface ChartTooltipProps {
  class?: string
  cursor?: boolean
}

export function ChartTooltip(props: ChartTooltipProps) {
  return null
}

export interface ChartTooltipContentProps extends ComponentProps<"div"> {
  indicator?: "line" | "dot" | "dashed"
  hideLabel?: boolean
}

export function ChartTooltipContent(props: ChartTooltipContentProps) {
  const { class: className, indicator = "dot", hideLabel } = props

  return <div class={cn("rounded-md border bg-background p-2 shadow-sm", className)} />
}

export interface ChartLegendProps {
  class?: string
}

export function ChartLegend(props: ChartLegendProps) {
  return null
}

export interface ChartLegendContentProps extends ComponentProps<"div"> {
  payload?: Array<{ value: string; color: string; dataKey?: string }>
}

export function ChartLegendContent(props: ChartLegendContentProps) {
  const { class: className, payload } = props

  if (!payload) return null

  return (
    <div class={cn("flex items-center gap-4", className)}>
      {payload.map((item, index) => (
        <div class="flex items-center gap-1">
          <div
            class="h-2 w-2 rounded-full"
            style={{ "background-color": item.color }}
          />
          <span class="text-sm text-muted-foreground">{item.value}</span>
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

export function Chart(props: ChartProps) {
  let containerRef: HTMLDivElement | undefined
  let chartInstance: ChartJS | null = null

  const { class: className, type = "bar", data, height = 300, colors = DEFAULT_COLORS, ...rest } = props

  const getChartData = (): ChartData<"bar" | "line"> => ({
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Value",
        data: data.map((d) => d.value),
        backgroundColor: colors[0] ?? "#000",
        borderColor: colors[0] ?? "#000",
        borderWidth: type === "line" ? 2 : 0,
        borderRadius: 4,
        fill: false,
        tension: 0.3,
        pointBackgroundColor: colors[0] ?? "#000",
        pointBorderWidth: 0,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  })

  const getChartOptions = (): ChartOptions<"bar" | "line"> => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "hsl(var(--muted-foreground))",
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "hsl(var(--background))",
        borderColor: "hsl(var(--border))",
        borderWidth: 1,
        titleColor: "hsl(var(--foreground))",
        bodyColor: "hsl(var(--foreground))",
        padding: 10,
        cornerRadius: 4,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "hsl(var(--muted-foreground))",
          font: { size: 12 },
        },
        border: {
          color: "hsl(var(--border))",
        },
      },
      y: {
        grid: {
          color: "hsl(var(--border))",
        },
        ticks: {
          color: "hsl(var(--muted-foreground))",
          font: { size: 12 },
        },
        border: {
          color: "hsl(var(--border))",
        },
      },
    },
  })

  onMount(() => {
    const canvas = containerRef?.querySelector("canvas")
    if (!canvas) return

    const chartType = type === "bar" ? "bar" : "line"
    chartInstance = new ChartJS(canvas, {
      type: chartType as "bar",
      data: getChartData() as ChartData<"bar">,
      options: getChartOptions() as ChartOptions<"bar">,
    })
  })

  createEffect(() => {
    if (!chartInstance) return

    chartInstance.data = getChartData() as ChartData<"bar">
    chartInstance.options = getChartOptions() as ChartOptions<"bar">
    chartInstance.update()
  })

  onCleanup(() => {
    if (chartInstance) {
      chartInstance.destroy()
      chartInstance = null
    }
  })

  return (
    <ChartContainer ref={containerRef} class={className} style={{ height: `${height}px` }} {...rest}>
      <canvas />
    </ChartContainer>
  )
}
