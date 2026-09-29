# Paper project page

This is a standalone, dependency-free paper page draft. Replace all bracketed text in `index.html`, update the paper/code links and BibTeX, and replace the SVG placeholders in `assets/` with your figures (update the image extensions in `index.html` if needed).

## Preview locally

From this directory, run:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## Publishing

This draft is intentionally outside `docs/`, so the existing MkDocs deployment will not publish it. To publish it as a subpath on the existing site, the repository's Pages workflow must be adjusted to include this directory in the MkDocs output. Alternatively, put these files in a dedicated public GitHub repository and enable GitHub Pages from its `main` branch root.

Do not publish until placeholder text, links, and citation have been replaced.
