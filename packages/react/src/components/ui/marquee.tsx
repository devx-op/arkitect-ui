import { type ComponentProps, type CSSProperties } from "react"
import { cn } from "@/lib/utils"

export interface MarqueeProps extends ComponentProps<"div"> {
  speed?: number
  direction?: "left" | "right"
}

export function Marquee({
  className,
  speed = 50,
  direction = "left",
  children,
  ...props
}: MarqueeProps) {
  const style: CSSProperties = {
    animation: `scroll ${10000 / speed}ms linear infinite`,
    animationDirection: direction === "right" ? "reverse" : "normal",
  }

  return (
    <div className={cn("overflow-hidden", className)} {...props}>
      <div className="flex w-max" style={style}>
        {children}
        {children}
      </div>
    </div>
  )
}

// SSR guard - only run on client
if (typeof document !== "undefined") {
  const style = document.createElement("style")
  style.textContent = `
@keyframes scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
`
  document.head.appendChild(style)
}
