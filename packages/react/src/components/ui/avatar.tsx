import { Avatar as AvatarPrimitives } from "@ark-ui/react/avatar"
import { cva, type VariantProps } from "class-variance-authority"
import { type ComponentProps, type ComponentRef, forwardRef } from "react"
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
  ComponentRef<typeof AvatarPrimitives.Root>,
  ComponentProps<typeof AvatarPrimitives.Root> & VariantProps<typeof avatarSizes>
>(({ className, size, ...props }, ref) => {
  return (
    <AvatarPrimitives.Root
      ref={ref}
      data-slot="avatar"
      className={cn("relative flex shrink-0 overflow-hidden rounded-full", avatarSizes({ size }), className)}
      {...props}
    />
  )
})
Avatar.displayName = "Avatar"

const AvatarImage = forwardRef<
  ComponentRef<typeof AvatarPrimitives.Image>,
  ComponentProps<typeof AvatarPrimitives.Image>
>(({ className, ...props }, ref) => {
  return (
    <AvatarPrimitives.Image
      ref={ref}
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  )
})
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = forwardRef<
  ComponentRef<typeof AvatarPrimitives.Fallback>,
  ComponentProps<typeof AvatarPrimitives.Fallback>
>(({ className, ...props }, ref) => {
  return (
    <AvatarPrimitives.Fallback
      ref={ref}
      className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
      {...props}
    />
  )
})
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarFallback, AvatarImage, avatarSizes }
