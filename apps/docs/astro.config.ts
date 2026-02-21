// @ts-check

import starlight from "@astrojs/starlight"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import startlightSidebarTopics from "starlight-sidebar-topics"
import startlightThemeNova from "starlight-theme-nova"

const __dirname = dirname(fileURLToPath(import.meta.url))

import expressiveCode from "astro-expressive-code"
import react from "@astrojs/react"
import solid from "@astrojs/solid-js"

// https://astro.build/config
export default defineConfig({
  site: "https://devx-op.github.io",
  base: "/arkitect-ui/",
  vite: {
    plugins: [
      // @ts-expect-error - Type mismatch due to Vite version difference between Astro and Workspace
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "@arkitect-ui/react": resolve(__dirname, "../../packages/react/src"),
        "@arkitect-ui/solid": resolve(__dirname, "../../packages/solid/src"),
      },
    },
  },
  integrations: [
    expressiveCode(),
    react({
      include: ["**/packages/react/**", "**/react/**"],
    }),
    solid({
      include: ["**/packages/solid/**", "**/apps/docs/src/components/ui/**"],
    }),
    starlight({
      title: "",
      logo: {
        light: "./src/assets/light-logo.svg",
        dark: "./src/assets/dark-logo.svg",
      },
      plugins: [
        startlightSidebarTopics([
          {
            label: "ReactJs",
            icon: "seti:react",
            link: "react/",
            id: "react",
            items: [
              {
                label: "Getting Started",
                items: ["react/getting-started"],
              },
              {
                label: "Components",
                items: [
                  "react/components/button",
                  "react/components/dialog",
                  "react/components/dropdown-menu",
                  "react/components/input",
                  "react/components/label",
                ],
              },
            ],
          },
          {
            label: "SolidJs",
            icon: "seti:sublime",
            link: "solid/",
            id: "solid",
            items: [
              {
                label: "Getting Started",
                items: ["solid/getting-started"],
              },
              {
                label: "Components",
                items: [
                  "solid/components/button",
                  "solid/components/dialog",
                  "solid/components/dropdown-menu",
                  "solid/components/input",
                  "solid/components/label",
                ],
              },
            ],
          },
        ]),
        startlightThemeNova(),
      ],
      components: {
        Head: "./src/components/Head.astro",
        Sidebar: "./src/components/Sidebar.astro",
        ThemeSelect: "./src/components/ui/theme-select.astro",
        Hero: "./src/components/Hero.astro",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/devx-op/arkitect-ui",
        },
      ],
      customCss: [
        "./src/styles/global.css",
        "../../packages/shared/src/styles/global.css",
      ],
      defaultLocale: "root",
    }),
  ],
})
