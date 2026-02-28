import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"

export interface CenterProps extends ComponentProps<"div"> {}

export function Center(props: CenterProps) {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <div class={cn("flex items-center justify-center", local.class)} {...rest}>
      {local.children}
    </div>
  )
}
