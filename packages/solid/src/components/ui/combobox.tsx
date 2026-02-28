import { Combobox as ComboboxPrimitives } from "@ark-ui/solid"
import { IconCheck, IconChevronDown } from "@tabler/icons-solidjs"
import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"

const Combobox = <T extends object>(props: ComboboxPrimitives.RootProps<T>) => (
  <ComboboxPrimitives.Root data-slot="combobox" {...props} />
)

const ComboboxTrigger = (props: ComboboxPrimitives.TriggerProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ComboboxPrimitives.Trigger
      class={cn("absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3", local.class)}
      {...rest}
    />
  )
}

const ComboboxValue = (props: ComponentProps<"span"> & { placeholder?: string }) => {
  const [local, rest] = splitProps(props, ["class", "placeholder", "children"])
  return (
    <span
      class={cn(
        "flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        !local.children && "text-muted-foreground",
        local.class,
      )}
      {...rest}
    >
      {local.children || local.placeholder}
    </span>
  )
}

const ComboboxInput = (props: ComboboxPrimitives.InputProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ComboboxPrimitives.Input
      class={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      {...rest}
    />
  )
}

const ComboboxContent = (props: ComboboxPrimitives.ContentProps & { portal?: boolean }) => {
  const [local, rest] = splitProps(props, ["class", "portal", "children"])
  // Portal prop is ignored in Solid - Positioner handles positioning
  return (
    <ComboboxPrimitives.Positioner>
      <ComboboxPrimitives.Content
        class={cn(
          "z-50 max-h-[var(--radix-combobox-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          local.class,
        )}
        {...rest}
      >
        {local.children}
      </ComboboxPrimitives.Content>
    </ComboboxPrimitives.Positioner>
  )
}

const ComboboxList = (props: ComboboxPrimitives.ListProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ComboboxPrimitives.List
      class={cn(local.class)}
      {...rest}
    />
  )
}

const ComboboxItem = (props: ComboboxPrimitives.ItemProps & { inset?: boolean }) => {
  const [local, rest] = splitProps(props, ["class", "inset", "children"])
  return (
    <ComboboxPrimitives.Item
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1. text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        local.inset && "pl-8",
        local.class,
      )}
      {...rest}
    >
      <ComboboxPrimitives.ItemIndicator class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <IconCheck class="h-4 w-4" />
      </ComboboxPrimitives.ItemIndicator>
      <ComboboxPrimitives.ItemText>{local.children}</ComboboxPrimitives.ItemText>
    </ComboboxPrimitives.Item>
  )
}

const ComboboxItemIndicator = (props: ComboboxPrimitives.ItemIndicatorProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ComboboxPrimitives.ItemIndicator
      class={cn("flex items-center justify-center", local.class)}
      {...rest}
    />
  )
}

const ComboboxGroup = (props: ComboboxPrimitives.ItemGroupProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ComboboxPrimitives.ItemGroup
      class={cn(local.class)}
      {...rest}
    />
  )
}

const ComboboxLabel = (props: ComboboxPrimitives.LabelProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ComboboxPrimitives.Label
      class={cn("px-2 py-1.5 text-sm font-semibold", local.class)}
      {...rest}
    />
  )
}

const ComboboxSeparator = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <div
      class={cn("-mx-1 my-1 h-px bg-muted", local.class)}
      {...rest}
    />
  )
}

const ComboboxEmpty = (props: ComboboxPrimitives.EmptyProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ComboboxPrimitives.Empty
      class={cn("py-2 text-center text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  )
}

const ComboboxPositioner = (props: ComboboxPrimitives.PositionerProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ComboboxPrimitives.Positioner
      class={cn(local.class)}
      {...rest}
    />
  )
}

const ComboboxControl = (props: ComboboxPrimitives.ControlProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <ComboboxPrimitives.Control
      class={cn("relative", local.class)}
      {...rest}
    />
  )
}

export {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxList,
  ComboboxPositioner,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
}
