import { type ComponentProps, forwardRef, useState } from "react"
import { IconMenu2, IconX } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "./button"

// Sidebar - main container
const Sidebar = forwardRef<HTMLDivElement, ComponentProps<"div"> & { collapsed?: boolean }>(
  ({ className, collapsed, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-screen flex-col border-r bg-card text-card-foreground transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className,
      )}
      {...props}
    />
  ),
)
Sidebar.displayName = "Sidebar"

// SidebarHeader
const SidebarHeader = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex h-16 items-center border-b px-4", className)} {...props} />
  ),
)
SidebarHeader.displayName = "SidebarHeader"

// SidebarContent
const SidebarContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex-1 overflow-y-auto p-4", className)}
      {...props}
    />
  ),
)
SidebarContent.displayName = "SidebarContent"

// SidebarGroup
const SidebarGroup = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("mb-4", className)} {...props} />,
)
SidebarGroup.displayName = "SidebarGroup"

// SidebarGroupTitle
const SidebarGroupTitle = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground", className)}
      {...props}
    />
  ),
)
SidebarGroupTitle.displayName = "SidebarGroupTitle"

// SidebarGroupContent
const SidebarGroupContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("space-y-1", className)} {...props} />,
)
SidebarGroupContent.displayName = "SidebarGroupContent"

// SidebarItem
const SidebarItem = forwardRef<HTMLDivElement, ComponentProps<"div"> & { active?: boolean }>(
  ({ className, active, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
        active && "bg-accent text-accent-foreground",
        className,
      )}
      {...props}
    />
  ),
)
SidebarItem.displayName = "SidebarItem"

// SidebarLink
const SidebarLink = forwardRef<HTMLAnchorElement, ComponentProps<"a"> & { active?: boolean }>(
  ({ className, active, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
        active && "bg-accent text-accent-foreground",
        className,
      )}
      {...props}
    />
  ),
)
SidebarLink.displayName = "SidebarLink"

// SidebarFooter
const SidebarFooter = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("border-t p-4", className)} {...props} />,
)
SidebarFooter.displayName = "SidebarFooter"

// SidebarToggle - para colapsar/expandir
interface SidebarToggleProps extends ButtonProps {
  collapsed?: boolean
}

const SidebarToggle = forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ className, collapsed, ...props }, ref) => (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8", className)}
      {...props}
    >
      {collapsed ? <IconMenu2 className="h-4 w-4" /> : <IconX className="h-4 w-4" />}
    </Button>
  ),
)
SidebarToggle.displayName = "SidebarToggle"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupTitle,
  SidebarHeader,
  SidebarItem,
  SidebarLink,
  SidebarToggle,
}
