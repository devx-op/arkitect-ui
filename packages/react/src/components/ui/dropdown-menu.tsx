import { Menu } from "@ark-ui/react"
import { IconCheck, IconChevronRight, IconCircle } from "@tabler/icons-react"
import { type ComponentProps, type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from "react"
import { cn } from "@/lib/utils"

const DropdownMenu = (props: Menu.RootProps) => <Menu.Root {...props} />

const DropdownMenuTrigger = forwardRef<
  ComponentRef<typeof Menu.Trigger>,
  ComponentPropsWithoutRef<typeof Menu.Trigger>
>(({ className, ...props }, ref) => (
  <Menu.Trigger
    ref={ref}
    className={cn("cursor-pointer", className)}
    {...props}
  />
))
DropdownMenuTrigger.displayName = Menu.Trigger.displayName

const DropdownMenuGroup = Menu.ItemGroup

const DropdownMenuPortal = Menu.Positioner

const DropdownMenuSub = Menu.Root

const DropdownMenuRadioGroup = Menu.RadioItemGroup

const DropdownMenuSubTrigger = forwardRef<
  ComponentRef<typeof Menu.Trigger>,
  ComponentPropsWithoutRef<typeof Menu.Trigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <Menu.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <IconChevronRight className="ml-auto" />
  </Menu.Trigger>
))
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger"

const DropdownMenuSubContent = forwardRef<
  ComponentRef<typeof Menu.Content>,
  ComponentPropsWithoutRef<typeof Menu.Content>
>(({ className, ...props }, ref) => (
  <Menu.Content
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className,
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName = "DropdownMenuSubContent"

const DropdownMenuContent = forwardRef<
  ComponentRef<typeof Menu.Content>,
  ComponentPropsWithoutRef<typeof Menu.Content>
>(({ className, ...props }, ref) => (
  <Menu.Positioner>
    <Menu.Content
      ref={ref}
      className={cn(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
        className,
      )}
      {...props}
    />
  </Menu.Positioner>
))
DropdownMenuContent.displayName = Menu.Content.displayName

const DropdownMenuItem = forwardRef<
  ComponentRef<typeof Menu.Item>,
  ComponentPropsWithoutRef<typeof Menu.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <Menu.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = Menu.Item.displayName

const DropdownMenuCheckboxItem = forwardRef<
  ComponentRef<typeof Menu.CheckboxItem>,
  ComponentPropsWithoutRef<typeof Menu.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <Menu.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Menu.ItemIndicator>
        <IconCheck className="h-4 w-4" />
      </Menu.ItemIndicator>
    </span>
    {children}
  </Menu.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName = Menu.CheckboxItem.displayName

const DropdownMenuRadioItem = forwardRef<
  ComponentRef<typeof Menu.RadioItem>,
  ComponentPropsWithoutRef<typeof Menu.RadioItem>
>(({ className, children, ...props }, ref) => (
  <Menu.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Menu.ItemIndicator>
        <IconCircle className="h-2 w-2 fill-current" />
      </Menu.ItemIndicator>
    </span>
    {children}
  </Menu.RadioItem>
))
DropdownMenuRadioItem.displayName = Menu.RadioItem.displayName

const DropdownMenuLabel = forwardRef<
  ComponentRef<typeof Menu.ItemGroupLabel>,
  ComponentPropsWithoutRef<typeof Menu.ItemGroupLabel> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <Menu.ItemGroupLabel
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = Menu.ItemGroupLabel.displayName

const DropdownMenuSeparator = forwardRef<
  ComponentRef<typeof Menu.Separator>,
  ComponentPropsWithoutRef<typeof Menu.Separator>
>(({ className, ...props }, ref) => (
  <Menu.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = Menu.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: ComponentProps<"span">) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

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
