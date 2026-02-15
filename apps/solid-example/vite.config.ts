import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import path from "node:path"
import solidPlugin from "vite-plugin-solid"
import devtools from "solid-devtools/vite"

export default defineConfig({
  plugins: [devtools(), solidPlugin(), tailwindcss()],
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "src/components"),
      "@/lib": path.resolve(__dirname, "src/lib"),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
})
