import * as Args from "@effect/cli/Args"
import * as Command from "@effect/cli/Command"
import * as Options from "@effect/cli/Options"
import * as PlatformCommand from "@effect/platform/Command"
import * as Console from "effect/Console"
import * as Effect from "effect/Effect"
import * as Option from "effect/Option"
import * as FileSystem from "@effect/platform/FileSystem"
import * as Path from "@effect/platform/Path"
import * as Schema from "effect/Schema"
import * as HttpClient from "@effect/platform/HttpClient"
import * as HttpClientResponse from "@effect/platform/HttpClientResponse"
import { ComponentsConfig } from "../schemas/components-config.js"

const REGISTRY_BASE_URL = "https://devx-op.github.io/arkitect-ui/r"

// Arguments and options for add command
const componentNameArg = Args.text({ name: "component-name" }).pipe(
  Args.withDescription("Name of the component to add"),
  Args.optional,
)

const allOption = Options.boolean("all").pipe(
  Options.withAlias("a"),
  Options.withDescription("Install all available components"),
  Options.withDefault(false),
)

const overwriteOption = Options.boolean("overwrite").pipe(
  Options.withAlias("o"),
  Options.withDescription("Overwrite existing files"),
  Options.withDefault(false),
)

const cwdOption = Options.text("cwd").pipe(
  Options.withDescription("Current working directory"),
  Options.withDefault(process.cwd()),
)

const dryRunOption = Options.boolean("dry-run").pipe(
  Options.withDescription("Simulate installation without running commands"),
  Options.withDefault(false),
)

type AddOptions = {
  componentName: Option.Option<string>
  all: boolean
  overwrite: boolean
  cwd: string
  dryRun: boolean
}

// Export the add command
export const addCommand = Command.make(
  "add",
  {
    componentName: componentNameArg,
    all: allOption,
    overwrite: overwriteOption,
    cwd: cwdOption,
    dryRun: dryRunOption,
  },
  (options: AddOptions) =>
    Effect.gen(function*() {
      const fs = yield* FileSystem.FileSystem
      const path = yield* Path.Path
      const http = (yield* HttpClient.HttpClient).pipe(
        HttpClient.filterStatusOk,
      )

      // 1. Check for components.json and detect framework
      const configPath = path.join(options.cwd, "components.json")
      const hasConfig = yield* fs.exists(configPath)
      if (!hasConfig) {
        return yield* Effect.fail(
          new Error("⚠️  components.json not found. Please run 'init' first."),
        )
      }

      const configContent = yield* fs.readFileString(configPath)

      const config = yield* Schema.decodeUnknown(
        Schema.parseJson(ComponentsConfig),
      )(configContent)

      const framework = Option.fromNullable(config.arkitect?.framework).pipe(
        Option.orElse(() =>
          Option.fromNullable(config.rsc).pipe(
            Option.map((rsc) => (rsc ? "react" : "react") as "react" | "solid"),
          )
        ),
        Option.getOrElse(() => "react" as "react" | "solid"),
      )

      // Determine Registry URL path segment
      // React -> r/r, Solid -> r/s
      const frameworkPath = framework === "solid" ? "s" : "r"

      // 2. Resolve components to install
      let componentsToInstall: string[] = []

      if (options.all) {
        yield* Console.log("📦 Fetching all components from registry...")
        const RegistryIndex = Schema.Struct({
          items: Schema.Array(
            Schema.Struct({ name: Schema.String, type: Schema.String }),
          ),
        })
        const response = yield* http.get(`${REGISTRY_BASE_URL}/index.json`)
        const registry = yield* HttpClientResponse.schemaBodyJson(RegistryIndex)(response)

        componentsToInstall = registry.items
          .filter((item) => item.type === "registry:ui")
          .map((item) => item.name)

        if (componentsToInstall.length === 0) {
          return yield* Console.log("⚠️  No components found to install.")
        }
      } else if (Option.isSome(options.componentName)) {
        componentsToInstall = [options.componentName.value]
      } else {
        return yield* Effect.fail(
          new Error("⚠️  Please specify a component name or use --all"),
        )
      }

      // 3. Install Components
      yield* Console.log(
        `🚀 Installing ${componentsToInstall.length} component(s) for ${framework}...`,
      )

      // Install sequentially to avoid race conditions in shadcn
      for (const name of componentsToInstall) {
        const url = `${REGISTRY_BASE_URL}/${frameworkPath}/${name}.json`

        const args = ["shadcn@latest", "add", url]
        if (options.overwrite) args.push("--overwrite")

        const command = PlatformCommand.make("npx", ...args).pipe(
          PlatformCommand.workingDirectory(options.cwd),
        )

        yield* Console.log(`Installing ${name}...`)

        if (options.dryRun) {
          yield* Console.log(`[Dry Run] Would execute: npx ${args.join(" ")}`)
        } else {
          yield* PlatformCommand.string(command).pipe(
            Effect.catchAll((err) => Effect.fail(new Error(`Failed to install ${name}: ${err}`))),
          )
        }
      }

      yield* Console.log("✅ All components installed successfully.")
    }),
)
