import { Dialog as DialogPrimitives } from "@ark-ui/solid"
import { IconX } from "@tabler/icons-solidjs"
import { type JSX, splitProps } from "solid-js"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "./button"

const Dialog = (props: DialogPrimitives.RootProps) => <DialogPrimitives.Root data-slot="dialog" {...props} />

const DialogTrigger = (props: DialogPrimitives.TriggerProps) => (
  <DialogPrimitives.Trigger data-slot="trigger" {...props} />
)

const DialogHeader = (props: JSX.HTMLAttributes<HTMLDivElement>) => (
  <div
    class="text-base-900 flex h-12 min-h-12 items-center gap-x-3 px-2 text-center"
    {...props}
  />
)

const DialogTitle = (props: DialogPrimitives.TitleProps) => (
  <DialogPrimitives.Title
    class="flex-1 text-start text-lg font-semibold"
    {...props}
  />
)

const DialogDescription = (props: DialogPrimitives.DescriptionProps) => (
  <DialogPrimitives.Description
    class="text-base-600 w-full flex-1 overflow-auto px-2"
    {...props}
  />
)

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

interface ModalContentProps extends DialogPrimitives.ContentProps, VariantProps<typeof modalContentStyle> {}

const DialogContent = (props: ModalContentProps) => {
  const [local, rest] = splitProps(props, ["size"])

  return (
    <>
      <DialogPrimitives.Backdrop class="duration-400 pointer-events-none fixed inset-0 z-50 block bg-neutral-800 bg-opacity-0 backdrop-blur-sm backdrop-brightness-50 transition-all data-[state=open]:visible data-[state=closed]:invisible data-[state=open]:bg-opacity-50" />
      <DialogPrimitives.Positioner class="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center">
        <DialogPrimitives.Content
          class={modalContentStyle({ size: local.size, class: rest.class })}
          {...props}
        />
      </DialogPrimitives.Positioner>
    </>
  )
}

const DialogFooter = (props: JSX.HTMLAttributes<HTMLDivElement>) => <div class="text-base-600 px-4 py-2.5" {...props} />

const DialogClose = (props: DialogPrimitives.CloseTriggerProps) => {
  const [local, rest] = splitProps(props, ["children"])
  return (
    <DialogPrimitives.CloseTrigger>
      <Button variant="icon" size="sm" {...rest}>
        {local.children ?? <IconX class="h-5 w-5" />}
      </Button>
    </DialogPrimitives.CloseTrigger>
  )
}
DialogClose.displayName = "DialogClose"

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger }
