import { Dialog as DialogPrimitives } from "@ark-ui/solid"
import { IconX } from "@tabler/icons-solidjs"
import { cva, type VariantProps } from "class-variance-authority"
import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"
import { Button } from "./button"

const Dialog = (props: DialogPrimitives.RootProps) => <DialogPrimitives.Root data-slot="dialog" {...props} />

const DialogTrigger = (props: DialogPrimitives.TriggerProps) => (
  <DialogPrimitives.Trigger data-slot="trigger" {...props} />
)

const DialogHeader = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "flex h-12 min-h-12 items-center gap-x-3 px-2 text-center",
        local.class,
      )}
      {...rest}
    />
  )
}

const DialogTitle = (props: DialogPrimitives.TitleProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <DialogPrimitives.Title
      class={cn("flex-1 text-start text-lg font-semibold", local.class)}
      {...rest}
    />
  )
}

const DialogDescription = (props: DialogPrimitives.DescriptionProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <DialogPrimitives.Description
      class={cn("text-muted-foreground w-full flex-1 overflow-auto px-2", local.class)}
      {...rest}
    />
  )
}

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

interface DialogContentProps extends DialogPrimitives.ContentProps, VariantProps<typeof modalContentStyle> {}

const DialogContent = (props: DialogContentProps) => {
  const [local, rest] = splitProps(props, ["size", "class"])

  return (
    <>
      <DialogPrimitives.Backdrop class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80" />
      <DialogPrimitives.Positioner class="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center p-4">
        <DialogPrimitives.Content
          class={cn(modalContentStyle({ size: local.size }), local.class)}
          {...rest}
        />
      </DialogPrimitives.Positioner>
    </>
  )
}

const DialogFooter = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])
  return <div class={cn("flex items-center justify-end gap-2 p-4", local.class)} {...rest} />
}

const DialogClose = (props: DialogPrimitives.CloseTriggerProps) => {
  const [local, rest] = splitProps(props, ["children"])
  return (
    <DialogPrimitives.CloseTrigger {...rest}>
      {local.children ?? (
        <Button variant="ghost" size="icon">
          <IconX class="h-4 w-4" />
        </Button>
      )}
    </DialogPrimitives.CloseTrigger>
  )
}

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger }
