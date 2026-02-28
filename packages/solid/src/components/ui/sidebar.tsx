import { IconMenu2, IconX } from "@tabler/icons-solidjs"
import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"
import { Button } from "./button"

// Sidebar - main container
export const Sidebar = (props: ComponentProps<"div"> & { collapsed?: boolean }) => {
  const [local, rest] = splitProps(props, ["class", "collapsed", "children"])
  return (
    <div
      class={cn(
        "flex h-screen flex-col border-r bg-card text-card-foreground transition-all duration-300",
        local.collapsed ? "w-16" : "w-64",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </div>
  )
}

// SidebarHeader
export const SidebarHeader = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div class={cn("flex h-16 items-center border-b px-4", local.class)} {...rest}>
      {local.children}
    </div>
  )
}

// SidebarContent
export const SidebarContent = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div class={cn("flex-1 overflow-y-auto p-4", local.class)} {...rest}>
      {local.children}
    </div>
  )
}

// SidebarGroup
export const SidebarGroup = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div class={cn("mb-4", local.class)} {...rest}>
      {local.children}
    </div>
  )
}

// SidebarGroupTitle
export const SidebarGroupTitle = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div class={cn("mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground", local.class)} {...rest}>
      {local.children}
    </div>
  )
}

// SidebarGroupContent
export const SidebarGroupContent = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div class={cn("space-y-1", local.class)} {...rest}>
      {local.children}
    </div>
  )
}

// SidebarItem
export const SidebarItem = (props: ComponentProps<"div"> & { active?: boolean }) => {
  const [local, rest] = splitProps(props, ["class", "active", "children"])
  return (
    <div
      class={cn(
        "flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
        local.active && "bg-accent text-accent-foreground",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </div>
  )
}

// SidebarLink
export const SidebarLink = (props: ComponentProps<"a"> & { active?: boolean }) => {
  const [local, rest] = splitProps(props, ["class", "active", "children"])
  return (
    <a
      class={cn(
        "flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
        local.active && "bg-accent text-accent-foreground",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </a>
  )
}

// SidebarFooter
export const SidebarFooter = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div class={cn("border-t p-4", local.class)} {...rest}>
      {local.children}
    </div>
  )
}

// SidebarToggle
export const SidebarToggle = (props: { collapsed?: boolean; class?: string }) => {
  return (
    <Button variant="ghost" size="icon" class={cn("h-8 w-8", props.class)}>
      {props.collapsed ? <IconMenu2 class="h-4 w-4" /> : <IconX class="h-4 w-4" />}
    </Button>
  )
}
