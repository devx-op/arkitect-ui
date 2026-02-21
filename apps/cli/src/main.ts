#!/usr/bin/env node

import * as Command from "effect/unstable/cli/Command"
import * as NodeServices from "@effect/platform-node/NodeServices"
import * as NodeRuntime from "@effect/platform-node/NodeRuntime"
import * as NodeHttpClient from "@effect/platform-node/NodeHttpClient"
import * as Console from "effect/Console"
import * as Effect from "effect/Effect"
import { addCommand } from "./commands/add.js"
import { initCommand } from "./commands/init.js"
import { listCommand } from "./commands/list.js"

// Main CLI command
const arkitectUiCommand = Command.make(
  "arkitect-ui",
  {},
  () => Console.log("🚀 arkitect-ui CLI - Use --help to see available commands"),
).pipe(Command.withSubcommands([addCommand, initCommand, listCommand]))

// Run the CLI
const cli = Command.run(arkitectUiCommand, {
  version: "0.1.0",
})

cli.pipe(
  Effect.provide(NodeServices.layer),
  Effect.provide(NodeHttpClient.layerFetch),
  NodeRuntime.runMain,
)
