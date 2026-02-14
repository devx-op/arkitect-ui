import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: [
      "test/**/*.spec.ts",
      "test/**/*.test.ts",
      "src/**/*.spec.ts",
      "src/**/*.test.ts",
    ],
    reporters: ["default"],
    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage",
      include: ["src/**/*.ts"],
      exclude: [
        "src/**/*.spec.ts",
        "src/**/*.test.ts",
        "test/**/*.spec.ts",
        "test/**/*.test.ts",
      ],
    },
  },
})
