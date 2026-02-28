import { cva, type VariantProps } from "class-variance-authority"
import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"

const separatorVariants = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

export type SeparatorOrientation = "horizontal" | "vertical"

export interface SeparatorProps extends ComponentProps<"div">, VariantProps<typeof separatorVariants> {
  decorative?: boolean
}

export const Separator = (props: SeparatorProps) => {
  const [local, rest] = splitProps(props, ["class", "orientation", "decorative"])

  const orientation = (local.orientation ?? "horizontal") as SeparatorOrientation
  const decorative = local.decorative ?? true

  return (
    <div
      role={decorative ? "presentation" : "separator"}
      aria-orientation={orientation}
      class={cn(separatorVariants({ orientation: local.orientation }), local.class)}
      {...rest}
    />
  )
}

export { separatorVariants }
