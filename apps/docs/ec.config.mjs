import { defineEcConfig } from "astro-expressive-code";

export default defineEcConfig({
  themes: ["github-dark", "github-light"],
  themeCssSelector: (theme) => `[data-theme='${theme.type}']`,
});
