# Design: Lote 3 Parte 1 - DataTable Components

## Technical Approach

Implement four components (table, pagination, data-table-filters, data-table) following the established hybrid pattern:

- **React**: Uses TanStack Table v8 + Ark UI primitives + Shadcn UI API
- **Solid**: Uses TanStack Solid Table + Ark UI primitives + Shadcn UI API
- Both frameworks share the same CSS class patterns from Shadcn UI

## Architecture Decisions

### Decision: Table Component Structure

**Choice**: Pure semantic HTML table structure with Shadcn-compatible CSS classes
**Alternatives considered**: Using Ark UI primitives for table
**Rationale**: Table is a semantic HTML element, no need for Ark UI headless component. Shadcn UI pattern uses pure CSS for styling.

### Decision: Pagination Using Ark UI

**Choice**: Use @ark-ui/react/pagination and @ark-ui/solid/pagination
**Alternatives considered**: Custom pagination implementation
**Rationale**: Ark UI provides a robust, accessible pagination primitive that handles edge cases (ellipsis, first/last, disabled states). Already used in the codebase for other components.

### Decision: DataTable Using TanStack Table

**Choice**: @tanstack/react-table v8 for React, @tanstack/solid-table v8 for Solid
**Alternatives considered**: Building custom table logic, using AG Grid
**Rationale**: TanStack Table is the industry standard for headless table logic, provides sorting, filtering, pagination, selection APIs. Free and well-maintained.

### Decision: DataTableFilters as Separate Component

**Choice**: Separate DataTableFilters component from DataTable
**Alternatives considered**: Integrating filters directly into DataTable
**Rationale**: Separation of concerns - filters can be used independently, allows for more flexible filter UIs, keeps DataTable focused on data presentation.

## File Changes

### React Package

| File                                                              | Action | Description                                                                                      |
| ----------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `packages/react/src/components/ui/table.tsx`                      | Create | Table component with Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption |
| `packages/react/src/components/ui/table.stories.tsx`              | Create | Storybook stories with Default story                                                             |
| `packages/react/src/components/ui/pagination.tsx`                 | Create | Pagination component using Ark UI                                                                |
| `packages/react/src/components/ui/pagination.stories.tsx`         | Create | Storybook stories with Default story                                                             |
| `packages/react/src/components/ui/data-table-filters.tsx`         | Create | Filter components                                                                                |
| `packages/react/src/components/ui/data-table-filters.stories.tsx` | Create | Storybook stories with Default story                                                             |
| `packages/react/src/components/ui/data-table.tsx`                 | Create | Full DataTable using TanStack                                                                    |
| `packages/react/src/components/ui/data-table.stories.tsx`         | Create | Storybook stories with Default story                                                             |

### Solid Package

| File                                                              | Action | Description          |
| ----------------------------------------------------------------- | ------ | -------------------- |
| `packages/solid/src/components/ui/table.tsx`                      | Create | Table component      |
| `packages/solid/src/components/ui/table.stories.tsx`              | Create | Storybook stories    |
| `packages/solid/src/components/ui/pagination.tsx`                 | Create | Pagination component |
| `packages/solid/src/components/ui/pagination.stories.tsx`         | Create | Storybook stories    |
| `packages/solid/src/components/ui/data-table-filters.tsx`         | Create | Filter components    |
| `packages/solid/src/components/ui/data-table-filters.stories.tsx` | Create | Storybook stories    |
| `packages/solid/src/components/ui/data-table.tsx`                 | Create | DataTable component  |
| `packages/solid/src/components/ui/data-table.stories.tsx`         | Create | Storybook stories    |

### Documentation

| File                                                                 | Action | Description                    |
| -------------------------------------------------------------------- | ------ | ------------------------------ |
| `apps/docs/src/content/docs/react/components/table.mdx`              | Create | React table documentation      |
| `apps/docs/src/content/docs/solid/components/table.mdx`              | Create | Solid table documentation      |
| `apps/docs/src/content/docs/react/components/pagination.mdx`         | Create | React pagination documentation |
| `apps/docs/src/content/docs/solid/components/pagination.mdx`         | Create | Solid pagination documentation |
| `apps/docs/src/content/docs/react/components/data-table-filters.mdx` | Create | React filters documentation    |
| `apps/docs/src/content/docs/solid/components/data-table-filters.mdx` | Create | Solid filters documentation    |
| `apps/docs/src/content/docs/react/components/data-table.mdx`         | Create | React data-table documentation |
| `apps/docs/src/content/docs/solid/components/data-table.mdx`         | Create | Solid data-table documentation |

