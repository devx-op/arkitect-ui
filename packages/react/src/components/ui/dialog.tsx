import { Dialog as DialogPrimitives } from "@ark-ui/react"
import { IconX } from "@tabler/icons-react"
import { cva, type VariantProps } from "class-variance-authority"
import { type ComponentProps, type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "./button"

const Dialog = (props: DialogPrimitives.RootProps) => <DialogPrimitives.Root data-slot="dialog" {...props} />

const DialogTrigger = (props: DialogPrimitives.TriggerProps) => (
  <DialogPrimitives.Trigger data-slot="trigger" {...props} />
)

const DialogHeader = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn(
      "flex h-12 min-h-12 items-center gap-x-3 px-2 text-center",
      className,
    )}
    {...props}
  />
)

DialogHeader.displayName = "DialogHeader"

const DialogTitle = forwardRef<
  ComponentRef<typeof DialogPrimitives.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitives.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitives.Title
    ref={ref}
    className={cn("flex-1 text-start text-lg font-semibold", className)}
    {...props}
  />
))

DialogTitle.displayName = "DialogTitle"

const DialogDescription = forwardRef<
  ComponentRef<typeof DialogPrimitives.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitives.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitives.Description
    ref={ref}
    className={cn(
      "text-muted-foreground w-full flex-1 overflow-auto px-2",
      className,
    )}
    {...props}
  />
))

DialogDescription.displayName = "DialogDescription"

const modalContentStyle = cva(
  "bg-background flex w-full flex-col shadow-md transition-all data-[state=open]:visible data-[state=closed]:invisible data-[state=closed]:translate-y-4 data-[state=open]:translate-y-0 data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
  {
    variants: {
      size: {
        xs: "max-h-[70vh] max-w-xs rounded-lg",
        sm: "max-h-[70vh] max-w-sm rounded-lg",
        md: "max-h-[70vh] max-w-md rounded-lg",
        lg: "max-h-[70vh] max-w-lg rounded-lg",
        xl: "max-h-[70vh] max-w-xl rounded-lg",
        "2xl": "max-h-[70vh] max-w-2xl rounded-lg",
        "3xl": "max-h-[70vh] max-w-3xl rounded-lg",
        fullscreen: "h-screen w-screen rounded-none",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

interface DialogContentProps extends VariantProps<typeof modalContentStyle> {}

const DialogContent = forwardRef<
  ComponentRef<typeof DialogPrimitives.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitives.Content> & DialogContentProps
>(({ className, size, ...props }, ref) => (
  <>
    <DialogPrimitives.Backdrop className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80" />
    <DialogPrimitives.Positioner className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center p-4">
      <DialogPrimitives.Content
        ref={ref}
        className={cn(modalContentStyle({ size }), className)}
        {...props}
      />
    </DialogPrimitives.Positioner>
  </>
))

DialogContent.displayName = "DialogContent"

const DialogFooter = ({
  className,
  ...props
}: ComponentProps<"div">) => <div className={cn("flex items-center justify-end gap-2 p-4", className)} {...props} />

DialogFooter.displayName = "DialogFooter"

const DialogClose = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <DialogPrimitives.CloseTrigger ref={ref} asChild>
      <Button variant="ghost" size="icon" {...props}>
        {children ?? <IconX className="h-4 w-4" />}
      </Button>
    </DialogPrimitives.CloseTrigger>
  ),
)

DialogClose.displayName = "DialogClose"

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger }
