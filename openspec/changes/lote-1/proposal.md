# Proposal: Lote 1 - First Batch UI Components

## Intent

Implement the first batch (Lote 1) of UI components for Arkitect UI, consisting of 5 components: badge, card, checkbox, select, and separator. This expands the component library from 5 to 10 components, following the established pattern of using Shadcn UI API with Ark UI internally (Hybrid approach).

## Scope

### In Scope

- Implement 5 components for React package (badge, card, checkbox, select, separator)
- Implement 5 components for Solid package (badge, card, checkbox, select, separator)
- Create Storybook stories for all 10 components
- Create unit tests for all 10 components
- Create documentation MDX for React (5 files)
- Create documentation MDX for Solid (5 files)
- Update exports in index.ts and index.tsx
- Update registry.json (10 new entries)
- Update astro.config.ts sidebar (10 new items)
- Create local skill at ~/.opencode/skills/arkitect-component/SKILL.md

### Out of Scope

- Lote 2 and Lote 3 components (future work)
- E2E tests
- Performance benchmarks

## Approach

**Hybrid Approach**: Follow Shadcn UI API exactly as documented in `docs/componet-creation-guide.md` while using Ark UI primitives internally. This maintains:

- Familiar DX for shadcn users
- Complete compatibility with existing docs
- Clear migration path

Implementation order by complexity:

1. **separator** (simplest) - No Ark UI primitive needed, pure CSS
2. **badge** (simple CVA) - No Ark UI primitive needed, just CVA styling
3. **card** (simple composition) - No Ark UI primitive needed, semantic HTML wrapper
4. **checkbox** (Ark UI primitive) - Uses @ark-ui/react/checkbox
5. **select** (most complex) - Uses createListCollection from Ark UI

### Technical Details

- **badge**: CVA-based component with variants (default, secondary, destructive, outline)
- **card**: Composition of primitive HTML elements (header, title, description, content, footer)
- **checkbox**: Uses Ark UI Checkbox.Root with CVA for styling
- **select**: Uses Ark UI Select with createListCollection for complex data handling
- **separator**: Simple HTML hr with CVA styling variants (horizontal, vertical)

## Affected Areas

| Area                                                        | Impact   | Description                                               |
| ----------------------------------------------------------- | -------- | --------------------------------------------------------- |
| `packages/react/src/components/ui/badge.tsx`                | New      | React badge component                                     |
| `packages/react/src/components/ui/badge.stories.tsx`        | New      | React badge stories                                       |
| `packages/react/src/components/ui/card.tsx`                 | New      | React card component                                      |
| `packages/react/src/components/ui/card.stories.tsx`         | New      | React card stories                                        |
| `packages/react/src/components/ui/checkbox.tsx`             | New      | React checkbox component                                  |
| `packages/react/src/components/ui/checkbox.stories.tsx`     | New      | React checkbox stories                                    |
| `packages/react/src/components/ui/select.tsx`               | New      | React select component                                    |
| `packages/react/src/components/ui/select.stories.tsx`       | New      | React select stories                                      |
| `packages/react/src/components/ui/separator.tsx`            | New      | React separator component                                 |
| `packages/react/src/components/ui/separator.stories.tsx`    | New      | React separator stories                                   |
| `packages/solid/src/components/ui/badge.tsx`                | New      | Solid badge component                                     |
| `packages/solid/src/components/ui/badge.stories.tsx`        | New      | Solid badge stories                                       |
| `packages/solid/src/components/ui/card.tsx`                 | New      | Solid card component                                      |
| `packages/solid/src/components/ui/card.stories.tsx`         | New      | Solid card stories                                        |
| `packages/solid/src/components/ui/checkbox.tsx`             | New      | Solid checkbox component                                  |
| `packages/solid/src/components/ui/checkbox.stories.tsx`     | New      | Solid checkbox stories                                    |
| `packages/solid/src/components/ui/select.tsx`               | New      | Solid select component                                    |
| `packages/solid/src/components/ui/select.stories.tsx`       | New      | Solid select stories                                      |
| `packages/solid/src/components/ui/separator.tsx`            | New      | Solid separator component                                 |
| `packages/solid/src/components/ui/separator.stories.tsx`    | New      | Solid separator stories                                   |
| `packages/react/src/index.ts`                               | Modified | Add 5 exports (badge, card, checkbox, select, separator)  |
| `packages/solid/src/index.tsx`                              | Modified | Add 5 exports (badge, card, checkbox, select, separator)  |
| `registry.json`                                             | Modified | Add 10 entries (5 React + 5 Solid)                        |
| `apps/docs/astro.config.ts`                                 | Modified | Add sidebar items for 10 components                       |
| `apps/docs/src/content/docs/react/components/badge.mdx`     | New      | React badge documentation                                 |
| `apps/docs/src/content/docs/react/components/card.mdx`      | New      | React card documentation                                  |
| `apps/docs/src/content/docs/react/components/checkbox.mdx`  | New      | React checkbox documentation                              |
| `apps/docs/src/content/docs/react/components/select.mdx`    | New      | React select documentation                                |
| `apps/docs/src/content/docs/react/components/separator.mdx` | New      | React separator documentation                             |
| `apps/docs/src/content/docs/solid/components/badge.mdx`     | New      | Solid badge documentation                                 |
| `apps/docs/src/content/docs/solid/components/card.mdx`      | New      | Solid card documentation                                  |
| `apps/docs/src/content/docs/solid/components/checkbox.mdx`  | New      | Solid checkbox documentation                              |
| `apps/docs/src/content/docs/solid/components/select.mdx`    | New      | Solid select documentation                                |
| `apps/docs/src/content/docs/solid/components/separator.mdx` | New      | Solid separator documentation                             |
| `docs/componet-creation-guide.md`                           | Extended | Add examples for badge, card, checkbox, select, separator |
| `~/.opencode/skills/arkitect-component/SKILL.md`            | New      | Local skill for component creation                        |

