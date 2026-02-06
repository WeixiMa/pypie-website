(() => {
    const learnWindow = window;
    const getLearnRootUrl = () => {
        const currentScript = document.currentScript;
        if (currentScript && currentScript.src) {
            return new URL(".", currentScript.src);
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
            lead: "Four short chapters that move from tensors to fitting a quadratic. Each page pairs prose with a PyPie AST snippet you can reuse.",
            callout: "Tip: Use the left navigation to hop between chapters.",
        },
        pages: [
            {
                id: "tensors",
                slug: "tensors/index.html",
                title: "1. Tensors",
            },
            {
                id: "forward-line",
                slug: "forward-line/index.html",
                title: "2. A Forward Line",
            },
            {
                id: "learning-line",
                slug: "learning-line/index.html",
                title: "3. Learning a Line",
            },
            {
                id: "learning-quad",
                slug: "learning-quad/index.html",
                title: "4. Learning a Quad",
            },
        ],
    };
    const setText = (selector, value) => {
        const element = document.querySelector(selector);
        if (element && value !== undefined) {
            element.textContent = value;
        }
    };
    const setHidden = (selector, hidden) => {
        const element = document.querySelector(selector);
        if (element) {
            element.toggleAttribute("hidden", hidden);
        }
    };
    const escapeHtml = (value) => String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    const formatInlineCode = (text) => String(text || "")
        .split("`")
        .map((part, index) => index % 2 === 1 ? `<code>${escapeHtml(part)}</code>` : escapeHtml(part))
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
    const renderTextParagraphs = (text) => String(text || "")
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
                return `<pre class="doc-code chat-bubble__fenced-code" data-code-ignore="true"><code>${escapeHtml(segment.value)}</code></pre>`;
            }
            return renderTextParagraphs(segment.value);
        })
            .join("");
    };
    const getDialogCodeClass = (pageId, index) => `chat-code-${pageId}-${index}`;
    const renderDialog = (dialog = [], pageId = "") => dialog
        .map((message, index) => {
        const side = message.side === "right" ? "right" : "left";
        const speaker = message.speaker
            ? `<p class="chat-bubble__speaker">${escapeHtml(message.speaker)}</p>`
            : "";
        const text = message.text ? renderMessageText(message.text) : "";
        const autoCodeClass = typeof message.buildCodeBlock === "function"
            ? getDialogCodeClass(pageId, index)
            : "";
        const codeClass = message.codeClass || autoCodeClass;
        const code = codeClass
            ? `<pre class="doc-code ${codeClass}" aria-label="${escapeHtml(message.codeLabel || "Code snippet")}"></pre>`
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
                .map((page) => `<p><a href="${withLearnRoot(page.slug)}">${page.title}</a></p>`)
                .join("");
        }
        setText("[data-learn-title]", LEARN_SERIES.overview.title);
        setText("[data-learn-lead]", leadOverride || LEARN_SERIES.overview.lead);
        setText("[data-learn-callout]", calloutOverride || LEARN_SERIES.overview.callout);
    };
    const renderChapter = (metaPage, dialogMessages = [], pageId) => {
        const section = document.querySelector("[data-learn-section]");
        if (!section) {
            return;
        }
        section.id = pageId;
        const sectionTitle = section.querySelector("[data-learn-section-title]");
        if (sectionTitle) {
            sectionTitle.textContent = "";
        }
        const sectionBody = section.querySelector("[data-learn-section-body]");
        if (sectionBody) {
            sectionBody.textContent = "";
        }
        const dialog = section.querySelector("[data-learn-dialog]");
        if (dialog) {
            dialog.innerHTML = renderDialog(dialogMessages, pageId);
        }
        const ast = learnWindow.PYPIE_AST;
        const setBlocks = learnWindow.PYPIE_SET_BLOCKS;
        if (ast && typeof setBlocks === "function") {
            const blocks = [];
            dialogMessages.forEach((message, index) => {
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
                setBlocks(blocks);
            }
        }
    };
    const renderPage = (config = {}) => {
        const pageId = config.id || document.body?.dataset.learnPage;
        if (!pageId) {
            return;
        }
        const metaPage = getMetaPage(pageId);
        if (!metaPage) {
            return;
        }
        renderNav(pageId);
        const eyebrowText = pageId === LEARN_SERIES.overview.id ? LEARN_SERIES.eyebrow : metaPage.title;
        setText("[data-learn-eyebrow]", eyebrowText);
        const baseTitle = `PyPie - ${LEARN_SERIES.title}`;
        document.title =
            pageId === LEARN_SERIES.overview.id
                ? baseTitle
                : `${baseTitle}: ${metaPage.title}`;
        if (pageId === LEARN_SERIES.overview.id) {
            setHidden("[data-learn-title]", false);
            renderOverview(config.lead, config.callout);
            return;
        }
        const chapterMeta = LEARN_SERIES.pages.find((page) => page.id === pageId);
        if (!chapterMeta) {
            return;
        }
        setHidden("[data-learn-title]", true);
        setText("[data-learn-title]", "");
        setText("[data-learn-lead]", "");
        renderChapter(chapterMeta, config.dialog, pageId);
    };
    learnWindow.PYPIE_LEARN_RENDER = renderPage;
})();
