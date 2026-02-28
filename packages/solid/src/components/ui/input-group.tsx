import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"

export interface InputGroupProps extends ComponentProps<"div"> {
  label?: string
}

export function InputGroup(props: InputGroupProps) {
  const [local, rest] = splitProps(props, ["class", "label", "children"])

  return (
    <div class={cn("flex flex-col gap-1.5", local.class)} {...rest}>
      {local.label && <label class="text-sm font-medium text-foreground">{local.label}</label>}
      <div class="flex items-center gap-2">{local.children}</div>
    </div>
  )
}
