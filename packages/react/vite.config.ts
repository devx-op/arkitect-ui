/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react"
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin"
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
} satisfies UserConfig
