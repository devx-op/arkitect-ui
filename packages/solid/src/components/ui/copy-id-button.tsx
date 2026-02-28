import { type ComponentProps, createSignal, splitProps } from "solid-js"
import { IconClipboard } from "@tabler/icons-solidjs"
import { Button } from "./button"

export interface CopyIdButtonProps extends ComponentProps<"button"> {
  id: string
  label?: string
}

export function CopyIdButton(props: CopyIdButtonProps) {
  const [local, rest] = splitProps(props, ["id", "label", "class"])
  const [copied, setCopied] = createSignal(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(local.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button type="button" variant="ghost" size="sm" class={local.class} onClick={handleCopy} {...rest}>
      <IconClipboard class="h-4 w-4 mr-2" />
      {copied() ? "Copied!" : local.label ?? "Copy"}
    </Button>
  )
}
