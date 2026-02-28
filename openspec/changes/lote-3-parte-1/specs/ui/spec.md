# Delta for UI Components - Lote 3 Parte 1

## ADDED Requirements

### Requirement: Table Component

The Table component MUST function identically to Shadcn UI Table. It MUST provide semantic HTML table structure for data display.

#### Scenario: Basic table structure

- GIVEN a Table component containing TableHeader, TableBody, TableRow, TableHead, TableCell, and TableCaption
- WHEN rendered
- THEN it MUST display a semantic table with proper thead/tbody structure

#### Scenario: Table with caption

- GIVEN a Table with TableCaption containing "User List"
- WHEN rendered
- THEN it MUST display the caption above the table

#### Scenario: Table with custom className

- GIVEN a Table with className="custom-table"
- WHEN rendered
- THEN it MUST merge custom class with default table classes

#### Scenario: Table with styled headers

- GIVEN TableHead with className="bg-slate-100"
- WHEN rendered
- THEN it MUST apply custom styling to the header cells

#### Scenario: Table with data rows

- GIVEN TableBody with multiple TableRow components, each with TableCell
- WHEN rendered
- THEN it MUST display the data in rows

### Requirement: Pagination Component

The Pagination component MUST provide page navigation using Ark UI primitives. It MUST support first, previous, next, last page navigation and page number display.

#### Scenario: Pagination with default state

- GIVEN a Pagination component with default props
- WHEN rendered
- THEN it MUST display first, previous, page numbers, next, and last buttons

#### Scenario: Pagination with current page

- GIVEN a Pagination with page=3 and totalPages=10
- WHEN rendered
- THEN it MUST highlight page 3 as current

#### Scenario: Pagination clicking next page

- GIVEN a Pagination with page=1 and totalPages=10
- WHEN the user clicks the "next" button
- THEN it MUST call onPageChange with 2

#### Scenario: Pagination clicking previous page

- GIVEN a Pagination with page=5 and totalPages=10
- WHEN the user clicks the "previous" button
- THEN it MUST call onPageChange with 4

#### Scenario: Pagination clicking first page

- GIVEN a Pagination with page=5 and totalPages=10
- WHEN the user clicks the "first" button
- THEN it MUST call onPageChange with 1

#### Scenario: Pagination clicking last page

- GIVEN a Pagination with page=3 and totalPages=10
- WHEN the user clicks the "last" button
- THEN it MUST call onPageChange with 10

#### Scenario: Pagination with page size selector

- GIVEN a Pagination with pageSizeOptions={[10, 25, 50]} and pageSize={25}
- WHEN rendered
- THEN it MUST display a selector with the current page size

#### Scenario: Pagination changing page size

- GIVEN a Pagination with pageSizeOptions=[10, 25, 50] and pageSize=10
- WHEN the user selects 25 from the page size dropdown
- THEN it MUST call onPageSizeChange with 25

#### Scenario: Pagination showing ellipsis for many pages

- GIVEN a Pagination with page=5 and totalPages=100
- WHEN rendered
- THEN it MUST display ellipsis (...) to indicate more pages

#### Scenario: Pagination disabled at first page

- GIVEN a Pagination with page=1
- WHEN rendered
- THEN the "first" and "previous" buttons MUST be disabled

#### Scenario: Pagination disabled at last page

- GIVEN a Pagination with page=totalPages (last page)
- WHEN rendered
- THEN the "next" and "last" buttons MUST be disabled

#### Scenario: Pagination with custom className

- GIVEN a Pagination with className="custom-pagination"
- WHEN rendered
- THEN it MUST merge custom class with default pagination classes

### Requirement: DataTableFilters Component

The DataTableFilters component MUST provide filter controls for data tables. It MUST support text input filters, select filters, and date range filters.

#### Scenario: DataTableFilters with text input

- GIVEN a DataTableFilters component with a text filter configuration
- WHEN rendered
- THEN it MUST display an input field for text filtering

#### Scenario: DataTableFilters with select dropdown

- GIVEN a DataTableFilters with a select filter with options=["Active", "Inactive"]
- WHEN rendered
- THEN it MUST display a dropdown with the options

#### Scenario: DataTableFilters with onFilterChange

- GIVEN a DataTableFilters with onFilterChange handler
- WHEN the user enters filter values
- THEN it MUST call onFilterChange with the filter object

#### Scenario: DataTableFilters clearing filters

- GIVEN a DataTableFilters with active filters
- WHEN the user clicks clear all
- THEN it MUST reset all filters and call onFilterChange with empty object

#### Scenario: DataTableFilters with multiple filters

- GIVEN a DataTableFilters with filter configurations for name, status, and date
- WHEN rendered
- THEN it MUST display all filter controls

#### Scenario: DataTableFilters with custom className

- GIVEN a DataTableFilters with className="custom-filters"
- WHEN rendered
- THEN it MUST merge custom class with default filter classes

### Requirement: DataTable Component

The DataTable component MUST provide a complete data table using TanStack Table. It MUST support column sorting, row selection, pagination integration, and filter integration.

#### Scenario: DataTable with column definitions

- GIVEN a DataTable with columns array containing column definitions
- WHEN rendered
- THEN it MUST display columns based on the definitions

#### Scenario: DataTable with data

- GIVEN a DataTable with columns and data arrays
- WHEN rendered
- THEN it MUST display the data in table rows

#### Scenario: DataTable sorting by column

- GIVEN a DataTable with sortable columns
- WHEN the user clicks a column header
- THEN it MUST toggle sort direction (asc/desc/none)

