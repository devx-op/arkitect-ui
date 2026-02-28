import { cva, type VariantProps } from "class-variance-authority"
import { type ComponentProps, splitProps } from "solid-js"
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

export const Skeleton = (props: SkeletonProps) => {
  const [local, rest] = splitProps(props, ["class", "variant"])

  return <div class={cn(skeletonVariants({ variant: local.variant }), local.class)} {...rest} />
}

export { skeletonVariants }
