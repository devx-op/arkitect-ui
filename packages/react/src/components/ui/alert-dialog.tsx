import { Dialog as DialogPrimitives } from "@ark-ui/react"
import { cva, type VariantProps } from "class-variance-authority"
import { type ComponentProps, type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "./button"

const AlertDialog = (props: DialogPrimitives.RootProps) => <DialogPrimitives.Root data-slot="alert-dialog" {...props} />

const AlertDialogTrigger = (props: DialogPrimitives.TriggerProps) => (
  <DialogPrimitives.Trigger data-slot="trigger" {...props} />
)

const AlertDialogHeader = ({
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

AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
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

AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = forwardRef<
  ComponentRef<typeof DialogPrimitives.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitives.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitives.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))

AlertDialogTitle.displayName = "AlertDialogTitle"

const AlertDialogDescription = forwardRef<
  ComponentRef<typeof DialogPrimitives.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitives.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitives.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))

AlertDialogDescription.displayName = "AlertDialogDescription"

const alertDialogContentStyle = cva(
  "bg-background grid w-full max-w-lg gap-4 border p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-center-[var(--radix-alert-dialog-content-viewport-inset)] data-[state=closed]:slide-in-to-center-[var(--radix-alert-dialog-content-viewport-inset)] data-[state=open]:slide-in-from-center-[var(--radix-alert-dialog-content-viewport-inset)] data-[state=open]:slide-out-to-center-[var(--radix-alert-dialog-content-viewport-inset)] sm:rounded-lg",
  {
    variants: {},
  },
)

interface AlertDialogContentProps extends VariantProps<typeof alertDialogContentStyle> {}

const AlertDialogContent = forwardRef<
  ComponentRef<typeof DialogPrimitives.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitives.Content> & AlertDialogContentProps
>(({ className, ...props }, ref) => (
  <>
    <DialogPrimitives.Backdrop className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <DialogPrimitives.Positioner className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center p-4">
      <DialogPrimitives.Content
        ref={ref}
        className={cn(alertDialogContentStyle(), className)}
        {...props}
      />
    </DialogPrimitives.Positioner>
  </>
))

AlertDialogContent.displayName = "AlertDialogContent"

const AlertDialogAction = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <Button
      ref={ref}
      className={cn("bg-destructive text-destructive-foreground hover:bg-destructive/90", className)}
      {...props}
    />
  ),
)

AlertDialogAction.displayName = "AlertDialogAction"

const AlertDialogCancel = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <Button
      ref={ref}
      variant="outline"
      className={cn("mt-2 sm:mt-0", className)}
      {...props}
    />
  ),
)

AlertDialogCancel.displayName = "AlertDialogCancel"

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
}
