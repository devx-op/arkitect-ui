/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react"
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin"
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import { playwright } from "@vitest/browser-playwright"
import path from "node:path"
import { fileURLToPath } from "node:url"

const dirname = typeof __dirname !== "undefined"
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url))

import type { UserConfig } from "vite"

export default {
  root: dirname,
  resolve: {
    alias: {
      "@/lib/utils": path.resolve(dirname, "../shared/src/lib/utils.ts"),
      "@": path.resolve(dirname, "./src"),
    },
  },
  plugins: [react(), nxViteTsPaths()],
  build: {
    outDir: "dist",
    lib: {
      entry: path.join(dirname, "src/index.ts"),
      name: "ArkitectUiReact",
      fileName: (format) => `index.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "tailwindcss",
        "@hugeicons/core-free-icons",
        "@hugeicons/react",
        "@tailwindcss/vite",
        "@effect-atom/atom",
        "@effect-atom/atom-react",
        "@effect/experimental",
        "@effect/platform",
        "@tanstack/react-table",
        "effect",
        "class-variance-authority",
        "clsx",
        "framer-motion",
        "motion",
        "tailwind-merge",
        "tw-animate-css",
        "zustand",
        "@base-ui/react",
        "@daveyplate/better-auth-ui",
        "react-router",
        "react-use-measure",
        "recharts",
        "shadcn",
        "sonner",
      ],
    },
  },
  test: {
    // Storybook tests desactivados temporalmente debido a problemas de configuración
    // projects: [
    //   {
    //     extends: true,
    //     plugins: [
    //       storybookTest({
    //         configDir: path.join(dirname, ".storybook"),
    //       }),
    //     ],
    //     test: {
    //       name: "storybook",
    //       browser: {
    //         enabled: true,
    //         headless: true,
    //         provider: playwright({}),
    //         instances: [
    //           {
    //             browser: "chromium",
    //           },
    //         ],
    //       },
    //       setupFiles: [".storybook/vitest.setup.ts"],
    //     },
    //     build: {
    //       rollupOptions: {
    //         external: [
    //           "react",
    //           "react-dom",
    //           "react/jsx-runtime",
    //         ],
    //       },
    //     },
    //   },
    // ],
    reporters: ["default"],
    coverage: {
      reportsDirectory: "./coverage",
      provider: "v8",
    },
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    // Pasar automáticamente cuando no hay tests
    passWithNoTests: true,
  },
} satisfies UserConfig
