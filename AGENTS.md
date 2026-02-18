<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- You have access to the Nx MCP server and its tools, use them to help the user
- When answering questions about the repository, use the `nx_workspace` tool first to gain an understanding of the workspace architecture where applicable.
- When working in individual projects, use the `nx_project_details` mcp tool to analyze and understand the specific project structure and dependencies
- For questions around nx configuration, best practices or if you're unsure, use the `nx_docs` tool to get relevant, up-to-date docs. Always use this instead of assuming things about nx configuration
- If the user needs help with an Nx configuration or project graph error, use the `nx_workspace` tool to get any errors

# CI Error Guidelines

If the user wants help with fixing an error in their CI pipeline, use the following flow:

- Retrieve the list of current CI Pipeline Executions (CIPEs) using the `nx_cloud_cipe_details` tool
- If there are any errors, use the `nx_cloud_fix_cipe_failure` tool to retrieve the logs for a specific task
- Use the task logs to see what's wrong and help the user fix their problem. Use the appropriate tools if necessary
- Make sure that the problem is fixed by running the task that you passed into the `nx_cloud_fix_cipe_failure` tool

<!-- nx configuration end-->

# Build Commands

```bash
# Build specific project
nx run <project-name>:build

# Build all affected projects
pnpm run build:affected

# Build all projects
nx run-many --target=build --all
```

# Test Commands

```bash
# Run tests for a specific project
nx run <project-name>:test

# Run a single test file
nx run <project-name>:test -- --testPathPattern=button

# Run tests in watch mode
nx run <project-name>:test -- --watch

# Run tests with UI
nx run <project-name>:test -- --ui

# Run affected tests
pnpm run test:affected

# Run all tests
nx run-many --target=test --all
```

# Lint Commands

```bash
# Lint all files (oxlint + dprint)
pnpm run lint

# Lint and fix
pnpm run lint:fix

# Lint specific project
nx run <project-name>:lint

# Lint affected projects
pnpm run lint:affected

# Check formatting only
pnpm exec dprint check

# Format files
pnpm exec dprint fmt
```

# TypeCheck Commands

```bash
# Typecheck specific project
nx run <project-name>:typecheck

# Typecheck affected projects
pnpm run typecheck:affected
```

# Code Style Guidelines

## Formatting (dprint)

- 2 space indentation
- 120 character line width
- LF line endings
- ASI (Automatic Semicolon Insertion) - no semicolons
- Prefer double quotes
- Trailing commas only on multi-line
- Arrow functions always use parentheses

## Imports

```typescript
// Group imports: external first, then internal
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { cn } from "@/lib/utils"

// Use inline type imports
import { type ComponentProps } from "react"

// Effect/TS CLI imports use namespace pattern
import * as Effect from "effect/Effect"
import * as Console from "effect/Console"

// Never import from barrel packages (enforced by oxlint)
// ❌ import { something } from "effect"
// ✅ import { something } from "effect/SomeModule"
```

## Naming Conventions

- File names: kebab-case (e.g., `button.tsx`, `dialog-content.tsx`)
- Components: PascalCase (e.g., `Button`, `DialogContent`)
- Hooks: camelCase with `use` prefix (e.g., `useMeasure`)
- Utilities: camelCase (e.g., `cn`, `formatDate`)
- Types/Interfaces: PascalCase with descriptive names
- Constants: UPPER_SNAKE_CASE for true constants
- Variant props: camelCase (e.g., `buttonVariants`)

## Component Patterns

### React Components

```typescript
import { type ComponentProps, forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "bg-primary",
      // ...
    },
    size: {
      default: "h-9",
      // ...
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

### Solid Components

```typescript
import { type ComponentProps, splitProps } from "solid-js"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva("base-classes", {/* ... */})

export interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {}

export const Button = (props: ButtonProps) => {
  const [local, rest] = splitProps(props, ["class", "variant", "size"])

  return (
    <button
      class={cn(buttonVariants({
        variant: local.variant,
        size: local.size,
        class: local.class,
      }))}
      {...rest}
    />
  )
}
```

## TypeScript Configuration

- Strict mode enabled
- ES2022 target
- NodeNext module resolution
- Import helpers enabled
- Isolated modules
- No unused locals
- No implicit returns
- No fallthrough cases in switch

## Error Handling

### Effect/TS CLI Code

```typescript
import * as Effect from "effect/Effect"
import * as Console from "effect/Console"

// Use Effect.gen for complex flows
const program = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem
  const exists = yield* fs.exists(path)
  if (!exists) {
    yield* Console.log("File not found")
    return
  }
  // ...
})

// Provide required layers
program.pipe(
  Effect.provide(NodeContext.layer),
  NodeRuntime.runMain,
)
```

## Styling

- Use Tailwind CSS v4 with CSS-first configuration
- Use `cn()` utility for class merging
- Use CVA (class-variance-authority) for component variants
- Support both React and Solid with same class patterns

## Git Workflow

- Use pnpm as package manager
- Pre-commit hooks run lint-staged (oxlint --fix + dprint fmt)
- Include `[skip release]` in commit messages for non-release changes

## Project Structure

```
packages/
  react/          # React components
  solid/          # Solid.js components  
  shared/         # Shared utilities
  monorepo-tools/ # Shared configs
apps/
  cli/            # Effect/TS CLI tool
  docs/           # Astro documentation
  react-example/  # React example app
  solid-example/  # Solid example app
```

## Key Dependencies

- React 19 / Solid.js 1.9
- Effect/TS 3.19 for CLI
- Tailwind CSS 4.1
- Ark UI (React/Solid primitives) - `@ark-ui/react`, `@ark-ui/solid`
- Vitest for testing
- dprint for formatting
- oxlint for linting
