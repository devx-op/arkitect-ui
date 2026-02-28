import { Select as SelectPrimitives } from "@ark-ui/solid"
import type { CollectionItem } from "@ark-ui/solid"
import { IconCheck, IconChevronDown } from "@tabler/icons-solidjs"
import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"

// Generic root component that accepts a collection
const Select = <T extends CollectionItem>(props: SelectPrimitives.RootProps<T>) => (
  <SelectPrimitives.Root data-slot="select" {...props} />
)

const SelectTrigger = (props: SelectPrimitives.TriggerProps) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <SelectPrimitives.Trigger
      class={cn(
        "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        local.class,
      )}
      {...rest}
    >
      {local.children}
      <SelectPrimitives.Indicator>
        <IconChevronDown class="h-4 w-4 opacity-50" />
      </SelectPrimitives.Indicator>
    </SelectPrimitives.Trigger>
  )
}

const SelectValue = (props: SelectPrimitives.ValueTextProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <SelectPrimitives.ValueText
      placeholder="Select..."
      class={local.class}
      {...rest}
    />
  )
}

const SelectContent = (props: SelectPrimitives.ContentProps) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <SelectPrimitives.Positioner>
      <SelectPrimitives.Content
        class={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          local.class,
        )}
        {...rest}
      >
        {local.children}
      </SelectPrimitives.Content>
    </SelectPrimitives.Positioner>
  )
}

const SelectItem = (props: SelectPrimitives.ItemProps) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <SelectPrimitives.Item
      class={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <SelectPrimitives.ItemIndicator class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <IconCheck class="h-4 w-4" />
      </SelectPrimitives.ItemIndicator>
      <SelectPrimitives.ItemText>{local.children}</SelectPrimitives.ItemText>
    </SelectPrimitives.Item>
  )
}

const SelectGroup = (props: SelectPrimitives.ItemGroupProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return <SelectPrimitives.ItemGroup class={local.class} {...rest} />
}

const SelectLabel = (props: SelectPrimitives.ItemGroupLabelProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <SelectPrimitives.ItemGroupLabel
      class={cn("px-2 py-1.5 text-sm font-semibold", local.class)}
      {...rest}
    />
  )
}

const SelectSeparator = (props: ComponentProps<"hr">) => {
  const [local, rest] = splitProps(props, ["class"])
  return <hr class={cn("-mx-1 my-1 h-px bg-muted", local.class)} {...rest} />
}

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue }
