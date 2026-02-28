import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"

export interface StackProps extends ComponentProps<"div"> {
  gap?: number | string
  align?: "start" | "center" | "end" | "stretch"
  justify?: "start" | "center" | "end" | "between" | "around"
  vertical?: boolean
}

export function Stack(props: StackProps) {
  const [local, rest] = splitProps(props, ["class", "gap", "align", "justify", "vertical", "children"])

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

  const gapClass = () => {
    const gap = local.gap
    if (gap === undefined) return ""
    return typeof gap === "number" ? `gap-${gap}` : gap
  }

  return (
    <div
      class={cn(
        "flex",
        local.vertical ? "flex-col" : "flex-row",
        local.align && alignClasses[local.align],
        local.justify && justifyClasses[local.justify],
        gapClass(),
        local.class,
      )}
      {...rest}
    >
      {local.children}
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
