import { Dialog as DialogPrimitives } from "@ark-ui/react"
import { IconX } from "@tabler/icons-react"
import { cva, type VariantProps } from "class-variance-authority"
import React, { type InputHTMLAttributes } from "react"
import { Button, type ButtonProps } from "./button"
import clsx from "clsx"

const Dialog = (props: DialogPrimitives.RootProps) => <DialogPrimitives.Root data-slot="dialog" {...props} />

const DialogTrigger = (props: DialogPrimitives.TriggerProps) => (
  <DialogPrimitives.Trigger data-slot="trigger" {...props} />
)

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx(
      "text-base-900 flex h-12 min-h-12 items-center gap-x-3 px-2 text-center",
      className,
    )}
    {...props}
  />
)

DialogHeader.displayName = "DialogHeader"

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitives.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitives.Title
    ref={ref}
    className={clsx("flex-1 text-start text-lg font-semibold", className)}
    {...props}
  />
))

DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
  HTMLDivElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitives.Description
    ref={ref}
    className={clsx(
      "text-base-600 w-full flex-1 overflow-auto px-2",
      className,
    )}
    {...props}
  >
    {children}
  </DialogPrimitives.Description>
))

DialogDescription.displayName = "DialogDescription"

const modalContentStyle = cva(
  "duration-400 bg-base-0 flex w-full flex-col shadow-md transition-all data-[state=open]:visible data-[state=closed]:invisible data-[state=closed]:translate-y-4 data-[state=open]:translate-y-0 data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
  {
    variants: {
      size: {
        xs: "max-h-[70vh] max-w-xs sm:rounded",
        sm: "max-h-[70vh] max-w-sm sm:rounded",
        md: "max-h-[70vh] max-w-md sm:rounded",
        lg: "max-h-[70vh] max-w-lg sm:rounded",
        xl: "max-h-[70vh] max-w-xl sm:rounded",
        "2xl": "max-h-[70vh] max-w-2xl sm:rounded",
        "3xl": "max-h-[70vh] max-w-3xl sm:rounded",
        fullscreen: "h-screen w-screen rounded-none",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

interface DialogContentProps extends VariantProps<typeof modalContentStyle> {}

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitives.Content>,
  & React.ComponentPropsWithoutRef<typeof DialogPrimitives.Content>
  & DialogContentProps
>(({ className, size, ...props }, ref) => (
  <>
    <DialogPrimitives.Backdrop className="duration-400 pointer-events-none fixed inset-0 z-50 block bg-neutral-800 bg-opacity-0 backdrop-blur-sm backdrop-brightness-50 transition-all data-[state=open]:visible data-[state=closed]:invisible data-[state=open]:bg-opacity-50" />
    <DialogPrimitives.Positioner className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center">
      <DialogPrimitives.Content
        ref={ref}
        className={modalContentStyle({ size, className })}
        {...props}
      />
    </DialogPrimitives.Positioner>
  </>
))

DialogContent.displayName = "DialogContent"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => <div className={clsx("text-base-600 px-4 py-2.5", className)} {...props} />

DialogFooter.displayName = "DialogFooter"

const DialogClose = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <DialogPrimitives.CloseTrigger ref={ref} asChild>
      <Button variant="icon" size="sm" {...props}>
        {children ?? <IconX className="h-5 w-5" />}
      </Button>
    </DialogPrimitives.CloseTrigger>
  ),
)

DialogClose.displayName = "DialogClose"

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger }
