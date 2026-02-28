# Proposal: Lote 3 Parte 2 - Remaining Components

## Intent

Implement the remaining components from Lote 3 that were not covered in Lote 3 Parte 1. This includes exception components (center, grid-pattern, grid), simple components (chart, copy-id-button, infinite-slider, input-group, textarea, tooltip), and stack components (Stack, HStack, VStack).

## Scope

### In Scope

- **Exceptions (CSS-only)**: center, grid-pattern, grid - simple CSS positioning/background components
- **Simple components**: chart, copy-id-button, infinite-slider, input-group, textarea, tooltip
- **Stack components**: Stack, HStack, VStack - Flexbox wrapper components
- **React and Solid versions** for all 10 components
- **Storybook stories** with "Default" story for each component
- **MDX documentation** for both React and Solid
- **Exports, registry, and sidebar updates**

### Out of Scope

- TanStack Table integration (already done in Lote 3 Parte 1)
- Any backend functionality

## Approach

Following the established Arkitect UI patterns:

- Exceptions (center, grid, grid-pattern): Pure semantic HTML with Tailwind CSS classes, no Ark UI primitives needed
- Stack components: Custom implementation per user example - using Flexbox pattern
- Chart: Simple SVG-based implementation or placeholder for future chart library integration
- copy-id-button: Custom button with clipboard API integration
- infinite-slider: Custom CSS animation-based infinite scroll
- input-group: Wrapper component grouping multiple inputs
- textarea: Custom component using native textarea with CVA styling
- tooltip: Use @ark-ui/react and @ark-ui/solid Tooltip primitives

## Affected Areas

| Area                                             | Impact   | Description                  |
| ------------------------------------------------ | -------- | ---------------------------- |
| `packages/react/src/components/ui/`              | New      | 10 component files for React |
| `packages/solid/src/components/ui/`              | New      | 10 component files for Solid |
| `packages/react/src/components/ui/*.stories.tsx` | New      | Storybook stories for React  |
| `packages/solid/src/components/ui/*.stories.tsx` | New      | Storybook stories for Solid  |
| `packages/react/src/index.ts`                    | Modified | Export new components        |
| `packages/solid/src/index.ts`                    | Modified | Export new components        |
| `apps/docs/public/r/index.json`                  | Modified | Registry entries             |
| `apps/docs/src/content/docs/react/components/`   | New      | MDX docs for React           |
| `apps/docs/src/content/docs/solid/components/`   | New      | MDX docs for Solid           |
| `apps/docs/src/content/config.ts`                | Modified | Sidebar navigation           |

## Risks

| Risk                                 | Likelihood | Mitigation                             |
| ------------------------------------ | ---------- | -------------------------------------- |
| Chart library selection              | Medium     | Use simple SVG placeholder initially   |
| infinite-slider animation complexity | Low        | Use CSS transform with keyframes       |
| Tooltip positioning edge cases       | Low        | Leverage Ark UI's built-in positioning |

## Rollback Plan

Remove created component files and revert index.ts exports. No database or migration steps required.

## Dependencies

- @ark-ui/react and @ark-ui/solid (already installed)
- @tabler/icons-react (already installed)
- No new dependencies required

## Success Criteria

- [ ] All 10 components implemented for React and Solid (20 component files)
- [ ] All 20 story files with "Default" story
- [ ] All 20 MDX documentation files created
- [ ] TypeScript compiles without errors for both packages
- [ ] Storybook builds successfully with all new stories
- [ ] Registry and sidebar properly updated
