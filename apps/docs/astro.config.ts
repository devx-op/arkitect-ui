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
        // "@/lib/utils": resolve(
        //   __dirname,
        //   "../../packages/shared/src/lib/utils.ts",
        // ),
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
      include: ["**/packages/solid/**", "**/solid/**"],
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
                items: ["react/getting-started", "react/installation"],
              },
              /*{
              label: "Packages",
              items: ["react/packages/react-query", "react/packages/react-ui", "react/packages/chat-react"],
            },*/
              {
                label: "Components",
                items: ["react/components/button"],
              },
              {
                label: "Components",
                items: ["react/components/input"],
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
                items: ["solid/getting-started", "solid/installation"],
              },
              {
                label: "Components",
                items: ["solid/components/button"],
              },
              {
                label: "Components",
                items: ["solid/components/input"],
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
      /* 			sidebar: [
              {
                  label: 'Guides',
                  items: [
                      // Each item here is one entry in the navigation menu.
                      { label: 'Example Guide', slug: 'guides/example' },
                  ],
              },
              {
                  label: 'Reference',
                  autogenerate: { directory: 'reference' },
              },
          ], */
      customCss: ["./src/styles/global.css", "@arkitect-ui/shared/css"],
      defaultLocale: "root",
      locales: {
        // English docs in `src/content/docs/en/`
        root: {
          label: "English",
          lang: "en", // lang is required for root locales
        },
        es: {
          label: "Español",
          lang: "es-ES",
        },
      },
    }),
  ],
})
