import { Marquee as ArkMarquee } from "@ark-ui/solid/marquee"
import { type ComponentProps, type JSX, splitProps } from "solid-js"
import { cn } from "@/lib/utils"

export interface MarqueeProps
  extends Omit<ComponentProps<typeof ArkMarquee.Root>, "children" | "speed" | "autoFill" | "reverse">
{
  speed?: number
  direction?: "left" | "right"
  children?: JSX.Element
}

export function Marquee(props: MarqueeProps) {
  const [local, rest] = splitProps(props, ["class", "speed", "direction", "children"])

  const speed = () => local.speed ?? 50
  const direction = () => local.direction ?? "left"

  return (
    <ArkMarquee.Root
      class={cn("overflow-hidden", local.class)}
      autoFill
      speed={speed()}
      reverse={direction() === "right"}
      {...rest}
    >
      <ArkMarquee.Viewport>
        <ArkMarquee.Content>{local.children}</ArkMarquee.Content>
      </ArkMarquee.Viewport>
    </ArkMarquee.Root>
  )
}
