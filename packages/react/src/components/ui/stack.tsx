import { type ComponentProps } from "react"
import { cn } from "@/lib/utils"

export interface StackProps extends ComponentProps<"div"> {
  gap?: number | string
  align?: "start" | "center" | "end" | "stretch"
  justify?: "start" | "center" | "end" | "between" | "around"
  vertical?: boolean
}

export function Stack({
  className,
  gap = 0,
  align,
  justify,
  vertical = false,
  children,
  ...props
}: StackProps) {
  const alignClasses: Record<string, string> = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  }

  const justifyClasses: Record<string, string> = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
  }

  return (
    <div
      className={cn(
        "flex",
        vertical ? "flex-col" : "flex-row",
        align && alignClasses[align],
        justify && justifyClasses[justify],
        typeof gap === "number" ? `gap-${gap}` : gap,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface HStackProps extends StackProps {
  vertical?: false
}

export function HStack(props: HStackProps) {
  return <Stack {...props} vertical={false} />
}

export interface VStackProps extends StackProps {
  vertical?: true
}

export function VStack(props: VStackProps) {
  return <Stack {...props} vertical={true} />
}
