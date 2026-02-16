---
title: Installation
description: Install arkitect-ui for React using the CLI or manually.
---

## Using the CLI (recommended)

If you already have a React project with Tailwind configured, the easiest way to install and wire up arkitect-ui is through the CLI:

```bash
npx arkitect-ui init
```

This will:

- Create `components.json` with aliases like `@/components/ui` and `@/lib/utils`
- Generate a global CSS file if it is missing
- Create a `cn` helper in `src/lib/utils.ts`
- Update your TypeScript config to support the `@/*` alias
- Add a `@` alias to your Vite config when using Vite

Then install your first component:

```bash
npx arkitect-ui add button
```

You can repeat the `add` command for any other components you want to install.

## Manual installation

To install the React package directly:

```bash
pnpm add @ark-ui/react @arkitect-ui/react
```

In addition, make sure that:

- Tailwind CSS v4 is configured in your project
- Your TypeScript config has `baseUrl: "."` and `paths["@/*"] = ["./src/*"]`
- Your bundler (for example, Vite) has a `@` alias pointing to `./src`
- You create `src/lib/utils.ts` with a `cn` helper if you want to match the CLI setup

Once this is in place, you can copy components from the docs into `src/components/ui/` and import them using `@/components/ui/...`.
