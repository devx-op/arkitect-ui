import { cva, type VariantProps } from "class-variance-authority"
import { type ComponentProps, forwardRef } from "react"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const badgeSizes = cva("", {
  variants: {
    size: {
      sm: "h-5 px-2",
      default: "h-6 px-2.5",
      lg: "h-7 px-3 text-sm",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface BadgeProps extends ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  size?: VariantProps<typeof badgeSizes>["size"]
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant }), badgeSizes({ size }), className)}
        {...props}
      />
    )
  },
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
