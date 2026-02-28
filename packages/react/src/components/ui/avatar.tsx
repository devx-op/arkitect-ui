import { cva, type VariantProps } from "class-variance-authority"
import { type ComponentProps, forwardRef } from "react"
import { cn } from "@/lib/utils"

const avatarSizes = cva("shrink-0", {
  variants: {
    size: {
      default: "h-10 w-10",
      sm: "h-8 w-8",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

const Avatar = forwardRef<
  HTMLSpanElement,
  ComponentProps<"span"> & VariantProps<typeof avatarSizes>
>(({ className, size, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn("relative flex shrink-0 overflow-hidden rounded-full", avatarSizes({ size }), className)}
      {...props}
    />
  )
})
Avatar.displayName = "Avatar"

const AvatarImage = forwardRef<HTMLImageElement, ComponentProps<"img">>(({ className, ...props }, ref) => {
  return <img ref={ref} className={cn("aspect-square h-full w-full object-cover", className)} {...props} />
})
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = forwardRef<HTMLSpanElement, ComponentProps<"span">>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
      {...props}
    />
  )
})
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarFallback, AvatarImage, avatarSizes }
