import { Accordion as AccordionPrimitives } from "@ark-ui/solid"
import { IconChevronDown } from "@tabler/icons-solidjs"
import { splitProps } from "solid-js"
import { cn } from "@/lib/utils"

const Collapsible = (props: AccordionPrimitives.RootProps) => (
  <AccordionPrimitives.Root data-slot="collapsible" {...props} />
)

const CollapsibleTrigger = (props: AccordionPrimitives.ItemTriggerProps) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <AccordionPrimitives.ItemTrigger
      class={cn(
        "flex w-full items-center justify-between rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground [&[data-state=open]>svg]:rotate-180",
        local.class,
      )}
      {...rest}
    >
      {local.children}
      <IconChevronDown class="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitives.ItemTrigger>
  )
}

const CollapsibleContent = (props: AccordionPrimitives.ItemContentProps) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <AccordionPrimitives.ItemContent
      class={cn(
        "overflow-hidden text-sm data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down",
        local.class,
      )}
      {...rest}
    >
      <div class="px-4 py-2">{local.children}</div>
    </AccordionPrimitives.ItemContent>
  )
}

const CollapsibleItem = (props: AccordionPrimitives.ItemProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return <AccordionPrimitives.Item class={cn("border-b", local.class)} {...rest} />
}

export { Collapsible, CollapsibleContent, CollapsibleItem, CollapsibleTrigger }
