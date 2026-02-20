import { Menu } from "@ark-ui/solid"
import { IconCheck, IconChevronRight, IconCircle } from "@tabler/icons-solidjs"
import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"

const DropdownMenu = (props: Menu.RootProps) => <Menu.Root {...props} />

const DropdownMenuTrigger = (props: Menu.TriggerProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <Menu.Trigger
      class={cn("cursor-pointer", local.class)}
      {...rest}
    />
  )
}

const DropdownMenuGroup = Menu.ItemGroup

const DropdownMenuPortal = Menu.Positioner

const DropdownMenuSub = Menu.Root

const DropdownMenuRadioGroup = Menu.RadioItemGroup

const DropdownMenuSubTrigger = (props: Menu.TriggerProps & { inset?: boolean }) => {
  const [local, rest] = splitProps(props, ["class", "inset", "children"])
  return (
    <Menu.Trigger
      class={cn(
        "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        local.inset && "pl-8",
        local.class,
      )}
      {...rest}
    >
      {local.children}
      <IconChevronRight class="ml-auto" />
    </Menu.Trigger>
  )
}

const DropdownMenuSubContent = (props: Menu.ContentProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <Menu.Content
      class={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
        local.class,
      )}
      {...rest}
    />
  )
}

const DropdownMenuContent = (props: Menu.ContentProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <Menu.Positioner>
      <Menu.Content
        class={cn(
          "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
          local.class,
        )}
        {...rest}
      />
    </Menu.Positioner>
  )
}

const DropdownMenuItem = (props: Menu.ItemProps & { inset?: boolean }) => {
  const [local, rest] = splitProps(props, ["class", "inset"])
  return (
    <Menu.Item
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        local.inset && "pl-8",
        local.class,
      )}
      {...rest}
    />
  )
}

const DropdownMenuCheckboxItem = (props: Menu.CheckboxItemProps) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <Menu.CheckboxItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Menu.ItemIndicator>
          <IconCheck class="h-4 w-4" />
        </Menu.ItemIndicator>
      </span>
      {local.children}
    </Menu.CheckboxItem>
  )
}

const DropdownMenuRadioItem = (props: Menu.RadioItemProps) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <Menu.RadioItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Menu.ItemIndicator>
          <IconCircle class="h-2 w-2 fill-current" />
        </Menu.ItemIndicator>
      </span>
      {local.children}
    </Menu.RadioItem>
  )
}

const DropdownMenuLabel = (props: Menu.ItemGroupLabelProps & { inset?: boolean }) => {
  const [local, rest] = splitProps(props, ["class", "inset"])
  return (
    <Menu.ItemGroupLabel
      class={cn(
        "px-2 py-1.5 text-sm font-semibold",
        local.inset && "pl-8",
        local.class,
      )}
      {...rest}
    />
  )
}

const DropdownMenuSeparator = (props: Menu.SeparatorProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <Menu.Separator
      class={cn("-mx-1 my-1 h-px bg-muted", local.class)}
      {...rest}
    />
  )
}

const DropdownMenuShortcut = (props: ComponentProps<"span">) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <span
      class={cn("ml-auto text-xs tracking-widest opacity-60", local.class)}
      {...rest}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}
