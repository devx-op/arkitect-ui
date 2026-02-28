import { type ComponentProps, forwardRef } from "react"
import { cn } from "@/lib/utils"

// Card - main container
const Card = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm",
        className,
      )}
      {...props}
    />
  ),
)
Card.displayName = "Card"

// CardHeader
const CardHeader = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  ),
)
CardHeader.displayName = "CardHeader"

// CardTitle
const CardTitle = forwardRef<HTMLHeadingElement, ComponentProps<"h3">>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  ),
)
CardTitle.displayName = "CardTitle"

// CardDescription
const CardDescription = forwardRef<HTMLParagraphElement, ComponentProps<"p">>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  ),
)
CardDescription.displayName = "CardDescription"

// CardContent
const CardContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
)
CardContent.displayName = "CardContent"

// CardFooter
const CardFooter = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  ),
)
CardFooter.displayName = "CardFooter"

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
