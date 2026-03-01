"use client"

import { Marquee as ArkMarquee } from "@ark-ui/react/marquee"
import { type ComponentProps } from "react"
import { cn } from "@/lib/utils"

export interface MarqueeProps
  extends Omit<ComponentProps<typeof ArkMarquee.Root>, "children" | "speed" | "autoFill" | "reverse">
{
  speed?: number
  direction?: "left" | "right"
  children?: React.ReactNode
}

export function Marquee({
  className,
  speed = 50,
  direction = "left",
  children,
  ...props
}: MarqueeProps) {
  return (
    <ArkMarquee.Root
      className={cn("overflow-hidden", className)}
      autoFill
      speed={speed}
      reverse={direction === "right"}
      {...props}
    >
      <ArkMarquee.Viewport>
        <ArkMarquee.Content>{children}</ArkMarquee.Content>
      </ArkMarquee.Viewport>
    </ArkMarquee.Root>
  )
}
