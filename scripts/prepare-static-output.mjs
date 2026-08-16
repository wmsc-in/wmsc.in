import { copyFile, cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("dist/client");
const githubPagesDirectory = path.resolve("docs");

async function addDirectoryIndexAliases(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await addDirectoryIndexAliases(entryPath);
      return;
    }

    if (!entry.name.endsWith(".html") || entry.name === "index.html") return;

    const routeDirectory = entryPath.slice(0, -".html".length);
    await mkdir(routeDirectory, { recursive: true });
    await copyFile(entryPath, path.join(routeDirectory, "index.html"));
  }));
}

await addDirectoryIndexAliases(outputDirectory);

const customDomain = await readFile(path.join(githubPagesDirectory, "CNAME"), "utf8")
  .catch(() => "wmsc.in\n");

await mkdir(githubPagesDirectory, { recursive: true });
await cp(outputDirectory, githubPagesDirectory, { recursive: true, force: true });
await writeFile(path.join(githubPagesDirectory, ".nojekyll"), "");
await writeFile(path.join(githubPagesDirectory, "CNAME"), customDomain);
