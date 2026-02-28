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

export interface AvatarProps extends ComponentProps<"span">, VariantProps<typeof avatarSizes> {}

export const Avatar = (props: AvatarProps) => {
  const [local, rest] = splitProps(props, ["class", "size"])

  return (
    <span
      class={cn("relative flex shrink-0 overflow-hidden rounded-full", avatarSizes({ size: local.size }), local.class)}
      {...rest}
    />
  )
}

export interface AvatarImageProps extends ComponentProps<"img"> {}

export const AvatarImage = (props: AvatarImageProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return <img class={cn("aspect-square h-full w-full object-cover", local.class)} {...rest} />
}

export interface AvatarFallbackProps extends ComponentProps<"span"> {}

export const AvatarFallback = (props: AvatarFallbackProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <span
      class={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", local.class)}
      {...rest}
    />
  )
}

export { avatarSizes }
