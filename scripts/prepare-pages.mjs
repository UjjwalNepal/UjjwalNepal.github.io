import { copyFile, mkdir, writeFile } from "node:fs/promises";

const output = new URL("../dist/", import.meta.url);
const entry = new URL("index.html", output);

// GitHub Pages serves files, so each BrowserRouter route needs an entry point.
// Keep this list in sync with the routes in src/App.tsx.
for (const route of ["resume", "admin"]) {
  const directory = new URL(`${route}/`, output);
  await mkdir(directory, { recursive: true });
  await copyFile(entry, new URL("index.html", directory));
}

// Unknown URLs still render the app's NotFound page with an HTTP 404 status.
await copyFile(entry, new URL("404.html", output));
await writeFile(new URL(".nojekyll", output), "");
