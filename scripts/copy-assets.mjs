// Copies images/files that live next to each post (content/posts/<slug>/fig1.png)
// into public/log-assets/<slug>/ so the browser can load them.
// Runs automatically before `npm run dev` and `npm run build` (see package.json).
import fs from "node:fs";
import path from "node:path";

const src = path.join(process.cwd(), "content", "posts");
const dest = path.join(process.cwd(), "public", "log-assets");
fs.rmSync(dest, { recursive: true, force: true });

for (const slug of fs.readdirSync(src)) {
  const dir = path.join(src, slug);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const file of fs.readdirSync(dir)) {
    if (file.endsWith(".mdx") || file.endsWith(".md")) continue;
    fs.mkdirSync(path.join(dest, slug), { recursive: true });
    fs.copyFileSync(path.join(dir, file), path.join(dest, slug, file));
  }
}
console.log("copied post assets → public/log-assets");
