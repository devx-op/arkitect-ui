import { Dialog as DialogPrimitives } from "@ark-ui/solid"
import { cva, type VariantProps } from "class-variance-authority"
import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"
import { Button } from "./button"

const AlertDialog = (props: DialogPrimitives.RootProps) => <DialogPrimitives.Root data-slot="alert-dialog" {...props} />

const AlertDialogTrigger = (props: DialogPrimitives.TriggerProps) => (
  <DialogPrimitives.Trigger data-slot="trigger" {...props} />
)

const AlertDialogHeader = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        local.class,
      )}
      {...rest}
    />
  )
}

const AlertDialogFooter = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        local.class,
      )}
      {...rest}
    />
  )
}

const AlertDialogTitle = (props: DialogPrimitives.TitleProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <DialogPrimitives.Title
      class={cn("text-lg font-semibold", local.class)}
      {...rest}
    />
  )
}

const AlertDialogDescription = (props: DialogPrimitives.DescriptionProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <DialogPrimitives.Description
      class={cn("text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  )
}

const alertDialogContentStyle = cva(
  "bg-background grid w-full max-w-lg gap-4 border p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-center-[var(--radix-alert-dialog-content-viewport-inset)] data-[state=closed]:slide-in-to-center-[var(--radix-alert-dialog-content-viewport-inset)] data-[state=open]:slide-in-from-center-[var(--radix-alert-dialog-content-viewport-inset)] data-[state=open]:slide-out-to-center-[var(--radix-alert-dialog-content-viewport-inset)] sm:rounded-lg",
  {
    variants: {},
  },
)

interface AlertDialogContentProps extends DialogPrimitives.ContentProps, VariantProps<typeof alertDialogContentStyle> {}

const AlertDialogContent = (props: AlertDialogContentProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <>
      <DialogPrimitives.Backdrop class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitives.Positioner class="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center p-4">
        <DialogPrimitives.Content
          class={cn(alertDialogContentStyle(), local.class)}
          {...rest}
        />
      </DialogPrimitives.Positioner>
    </>
  )
}

const AlertDialogAction = (props: ComponentProps<typeof Button>) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <Button class={cn("bg-destructive text-destructive-foreground hover:bg-destructive/90", local.class)} {...rest} />
  )
}

const AlertDialogCancel = (props: ComponentProps<typeof Button>) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <Button
      variant="outline"
      class={cn("mt-2 sm:mt-0", local.class)}
      {...rest}
    />
  )
}

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
