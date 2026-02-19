import type { StorybookConfig } from "storybook-solidjs-vite"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"
import { mergeConfig } from "vite"

const __dirname = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: {
    name: getAbsolutePath("storybook-solidjs-vite"),
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [tailwindcss()],
      resolve: {
        alias: [
          {
            find: "@/lib/utils",
            replacement: resolve(__dirname, "../../shared/src/lib/utils.ts"),
          },
          {
            find: "@",
            replacement: resolve(__dirname, "../src"),
          },
        ],
        conditions: ["browser", "default"],
      },
      build: {
        target: "esnext",
      },
      optimizeDeps: {
        include: ["@ark-ui/solid", "@tabler/icons-solidjs"],
        esbuildOptions: {
          target: "esnext",
        },
      },
      ssr: {
        noExternal: ["@ark-ui/solid"],
      },
    })
  },
}

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

export default config
