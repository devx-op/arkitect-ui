import { Accordion as AccordionPrimitives } from "@ark-ui/react"
import { IconChevronDown } from "@tabler/icons-react"
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from "react"
import { cn } from "@/lib/utils"

const Collapsible = AccordionPrimitives.Root

const CollapsibleTrigger = forwardRef<
  ComponentRef<typeof AccordionPrimitives.ItemTrigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitives.ItemTrigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitives.ItemTrigger
    ref={ref}
    className={cn(
      "flex w-full items-center justify-between rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground [&[data-state=open]>svg]:rotate-180",
      className,
    )}
    {...props}
  >
    {children}
    <IconChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
  </AccordionPrimitives.ItemTrigger>
))
CollapsibleTrigger.displayName = AccordionPrimitives.ItemTrigger.displayName

const CollapsibleContent = forwardRef<
  ComponentRef<typeof AccordionPrimitives.ItemContent>,
  ComponentPropsWithoutRef<typeof AccordionPrimitives.ItemContent>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitives.ItemContent
    ref={ref}
    className={cn(
      "overflow-hidden text-sm data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down",
      className,
    )}
    {...props}
  >
    <div className="px-4 py-2">{children}</div>
  </AccordionPrimitives.ItemContent>
))
CollapsibleContent.displayName = AccordionPrimitives.ItemContent.displayName

const CollapsibleItem = forwardRef<
  ComponentRef<typeof AccordionPrimitives.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitives.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitives.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
CollapsibleItem.displayName = AccordionPrimitives.Item.displayName

export { Collapsible, CollapsibleContent, CollapsibleItem, CollapsibleTrigger }
