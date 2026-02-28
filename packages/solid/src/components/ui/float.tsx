import { type ComponentProps, splitProps } from "solid-js"
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

const Float = (props: FloatProps) => {
  const [local, rest] = splitProps(
    props,
    ["class", "placement", "offset", "offsetX", "offsetY", "children"],
  )

  const offsetClass = () => {
    const parts: string[] = []
    if (local.offsetX !== undefined) parts.push(`mx-[${local.offsetX}]`)
    if (local.offsetY !== undefined) parts.push(`my-[${local.offsetY}]`)
    if (local.offset !== undefined) parts.push(`m-[${local.offset}]`)
    return parts.join(" ")
  }

  return (
    <div
      class={cn(
        "absolute z-50",
        positionClasses[local.placement as Placement],
        offsetClass(),
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </div>
  )
}

export { Float, type FloatProps }
