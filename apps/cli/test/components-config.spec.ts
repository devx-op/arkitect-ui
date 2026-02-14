import { describe, expect, it } from "@effect/vitest"
import * as Schema from "effect/Schema"
import { ComponentsConfig } from "../src/schemas/components-config.js"
import * as Effect from "effect/Effect"

describe("ComponentsConfig schema", () => {
  it.effect("decodes a valid shadcn config", () =>
    Effect.gen(function*() {
      const value = {
        $schema: "https://ui.shadcn.com/schema.json",
        style: "new-york",
        rsc: true,
        tailwind: {
          config: "tailwind.config.ts",
          css: "src/styles/globals.css",
          baseColor: "neutral",
          cssVariables: true,
        },
        aliases: {
          utils: "@/lib/utils",
          components: "@/components",
        },
        iconLibrary: "lucide",
        menuColor: "default",
        menuAccent: "subtle",
        rtl: false,
        registries: {
          "@arkitect-ui/react": "https://devx-op.github.io/arkitect-ui/r/{name}.json",
          "@custom": {
            url: "https://example.com/components/{name}.json",
            params: { token: "abc123" },
            headers: { "x-api-key": "def456" },
          },
        },
        arkitect: {
          framework: "react",
        },
      }
      const decoded = yield* Schema.decodeUnknown(ComponentsConfig)(value)
      expect(decoded.style).toBe("new-york")
      expect(decoded.tailwind.cssVariables).toBe(true)
      expect(decoded.aliases.components).toBe("@/components")
      expect(decoded.arkitect?.framework).toBe("react")
    }))

  it.effect("fails on invalid menuColor", () =>
    Effect.gen(function*() {
      const invalid = {
        $schema: "https://ui.shadcn.com/schema.json",
        style: "default",
        rsc: false,
        tailwind: {
          config: "tailwind.config.ts",
          css: "src/styles/globals.css",
          baseColor: "neutral",
          cssVariables: true,
        },
        aliases: {
          utils: "@/lib/utils",
          components: "@/components",
        },
        menuColor: "purple",
      }
      const exit = yield* Schema.decodeUnknown(ComponentsConfig)(invalid).pipe(
        Effect.exit,
      )
      expect(exit._tag).toBe("Failure")
    }))
})
