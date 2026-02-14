import type { StorybookConfig } from "storybook-solidjs-vite"
import { dirname, join, resolve } from "path"
import { createRequire } from "module"
import { fileURLToPath } from "url"
import tailwindcss from "@tailwindcss/vite"
import { mergeConfig } from "vite"

const __dirname = dirname(fileURLToPath(import.meta.url))

function getAbsolutePath(value: string): any {
  return dirname(createRequire(import.meta.url).resolve(join(value, "package.json")))
}

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
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
        alias: {
          "@/lib/utils": resolve(__dirname, "../../shared/src/lib/utils.ts"),
          "@": resolve(__dirname, "../src"),
        },
      },
    })
  },
}
export default config
