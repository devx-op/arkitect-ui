import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

type FilterConfig = {
  id: string
  type: "text" | "select" | "date"
  label: string
  placeholder?: string
  options?: { label: string; value: string }[]
}

export interface DataTableFiltersProps extends HTMLAttributes<HTMLDivElement> {
  filters?: FilterConfig[]
  values?: Record<string, any>
  onFilterChange?: (values: Record<string, any>) => void
}

const DataTableFilters = forwardRef<HTMLDivElement, DataTableFiltersProps>(
  ({ className, filters = [], values = {}, onFilterChange, ...props }, ref) => {
    const handleValueChange = (filterId: string, value: string) => {
      const newValues = { ...values, [filterId]: value }
      onFilterChange?.(newValues)
    }

    return (
      <div ref={ref} className={cn("flex flex-wrap items-center gap-4", className)} {...props}>
        {filters.map((filter) => (
          <div key={filter.id} className="flex flex-col gap-1">
            <label className="text-sm font-medium text-muted-foreground">{filter.label}</label>
            {filter.type === "text" && (
              <Input
                placeholder={filter.placeholder}
                value={(values as Record<string, string>)[filter.id] || ""}
                onChange={(e) => handleValueChange(filter.id, e.target.value)}
                className="w-[200px]"
              />
            )}
            {filter.type === "select" && (
              <select
                value={(values as Record<string, string>)[filter.id] || ""}
                onChange={(e) => handleValueChange(filter.id, e.target.value)}
                className="h-10 w-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">{filter.placeholder || "Select..."}</option>
                {filter.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
        {filters.length > 0 && Object.keys(values).length > 0 && (
          <button
            type="button"
            onClick={() => onFilterChange?.({})}
            className="mt-auto text-sm text-muted-foreground hover:text-foreground"
          >
            Clear filters
          </button>
        )}
      </div>
    )
  },
)
DataTableFilters.displayName = "DataTableFilters"

export { DataTableFilters }
export type { FilterConfig as FilterConfigType }
