import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"

export interface MarqueeProps extends ComponentProps<"div"> {
  speed?: number
  direction?: "left" | "right"
}

export function Marquee(props: MarqueeProps) {
  const [local, rest] = splitProps(props, ["class", "speed", "direction", "children"])

  const speed = () => local.speed ?? 50
  const direction = () => local.direction ?? "left"

  const style = {
    animation: `scroll ${10000 / speed()}ms linear infinite`,
    animationDirection: direction() === "right" ? "reverse" : "normal",
  }

  return (
    <div class={cn("overflow-hidden", local.class)} {...rest}>
      <div class="flex w-max" style={style}>
        {local.children}
        {local.children}
      </div>
    </div>
  )
}