#### Scenario: DataTable with multi-column sort

- GIVEN a DataTable with multiColumnSorting enabled
- WHEN the user Shift+clicks a second column header
- THEN it MUST sort by multiple columns

#### Scenario: DataTable with row selection

- GIVEN a DataTable with enableRowSelection={true}
- WHEN the user clicks a row checkbox
- THEN it MUST toggle row selection and update selection state

#### Scenario: DataTable with column visibility toggle

- GIVEN a DataTable with enableColumnVisibility={true}
- WHEN rendered
- THEN it MUST include a column visibility control

#### Scenario: DataTable pagination integration

- GIVEN a DataTable with pagination configuration
- WHEN rendered
- THEN it MUST display pagination controls

#### Scenario: DataTable filter integration

- GIVEN a DataTable with DataTableFilters connected
- WHEN the user applies filters
- THEN it MUST filter the displayed data

#### Scenario: DataTable with custom cell renderers

- GIVEN a DataTable column with a cell function
- WHEN the cell renders
- THEN it MUST use the custom cell renderer

#### Scenario: DataTable with empty state

- GIVEN a DataTable with empty data array
- WHEN rendered
- THEN it MUST display an empty state message

#### Scenario: DataTable with custom className

- GIVEN a DataTable with className="custom-data-table"
- WHEN rendered
- THEN it MUST merge custom class with default table classes

## API Compatibility Requirements

All components MUST maintain Shadcn UI API compatibility:

### Table API

| Prop      | Type   | Description            |
| --------- | ------ | ---------------------- |
| className | string | Additional CSS classes |

### Pagination API

| Prop             | Type                       | Default           | Description              |
| ---------------- | -------------------------- | ----------------- | ------------------------ |
| page             | number                     | 1                 | Current page             |
| totalPages       | number                     | -                 | Total number of pages    |
| pageSize         | number                     | 10                | Items per page           |
| pageSizeOptions  | number[]                   | [10, 25, 50, 100] | Available page sizes     |
| onPageChange     | (page: number) => void     | -                 | Page change handler      |
| onPageSizeChange | (pageSize: number) => void | -                 | Page size change handler |
| className        | string                     | -                 | Additional CSS classes   |

### DataTableFilters API

| Prop           | Type                                  | Default | Description            |
| -------------- | ------------------------------------- | ------- | ---------------------- |
| filters        | FilterConfig[]                        | []      | Filter configurations  |
| values         | Record<string, any>                   | {}      | Current filter values  |
| onFilterChange | (values: Record<string, any>) => void | -       | Filter change handler  |
| className      | string                                | -       | Additional CSS classes |

### DataTable API

| Prop                   | Type                                   | Default | Description                 |
| ---------------------- | -------------------------------------- | ------- | --------------------------- |
| columns                | ColumnDef[]                            | -       | Column definitions          |
| data                   | any[]                                  | -       | Data to display             |
| page                   | number                                 | 1       | Current page                |
| pageSize               | number                                 | 10      | Items per page              |
| totalRows              | number                                 | -       | Total rows (for pagination) |
| onPageChange           | (page: number) => void                 | -       | Page change handler         |
| onPageSizeChange       | (pageSize: number) => void             | -       | Page size change handler    |
| onSort                 | (sorting: SortingState) => void        | -       | Sort change handler         |
| onRowSelectionChange   | (selection: RowSelectionState) => void | -       | Row selection handler       |
| onFilteringChange      | (filters: ColumnFiltersState) => void  | -       | Filter change handler       |
| enableRowSelection     | boolean                                | false   | Enable row selection        |
| enableColumnVisibility | boolean                                | false   | Enable column visibility    |
| enableSorting          | boolean                                | true    | Enable column sorting       |
| enableFiltering        | boolean                                | false   | Enable column filtering     |
| getRowId               | (row: any) => string                   | -       | Custom row ID function      |
| className              | string                                 | -       | Additional CSS classes      |

### FilterConfig Type

```typescript
interface FilterConfig {
  id: string
  type: "text" | "select" | "date"
  label: string
  placeholder?: string
  options?: { label: string; value: string }[] // For select type
}
```

## Cross-Framework Requirements

Both React and Solid implementations MUST:

1. Export the same component APIs
2. Use identical prop names and types (within framework conventions)
3. Render visually identical output
4. Support the same variants, sizes, and states
5. Use the same CSS class patterns from Shadcn UI
6. Use TanStack Table v8 internally for table logic
7. Use Ark UI primitives for Pagination component
8. Use Tabler Icons instead of Lucide
9. Use the cn() utility for class merging

## Implementation Notes

### Table

- Pure CSS/HTML component structure, no Ark UI primitive needed
- Exports: Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption
- Uses semantic HTML table elements

### Pagination

- Uses @ark-ui/react/pagination (React) or @ark-ui/solid/pagination (Solid)
- Exports: Pagination, PaginationNext, PaginationPrev, PaginationFirst, PaginationLast, PaginationEllipsis, PaginationPage, PaginationPages
- Integrates with TanStack Table for pagination state

### DataTableFilters

- Composition component using existing UI components (Input, Select)
- Exports: DataTableFilters, FilterInput, FilterSelect
- Provides filter UI and callbacks for DataTable integration

### DataTable

- Uses @tanstack/react-table (React) or @tanstack/solid-table (Solid)
- Exports: DataTable, DataTableColumnDef
- Wraps TanStack Table with Shadcn-compatible API
- Integrates with Pagination and DataTableFilters components
