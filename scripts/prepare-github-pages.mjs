import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const publicDir = ".vercel/output/static";
const outDir = "github-pages-dist";

if (!existsSync(publicDir)) {
  throw new Error(`Expected ${publicDir} to exist. Run npm run build before preparing GitHub Pages.`);
}

await mkdir(outDir, { recursive: true });
await cp(publicDir, outDir, { recursive: true, force: true });

const indexHtml = join(outDir, "index.html");
const notFoundHtml = join(outDir, "404.html");
const assetsDir = join(outDir, "assets");
const assetFiles = await readdir(assetsDir);
const entryScript = assetFiles.find((file) => /^index-.*\.js$/.test(file));
const stylesheet = assetFiles.find((file) => /^styles-.*\.css$/.test(file));

if (!entryScript || !stylesheet) {
  throw new Error("Could not find the built client entry script and stylesheet for GitHub Pages.");
}

const basePath = process.env.BASE_PATH || "/";
const normalizedBase = basePath.endsWith("/") ? basePath : `${basePath}/`;
const appHtml = `<!doctype html>
<html lang="en" class="antialiased">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Lattice</title>
    <meta name="description" content="A research archive of how exceptional people think, decide, fail, and revise, with sources attached." />
    <meta name="theme-color" content="#f1ece3" />
    <link rel="icon" type="image/svg+xml" href="${normalizedBase}favicon.svg" />
    <link rel="stylesheet" href="${normalizedBase}assets/${stylesheet}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap" />
    <script>
      window.$_TSR = window.$_TSR || {
        t: new Map(),
        buffer: [],
        initialized: true,
        router: {
          manifest: { routes: {} },
          matches: []
        },
        h: function() {}
      };
    </script>
  </head>
  <body class="bg-bg text-ink font-sans">
    <script type="module" src="${normalizedBase}assets/${entryScript}"></script>
  </body>
</html>
`;

await writeFile(indexHtml, appHtml);
await writeFile(notFoundHtml, appHtml);
await writeFile(join(outDir, ".nojekyll"), "");
