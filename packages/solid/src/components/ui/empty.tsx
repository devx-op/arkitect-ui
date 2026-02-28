import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"
import { IconFolderOff } from "@tabler/icons-solidjs"

export interface EmptyProps extends ComponentProps<"div"> {}

export const Empty = (props: EmptyProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      class={cn("flex flex-col items-center text-center", local.class)}
      {...rest}
    />
  )
}

export interface EmptyImageProps extends ComponentProps<"div"> {}

export const EmptyImage = (props: EmptyImageProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      class={cn("flex max-w-[200px] items-center justify-center", local.class)}
      {...rest}
    />
  )
}

export interface EmptyTitleProps extends ComponentProps<"p"> {}

export const EmptyTitle = (props: EmptyTitleProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <p
      class={cn("text-sm font-medium leading-none", local.class)}
      {...rest}
    />
  )
}

export interface EmptyDescriptionProps extends ComponentProps<"p"> {}

export const EmptyDescription = (props: EmptyDescriptionProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <p
      class={cn("text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  )
}

export { IconFolderOff }
