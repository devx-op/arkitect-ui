import { Checkbox as CheckboxPrimitives } from "@ark-ui/solid"
import { IconCheck, IconMinus } from "@tabler/icons-solidjs"
import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"

const Checkbox = (props: ComponentProps<typeof CheckboxPrimitives.Root>) => {
  const [local, rest] = splitProps(props, ["class", "checked"])
  const isIndeterminate = () => local.checked === "indeterminate"

  return (
    <CheckboxPrimitives.Root
      class={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[indeterminate]:bg-primary data-[indeterminate]:text-primary-foreground data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <CheckboxPrimitives.Indicator class={cn("flex items-center justify-center text-current")}>
        {isIndeterminate() ? <IconMinus class="h-3 w-3" /> : <IconCheck class="h-3 w-3" />}
      </CheckboxPrimitives.Indicator>
    </CheckboxPrimitives.Root>
  )
}

export { Checkbox }
