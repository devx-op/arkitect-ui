import { createToaster, type CreateToasterReturn, Toast, Toaster } from "@ark-ui/react/toast"
import { cn } from "@/lib/utils"

const toaster: CreateToasterReturn = createToaster({
  placement: "bottom-end",
  overlap: true,
  gap: 16,
})

// Toaster component - render this in your app root
const ArkToaster = () => {
  return (
    <Toaster toaster={toaster}>
      {(toast) => (
        <Toast.Root
          className={cn(
            "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
            "data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:slide-out-to-right-full",
            "data-[open]:animate-in data-[open]:fade-in-0 data-[open]:slide-in-from-bottom-full",
            toast.type === "success" && "border-green-500 bg-green-50 text-green-900",
            toast.type === "error" && "border-red-500 bg-red-50 text-red-900",
            toast.type === "warning" && "border-yellow-500 bg-yellow-50 text-yellow-900",
            toast.type === "info" && "border-blue-500 bg-blue-50 text-blue-900",
          )}
        >
          <div className="flex flex-col gap-1">
            <Toast.Title className="font-semibold">{toast.title}</Toast.Title>
            {toast.description && (
              <Toast.Description className="text-sm opacity-90">{toast.description}</Toast.Description>
            )}
          </div>
        </Toast.Root>
      )}
    </Toaster>
  )
}

// Export as Toaster for shadcn compatibility
export { ArkToaster as Toaster }

type ToastOptions = {
  title?: React.ReactNode
  description?: React.ReactNode
  type?: "info" | "success" | "error" | "warning"
  duration?: number
}

// Overloaded toast function to handle both string and object inputs
function createToast(options: ToastOptions): ReturnType<typeof toaster.create>
function createToast(message: string): ReturnType<typeof toaster.create>
function createToast(options: ToastOptions | string): ReturnType<typeof toaster.create> {
  // Handle string input
  if (typeof options === "string") {
    return toaster.create({
      title: options,
      type: "info",
      duration: 5000,
    })
  }
  return toaster.create({
    title: options.title,
    description: options.description,
    type: options.type ?? "info",
    duration: options.duration ?? 5000,
  })
}

// Convenience toast functions
const toast = Object.assign(createToast, {
  success: (title: React.ReactNode, description?: React.ReactNode) => {
    return createToast({ title, description, type: "success" })
  },
  error: (title: React.ReactNode, description?: React.ReactNode) => {
    return createToast({ title, description, type: "error" })
  },
  warning: (title: React.ReactNode, description?: React.ReactNode) => {
    return createToast({ title, description, type: "warning" })
  },
  info: (title: React.ReactNode, description?: React.ReactNode) => {
    return createToast({ title, description, type: "info" })
  },
  dismiss: (id?: string) => {
    if (id) {
      toaster.dismiss(id)
    }
  },
})

export { toast }
