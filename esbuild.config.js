import { build } from "esbuild";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");

// Mark all dependencies + devDependencies as external (don't bundle node_modules),
// but never the entry point itself.
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
];

build({
  entryPoints: ["server/_core/index.ts"],
  platform: "node",
  bundle: true,
  format: "esm",
  outdir: "dist",
  external,
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
