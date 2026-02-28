import { Combobox as ComboboxPrimitives, Portal } from "@ark-ui/react"
import { IconCheck } from "@tabler/icons-react"
import { type ComponentProps, type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from "react"
import { cn } from "@/lib/utils"

const Combobox = <T extends object>(props: ComboboxPrimitives.RootProps<T>) => (
  <ComboboxPrimitives.Root data-slot="combobox" {...props} />
)

const ComboboxTrigger = forwardRef<
  ComponentRef<typeof ComboboxPrimitives.Trigger>,
  ComponentPropsWithoutRef<typeof ComboboxPrimitives.Trigger>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitives.Trigger
    ref={ref}
    className={cn("absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3", className)}
    {...props}
  />
))
ComboboxTrigger.displayName = "ComboboxTrigger"

const ComboboxValue = forwardRef<HTMLSpanElement, ComponentProps<"span"> & { placeholder?: string }>(
  ({ className, placeholder, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        !children && "text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children || placeholder}
    </span>
  ),
)
ComboboxValue.displayName = "ComboboxValue"

const ComboboxInput = forwardRef<
  ComponentRef<typeof ComboboxPrimitives.Input>,
  ComponentPropsWithoutRef<typeof ComboboxPrimitives.Input>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitives.Input
    ref={ref}
    className={cn(
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
))
ComboboxInput.displayName = "ComboboxInput"

const ComboboxContent = forwardRef<
  ComponentRef<typeof ComboboxPrimitives.Content>,
  ComponentPropsWithoutRef<typeof ComboboxPrimitives.Content> & {
    portal?: boolean
  }
>(({ className, portal = true, children, ...props }, ref) => (
  <ComboboxPrimitives.Positioner>
    <Portal disabled={!portal}>
      <ComboboxPrimitives.Content
        ref={ref}
        className={cn(
          "z-50 max-h-[var(--radix-combobox-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:visible data-[state=closed]:hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      >
        {children}
      </ComboboxPrimitives.Content>
    </Portal>
  </ComboboxPrimitives.Positioner>
))
ComboboxContent.displayName = "ComboboxContent"

const ComboboxList = forwardRef<
  ComponentRef<typeof ComboboxPrimitives.List>,
  ComponentPropsWithoutRef<typeof ComboboxPrimitives.List>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitives.List
    ref={ref}
    className={cn(className)}
    {...props}
  />
))
ComboboxList.displayName = "ComboboxList"

const ComboboxItem = forwardRef<
  ComponentRef<typeof ComboboxPrimitives.Item>,
  ComponentPropsWithoutRef<typeof ComboboxPrimitives.Item> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <ComboboxPrimitives.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    <ComboboxPrimitives.ItemIndicator className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <IconCheck className="h-4 w-4" />
    </ComboboxPrimitives.ItemIndicator>
    <ComboboxPrimitives.ItemText>{children}</ComboboxPrimitives.ItemText>
  </ComboboxPrimitives.Item>
))
ComboboxItem.displayName = "ComboboxItem"

const ComboboxItemIndicator = forwardRef<
  ComponentRef<typeof ComboboxPrimitives.ItemIndicator>,
  ComponentPropsWithoutRef<typeof ComboboxPrimitives.ItemIndicator>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitives.ItemIndicator
    ref={ref}
    className={cn("flex items-center justify-center", className)}
    {...props}
  />
))
ComboboxItemIndicator.displayName = "ComboboxItemIndicator"

const ComboboxGroup = forwardRef<
  ComponentRef<typeof ComboboxPrimitives.ItemGroup>,
  ComponentPropsWithoutRef<typeof ComboboxPrimitives.ItemGroup>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitives.ItemGroup
    ref={ref}
    className={cn(className)}
    {...props}
  />
))
ComboboxGroup.displayName = "ComboboxGroup"

const ComboboxLabel = forwardRef<
  ComponentRef<typeof ComboboxPrimitives.Label>,
  ComponentPropsWithoutRef<typeof ComboboxPrimitives.Label>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitives.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
ComboboxLabel.displayName = "ComboboxLabel"

const ComboboxSeparator = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
      {...props}
    />
  ),
)
ComboboxSeparator.displayName = "ComboboxSeparator"

const ComboboxEmpty = forwardRef<
  ComponentRef<typeof ComboboxPrimitives.Empty>,
  ComponentPropsWithoutRef<typeof ComboboxPrimitives.Empty>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitives.Empty
    ref={ref}
    className={cn("py-2 text-center text-sm text-muted-foreground", className)}
    {...props}
  />
))
ComboboxEmpty.displayName = "ComboboxEmpty"

const ComboboxPositioner = forwardRef<
  ComponentRef<typeof ComboboxPrimitives.Positioner>,
  ComponentPropsWithoutRef<typeof ComboboxPrimitives.Positioner>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitives.Positioner
    ref={ref}
    className={cn(className)}
    {...props}
  />
))
ComboboxPositioner.displayName = "ComboboxPositioner"

const ComboboxControl = forwardRef<
  ComponentRef<typeof ComboboxPrimitives.Control>,
  ComponentPropsWithoutRef<typeof ComboboxPrimitives.Control>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitives.Control
    ref={ref}
    className={cn("relative", className)}
    {...props}
  />
))
ComboboxControl.displayName = "ComboboxControl"

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
  Portal,
}
