import { Dialog as DialogPrimitives } from "@ark-ui/react"
import { IconX } from "@tabler/icons-react"
import { cva, type VariantProps } from "class-variance-authority"
import { type ComponentProps, type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "./button"

const Sheet = (props: DialogPrimitives.RootProps) => <DialogPrimitives.Root data-slot="sheet" {...props} />

const SheetTrigger = (props: DialogPrimitives.TriggerProps) => (
  <DialogPrimitives.Trigger data-slot="trigger" {...props} />
)

const SheetClose = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <DialogPrimitives.CloseTrigger ref={ref} asChild>
      <Button variant="ghost" size="icon" {...props}>
        {children ?? <IconX className="h-4 w-4" />}
      </Button>
    </DialogPrimitives.CloseTrigger>
  ),
)

SheetClose.displayName = "SheetClose"

const SheetHeader = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
)

SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
)

SheetFooter.displayName = "SheetFooter"

const SheetTitle = forwardRef<
  ComponentRef<typeof DialogPrimitives.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitives.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitives.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))

SheetTitle.displayName = "SheetTitle"

const SheetDescription = forwardRef<
  ComponentRef<typeof DialogPrimitives.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitives.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitives.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))

SheetDescription.displayName = "SheetDescription"

const sheetContentStyle = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left:
          "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
)

interface SheetContentProps extends VariantProps<typeof sheetContentStyle> {}

const SheetContent = forwardRef<
  ComponentRef<typeof DialogPrimitives.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitives.Content> & SheetContentProps
>(({ className, side, ...props }, ref) => (
  <>
    <DialogPrimitives.Backdrop className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <DialogPrimitives.Positioner className="fixed z-50">
      <DialogPrimitives.Content
        ref={ref}
        className={cn(sheetContentStyle({ side }), className)}
        {...props}
      />
    </DialogPrimitives.Positioner>
  </>
))

SheetContent.displayName = "SheetContent"

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger }
