import { Pagination as PaginationPrimitive } from "@ark-ui/react/pagination"
import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"

export interface PaginationProps extends Omit<HTMLAttributes<HTMLDivElement>, "onPageChange"> {
  page: number
  totalPages: number
  pageSize?: number
  pageSizeOptions?: number[]
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      page,
      totalPages,
      pageSize = 10,
      pageSizeOptions = [10, 25, 50, 100],
      onPageChange,
      onPageSizeChange,
      ...props
    },
    ref,
  ) => {
    const count = totalPages

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center gap-2 sm:flex-row sm:gap-4", className)}
        {...props}
      >
        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-8 rounded-md border border-input bg-background px-2 text-sm"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
        <PaginationPrimitive.Root
          count={count}
          page={page}
          onPageChange={(details) => onPageChange(details.page)}
          className="flex items-center gap-1"
        >
          <PaginationPrimitive.PrevTrigger
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
            )}
          >
            <IconChevronLeft size={16} />
            <span className="sr-only">Previous page</span>
          </PaginationPrimitive.PrevTrigger>

          <PaginationPrimitive.Context>
            {(pagination) =>
              pagination.pages.map((pageItem, index) =>
                pageItem.type === "page" ?
                  (
                    <PaginationPrimitive.Item
                      key={index}
                      {...pageItem}
                      className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        pageItem.value === pagination.page &&
                          "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
                      )}
                    >
                      {pageItem.value}
                    </PaginationPrimitive.Item>
                  ) :
                  (
                    <PaginationPrimitive.Ellipsis
                      key={`ellipsis-${index}`}
                      index={index}
                      className="flex h-8 w-8 items-center justify-center"
                    >
                      ...
                    </PaginationPrimitive.Ellipsis>
                  )
              )}
          </PaginationPrimitive.Context>

          <PaginationPrimitive.NextTrigger
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
            )}
          >
            <IconChevronRight size={16} />
            <span className="sr-only">Next page</span>
          </PaginationPrimitive.NextTrigger>
        </PaginationPrimitive.Root>

        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>
      </div>
    )
  },
)

Pagination.displayName = "Pagination"

export { Pagination }
