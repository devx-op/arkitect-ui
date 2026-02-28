import { cva, type VariantProps } from "class-variance-authority"
import { type ComponentProps, forwardRef } from "react"
import { cn } from "@/lib/utils"

const skeletonVariants = cva("animate-pulse rounded-md bg-muted", {
  variants: {
    variant: {
      default: "",
      circular: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface SkeletonProps extends ComponentProps<"div">, VariantProps<typeof skeletonVariants> {}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return <div ref={ref} className={cn(skeletonVariants({ variant }), className)} {...props} />
  },
)
Skeleton.displayName = "Skeleton"

export { Skeleton, skeletonVariants }
