import { Checkbox as CheckboxPrimitives } from "@ark-ui/react"
import { IconCheck, IconMinus } from "@tabler/icons-react"
import { type ComponentProps, type ComponentRef, forwardRef } from "react"
import { cn } from "@/lib/utils"

const Checkbox = forwardRef<
  ComponentRef<typeof CheckboxPrimitives.Root>,
  ComponentProps<typeof CheckboxPrimitives.Root>
>(({ className, ...props }, ref) => {
  const checked = props.checked
  const isIndeterminate = checked === "indeterminate"

  return (
    <CheckboxPrimitives.Root
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[indeterminate]:bg-primary data-[indeterminate]:text-primary-foreground data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitives.Indicator className="flex items-center justify-center text-current">
        {isIndeterminate ? <IconMinus className="h-3 w-3" /> : <IconCheck className="h-3 w-3" />}
      </CheckboxPrimitives.Indicator>
    </CheckboxPrimitives.Root>
  )
})
Checkbox.displayName = CheckboxPrimitives.Root.displayName

export { Checkbox }
