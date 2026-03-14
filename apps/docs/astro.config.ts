// @ts-check

import starlight from "@astrojs/starlight"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import startlightSidebarTopics from "starlight-sidebar-topics"
import starlightThemeRapide from "starlight-theme-rapide"

const __dirname = dirname(fileURLToPath(import.meta.url))

import expressiveCode from "astro-expressive-code"
import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
  site: "https://devx-op.github.io",
  base: "/arkitect-ui/",
  vite: {
    plugins: [
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
      include: ["**/packages/react/**", "**/apps/docs/src/components/ui/**"],
    }),
    starlight({
      title: "",
      logo: {
        light: "./src/assets/light-logo.svg",
        dark: "./src/assets/dark-logo.svg",
      },
      plugins: [
        starlightThemeRapide(),
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
                  "react/components/alert-dialog",
                  "react/components/avatar",
                  "react/components/badge",
                  "react/components/button",
                  "react/components/card",
                  "react/components/center",
                  "react/components/chart",
                  "react/components/checkbox",
                  "react/components/collapsible",
                  "react/components/combobox",
                  "react/components/copy-id-button",
                  "react/components/data-table",
                  "react/components/data-table-filters",
                  "react/components/dialog",
                  "react/components/dropdown-menu",
                  "react/components/empty",
                  "react/components/float",
                  "react/components/grid",
                  "react/components/grid-pattern",
                  "react/components/input",
                  "react/components/input-group",
                  "react/components/marquee",
                  "react/components/label",
                  "react/components/pagination",
                  "react/components/select",
                  "react/components/separator",
                  "react/components/sheet",
                  "react/components/sidebar",
                  "react/components/skeleton",
                  "react/components/stack",
                  "react/components/table",
                  "react/components/textarea",
                  "react/components/toast",
                  "react/components/tooltip",
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
                  "solid/components/alert-dialog",
                  "solid/components/avatar",
                  "solid/components/badge",
                  "solid/components/button",
                  "solid/components/card",
                  "solid/components/center",
                  "solid/components/chart",
                  "solid/components/checkbox",
                  "solid/components/collapsible",
                  "solid/components/combobox",
                  "solid/components/copy-id-button",
                  "solid/components/data-table",
                  "solid/components/data-table-filters",
                  "solid/components/dialog",
                  "solid/components/dropdown-menu",
                  "solid/components/empty",
                  "solid/components/float",
                  "solid/components/grid",
                  "solid/components/grid-pattern",
                  "solid/components/input",
                  "solid/components/input-group",
                  "solid/components/marquee",
                  "solid/components/label",
                  "solid/components/pagination",
                  "solid/components/select",
                  "solid/components/separator",
                  "solid/components/sheet",
                  "solid/components/sidebar",
                  "solid/components/skeleton",
                  "solid/components/stack",
                  "solid/components/table",
                  "solid/components/textarea",
                  "solid/components/toast",
                  "solid/components/tooltip",
                ],
              },
            ],
          },
        ]),
        // startlightThemeNova(),
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