## Risks

| Risk                                                 | Likelihood | Mitigation                                                                                       |
| ---------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------ |
| Select complexity with createListCollection          | Medium     | Use hybrid API pattern, support simple children too. Follow Ark UI Select documentation closely. |
| Storybook context errors with Ark UI checkbox/select | Low        | Follow documented workaround patterns from docs/componet-creation-guide.md                       |
| Checkbox indeterminate state handling                | Low        | Implement custom handler if needed, test with all states (checked, unchecked, indeterminate)     |
| Registry JSON validation                             | Low        | Validate JSON syntax before committing                                                           |
| Export conflicts with existing components            | None       | New components have unique names                                                                 |

## Rollback Plan

1. Revert exports in `packages/react/src/index.ts` - Remove badge, card, checkbox, select, separator lines
2. Revert exports in `packages/solid/src/index.tsx` - Remove badge, card, checkbox, select, separator lines
3. Delete all component files in `packages/react/src/components/ui/` for: badge, card, checkbox, select, separator
4. Delete all component files in `packages/solid/src/components/ui/` for: badge, card, checkbox, select, separator
5. Delete all story files for the 5 components in both packages
6. Remove 10 entries from registry.json
7. Remove sidebar items from apps/docs/astro.config.ts
8. Delete 10 documentation MDX files in apps/docs/src/content/docs/react/components/ and apps/docs/src/content/docs/solid/components/
9. Delete ~/.opencode/skills/arkitect-component/SKILL.md

## Dependencies

- **@ark-ui/react** - Already installed, needed for checkbox and select
- **@ark-ui/solid** - Already installed, needed for checkbox and select
- **@tabler/icons-react** - Already installed, needed for select indicator
- **@tabler/icons-solidjs** - Already installed, needed for select indicator
- **class-variance-authority** - Already installed, used for CVA in all components

## Success Criteria

- [ ] All 10 components (5 React + 5 Solid) build successfully
- [ ] All 10 stories render correctly in Storybook
- [ ] TypeScript typecheck passes for all packages
- [ ] Lint passes with no new errors
- [ ] Unit tests pass (at least basic render tests for all 10 components)
- [ ] Documentation renders correctly in docs site
- [ ] Registry entries are valid JSON
- [ ] API compatibility with Shadcn UI maintained
- [ ] Local skill created at ~/.opencode/skills/arkitect-component/SKILL.md

## Local Skill Requirements

The skill at `~/.opencode/skills/arkitect-component/SKILL.md` should include:

1. Full component creation process (based on docs/componet-creation-guide.md)
2. Documentation pattern using ComponentPreview
3. Templates for React and Solid components
4. Checklist for exports, registry, sidebar updates
5. Examples from existing components (button, dialog)
6. Specific guidance for each of the 5 new components (badge, card, checkbox, select, separator)
