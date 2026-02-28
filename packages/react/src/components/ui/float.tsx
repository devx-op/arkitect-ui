import { type ComponentProps, forwardRef } from "react"
import { cn } from "@/lib/utils"

type Placement =
  | "top-start"
  | "top"
  | "top-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end"
  | "left-start"
  | "left"
  | "left-end"
  | "right-start"
  | "right"
  | "right-end"

interface FloatProps extends ComponentProps<"div"> {
  placement: Placement
  offset?: string | number
  offsetX?: string | number
  offsetY?: string | number
}

const positionClasses: Record<Placement, string> = {
  "top-start": "bottom-full left-0 mb-2",
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  "top-end": "bottom-full right-0 mb-2",
  "bottom-start": "top-full left-0 mt-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  "bottom-end": "top-full right-0 mt-2",
  "left-start": "right-full top-0 mr-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  "left-end": "right-full bottom-0 mr-2",
  "right-start": "left-full top-0 ml-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
  "right-end": "left-full bottom-0 ml-2",
}

const Float = forwardRef<HTMLDivElement, FloatProps>(
  ({ className, placement, offset, offsetX, offsetY, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-50",
          positionClasses[placement],
          offsetX !== undefined && `mx-[${offsetX}]`,
          offsetY !== undefined && `my-[${offsetY}]`,
          offset !== undefined && `m-[${offset}]`,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
Float.displayName = "Float"

export { Float, type FloatProps }
