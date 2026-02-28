import { type ComponentProps } from "react"
import { cn } from "@/lib/utils"

export interface InputGroupProps extends ComponentProps<"div"> {
  label?: string
}

export function InputGroup({ className, label, children, ...props }: InputGroupProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <div className="flex items-center gap-2">{children}</div>
    </div>
  )
}
