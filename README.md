# pypie-website

**Deep Learning 101 Pages**
The learn pages are driven by a single data object in `learn/learn-pages.js`. Titles, nav labels, overview summaries, section text, and code blocks are all generated from that file.

**Modify Existing Pages**
1. Open `learn/learn-pages.js`.
2. Find the matching entry in `LEARN_SERIES.pages` (or `LEARN_SERIES.overview`).
3. Edit `title`, `lead`, `summary`, or `section` values as needed.
4. Save and reload the page. The nav, overview list, header, and document title will update automatically.

**Add New Pages**
1. Copy an existing learn page, for example `learn/tensors.html`, to a new file in `learn/` (for example `learn/new-topic.html`).
2. In the new HTML file, set `data-learn-page` on `<body>` to your new page id.
3. In `learn/learn-pages.js`, add a new object to `LEARN_SERIES.pages` with matching `id` and `slug`.
4. If the page needs code, add a `buildBlock` function (or reuse one) and set `section.codeClass`.
5. Save and reload. The nav and overview list will include the new page automatically.
