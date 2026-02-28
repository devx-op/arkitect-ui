import { type ComponentProps, createSignal, For, Show, splitProps } from "solid-js"
import {
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/solid-table"
import { cn } from "@/lib/utils"
import { IconChevronDown, IconChevronUp, IconSelector } from "@tabler/icons-solidjs"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./table"

export interface DataTableColumn<T> {
  id?: string
  accessorKey?: keyof T
  header?: string
  cell?: (info: { row: T; getValue: () => unknown }) => unknown
  accessorFn?: (row: T) => unknown
  enableSorting?: boolean
}

export interface DataTableProps<T> extends ComponentProps<"div"> {
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

function DataTable<T>(props: DataTableProps<T>) {
  const [local, rest] = splitProps(props, [
    "class",
    "columns",
    "data",
    "caption",
    "emptyMessage",
    "enableSelection",
    "pageSize",
    "initialSorting",
    "onRowSelectionChange",
    "getRowId",
  ])

  const [sorting, setSorting] = createSignal<SortingState>(local.initialSorting ?? [])
  const [rowSelection, setRowSelection] = createSignal<RowSelectionState>({})

  const handleSort = (getToggleSortingHandler: () => () => void) => {
    const handler = getToggleSortingHandler()
    if (handler) handler()
  }

  const columnDefs = () => {
    const cols = local.columns.map((col, index) => {
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
              class={cn(
                "flex items-center gap-1 hover:text-foreground",
                !canSort && "cursor-default",
              )}
              onClick={() => canSort && handleSort(column.getToggleSortingHandler)}
              disabled={!canSort}
            >
              <span>{col.header}</span>
              <Show when={col.enableSorting !== false && canSort}>
                <span class="ml-1 h-3 w-3">
                  <Show
                    when={isSorted === "asc"}
                    fallback={
                      <Show when={isSorted === "desc"} fallback={<IconSelector class="h-3 w-3 opacity-50" />}>
                        <IconChevronDown class="h-3 w-3" />
                      </Show>
                    }
                  >
                    <IconChevronUp class="h-3 w-3" />
                  </Show>
                </span>
              </Show>
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

    if (local.enableSelection) {
      return [
        {
          id: "select",
          header: (
            { table }: {
              table: { getIsAllPageRowsSelected: () => boolean; getToggleAllPageRowsSelectedHandler: () => () => void }
            },
          ) => (
            <input
              type="checkbox"
              checked={table.getIsAllPageRowsSelected()}
              onChange={table.getToggleAllPageRowsSelectedHandler()}
              class="h-4 w-4 rounded border-gray-300"
              aria-label="Select all"
            />
          ),
          cell: ({ row }: { row: { getIsSelected: () => boolean; getToggleSelectedHandler: () => () => void } }) => (
            <input
              type="checkbox"
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
              class="h-4 w-4 rounded border-gray-300"
              aria-label="Select row"
            />
          ),
          enableSorting: false,
          size: 40,
        },
        ...cols,
      ] as any
    }

    return cols as any
  }

  const tableOptions = {
    get data() {
      return local.data as T[]
    },
    get columns() {
      return columnDefs()
    },
    get state() {
      return {
        sorting: sorting(),
        rowSelection: rowSelection(),
      }
    },
    enableRowSelection: local.enableSelection ?? false,
    onRowSelectionChange: (updater: any) => {
      const newSelection = typeof updater === "function" ? updater(rowSelection()) : updater
      setRowSelection(newSelection)
      local.onRowSelectionChange?.(newSelection)
    },
    onSortingChange: (updater: any) => {
      const newSorting = typeof updater === "function" ? updater(sorting()) : updater
      setSorting(newSorting)
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: local.pageSize ?? 10,
      },
    },
  }

  if (local.getRowId) {
    ;(tableOptions as any).getRowId = (row: T, index: number, parent?: any) => local.getRowId!(row)
  }

  const table = createSolidTable(tableOptions as any)

  const selectedRows = () => Object.keys(rowSelection()).length
  const totalColumns = () => local.columns.length + (local.enableSelection ? 1 : 0)
  const pageIndex = () => table.getState().pagination.pageIndex
  const pageSize = () => table.getState().pagination.pageSize
  const filteredRows = () => table.getFilteredRowModel().rows.length
  const pageCount = () => table.getPageCount()

  const showingStart = () => pageIndex() * pageSize() + 1
  const showingEnd = () => Math.min((pageIndex() + 1) * pageSize(), filteredRows())

  return (
    <div class={cn("w-full space-y-4", local.class)} {...rest}>
      <div class="rounded-md border">
        <Table>
          {local.caption && <TableCaption>{local.caption}</TableCaption>}
          <TableHeader>
            <For each={table.getHeaderGroups()}>
              {(headerGroup) => (
                <TableRow>
                  <For each={headerGroup.headers}>
                    {(header) => {
                      if (header.id === "select") {
                        return (
                          <TableHead>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        )
                      }
                      return (
                        <TableHead>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    }}
                  </For>
                </TableRow>
              )}
            </For>
          </TableHeader>
          <TableBody>
            <Show
              when={table.getRowModel().rows?.length > 0}
              fallback={
                <TableRow>
                  <TableCell colSpan={totalColumns()} class="h-24 text-center">
                    {local.emptyMessage ?? "No data available"}
                  </TableCell>
                </TableRow>
              }
            >
              <For each={table.getRowModel().rows}>
                {(row) => (
                  <TableRow data-state={row.getIsSelected() ? "selected" : undefined}>
                    <For each={row.getVisibleCells()}>
                      {(cell) => (
                        <TableCell>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )}
                    </For>
                  </TableRow>
                )}
              </For>
            </Show>
          </TableBody>
        </Table>
      </div>

      <div class="flex items-center justify-between px-2">
        <div class="text-sm text-muted-foreground">
          <Show when={local.enableSelection && selectedRows() > 0}>
            <span class="mr-4">
              {selectedRows()} of {filteredRows()} row(s) selected
            </span>
          </Show>
          Showing <strong>{showingStart()}</strong> to <strong>{showingEnd()}</strong> of{" "}
          <strong>{filteredRows()}</strong> results
        </div>

        <div class="flex items-center space-x-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            class="h-8 w-8 p-0 inline-flex items-center justify-center rounded border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="First page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M11 17l-5-5 5-5" />
              <path d="M18 17l-5-5 5-5" />
            </svg>
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            class="h-8 w-8 p-0 inline-flex items-center justify-center rounded border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <IconChevronDown class="h-4 w-4 rotate-90" />
          </button>
          <span class="text-sm">
            Page {pageIndex() + 1} of {pageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            class="h-8 w-8 p-0 inline-flex items-center justify-center rounded border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <IconChevronDown class="h-4 w-4 -rotate-90" />
          </button>
          <button
            onClick={() => table.setPageIndex(pageCount() - 1)}
            disabled={!table.getCanNextPage()}
            class="h-8 w-8 p-0 inline-flex items-center justify-center rounded border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Last page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M13 17l5-5-5-5" />
              <path d="M6 17l5-5-5-5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export { DataTable }
