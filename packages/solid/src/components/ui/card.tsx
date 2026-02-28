import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"

// Card - main container
export const Card = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      class={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm",
        local.class,
      )}
      {...rest}
    />
  )
}

// CardHeader
export const CardHeader = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      class={cn("flex flex-col space-y-1.5 p-6", local.class)}
      {...rest}
    />
  )
}

// CardTitle
export const CardTitle = (props: ComponentProps<"h3">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <h3
      class={cn("font-semibold leading-none tracking-tight", local.class)}
      {...rest}
    />
  )
}

// CardDescription
export const CardDescription = (props: ComponentProps<"p">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <p
      class={cn("text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  )
}

// CardContent
export const CardContent = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])

  return <div class={cn("p-6 pt-0", local.class)} {...rest} />
}

// CardFooter
export const CardFooter = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      class={cn("flex items-center p-6 pt-0", local.class)}
      {...rest}
    />
  )
}
