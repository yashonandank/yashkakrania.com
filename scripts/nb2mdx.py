"""
Convert a Jupyter notebook into a new post folder.

    python scripts/nb2mdx.py path/to/notebook.ipynb --slug w02-my-build --project persuasion-directions --week 2

Creates content/posts/<slug>/index.mdx (+ extracted images). Then edit the frontmatter
and prose. Requires: pip install nbconvert
"""
import argparse
import datetime as dt
import re
from pathlib import Path

from nbconvert import MarkdownExporter

p = argparse.ArgumentParser()
p.add_argument("notebook")
p.add_argument("--slug", required=True)
p.add_argument("--project", required=True)
p.add_argument("--week", type=int, required=True)
p.add_argument("--title", default="TODO title")
args = p.parse_args()

out_dir = Path("content/posts") / args.slug
out_dir.mkdir(parents=True, exist_ok=False)

body, resources = MarkdownExporter().from_filename(args.notebook)

# Save images nbconvert extracted from cell outputs (plots etc.) next to the post.
for name, data in resources.get("outputs", {}).items():
    (out_dir / name).write_bytes(data)

# MDX is stricter than Markdown: raw HTML from outputs (e.g. pandas tables, <style>) can break it.
body = re.sub(r"<style.*?</style>", "", body, flags=re.S)
# Curly braces mean "JavaScript" in MDX, so escape them in prose but not inside code blocks
# or $math$ (odd-numbered parts after splitting on ``` are code).
def _escape(prose: str) -> str:
    parts = re.split(r"(\$\$.*?\$\$|\$[^$\n]+\$)", prose, flags=re.S)
    return "".join(s if i % 2 else s.replace("{", "&#123;").replace("}", "&#125;") for i, s in enumerate(parts))

chunks = body.split("```")
body = "```".join(c if i % 2 else _escape(c) for i, c in enumerate(chunks))

frontmatter = f"""---
title: "{args.title}"
date: {dt.date.today().isoformat()}
week: {args.week}
project: {args.project}
summary: "TODO one-line summary"
tags: []
sources: []
draft: true
---

"""
(out_dir / "index.mdx").write_text(frontmatter + body)
print(f"Created {out_dir}/index.mdx with {len(resources.get('outputs', {}))} images. Set draft: false when ready.")
