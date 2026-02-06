(() => {
    const getLearnRootUrl = () => {
        if (document.currentScript && document.currentScript.src) {
            return new URL(".", document.currentScript.src);
        }
        return new URL("../", window.location.href);
    };

    const learnRootUrl = getLearnRootUrl();
    const withLearnRoot = (href) => new URL(href, learnRootUrl).href;

    const LEARN_SERIES = {
        title: "Deep Learning 101",
        eyebrow: "Deep Learning 101",
        overview: {
            id: "overview",
            slug: "overview/index.html",
            title: "0. Overview",
            lead:
                "Four short chapters that move from tensors to fitting a quadratic. Each page pairs prose with a PyPie AST snippet you can reuse.",
            callout: "Tip: Use the left navigation to hop between chapters.",
        },
        pages: [
            {
                id: "tensors",
                slug: "tensors/index.html",
                title: "1. Tensors",
                summary: "Typed arrays with explicit shapes and a scaling helper.",
            },
            {
                id: "forward-line",
                slug: "forward-line/index.html",
                title: "2. A Forward Line",
                summary: "The matrix multiply plus bias that powers dense layers.",
            },
            {
                id: "learning-line",
                slug: "learning-line/index.html",
                title: "3. Learning a Line",
                summary: "One gradient step for a linear model.",
            },
            {
                id: "learning-quad",
                slug: "learning-quad/index.html",
                title: "4. Learning a Quad",
                summary: "Expanding the model to a quadratic.",
            },
        ],
    };

    const setText = (selector, value) => {
        const element = document.querySelector(selector);
        if (element && value) {
            element.textContent = value;
        }
    };

    const escapeHtml = (value) =>
        String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    const formatInlineCode = (text) =>
        String(text || "")
            .split("`")
            .map((part, index) =>
                index % 2 === 1 ? `<code>${escapeHtml(part)}</code>` : escapeHtml(part)
            )
            .join("");

    const trimFenceEdgeNewlines = (text) => {
        let value = String(text || "");
        if (value.startsWith("\n")) {
            value = value.slice(1);
        }
        if (value.endsWith("\n")) {
            value = value.slice(0, -1);
        }
        return value;
    };

    const renderTextParagraphs = (text) =>
        String(text || "")
            .split(/\n{2,}/)
            .map((paragraph) => paragraph.trim())
            .filter((paragraph) => paragraph.length > 0)
            .map((paragraph) => {
                const body = paragraph
                    .split("\n")
                    .map((line) => formatInlineCode(line))
                    .join("<br>");
                return `<p class="chat-bubble__text">${body}</p>`;
            })
            .join("");

    const renderMessageText = (text) => {
        const source = String(text || "");
        if (!source) {
            return "";
        }

        const fenceRegex = /```([\s\S]*?)```/g;
        const segments = [];
        let cursor = 0;
        let match = null;

        while ((match = fenceRegex.exec(source)) !== null) {
            if (match.index > cursor) {
                segments.push({ kind: "text", value: source.slice(cursor, match.index) });
            }
            segments.push({ kind: "code", value: trimFenceEdgeNewlines(match[1]) });
            cursor = fenceRegex.lastIndex;
        }

        if (cursor < source.length) {
            segments.push({ kind: "text", value: source.slice(cursor) });
        }

        return segments
            .map((segment) => {
                if (segment.kind === "code") {
                    return `<pre class="doc-code chat-bubble__fenced-code" data-code-ignore="true"><code>${escapeHtml(
                        segment.value
                    )}</code></pre>`;
                }
                return renderTextParagraphs(segment.value);
            })
            .join("");
    };

    const getDialogCodeClass = (pageId, index) => `chat-code-${pageId}-${index}`;

    const renderDialog = (dialog = [], pageId = "") =>
        dialog
            .map((message, index) => {
                const side = message.side === "right" ? "right" : "left";
                const speaker = message.speaker
                    ? `<p class="chat-bubble__speaker">${escapeHtml(message.speaker)}</p>`
                    : "";
                const text = message.text ? renderMessageText(message.text) : "";
                const autoCodeClass =
                    typeof message.buildCodeBlock === "function"
                        ? getDialogCodeClass(pageId, index)
                        : "";
                const codeClass = message.codeClass || autoCodeClass;
                const code = codeClass
                    ? `<pre class="doc-code ${codeClass}" aria-label="${escapeHtml(
                          message.codeLabel || "Code snippet"
                      )}"></pre>`
                    : "";

                return `<div class="chat-row chat-row--${side}"><article class="chat-bubble chat-bubble--${side}">${speaker}${text}${code}</article></div>`;
            })
            .join("");

    const getMetaPage = (pageId) => {
        if (pageId === LEARN_SERIES.overview.id) {
            return LEARN_SERIES.overview;
        }
        return LEARN_SERIES.pages.find((page) => page.id === pageId) || null;
    };

    const renderNav = (pageId) => {
        const nav = document.querySelector("[data-learn-nav]");
        if (!nav) {
            return;
        }

        const allPages = [LEARN_SERIES.overview, ...LEARN_SERIES.pages];
        const navLinks = allPages
            .map((page) => {
                const currentAttr = page.id === pageId ? ' aria-current="page"' : "";
                return `<a href="${withLearnRoot(page.slug)}"${currentAttr}>${page.title}</a>`;
            })
            .join("");

        nav.innerHTML = `<div class="doc-nav__title">${LEARN_SERIES.title}</div>${navLinks}`;
    };

    const renderOverview = (leadOverride, calloutOverride) => {
        const list = document.querySelector("[data-learn-overview-list]");
        if (list) {
            list.innerHTML = LEARN_SERIES.pages
                .map(
                    (page) =>
                        `<p><a href="${withLearnRoot(page.slug)}">${page.title}</a> - ${page.summary}</p>`
                )
                .join("");
        }

        setText("[data-learn-title]", LEARN_SERIES.overview.title);
        setText("[data-learn-lead]", leadOverride || LEARN_SERIES.overview.lead);
        setText("[data-learn-callout]", calloutOverride || LEARN_SERIES.overview.callout);
    };

    const renderChapter = (config, pageId) => {
        const section = document.querySelector("[data-learn-section]");
        if (!section || !config.section) {
            return;
        }

        section.id = config.section.id;

        const sectionTitle = section.querySelector("[data-learn-section-title]");
        if (sectionTitle) {
            sectionTitle.textContent = config.section.title;
        }

        const sectionBody = section.querySelector("[data-learn-section-body]");
        if (sectionBody) {
            sectionBody.textContent = config.section.body;
        }

        const dialog = section.querySelector("[data-learn-dialog]");
        if (dialog) {
            dialog.innerHTML = renderDialog(config.section.dialog, pageId);
        }

        const ast = window.PYPIE_AST;
        if (ast && window.PYPIE_SET_BLOCKS) {
            const blocks = [];

            if (typeof config.buildBlock === "function" && config.section.codeClass) {
                const sectionBlock = config.buildBlock(ast);
                if (sectionBlock) {
                    blocks.push({
                        selector: `.${config.section.codeClass}`,
                        block: sectionBlock,
                    });
                }
            }

            (config.section.dialog || []).forEach((message, index) => {
                if (typeof message.buildCodeBlock !== "function") {
                    return;
                }
                const block = message.buildCodeBlock(ast);
                if (!block) {
                    return;
                }
                const codeClass = message.codeClass || getDialogCodeClass(pageId, index);
                blocks.push({
                    selector: `.${codeClass}`,
                    block,
                });
            });

            if (blocks.length > 0) {
                window.PYPIE_SET_BLOCKS(blocks);
            }
        }
    };

    const renderPage = (config) => {
        const pageId = config?.id || document.body?.dataset.learnPage;
        if (!pageId) {
            return;
        }

        const metaPage = getMetaPage(pageId);
        if (!metaPage) {
            return;
        }

        renderNav(pageId);

        setText("[data-learn-eyebrow]", LEARN_SERIES.eyebrow);

        const baseTitle = `PyPie - ${LEARN_SERIES.title}`;
        document.title =
            pageId === LEARN_SERIES.overview.id
                ? baseTitle
                : `${baseTitle}: ${metaPage.title}`;

        if (pageId === LEARN_SERIES.overview.id) {
            renderOverview(config?.lead, config?.callout);
            return;
        }

        setText("[data-learn-title]", metaPage.title);
        setText("[data-learn-lead]", config?.lead);
        renderChapter(config, pageId);
    };

    window.PYPIE_LEARN_RENDER = renderPage;
})();
