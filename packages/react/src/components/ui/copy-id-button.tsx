import { type ButtonHTMLAttributes, useState } from "react"
import { IconClipboard } from "@tabler/icons-react"
import { Button } from "./button"

export interface CopyIdButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string
  label?: string
}

export function CopyIdButton({ id, label = "Copy", className, ...props }: CopyIdButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={className}
      onClick={handleCopy}
      {...props}
    >
      <IconClipboard className="h-4 w-4 mr-2" />
      {copied ? "Copied!" : label}
    </Button>
  )
}
