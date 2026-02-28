import { Select as SelectPrimitives } from "@ark-ui/react"
import type { CollectionItem } from "@ark-ui/react/collection"
import { IconCheck, IconChevronDown } from "@tabler/icons-react"
import { type ComponentProps, type ComponentRef, forwardRef } from "react"
import { cn } from "@/lib/utils"

// Generic root component that accepts a collection
const Select = <T extends CollectionItem>(props: SelectPrimitives.RootProps<T>) => (
  <SelectPrimitives.Root data-slot="select" {...props} />
)

const SelectTrigger = forwardRef<
  ComponentRef<typeof SelectPrimitives.Trigger>,
  ComponentProps<typeof SelectPrimitives.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitives.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitives.Indicator>
      <IconChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitives.Indicator>
  </SelectPrimitives.Trigger>
))
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = (props: SelectPrimitives.ValueTextProps) => (
  <SelectPrimitives.ValueText placeholder="Select..." {...props} />
)

const SelectContent = forwardRef<
  ComponentRef<typeof SelectPrimitives.Content>,
  ComponentProps<typeof SelectPrimitives.Content>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitives.Positioner>
    <SelectPrimitives.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    >
      {children}
    </SelectPrimitives.Content>
  </SelectPrimitives.Positioner>
))
SelectContent.displayName = "SelectContent"

const SelectItem = forwardRef<
  ComponentRef<typeof SelectPrimitives.Item>,
  ComponentProps<typeof SelectPrimitives.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitives.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <SelectPrimitives.ItemIndicator className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <IconCheck className="h-4 w-4" />
    </SelectPrimitives.ItemIndicator>
    <SelectPrimitives.ItemText>{children}</SelectPrimitives.ItemText>
  </SelectPrimitives.Item>
))
SelectItem.displayName = "SelectItem"

const SelectGroup = (props: SelectPrimitives.ItemGroupProps) => <SelectPrimitives.ItemGroup {...props} />

const SelectLabel = forwardRef<
  ComponentRef<typeof SelectPrimitives.ItemGroupLabel>,
  ComponentProps<typeof SelectPrimitives.ItemGroupLabel>
>(({ className, ...props }, ref) => (
  <SelectPrimitives.ItemGroupLabel
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = "SelectLabel"

const SelectSeparator = forwardRef<
  ComponentRef<"hr">,
  ComponentProps<"hr">
>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = "SelectSeparator"

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue }
