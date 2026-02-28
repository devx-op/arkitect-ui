import { type ComponentProps, forwardRef } from "react"
import { cn } from "@/lib/utils"
import { IconFolderOff } from "@tabler/icons-react"

const Empty = forwardRef<HTMLDivElement, ComponentProps<"div">>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col items-center text-center", className)}
      {...props}
    />
  )
})
Empty.displayName = "Empty"

const EmptyImage = forwardRef<HTMLDivElement, ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex max-w-[200px] items-center justify-center", className)} {...props} />
})
EmptyImage.displayName = "EmptyImage"

const EmptyTitle = forwardRef<HTMLParagraphElement, ComponentProps<"p">>(({ className, ...props }, ref) => {
  return <p ref={ref} className={cn("text-sm font-medium leading-none", className)} {...props} />
})
EmptyTitle.displayName = "EmptyTitle"

const EmptyDescription = forwardRef<HTMLParagraphElement, ComponentProps<"p">>(({ className, ...props }, ref) => {
  return <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
})
EmptyDescription.displayName = "EmptyDescription"

export { Empty, EmptyDescription, EmptyImage, EmptyTitle, IconFolderOff }
