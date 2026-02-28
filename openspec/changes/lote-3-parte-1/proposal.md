# Proposal: Lote 3 Parte 1 - Complex DataTable Components

## Intent

Implement the first batch of complex DataTable components for Arkitect UI, providing a complete table system with pagination and filtering capabilities. These components will enable users to build data-driven interfaces with sorting, filtering, and pagination using TanStack Table combined with Ark UI primitives.

## Scope

### In Scope

- **table**: Basic table component (foundation for DataTable)
  - Table container, header, body, row, cell, and footer
  - Both React and Solid implementations
  - Stories for each framework
  - MDX documentation

- **pagination**: Pagination using Ark UI primitives
  - Page navigation with first/prev/next/last buttons
  - Page number display with ellipsis for large page counts
  - Items per page selector
  - Both React and Solid implementations using Ark UI Pagination
  - Stories for each framework
  - MDX documentation

- **data-table-filters**: Filter components for data tables
  - Filter input components
  - Filter dropdown/select components
  - Date range filter components (optional)
  - Both React and Solid implementations
  - Stories for each framework
  - MDX documentation

- **data-table**: Full data table using @tanstack/react-table and @tanstack/solid-table
  - Column sorting (click column headers)
  - Column visibility toggles
  - Row selection with checkboxes
  - Pagination integration
  - Filter integration
  - Configurable column definitions
  - Both React and Solid implementations
  - Stories for each framework
  - MDX documentation

For each component:

- React implementation (hybrid: Shadcn API + TanStack Table/Ark UI internals)
- Solid implementation (same hybrid approach)
- Stories with "Default" story for ComponentPreview compatibility
- MDX documentation for each framework
- Export updates in index files
- Registry updates
- Sidebar navigation updates

### Out of Scope

- Server-side pagination/filtering (future enhancement)
- Column resizing (future enhancement)
- Row expansion/collapsing (future enhancement)
- Virtual scrolling (future enhancement)
- Complex nested data handling

## Approach

Follow the exact pattern from Lote 1 and Lote 2:

1. **Hybrid Architecture**: Use TanStack Table internally for headless table logic, Ark UI primitives for pagination, expose Shadcn-compatible API externally
2. **Dual Framework**: Create parallel implementations for React (`packages/react/`) and Solid (`packages/solid/`)
3. **Component Structure**: Each component gets its own directory with proper exports
4. **Stories**: Use Storybook with "Default" story for ComponentPreview compatibility
5. **Documentation**: Create MDX docs following the established template
6. **Registry**: Add to component registry for CLI consumption
7. **Sidebar**: Update navigation to include new components

### Previous Learnings Applied

- Always have "Default" story
- Fix issues before proceeding
- ComponentPreview needs simple stories

## Affected Areas

| Area                       | Impact   | Description                       |
| -------------------------- | -------- | --------------------------------- |
| `packages/react/`          | Modified | Add 4 new component directories   |
| `packages/solid/`          | Modified | Add 4 new component directories   |
| `packages/shared/`         | Modified | Shared utilities if needed        |
| `apps/docs/`               | Modified | Add MDX docs for 4 components × 2 |
| `apps/docs/sidebar*.ts`    | Modified | Update navigation                 |
| `packages/monorepo-tools/` | Modified | Registry updates                  |

## Risks

| Risk                        | Likelihood | Mitigation                                  |
| --------------------------- | ---------- | ------------------------------------------- |
| TanStack Table API changes  | Low        | Use stable v8 API                           |
| Storybook compatibility     | Low        | Follow "Default" story pattern              |
| MDX build failures          | Low        | Follow established doc templates            |
| React/Solid API differences | Medium     | Create shared utilities for common patterns |

## Rollback Plan

Each component is independent - if issues arise:

1. Remove the component directory from both react and solid packages
2. Remove exports from index files
3. Remove MDX docs
4. Remove from registry
5. Remove from sidebar navigation

Git commits provide atomic rollback capability.

## Dependencies

- TanStack Table v8 (`@tanstack/react-table`, `@tanstack/solid-table`)
- Ark UI v4.x (`@ark-ui/react`, `@ark-ui/solid`) for Pagination
- Shadcn UI patterns (existing in codebase)
- Existing Lote 1/Lote 2 infrastructure (stories, docs, registry)

## Success Criteria

- [ ] Table component implemented for React
- [ ] Table component implemented for Solid
- [ ] Pagination component implemented for React
- [ ] Pagination component implemented for Solid
- [ ] Data-table-filters component implemented for React
- [ ] Data-table-filters component implemented for Solid
- [ ] Data-table component implemented for React
- [ ] Data-table component implemented for Solid
- [ ] All 8+ stories created
- [ ] All MDX docs created (both frameworks)
- [ ] Exports updated in all index files
- [ ] Registry includes all 4 components
- [ ] Sidebar navigation shows all 4 components
- [ ] Build passes for all packages
- [ ] No TypeScript errors
