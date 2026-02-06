# pypie-website

**Deep Learning 101 Pages**
The learn pages now use:
- `learn/learn-shared.js` for shared navigation and rendering logic.
- One script per page for chapter content and AST code blocks:
  - `learn/overview/overview.js`
  - `learn/tensors/tensors.js`
  - `learn/forward-line/forward-line.js`
  - `learn/learning-line/learning-line.js`
  - `learn/learning-quad/learning-quad.js`

**Modify Existing Pages**
1. Open the page-specific script in the chapter folder (for example `learn/tensors/tensors.js`).
2. Edit that page's `lead`, `section`, dialog text, or `buildBlock` function as needed.
3. Save and reload the page.

**Add New Pages**
1. Create a new chapter folder in `learn/` (for example `learn/new-topic/`).
2. Copy an existing learn page (for example `learn/tensors/index.html`) to `learn/new-topic/index.html`.
3. In the new HTML file, set `data-learn-page` on `<body>` to your new page id.
4. Create a matching page script (for example `learn/new-topic/new-topic.js`) that calls `window.PYPIE_LEARN_RENDER({ ... })`.
5. In `learn/learn-shared.js`, add your new page to `LEARN_SERIES.pages` with matching `id`, `slug`, `title`, and `summary`.
6. In the new HTML file, include:
   - `../learn-shared.js`
   - your page script (`new-topic.js`)
7. If the page needs code, include a `buildBlock` function and set `section.codeClass` in the page script.
8. Save and reload. The nav and overview list will include the new page automatically.
