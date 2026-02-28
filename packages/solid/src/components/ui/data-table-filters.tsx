import { type ComponentProps, For, splitProps } from "solid-js"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

type FilterConfig = {
  id: string
  type: "text" | "select" | "date"
  label: string
  placeholder?: string
  options?: { label: string; value: string }[]
}

interface DataTableFiltersProps extends ComponentProps<"div"> {
  filters?: FilterConfig[]
  values?: Record<string, any>
  onFilterChange?: (values: Record<string, any>) => void
}

const DataTableFilters = (props: DataTableFiltersProps) => {
  const [local, rest] = splitProps(props, ["class", "filters", "values", "onFilterChange"])
  const filters = () => local.filters ?? []
  const values = () => local.values ?? {}

  const handleValueChange = (filterId: string, value: string) => {
    const newValues = { ...values(), [filterId]: value }
    local.onFilterChange?.(newValues)
  }

  return (
    <div class={cn("flex flex-wrap items-center gap-4", local.class)} {...rest}>
      <For each={filters()}>
        {(filter) => (
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-muted-foreground">{filter.label}</label>
            {filter.type === "text" && (
              <Input
                placeholder={filter.placeholder}
                value={(values() as Record<string, string>)[filter.id] || ""}
                onInput={(e) => handleValueChange(filter.id, e.currentTarget.value)}
                class="w-[200px]"
              />
            )}
            {filter.type === "select" && (
              <select
                value={(values() as Record<string, string>)[filter.id] || ""}
                onChange={(e) => handleValueChange(filter.id, e.currentTarget.value)}
                class="h-10 w-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">{filter.placeholder || "Select..."}</option>
                <For each={filter.options}>
                  {(option) => <option value={option.value}>{option.label}</option>}
                </For>
              </select>
            )}
          </div>
        )}
      </For>
      {filters().length > 0 && Object.keys(values()).length > 0 && (
        <button
          type="button"
          onClick={() => local.onFilterChange?.({})}
          class="mt-auto text-sm text-muted-foreground hover:text-foreground"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}

export { DataTableFilters }
export type { FilterConfig as FilterConfigType }
