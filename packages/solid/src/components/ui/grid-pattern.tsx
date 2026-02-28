import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"

export interface GridPatternProps extends ComponentProps<"svg"> {
  width?: number
  height?: number
  x?: number
  y?: number
  color?: string
}

export function GridPattern(props: GridPatternProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "width",
    "height",
    "x",
    "y",
    "color",
  ])

  const width = () => local.width ?? 40
  const height = () => local.height ?? 40
  const x = () => local.x ?? 0
  const y = () => local.y ?? 0
  const color = () => local.color ?? "currentColor"

  const patternId = `grid-pattern-${Math.random().toString(36).slice(2, 9)}`

  return (
    <svg
      class={cn("absolute inset-0 h-full w-full", local.class)}
      {...rest}
    >
      <defs>
        <pattern
          id={patternId}
          x={x()}
          y={y()}
          width={width()}
          height={height()}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${width()} 0 L 0 0 0 ${height()}`}
            fill="none"
            stroke={color()}
            stroke-width="0.5"
            class="opacity-20"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}
