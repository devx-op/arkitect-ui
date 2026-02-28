import { Tooltip as TooltipPrimitives } from "@ark-ui/solid"
import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"

export const Tooltip = TooltipPrimitives.Root

export const TooltipTrigger = TooltipPrimitives.Trigger

export interface TooltipContentProps extends ComponentProps<typeof TooltipPrimitives.Content> {}

export function TooltipContent(props: TooltipContentProps) {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <TooltipPrimitives.Content
      class={cn(
        "z-50 overflow-hidden rounded-md border bg-background px-3 py-1.5 text-sm shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        local.class,
      )}
      {...rest}
    />
  )
}

export interface TooltipProviderProps extends ComponentProps<typeof TooltipPrimitives.Root> {}

export function TooltipProvider(props: TooltipProviderProps) {
  return <TooltipPrimitives.Root {...props} />
}
