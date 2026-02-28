import { Dialog as DialogPrimitives } from "@ark-ui/solid"
import { IconX } from "@tabler/icons-solidjs"
import { cva, type VariantProps } from "class-variance-authority"
import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"
import { Button } from "./button"

const Sheet = (props: DialogPrimitives.RootProps) => <DialogPrimitives.Root data-slot="sheet" {...props} />

const SheetTrigger = (props: DialogPrimitives.TriggerProps) => (
  <DialogPrimitives.Trigger data-slot="trigger" {...props} />
)

const SheetClose = (props: DialogPrimitives.CloseTriggerProps) => {
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

const SheetHeader = (props: ComponentProps<"div">) => {
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

const SheetFooter = (props: ComponentProps<"div">) => {
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

const SheetTitle = (props: DialogPrimitives.TitleProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <DialogPrimitives.Title
      class={cn("text-lg font-semibold text-foreground", local.class)}
      {...rest}
    />
  )
}

const SheetDescription = (props: DialogPrimitives.DescriptionProps) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <DialogPrimitives.Description
      class={cn("text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  )
}

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

interface SheetContentProps extends DialogPrimitives.ContentProps, VariantProps<typeof sheetContentStyle> {}

const SheetContent = (props: SheetContentProps) => {
  const [local, rest] = splitProps(props, ["side", "class"])

  return (
    <>
      <DialogPrimitives.Backdrop class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitives.Positioner class="fixed z-50">
        <DialogPrimitives.Content
          class={cn(sheetContentStyle({ side: local.side }), local.class)}
          {...rest}
        />
      </DialogPrimitives.Positioner>
    </>
  )
}

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger }
