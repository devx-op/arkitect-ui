import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef } from "react"
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

export interface SeparatorProps extends VariantProps<typeof separatorVariants> {
  className?: string
  decorative?: boolean
  children?: never
}

const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative = true }, ref) => {
    return (
      <div
        ref={ref}
        role={decorative ? "presentation" : "separator"}
        aria-orientation={orientation as SeparatorOrientation}
        className={cn(separatorVariants({ orientation }), className)}
      />
    )
  },
)
Separator.displayName = "Separator"

export { Separator, separatorVariants }
