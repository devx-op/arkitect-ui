# Tasks: Marquee Refactoring to Ark UI Primitives

## Phase 1: CSS Infrastructure

- [x] 1.1 Add `@keyframes marquee-x` and `@keyframes marquee-y` to `packages/shared/src/styles/global.css` for horizontal and vertical animations
- [x] 1.2 Add CSS custom properties for marquee animation timing in the same file

## Phase 2: React Component Refactoring

- [x] 2.1 Import `Marquee` from `@ark-ui/react/marquee` in `packages/react/src/components/ui/marquee.tsx`
- [x] 2.2 Refactor `MarqueeProps` to use Ark UI's `Marquee.RootProps`, `Marquee.ViewportProps`, `Marquee.ItemProps` types
- [x] 2.3 Update component to use `Marquee.Root`, `Marquee.Viewport`, `Marquee.Item` components
- [x] 2.4 Map `speed` prop to Ark UI's `autoFill` and calculate duration from speed
- [x] 2.5 Map `direction` prop to Ark UI's `direction` prop ("forward" | "reverse")
- [x] 2.6 Remove the runtime CSS injection (the `if (typeof document !== "undefined")` block)
- [x] 2.7 Add proper SSR handling for keyframes (import CSS at build time)

## Phase 3: Solid Component Refactoring

- [x] 3.1 Import `Marquee` from `@ark-ui/solid/marquee` in `packages/solid/src/components/ui/marquee.tsx`
- [x] 3.2 Refactor `MarqueeProps` to use Solid's component props pattern
- [x] 3.3 Update component to use `Marquee.Root`, `Marquee.Viewport`, `Marquee.Item` components
- [x] 3.4 Map `speed` prop to Ark UI's `autoFill` and calculate duration from speed
- [x] 3.5 Map `direction` prop to Ark UI's `direction` prop ("forward" | "reverse")
- [x] 3.6 Remove the runtime CSS injection block (if present in Solid version)

## Phase 4: Testing & Verification

- [x] 4.1 Run `nx run react:typecheck` - Verify React types compile without errors
- [x] 4.2 Run `nx run solid:typecheck` - Verify Solid types compile without errors
- [x] 4.3 Run `nx run react:build` - Verify React build passes
- [x] 4.4 Run `nx run solid:build` - Verify Solid build passes
- [ ] 4.5 Test React Marquee with `speed=50` and default direction in Storybook
- [ ] 4.6 Test React Marquee with `speed=25` to verify faster animation
- [ ] 4.7 Test React Marquee with `direction="right"` to verify reverse scrolling
- [ ] 4.8 Test Solid Marquee with same props to ensure consistent behavior

## Phase 5: Cleanup

- [x] 5.1 Verify no runtime CSS injection remains in either component
- [x] 5.2 Ensure keyframes are loaded from global.css on both client and server
- [ ] 5.3 Update documentation if API changed (breaking changes)
