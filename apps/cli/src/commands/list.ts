import * as Command from "@effect/cli/Command"
import * as Console from "effect/Console"
import * as Effect from "effect/Effect"
import * as Option from "effect/Option"
import * as FileSystem from "@effect/platform/FileSystem"
import * as Schema from "effect/Schema"
import * as Config from "effect/Config"
import { ComponentsConfig } from "../schemas/components-config.js"

const DEFAULT_REGISTRY_BASE_URL = "https://devx-op.github.io/arkitect-ui/r"

interface RegistryIndex {
  items: Array<{
    name: string
    type: string
    title: string
    description: string
    files: Array<{ path: string; type: string }>
  }>
}

export const listCommand = Command.make("list", {}, () =>
  Effect.gen(function*() {
    const fs = yield* FileSystem.FileSystem

    yield* Console.log("🔍 Fetching components from Arkitect UI registry...")

    const registryBaseUrlRaw = yield* Config.string("REGISTRY_URL").pipe(
      Config.withDefault(DEFAULT_REGISTRY_BASE_URL),
    )
    const registryBaseUrl = registryBaseUrlRaw.endsWith("/")
      ? registryBaseUrlRaw.slice(0, -1)
      : registryBaseUrlRaw

    // Detect framework from components.json if available
    let framework = Option.none<"react" | "solid">()
    const hasConfig = yield* fs.exists("components.json")
    if (hasConfig) {
      const configContent = yield* fs.readFileString("components.json")
      const config = yield* Effect.option(
        Schema.decodeUnknown(Schema.parseJson(ComponentsConfig))(configContent),
      )

      framework = Option.flatMap(config, (c) => Option.fromNullable(c.arkitect?.framework))
    }

    // Fetch registry index
    const response = yield* Effect.tryPromise({
      try: () => fetch(`${registryBaseUrl}/index.json`),
      catch: (err) => new Error(`Failed to fetch registry: ${err}`),
    })

    if (!response.ok) {
      yield* Effect.fail(
        new Error(`Failed to fetch registry: ${response.statusText}`),
      )
    }

    const registry = (yield* Effect.tryPromise({
      try: () => response.json(),
      catch: (err) => new Error(`Failed to parse registry json: ${err}`),
    })) as RegistryIndex

    const components = registry.items.filter(
      (item) => item.type === "registry:ui",
    )

    if (components.length === 0) {
      yield* Console.log("⚠️  No components found in the registry.")
      return
    }

    yield* Console.log("\nAvailable components:")
    for (const component of components) {
      yield* Console.log(`- ${component.name}: ${component.description}`)
    }

    if (Option.isSome(framework)) {
      yield* Console.log(
        `\nFiltered for framework: ${framework.value} (Note: Registry index lists generic components, installation handles framework specifics)`,
      )
    }
  }))
