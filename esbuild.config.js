import { build } from "esbuild";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { existsSync } from "fs";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");

const __dirname = dirname(fileURLToPath(import.meta.url));
const entry = resolve(__dirname, "server/index.ts");

if (!existsSync(entry)) {
  console.error(`\n[esbuild.config] Entry not found: ${entry}`);
  console.error("[esbuild.config] Check the path/casing of your server entry file.\n");
  process.exit(1);
}

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
];

build({
  entryPoints: [entry],
  platform: "node",
  bundle: true,
  format: "esm",
  outdir: "dist",
  external,
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
