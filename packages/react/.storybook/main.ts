import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin"
import type { StorybookConfig } from "@storybook/react-vite"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { mergeConfig } from "vite"

const __dirname = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ["../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  viteFinal: async (config) =>
    mergeConfig(config, {
      plugins: [react(), nxViteTsPaths(), tailwindcss()],
      resolve: {
        alias: {
          "@/lib/utils": resolve(__dirname, "../../shared/src/lib/utils.ts"),
          "@": resolve(__dirname, "../src"),
        },
      },
    }),
}

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

export default config

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
