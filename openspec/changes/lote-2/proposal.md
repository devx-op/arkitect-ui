# Proposal: Lote 2 - Arkitect UI Components

## Intent

Implement the remaining 10 UI components for Arkitect UI following the same hybrid approach established in Lote 1. These components complete the core component library, providing alert-dialog, avatar, collapsible, combobox, empty, float, sheet, sidebar, skeleton, and sonner components for React and Solid.

## Scope

### In Scope

- **alert-dialog**: Modal dialog for alerts/confirmation actions
- **avatar**: User avatar display with image and fallback support
- **collapsible**: Expandable/collapsible content container
- **combobox**: Select dropdown with search/filter capabilities
- **empty**: Empty state placeholder component
- **float**: Floating positioning helper (popover, tooltip base)
- **sheet**: Slide-out panel/drawer component
- **sidebar**: Collapsible navigation sidebar
- **skeleton**: Loading placeholder component
- **sonner**: Toast notification system

For each component:

- React implementation (hybrid: Shadcn API + Ark UI internals)
- Solid implementation (same hybrid approach)
- Stories for each framework
- MDX documentation for each
- Export updates in index files
- Registry updates
- Sidebar navigation updates

### Out of Scope

- Any new component patterns beyond the 10 listed
- Example app integrations beyond stories
- E2E tests (covered by existing test infrastructure)

## Approach

Follow the exact pattern from Lote 1:

1. **Hybrid Architecture**: Use Ark UI primitives internally for headless functionality, expose Shadcn-compatible API externally
2. **Dual Framework**: Create parallel implementations for React (`packages/react/`) and Solid (`packages/solid/`)
3. **Component Structure**: Each component gets its own directory with proper exports
4. **Stories**: Use Storybook with "Default" story for ComponentPreview compatibility
5. **Documentation**: Create MDX docs following the established template
6. **Registry**: Add to component registry for CLI consumption
7. **Sidebar**: Update navigation to include new components

### Lote 1 Learnings Applied

- Always include "Default" story for ComponentPreview compatibility
- Keep story structure simple (avoid complex compositions)
- Always create MDX documentation for every component

## Affected Areas

| Area                       | Impact   | Description                      |
| -------------------------- | -------- | -------------------------------- |
| `packages/react/`          | Modified | Add 10 new component directories |
| `packages/solid/`          | Modified | Add 10 new component directories |
| `packages/shared/`         | Modified | Any shared utilities if needed   |
| `apps/docs/`               | Modified | Add MDX docs for 10 components   |
| `apps/docs/..sidebar*.ts`  | Modified | Update navigation                |
| `packages/monorepo-tools/` | Modified | Registry updates                 |

## Risks

| Risk                    | Likelihood | Mitigation                       |
| ----------------------- | ---------- | -------------------------------- |
| Ark UI API changes      | Low        | Use stable APIs; test early      |
| Storybook compatibility | Low        | Follow "Default" story pattern   |
| MDX build failures      | Low        | Follow established doc templates |

## Rollback Plan

Each component is independent - if issues arise:

1. Remove the component directory from both react and solid packages
2. Remove exports from index files
3. Remove MDX docs
4. Remove from registry
5. Remove from sidebar navigation

Git commits provide atomic rollback capability.

## Dependencies

- Ark UI v4.x (`@ark-ui/react`, `@ark-ui/solid`)
- Shadcn UI patterns (existing in codebase)
- Existing Lote 1 infrastructure (stories, docs, registry)

## Success Criteria

- [ ] All 10 components implemented for React
- [ ] All 10 components implemented for Solid
- [ ] All 20 stories created (10 React + 10 Solid)
- [ ] All 10 MDX docs created
- [ ] Exports updated in all index files
- [ ] Registry includes all 10 components
- [ ] Sidebar navigation shows all 10 components
- [ ] Build passes for all packages
- [ ] No TypeScript errors
