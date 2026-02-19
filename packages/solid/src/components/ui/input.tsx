import { Field as FieldPrimitives } from "@ark-ui/solid"
import { cva, type VariantProps } from "class-variance-authority"
import { type ComponentProps, splitProps } from "solid-js"

export const inputStyle = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        outline: "border-base-400 border bg-transparent",
        soft: "bg-base-100",
        plain: "bg-transparent",
      },
      size: {
        sm: "h-9 rounded-sm text-xs",
        md: "h-10 rounded-[3px] text-sm",
        lg: "h-11 rounded",
      },
      colorScheme: {
        red: "",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  },
)

export interface InputProps
  extends Omit<ComponentProps<typeof FieldPrimitives.Input>, "size">, VariantProps<typeof inputStyle>
{}

export const Input = (props: InputProps) => {
  const [local, rest] = splitProps(props, ["class", "variant", "size"])

  return (
    <FieldPrimitives.Input
      class={inputStyle({
        variant: local.variant,
        size: local.size,
        class: local.class,
      })}
      {...rest}
    />
  )
}

Input.displayName = "Input"
