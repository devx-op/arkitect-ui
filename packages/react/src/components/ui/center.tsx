import { type ComponentProps } from "react"
import { cn } from "@/lib/utils"

export interface CenterProps extends ComponentProps<"div"> {}

export function Center({ className, children, ...props }: CenterProps) {
  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      {children}
    </div>
  )
}
