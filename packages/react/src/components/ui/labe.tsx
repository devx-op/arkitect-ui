import { type DetailedHTMLProps, forwardRef } from "react"
import clsx from "clsx"

const Label = forwardRef<
  HTMLLabelElement,
  DetailedHTMLProps<React.LabelHTMLAttributes<HTMLElement>, HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={clsx(
      "text-base-900 mb-1 text-sm font-medium data-[invalid]:text-red-500 ",
      className,
    )}
    {...props}
  />
))

Label.displayName = "Label"

export { Label }