### Registry & Exports

| File                            | Action | Description                                                       |
| ------------------------------- | ------ | ----------------------------------------------------------------- |
| `packages/react/src/index.ts`   | Modify | Add exports for table, pagination, data-table-filters, data-table |
| `packages/solid/src/index.ts`   | Modify | Add exports for table, pagination, data-table-filters, data-table |
| `apps/docs/public/r/index.json` | Modify | Add registry entries for all 8 components (4 React + 4 Solid)     |

## Interfaces / Contracts

### Table Component API

```typescript
// React
export interface TableProps extends HTMLAttributes<HTMLTableElement> {}
export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}
export interface TableHeadProps extends HTMLAttributes<HTMLTableCellElement> {}
export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {}
export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {}
```

### Pagination Component API

```typescript
// React
export interface PaginationProps {
  page: number
  totalPages: number
  pageSize?: number
  pageSizeOptions?: number[]
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  className?: string
}
```

### DataTable Component API

```typescript
// React
import type { ColumnDef } from "@tanstack/react-table"

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  page?: number
  pageSize?: number
  totalRows?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  onSort?: (sorting: SortingState) => void
  onRowSelectionChange?: (selection: RowSelectionState) => void
  onFilteringChange?: (filters: ColumnFiltersState) => void
  enableRowSelection?: boolean
  enableColumnVisibility?: boolean
  enableSorting?: boolean
  enableFiltering?: boolean
  getRowId?: (row: TData) => string
  className?: string
}
```

### DataTableFilters Component API

```typescript
// React
interface FilterConfig {
  id: string
  type: "text" | "select" | "date"
  label: string
  placeholder?: string
  options?: { label: string; value: string }[]
}

export interface DataTableFiltersProps {
  filters?: FilterConfig[]
  values?: Record<string, any>
  onFilterChange?: (values: Record<string, any>) => void
  className?: string
}
```

## Implementation Patterns

### React Component Pattern (Standard)

```typescript
import { ark } from "@ark-ui/react/factory"
import { cva, type VariantProps } from "class-variance-authority"
import { type ComponentProps, forwardRef } from "react"
import { cn } from "@/lib/utils"

// For simple components - just semantic HTML with CSS
const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  ),
)
```

### Solid Component Pattern

```typescript
import { ark } from "@ark-ui/solid/factory"
import { type ComponentProps, splitProps } from "solid-js"

export const Table = (props: TableProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <table
      class={cn("w-full caption-bottom text-sm", local.class)}
      {...rest}
    />
  )
}
```

## Testing Strategy

| Layer       | What to Test        | Approach                                   |
| ----------- | ------------------- | ------------------------------------------ |
| Unit        | Component rendering | Storybook visual testing, verify structure |
| Integration | Props passing       | Story args testing                         |
| Type        | TypeScript types    | Build verification                         |

Since this is a UI component library:

- Focus on visual verification via Storybook
- Ensure TypeScript compiles without errors
- Verify all exports are accessible

## Migration / Rollback

No migration required - this is a new feature adding components.

If issues arise:

1. Remove component directories from both react and solid packages
2. Remove exports from index.ts files
3. Remove MDX documentation files
4. Remove registry entries
5. Git revert provides complete rollback

## Open Questions

- [x] Should DataTable support server-side pagination/filtering? -> Deferred to future (out of scope)
- [x] Should we use Tabler icons in pagination? -> Yes, consistent with other components
- [x] How to handle TanStack Table types for row selection? -> Use built-in enableRowSelection

## Dependencies

```json
{
  "@tanstack/react-table": "^8.x",
  "@tanstack/solid-table": "^8.x",
  "@ark-ui/react": "^4.x",
  "@ark-ui/solid": "^4.x"
}
```

The dependencies are already present in the project (used by other components). TanStack Table will need to be verified in package.json.
