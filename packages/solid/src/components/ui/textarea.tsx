import { cva } from "class-variance-authority"
import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"

const textareaStyle = cva(
  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        outline: "border-base-400 border bg-transparent",
        soft: "bg-base-100",
        plain: "bg-transparent border-none",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
)

export interface TextareaProps extends ComponentProps<"textarea"> {
  variant?: "outline" | "soft" | "plain"
}

export function Textarea(props: TextareaProps) {
  const [local, rest] = splitProps(props, ["class", "variant"])

  return <textarea class={cn(textareaStyle({ variant: local.variant, className: local.class }))} {...rest} />
}
