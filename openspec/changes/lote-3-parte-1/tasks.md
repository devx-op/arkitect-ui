# Tasks: Lote 3 Parte 1 - DataTable Components

## Phase 1: Table Component (Foundation)

- [ ] 1.1 Create `packages/react/src/components/ui/table.tsx` - Table component with Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption exports
- [ ] 1.2 Create `packages/react/src/components/ui/table.stories.tsx` - Storybook stories with Default story for React
- [ ] 1.3 Create `packages/solid/src/components/ui/table.tsx` - Solid version of Table component
- [ ] 1.4 Create `packages/solid/src/components/ui/table.stories.tsx` - Storybook stories with Default story for Solid
- [ ] 1.5 Create `apps/docs/src/content/docs/react/components/table.mdx` - MDX documentation for React
- [ ] 1.6 Create `apps/docs/src/content/docs/solid/components/table.mdx` - MDX documentation for Solid

## Phase 2: Pagination Component

- [ ] 2.1 Create `packages/react/src/components/ui/pagination.tsx` - Pagination using @ark-ui/react/pagination
- [ ] 2.2 Create `packages/react/src/components/ui/pagination.stories.tsx` - Storybook stories with Default story for React
- [ ] 2.3 Create `packages/solid/src/components/ui/pagination.tsx` - Solid version using @ark-ui/solid/pagination
- [ ] 2.4 Create `packages/solid/src/components/ui/pagination.stories.tsx` - Storybook stories with Default story for Solid
- [ ] 2.5 Create `apps/docs/src/content/docs/react/components/pagination.mdx` - MDX documentation for React
- [ ] 2.6 Create `apps/docs/src/content/docs/solid/components/pagination.mdx` - MDX documentation for Solid

## Phase 3: DataTableFilters Component

- [ ] 3.1 Create `packages/react/src/components/ui/data-table-filters.tsx` - Filter components for React
- [ ] 3.2 Create `packages/react/src/components/ui/data-table-filters.stories.tsx` - Storybook stories with Default story for React
- [ ] 3.3 Create `packages/solid/src/components/ui/data-table-filters.tsx` - Filter components for Solid
- [ ] 3.4 Create `packages/solid/src/components/ui/data-table-filters.stories.tsx` - Storybook stories with Default story for Solid
- [ ] 3.5 Create `apps/docs/src/content/docs/react/components/data-table-filters.mdx` - MDX documentation for React
- [ ] 3.6 Create `apps/docs/src/content/docs/solid/components/data-table-filters.mdx` - MDX documentation for Solid

## Phase 4: DataTable Component

- [ ] 4.1 Create `packages/react/src/components/ui/data-table.tsx` - Full DataTable using @tanstack/react-table for React
- [ ] 4.2 Create `packages/react/src/components/ui/data-table.stories.tsx` - Storybook stories with Default story for React
- [ ] 4.3 Create `packages/solid/src/components/ui/data-table.tsx` - Full DataTable using @tanstack/solid-table for Solid
- [ ] 4.4 Create `packages/solid/src/components/ui/data-table.stories.tsx` - Storybook stories with Default story for Solid
- [ ] 4.5 Create `apps/docs/src/content/docs/react/components/data-table.mdx` - MDX documentation for React
- [ ] 4.6 Create `apps/docs/src/content/docs/solid/components/data-table.mdx` - MDX documentation for Solid

## Phase 5: Exports & Registry

- [ ] 5.1 Update `packages/react/src/index.ts` - Add exports for table, pagination, data-table-filters, data-table
- [ ] 5.2 Update `packages/solid/src/index.ts` - Add exports for table, pagination, data-table-filters, data-table
- [ ] 5.3 Update `apps/docs/public/r/index.json` - Add registry entries for all 8 components (4 React + 4 Solid)

## Phase 6: Verification

- [ ] 6.1 Run `nx run react:typecheck` - Verify React types compile without errors
- [ ] 6.2 Run `nx run solid:typecheck` - Verify Solid types compile without errors
- [ ] 6.3 Run `nx run react:build` - Verify React build passes
- [ ] 6.4 Run `nx run solid:build` - Verify Solid build passes
- [ ] 6.5 Verify all components have "Default" story in Storybook

---

## Implementation Notes

1. Table must come first as it's the foundation for DataTable
2. Pagination can be developed in parallel with Table (no dependencies)
3. DataTableFilters depends on Table and can use existing Input/Select components
4. DataTable depends on Table, Pagination, and DataTableFilters
5. All stories must have "Default" story for ComponentPreview compatibility in docs
6. Use existing component patterns from previous lotes (button, input, select, checkbox)
