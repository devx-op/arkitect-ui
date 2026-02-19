import type { Preview } from "storybook-solidjs-vite"
import { IS_SOLID_JSX_FLAG } from "storybook-solidjs-vite"
import "../src/index.css"

// Default themes from tweakcn
const DEFAULT_THEMES = [
  {
    id: "default",
    name: "Default",
    url: "",
  },
  {
    id: "Catppuccin",
    name: "Catppuccin",
    url: "https://tweakcn.com/r/themes/catppuccin.json",
  },
  {
    id: "Claude",
    name: "Claude",
    url: "https://tweakcn.com/r/themes/claude.json",
  },
  {
    id: "darkmatter",
    name: "Darkmatter",
    url: "https://tweakcn.com/r/themes/darkmatter.json",
  },
  {
    id: "Mono",
    name: "Mono",
    url: "https://tweakcn.com/r/themes/mono.json",
  },
]

// Helper function to apply mode to DOM
function applyModeToDOM(mode: "light" | "dark") {
  const root = document.documentElement
  if (mode === "dark") {
    root.classList.add("dark")
    root.setAttribute("data-theme", "dark")
  } else {
    root.classList.remove("dark")
    root.setAttribute("data-theme", "light")
  }
}

// Simple theme decorator using DOM API only
const withTheme = (Story: any, context: any) => {
  const mode = context.globals.mode || "light"
  applyModeToDOM(mode)
  return Story
}

// @ts-ignore - Mark as Solid JSX
withTheme[IS_SOLID_JSX_FLAG] = true

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: DEFAULT_THEMES.map((t) => ({
          value: t.id,
          title: t.name,
          icon: t.id === "default" ? "circlehollow" : "circle",
        })),
        dynamicTitle: true,
      },
    },
    mode: {
      description: "Color mode",
      toolbar: {
        title: "Mode",
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "default",
    mode: "light",
  },
  decorators: [withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
