import { forwardRef, type HTMLAttributes, useEffect, useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { cn } from "@/lib/utils"
import { IconChevronDown, IconChevronUp, IconSelector } from "@tabler/icons-react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./table"

export interface DataTableColumn<T> {
  id?: string
  accessorKey?: keyof T
  header?: string | React.ReactNode
  cell?: (info: { row: T; getValue: () => unknown }) => React.ReactNode
  accessorFn?: (row: T) => unknown
  enableSorting?: boolean
}

export interface DataTableProps<T> extends HTMLAttributes<HTMLDivElement> {
  columns: DataTableColumn<T>[]
  data: T[]
  caption?: string
  emptyMessage?: string
  enableSelection?: boolean
  pageSize?: number
  initialSorting?: SortingState
  onRowSelectionChange?: (selection: RowSelectionState) => void
  getRowId?: (row: T) => string
}

// SSR guard hook - returns false on server, true on client
function useHydrated() {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return hydrated
}

// Main DataTable component with SSR support
const DataTable = forwardRef(function DataTable<T extends object>(
  {
    className,
    columns,
    data,
    caption,
    emptyMessage = "No data available",
    enableSelection = false,
    pageSize = 10,
    initialSorting = [],
    onRowSelectionChange,
    getRowId,
    ...props
  }: DataTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const isHydrated = useHydrated()

  // SSR: Show loading state until hydrated
  if (!isHydrated) {
    return (
      <div className={cn("w-full space-y-4", className)}>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loading...</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="h-24 text-center text-muted-foreground">
                  Loading table...
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  const [sorting, setSorting] = useState<SortingState>(initialSorting)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const handleSort = (getToggleSortingHandler: () => () => void) => {
    const handler = getToggleSortingHandler()
    if (handler) handler()
  }

  const columnDefs = columns.map((col, index) => {
    const colId = col.id ?? (col.accessorKey ? String(col.accessorKey) : `col_${index}`)

    return {
      ...col,
      id: colId,
      header: (
        { column }: {
          column: {
            getCanSort: () => boolean
            getIsSorted: () => "asc" | "desc" | false
            getToggleSortingHandler: () => () => void
          }
        },
      ) => {
        const canSort = col.enableSorting !== false && column.getCanSort()
        const isSorted = column.getIsSorted()
        return (
          <button
            className={cn(
              "flex items-center gap-1 hover:text-foreground",
              !canSort && "cursor-default",
            )}
            onClick={() => canSort && handleSort(column.getToggleSortingHandler)}
            disabled={!canSort}
          >
            <span>{col.header}</span>
            {col.enableSorting !== false && canSort && (
              <span className="ml-1 h-3 w-3">
                {isSorted === "asc" ?
                  <IconChevronUp className="h-3 w-3" /> :
                  isSorted === "desc" ?
                  <IconChevronDown className="h-3 w-3" /> :
                  <IconSelector className="h-3 w-3 opacity-50" />}
              </span>
            )}
          </button>
        )
      },
      cell: col.cell
        ? ({ getValue, row }: { getValue: () => unknown; row: { original: T } }) =>
          col.cell!({
            row: row.original as T,
            getValue,
          })
        : undefined,
    }
  })

  const tableOptions = {
    data,
    columns: columnDefs as any,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: enableSelection,
    onRowSelectionChange: (updater: any) => {
      const newSelection = typeof updater === "function" ? updater(rowSelection) : updater
      setRowSelection(newSelection)
      onRowSelectionChange?.(newSelection)
    },
    onSortingChange: (updater: any) => {
      const newSorting = typeof updater === "function" ? updater(sorting) : updater
      setSorting(newSorting)
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  }

  if (getRowId) {
    ;(tableOptions as any).getRowId = (row: T, index: number, parent?: any) => getRowId(row)
  }

  const table = useReactTable(tableOptions as any)

  const selectedRows = Object.keys(rowSelection).length
  const totalColumns = columns.length + (enableSelection ? 1 : 0)

  return (
    <div ref={ref} className={cn("w-full space-y-4", className)} {...props}>
      <div className="rounded-md border">
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  if (header.id === "select") {
                    return (
                      <TableHead
                        key={header.id}
                        style={{ width: 40 }}
                      >
                        <input
                          type="checkbox"
                          checked={table.getIsAllPageRowsSelected()}
                          onChange={table.getToggleAllPageRowsSelectedHandler()}
                          className="h-4 w-4 rounded border-gray-300"
                          aria-label="Select all"
                        />
                      </TableHead>
                    )
                  }
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length === 0 ?
              (
                <TableRow>
                  <TableCell colSpan={totalColumns} className="h-24 text-center">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) :
              (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const colDef = cell.column.columnDef as any
                      if (colDef.id === "select") {
                        return (
                          <TableCell key={cell.id}>
                            <input
                              type="checkbox"
                              checked={row.getIsSelected()}
                              onChange={row.getToggleSelectedHandler()}
                              className="h-4 w-4 rounded border-gray-300"
                              aria-label="Select row"
                            />
                          </TableCell>
                        )
                      }
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          {enableSelection && selectedRows > 0 && (
            <span className="mr-4">
              {selectedRows} of {table.getFilteredRowModel().rows.length} row(s) selected
            </span>
          )}
          Showing{" "}
          <strong>
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
          </strong>{" "}
          to{" "}
          <strong>
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length,
            )}
          </strong>{" "}
          of <strong>{table.getFilteredRowModel().rows.length}</strong> results
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="h-8 w-8 p-0 inline-flex items-center justify-center rounded border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="First page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 17l-5-5 5-5" />
              <path d="M18 17l-5-5 5-5" />
            </svg>
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 w-8 p-0 inline-flex items-center justify-center rounded border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <IconChevronDown className="h-4 w-4 rotate-90" />
          </button>
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-8 w-8 p-0 inline-flex items-center justify-center rounded border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <IconChevronDown className="h-4 w-4 -rotate-90" />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="h-8 w-8 p-0 inline-flex items-center justify-center rounded border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Last page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 17l5-5-5-5" />
              <path d="M6 17l5-5-5-5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}) as <T>(
  props: DataTableProps<T> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement | null

export { DataTable }
