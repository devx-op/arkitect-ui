import type { StorybookConfig } from "storybook-solidjs-vite"
import { dirname, join } from "path"
import { createRequire } from "module"
import tailwindcss from "@tailwindcss/vite"
import { mergeConfig } from "vite"

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
    })
  },
}
export default config
