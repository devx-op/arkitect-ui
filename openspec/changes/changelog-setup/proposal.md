# Proposal: Changelog Setup

## Intent

Set up automated changesets versioning and starlight-changelogs documentation integration to track and display component additions. This will provide:

1. Automated version management for component releases
2. Changelog pages visible in documentation sidebar
3. Fixed Storybook ID format to avoid conflicts with hyphenated component names in MDX

## Scope

### In Scope

1. **Changeset Initialization**
   - Initialize changesets in the repository
   - Create initial changeset describing 30+ new components
   - Configure versioning (likely patch for new components)
   - Set up the commit message generation workflow

2. **Starlight Changelogs Configuration**
   - Update `src/content.config.ts` to add changelogs collection
   - Configure starlight-changelogs plugin in `astro.config.ts`
   - Set up sidebar entry for changelog page
   - Configure provider to track changesets

3. **Storybook SKILL.md Fix**
   - Update `.storybook/preview.ts` SKILL.md to include fixed ID format
   - Add `id: "react-ui-component-name"` to Meta for each story
   - This allows MDX to use hyphenated component names

### Out of Scope

- Publishing workflow automation (CI/CD for releases)
- GitHub release creation automation
- Migration of existing components to new format

## Approach

### Step 1: Initialize Changesets

Run `npx changesets init` to set up changesets configuration.

### Step 2: Create First Changeset

Create a changeset using `npx changeset` to describe all new components:

- Version: patch (0.0.1 since no breaking changes)
- Components: 30+ new UI components added

### Step 3: Configure Starlight Changelogs

1. Update `apps/docs/src/content.config.ts`:
   - Import `changelogsLoader` from starlight-changelogs
   - Add new `changelogs` collection with changeset provider
   - Point to the CHANGELOG.md that changesets generates

2. Update `apps/docs/astro.config.ts`:
   - Add starlight-changelogs plugin to plugins array
   - Configure sidebar with changelog link

### Step 4: Fix Storybook SKILL.md

Update `.storybook/preview.ts` SKILL.md pattern to use fixed IDs:

```typescript
const meta: Meta<typeof Component> = {
  title: "React/UI/ComponentName",
  component: Component,
  id: "react-ui-component-name", // Fixed ID for Storybook
}
```

### Decision: Local vs Deploy

**Recommendation: Run locally first**

- First changeset should be created and committed locally
- Verify changelog generation and docs integration work correctly
- Then push to trigger CI and deployment
- This allows fixing any issues before triggering deploy

## Affected Areas

| Area                              | Impact   | Description                     |
| --------------------------------- | -------- | ------------------------------- |
| `package.json`                    | Modified | Add @changesets/cli dependency  |
| `.changeset/`                     | New      | Changesets configuration        |
| `packages/react/CHANGELOG.md`     | New      | Generated changelog             |
| `packages/solid/CHANGELOG.md`     | New      | Generated changelog             |
| `apps/docs/src/content.config.ts` | Modified | Add changelogs collection       |
| `apps/docs/astro.config.ts`       | Modified | Add starlight-changelogs plugin |
| `.storybook/preview.ts`           | Modified | Fix ID format in SKILL.md       |

## Risks

| Risk                                | Likelihood | Mitigation                            |
| ----------------------------------- | ---------- | ------------------------------------- |
| Changeset version conflicts         | Low        | Use patch version for initial release |
| Changelog plugin integration issues | Medium     | Test locally before deploying         |
| Storybook ID conflicts              | Medium     | Use fixed ID format consistently      |

## Rollback Plan

1. Remove `@changesets/cli` from package.json
2. Remove `.changeset/` directory
3. Revert `content.config.ts` and `astro.config.ts` changes
4. Revert Storybook preview.ts changes

## Dependencies

- `@changesets/cli` package
- `starlight-changelogs` (already installed)
- Changesets generates CHANGELOG.md in package directories

## Success Criteria

- [ ] Changesets initialized and first changeset created
- [ ] Changelog page appears in docs sidebar
- [ ] Components listed in changelog
- [ ] Storybook stories use fixed ID format
- [ ] Local dev server shows changelog correctly
