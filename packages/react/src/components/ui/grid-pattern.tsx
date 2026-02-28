import { type ComponentProps } from "react"
import { cn } from "@/lib/utils"

export interface GridPatternProps extends ComponentProps<"svg"> {
  width?: number
  height?: number
  x?: number
  y?: number
  color?: string
}

export function GridPattern({
  className,
  width = 40,
  height = 40,
  x = 0,
  y = 0,
  color = "currentColor",
  ...props
}: GridPatternProps) {
  const patternId = `grid-pattern-${Math.random().toString(36).slice(2, 9)}`

  return (
    <svg
      className={cn("absolute inset-0 h-full w-full", className)}
      {...props}
    >
      <defs>
        <pattern
          id={patternId}
          x={x}
          y={y}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${width} 0 L 0 0 0 ${height}`}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            className="opacity-20"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}
