import { describe, expect, it } from "@effect/vitest"
import * as Schema from "effect/Schema"
import * as Effect from "effect/Effect"
import { ComponentsConfig } from "../src/schemas/components-config.js"

const baseValid = {
  $schema: "https://ui.shadcn.com/schema.json",
  style: "default" as const,
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
}

describe("ComponentsConfig schema extended", () => {
  it.effect("decodes from JSON string with parseJson", () =>
    Effect.gen(function*() {
      const json = JSON.stringify({
        ...baseValid,
        style: "radix-nova",
        iconLibrary: "lucide",
      })
      const decoded = yield* Schema.decodeUnknown(Schema.parseJson(ComponentsConfig))(json)
      expect(decoded.style).toBe("radix-nova")
      expect(decoded.iconLibrary).toBe("lucide")
    }))

  it.effect("accepts optional tsx and tailwind.prefix omitted", () =>
    Effect.gen(function*() {
      const cfg = {
        ...baseValid,
        tsx: true,
      }
      const decoded = yield* Schema.decodeUnknown(ComponentsConfig)(cfg)
      expect(decoded.tsx).toBe(true)
      expect(decoded.tailwind.prefix).toBeUndefined()
    }))

  it.effect("fails when missing required aliases.components", () =>
    Effect.gen(function*() {
      const invalid = {
        ...baseValid,
        aliases: {
          utils: "@/lib/utils",
        },
      }
      const exit = yield* Schema.decodeUnknown(ComponentsConfig)(invalid).pipe(Effect.exit)
      expect(exit._tag).toBe("Failure")
    }))

  it.effect("accepts registries string and object forms", () =>
    Effect.gen(function*() {
      const cfg = {
        ...baseValid,
        registries: {
          "@arkitect-ui/react": "https://devx-op.github.io/arkitect-ui/r/{name}.json",
          "@custom": {
            url: "https://example.com/components/{name}.json",
            params: { token: "abc123" },
            headers: { "x-api-key": "def456" },
          },
        },
      }
      const decoded = yield* Schema.decodeUnknown(ComponentsConfig)(cfg)
      expect(Object.keys(decoded.registries ?? {}).length).toBe(2)
    }))

  it.effect("fails when registries object missing url", () =>
    Effect.gen(function*() {
      const invalid = {
        ...baseValid,
        registries: {
          "@bad": {
            params: { a: "b" },
          },
        },
      }
      const exit = yield* Schema.decodeUnknown(ComponentsConfig)(invalid).pipe(Effect.exit)
      expect(exit._tag).toBe("Failure")
    }))

  it.effect("accepts arkitect.framework literal react/solid", () =>
    Effect.gen(function*() {
      const reactCfg = {
        ...baseValid,
        arkitect: { framework: "react" as const },
      }
      const solidCfg = {
        ...baseValid,
        arkitect: { framework: "solid" as const },
      }
      const decodedReact = yield* Schema.decodeUnknown(ComponentsConfig)(reactCfg)
      const decodedSolid = yield* Schema.decodeUnknown(ComponentsConfig)(solidCfg)
      expect(decodedReact.arkitect?.framework).toBe("react")
      expect(decodedSolid.arkitect?.framework).toBe("solid")
    }))
})
