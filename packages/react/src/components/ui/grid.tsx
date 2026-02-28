import { type ComponentProps, type CSSProperties } from "react"
import { cn } from "@/lib/utils"

export interface GridProps extends ComponentProps<"div"> {
  columns?: number
  gap?: number | string
}

export function Grid({ className, columns = 1, gap, style, children, ...props }: GridProps) {
  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gap: typeof gap === "number" ? `${gap * 0.25}rem` : gap,
    ...style,
  }

  return (
    <div className={cn(className)} style={gridStyle} {...props}>
      {children}
    </div>
  )
}
