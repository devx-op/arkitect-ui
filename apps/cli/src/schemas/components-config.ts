import * as Schema from "effect/Schema"

export class ComponentsConfig extends Schema.Class<ComponentsConfig>(
  "ComponentsConfig",
)({
  $schema: Schema.String,
  style: Schema.Literal(
    "default",
    "new-york",
    "radix-vega",
    "radix-nova",
    "radix-maia",
    "radix-lyra",
    "radix-mira",
    "base-vega",
    "base-nova",
    "base-maia",
    "base-lyra",
    "base-mira",
  ),
  rsc: Schema.Boolean,
  tsx: Schema.optional(Schema.Boolean),
  tailwind: Schema.Struct({
    config: Schema.String,
    css: Schema.String,
    baseColor: Schema.String,
    cssVariables: Schema.Boolean,
    prefix: Schema.optional(Schema.String),
  }),
  aliases: Schema.Struct({
    utils: Schema.String,
    components: Schema.String,
    ui: Schema.optional(Schema.String),
    lib: Schema.optional(Schema.String),
    hooks: Schema.optional(Schema.String),
  }),
  iconLibrary: Schema.optional(Schema.String),
  menuColor: Schema.optional(Schema.Literal("default", "inverted")),
  menuAccent: Schema.optional(Schema.Literal("subtle", "bold")),
  rtl: Schema.optional(Schema.Boolean),
  registries: Schema.optional(
    Schema.Record({
      key: Schema.String,
      value: Schema.Union(
        Schema.String,
        Schema.Struct({
          url: Schema.String,
          params: Schema.optional(
            Schema.Record({ key: Schema.String, value: Schema.String }),
          ),
          headers: Schema.optional(
            Schema.Record({ key: Schema.String, value: Schema.String }),
          ),
        }),
      ),
    }),
  ),
  arkitect: Schema.optional(
    Schema.Struct({
      framework: Schema.Literal("react", "solid"),
    }),
  ),
}) {}
