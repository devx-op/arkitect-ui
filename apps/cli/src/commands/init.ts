import * as Command from "@effect/cli/Command"
import * as Options from "@effect/cli/Options"
import * as Prompt from "@effect/cli/Prompt"
import * as PlatformCommand from "@effect/platform/Command"
import * as FileSystem from "@effect/platform/FileSystem"
import * as Console from "effect/Console"
import * as Effect from "effect/Effect"
import * as Option from "effect/Option"
import * as Schema from "effect/Schema"
import { ComponentsConfig } from "../schemas/components-config.js"

// Options for the init command
const cwdOption = Options.text("cwd").pipe(
  Options.withDescription("Current working directory"),
  Options.withDefault(process.cwd()),
)

const frameworkOption = Options.choice("framework", ["react", "solid"]).pipe(
  Options.withDescription("Framework to use"),
  Options.optional,
)

const srcDirOption = Options.text("src-dir").pipe(
  Options.withDescription("Source directory"),
  Options.optional,
)

const componentsDirOption = Options.text("components-dir").pipe(
  Options.withDescription("Components directory"),
  Options.optional,
)

const utilsPathOption = Options.text("utils-path").pipe(
  Options.withDescription("Utils file path"),
  Options.optional,
)

const cssPathOption = Options.text("css-path").pipe(
  Options.withDescription("Global CSS file path"),
  Options.optional,
)

const yesOption = Options.boolean("yes").pipe(
  Options.withAlias("y"),
  Options.withDescription("Skip prompts and use defaults/flags"),
)

const installDepsOption = Options.boolean("install-deps").pipe(
  Options.withDescription("Install dependencies automatically"),
  Options.optional,
)

type InitOptions = {
  cwd: string
  framework: Option.Option<string>
  srcDir: Option.Option<string>
  componentsDir: Option.Option<string>
  utilsPath: Option.Option<string>
  cssPath: Option.Option<string>
  yes: boolean
  installDeps: Option.Option<boolean>
}

// Export the init command
export const initCommand = Command.make(
  "init",
  {
    cwd: cwdOption,
    framework: frameworkOption,
    srcDir: srcDirOption,
    componentsDir: componentsDirOption,
    utilsPath: utilsPathOption,
    cssPath: cssPathOption,
    yes: yesOption,
    installDeps: installDepsOption,
  },
  (options: InitOptions) =>
    Effect.gen(function*() {
      const fs = yield* FileSystem.FileSystem

      yield* Console.log("🚀 Initializing Arkitect UI configuration...")

      // 1. Detect Framework
      let detectedFramework: "react" | "solid" = "react"
      const packageJsonPath = `${options.cwd}/package.json`
      const hasPackageJson = yield* fs.exists(packageJsonPath)

      if (hasPackageJson) {
        const packageJsonContent = yield* fs.readFileString(packageJsonPath)
        const packageJson = JSON.parse(packageJsonContent)
        const deps = {
          ...packageJson.dependencies,
          ...packageJson.devDependencies,
        }

        if (deps["solid-js"]) {
          detectedFramework = "solid"
        } else if (deps["react"]) {
          detectedFramework = "react"
        }
      }

      // Determine Framework
      const framework = yield* Option.match(options.framework, {
        onNone: () =>
          options.yes
            ? Effect.succeed(detectedFramework)
            : Prompt.select({
              message: "Which framework are you using?",
              choices: [
                {
                  title: "React",
                  value: "react",
                  selected: detectedFramework === "react",
                },
                {
                  title: "Solid",
                  value: "solid",
                  selected: detectedFramework === "solid",
                },
              ],
            }).pipe(Effect.map((f) => f as "react" | "solid")),
        onSome: (f) => Effect.succeed(f as "react" | "solid"),
      })

      // 2. Resolve Paths
      const resolvePath = (
        option: Option.Option<string>,
        promptMsg: string,
        defaultValue: string,
      ) =>
        Option.match(option, {
          onNone: () =>
            options.yes
              ? Effect.succeed(defaultValue)
              : Prompt.text({ message: promptMsg, default: defaultValue }),
          onSome: Effect.succeed,
        })

      const srcDir = yield* resolvePath(
        options.srcDir,
        "Where is your source directory?",
        "src",
      )

      const componentsDir = yield* resolvePath(
        options.componentsDir,
        "Where would you like to install components?",
        `${srcDir}/components/ui`,
      )

      const utilsPath = yield* resolvePath(
        options.utilsPath,
        "Where is your utils file located?",
        `${srcDir}/lib/utils.ts`,
      )

      const cssPath = yield* resolvePath(
        options.cssPath,
        "Where is your global CSS file?",
        `${srcDir}/index.css`,
      )

      // 3. Generate components.json
      const componentsConfig = new ComponentsConfig({
        $schema: "https://ui.shadcn.com/schema.json",
        style: "default",
        rsc: framework === "react",
        tsx: true,
        tailwind: {
          config: "tailwind.config.js",
          css: cssPath,
          baseColor: "slate",
          cssVariables: true,
          prefix: "",
        },
        aliases: {
          components: `@/${componentsDir.replace(`${srcDir}/`, "")}`,
          utils: `@/${utilsPath.replace(`${srcDir}/`, "").replace(".ts", "")}`,
          ui: `@/${componentsDir.replace(`${srcDir}/`, "")}`,
        },
        arkitect: {
          framework: framework,
        },
      })

      const encodedConfig = yield* Schema.encode(
        Schema.parseJson(ComponentsConfig),
      )(componentsConfig)

      yield* fs.writeFileString(
        `${options.cwd}/components.json`,
        encodedConfig,
      )
      yield* Console.log("✅ components.json created successfully.")

      // 4. Install Dependencies
      const shouldInstallDeps = yield* Option.match(options.installDeps, {
        onNone: () =>
          options.yes
            ? Effect.succeed(true)
            : Prompt.confirm({
              message: "Would you like to install required dependencies now?",
              initial: true,
            }),
        onSome: Effect.succeed,
      })

      if (shouldInstallDeps) {
        const baseDeps = ["clsx", "tailwind-merge", "class-variance-authority"]
        const frameworkDeps = framework === "react" ? ["@ark-ui/react"] : ["@ark-ui/solid"]
        const allDeps = [...baseDeps, ...frameworkDeps]

        yield* Console.log(
          `📦 Installing dependencies: ${allDeps.join(", ")}...`,
        )

        let pm = "npm"
        const hasPnpmLock = yield* fs.exists(`${options.cwd}/pnpm-lock.yaml`)
        const hasYarnLock = yield* fs.exists(`${options.cwd}/yarn.lock`)
        const hasBunLock = yield* fs.exists(`${options.cwd}/bun.lockb`)

        if (hasPnpmLock) pm = "pnpm"
        else if (hasYarnLock) pm = "yarn"
        else if (hasBunLock) pm = "bun"

        const installCmd = pm === "npm" ? "install" : "add"
        const args = [installCmd, ...allDeps]

        const command = PlatformCommand.make(pm, ...args).pipe(
          PlatformCommand.workingDirectory(options.cwd),
        )

        yield* PlatformCommand.string(command).pipe(
          Effect.catchAll((err) => Effect.fail(new Error(`Failed to install dependencies: ${err}`))),
        )

        yield* Console.log("✅ Dependencies installed successfully.")
      }
    }),
)
