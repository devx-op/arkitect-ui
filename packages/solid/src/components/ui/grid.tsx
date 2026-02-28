import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"

export interface GridProps extends ComponentProps<"div"> {
  columns?: number
  gap?: number | string
}

export function Grid(props: GridProps) {
  const [local, rest] = splitProps(props, ["class", "columns", "gap", "style", "children"])

  const columns = () => local.columns ?? 1
  const gap = () => {
    if (local.gap === undefined) return undefined
    return typeof local.gap === "number" ? `${local.gap * 0.25}rem` : local.gap
  }

  const customStyle = () => {
    const style: Record<string, string> = {
      "grid-template-columns": `repeat(${columns()}, minmax(0, 1fr))`,
    }
    const gapValue = gap()
    if (gapValue) {
      style.gap = gapValue
    }
    return style
  }

  return (
    <div class={cn("grid", local.class)} style={customStyle()} {...rest}>
      {local.children}
    </div>
  )
}
