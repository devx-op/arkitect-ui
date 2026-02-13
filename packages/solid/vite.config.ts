/// <reference types="vitest" />
import { defineConfig } from "vitest/config"
import solidPlugin from "vite-plugin-solid"
import dts from "vite-plugin-dts"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    solidPlugin(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {},
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "ArkitectUiSolid",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["solid-js", "solid-js/web", "@ark-ui/solid"],
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    server: {
      deps: {
        inline: [/solid-js/],
      },
    },
  },
})
