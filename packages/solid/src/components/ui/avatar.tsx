import { Avatar as AvatarPrimitives } from "@ark-ui/solid/avatar"
import { cva, type VariantProps } from "class-variance-authority"
import { type ComponentProps, splitProps } from "solid-js"
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

export interface AvatarProps extends ComponentProps<typeof AvatarPrimitives.Root>, VariantProps<typeof avatarSizes> {}

export const Avatar = (props: AvatarProps) => {
  const [local, rest] = splitProps(props, ["class", "size"])

  return (
    <AvatarPrimitives.Root
      data-slot="avatar"
      class={cn("relative flex shrink-0 overflow-hidden rounded-full", avatarSizes({ size: local.size }), local.class)}
      {...rest}
    />
  )
}

export interface AvatarImageProps extends ComponentProps<typeof AvatarPrimitives.Image> {}

export const AvatarImage = (props: AvatarImageProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return <AvatarPrimitives.Image class={cn("aspect-square h-full w-full object-cover", local.class)} {...rest} />
}

export interface AvatarFallbackProps extends ComponentProps<typeof AvatarPrimitives.Fallback> {}

export const AvatarFallback = (props: AvatarFallbackProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <AvatarPrimitives.Fallback
      class={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", local.class)}
      {...rest}
    />
  )
}

export { avatarSizes }
