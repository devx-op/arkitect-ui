import { Pagination as PaginationPrimitive } from "@ark-ui/solid/pagination"
import { type ComponentProps, createMemo, createSignal, For, splitProps } from "solid-js"
import { cn } from "@/lib/utils"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-solidjs"

export interface PaginationProps extends ComponentProps<"div"> {
  page: number
  totalPages: number
  pageSize?: number
  pageSizeOptions?: number[]
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

const Pagination = (props: PaginationProps) => {
  const [local, rest] = splitProps(props, [
    "class",
    "page",
    "totalPages",
    "pageSize",
    "pageSizeOptions",
    "onPageChange",
    "onPageSizeChange",
  ])

  const pageSize = () => local.pageSize ?? 10
  const pageSizeOptions = () => local.pageSizeOptions ?? [10, 25, 50, 100]

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= local.totalPages) {
      local.onPageChange(newPage)
    }
  }

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = []
    const total = local.totalPages
    const current = local.page
    const siblingCount = 2

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (current > siblingCount + 2) {
        pages.push("ellipsis")
      }

      const start = Math.max(2, current - siblingCount)
      const end = Math.min(total - 1, current + siblingCount)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (current < total - siblingCount - 1) {
        pages.push("ellipsis")
      }

      pages.push(total)
    }

    return pages
  }

  return (
    <div class={cn("flex flex-col items-center gap-2 sm:flex-row sm:gap-4", local.class)} {...rest}>
      {local.onPageSizeChange && (
        <div class="flex items-center gap-2">
          <span class="text-sm text-muted-foreground">Rows per page:</span>
          <select
            value={pageSize()}
            onChange={(e) => local.onPageSizeChange?.(Number(e.target.value))}
            class="h-8 rounded-md border border-input bg-background px-2 text-sm"
          >
            <For each={pageSizeOptions()}>
              {(size) => <option value={size}>{size}</option>}
            </For>
          </select>
        </div>
      )}

      <div class="flex items-center gap-1">
        <button
          type="button"
          onClick={() => handlePageChange(1)}
          disabled={local.page <= 1}
          class={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
          )}
        >
          <IconChevronLeft size={16} />
        </button>

        <For each={getPageNumbers()}>
          {(page) =>
            page === "ellipsis" ? <span class="flex h-8 w-8 items-center justify-center">...</span> : (
              <button
                type="button"
                onClick={() => handlePageChange(page)}
                class={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  page === local.page &&
                    "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
                )}
              >
                {page}
              </button>
            )}
        </For>

        <button
          type="button"
          onClick={() => handlePageChange(local.totalPages)}
          disabled={local.page >= local.totalPages}
          class={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
          )}
        >
          <IconChevronRight size={16} />
        </button>
      </div>

      <span class="text-sm text-muted-foreground">
        Page {local.page} of {local.totalPages}
      </span>
    </div>
  )
}

export { Pagination }
