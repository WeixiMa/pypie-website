(() => {
    type Side = "left" | "right";
    type AstBuilder = (ast: unknown) => unknown;

    type DialogSegment = {
        kind: "text" | "code";
        value: string;
    };

    type RenderedMessageText = {
        html: string;
        keywords: Set<string>;
    };

    type RenderedDialog = {
        html: string;
        keywords: Set<string>;
        keywordTargets: Map<string, string>;
    };

    type LearnPageMeta = {
        slug: string;
    };

    type LearnNavPage = {
        id: string;
        slug: string;
        navTitle: string;
    };

    type LearnDialogMessage = {
        side?: Side;
        speaker?: string;
        text?: string;
        codeClass?: string;
        codeLabel?: string;
        buildCodeBlock?: AstBuilder;
    };

    type LearnPageConfig = {
        id?: string;
        dialog?: LearnDialogMessage[];
    };

    type RenderBlock = {
        selector: string;
        block: unknown;
    };

    type LearnWindow = Window & {
        PYPIE_AST?: unknown;
        PYPIE_SET_BLOCKS?: (blocks: RenderBlock[]) => void;
        PYPIE_LEARN_RENDER?: (config?: LearnPageConfig) => void;
    };

    type LearnSeries = {
        title: string;
        preludeSlug: string;
        pages: LearnPageMeta[];
    };

    const learnWindow = window as LearnWindow;

    const getLearnRootUrl = (): URL => {
        const currentScript = document.currentScript as HTMLScriptElement | null;
        if (currentScript && currentScript.src) {
            return new URL(".", currentScript.src);
        }
        return new URL("../", window.location.href);
    };

    const learnRootUrl = getLearnRootUrl();
    const withLearnRoot = (href: string): string => new URL(href, learnRootUrl).href;

    const LEARN_SERIES: LearnSeries = {
        title: "Deep Learning 101",
        preludeSlug: "overview/index.html",
        pages: [
            {
                slug: "types/index.html",
            },
            {
                slug: "tensor_ops/index.html",
            },
        ],
    };

    const PRELUDE_PAGE_ID = "prelude";

    const pageIdFromSlug = (slug: string): string => {
        const firstPathSegment = String(slug).split("/")[0] || "";
        return firstPathSegment === "overview" ? PRELUDE_PAGE_ID : firstPathSegment;
    };

    const formatPageTitle = (pageId: string): string =>
        String(pageId)
            .split("-")
            .filter((segment) => segment.length > 0)
            .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
            .join(" ");

    const getAllPages = (): LearnNavPage[] => {
        const allSlugs = [LEARN_SERIES.preludeSlug, ...LEARN_SERIES.pages.map((page) => page.slug)];
        return allSlugs.map((slug, index) => {
            const id = pageIdFromSlug(slug);
            return {
                id,
                slug,
                navTitle: `${index}. ${formatPageTitle(id)}`,
            };
        });
    };

    const getNavPageById = (pageId: string): LearnNavPage | null => {
        const normalized = String(pageId || "").trim().toLowerCase();
        if (!normalized) {
            return null;
        }

        const allPages = getAllPages();
        return allPages.find((page) => page.id.toLowerCase() === normalized) || null;
    };

    const setText = (selector: string, value?: string): void => {
        const element = document.querySelector(selector);
        if (element && value !== undefined) {
            element.textContent = value;
        }
    };

    const setHidden = (selector: string, hidden: boolean): void => {
        const element = document.querySelector(selector);
        if (element) {
            element.toggleAttribute("hidden", hidden);
        }
    };

    const setMarginTop = (selector: string, value: string): void => {
        const element = document.querySelector(selector) as HTMLElement | null;
        if (element) {
            element.style.marginTop = value;
        }
    };

    const escapeHtml = (value: string): string =>
        String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    const formatBoldText = (text: string): string => {
        const escaped = escapeHtml(String(text || ""));
        return escaped
            .replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>")
            .replace(/\*([^*\n]+)\*/g, "<strong>$1</strong>");
    };

    const formatInlineCode = (text: string): string =>
        String(text || "")
            .split("`")
            .map((part, index) =>
                index % 2 === 1 ? `<code>${escapeHtml(part)}</code>` : formatBoldText(part)
            )
            .join("");

    const collectKeywordsFromText = (text: string): Set<string> => {
        const keywords = new Set<string>();
        const keywordRegex = /\*\*([^*\n]+)\*\*/g;
        let match: RegExpExecArray | null = null;

        while ((match = keywordRegex.exec(String(text || ""))) !== null) {
            const keyword = String(match[1] || "").trim();
            if (keyword) {
                keywords.add(keyword);
            }
        }

        return keywords;
    };

    const mergeKeywordSets = (target: Set<string>, source: Set<string>): void => {
        source.forEach((keyword) => target.add(keyword));
    };

    const sortKeywords = (keywords: Set<string>): string[] =>
        Array.from(keywords).sort((left, right) =>
            left.localeCompare(right, undefined, { sensitivity: "base" })
        );

    const renderKeywordList = (keywords: Set<string>, keywordTargets: Map<string, string>): string => {
        const sortedKeywords = sortKeywords(keywords);
        if (sortedKeywords.length === 0) {
            return '<li class="keyword-panel__item keyword-panel__item--empty">No keywords yet.</li>';
        }

        return sortedKeywords
            .map((keyword) => {
                const targetId = keywordTargets.get(keyword);
                if (!targetId) {
                    return `<li class="keyword-panel__item"><code>${escapeHtml(keyword)}</code></li>`;
                }

                return `<li class="keyword-panel__item"><a class="keyword-panel__link" href="#${escapeHtml(
                    targetId
                )}"><code>${escapeHtml(keyword)}</code></a></li>`;
            })
            .join("");
    };

    const trimFenceEdgeNewlines = (text: string): string => {
        let value = String(text || "");
        if (value.startsWith("\n")) {
            value = value.slice(1);
        }
        if (value.endsWith("\n")) {
            value = value.slice(0, -1);
        }
        return value;
    };

    const renderTextParagraphs = (text: string): string =>
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

    const renderMessageText = (text: string): RenderedMessageText => {
        const source = String(text || "");
        if (!source) {
            return {
                html: "",
                keywords: new Set<string>(),
            };
        }

        const fenceRegex = /```([\s\S]*?)```/g;
        const segments: DialogSegment[] = [];
        let cursor = 0;
        let match: RegExpExecArray | null = null;

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

        const keywords = new Set<string>();
        const html = segments
            .map((segment) => {
                if (segment.kind === "code") {
                    return `<pre class="doc-code chat-bubble__fenced-code" data-code-ignore="true"><code>${escapeHtml(
                        segment.value
                    )}</code></pre>`;
                }
                mergeKeywordSets(keywords, collectKeywordsFromText(segment.value));
                return renderTextParagraphs(segment.value);
            })
            .join("");

        return {
            html,
            keywords,
        };
    };

    const getDialogCodeClass = (pageId: string, index: number): string =>
        `chat-code-${pageId}-${index}`;

    const normalizeDomIdToken = (value: string): string =>
        String(value || "")
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9_-]+/g, "-")
            .replace(/^-+|-+$/g, "");

    const getDialogBubbleId = (pageId: string, index: number): string => {
        const normalizedPageId = normalizeDomIdToken(pageId) || "learn";
        return `chat-bubble-${normalizedPageId}-${index + 1}`;
    };

    const renderDialog = (dialog: LearnDialogMessage[] = [], pageId = ""): RenderedDialog => {
        const keywords = new Set<string>();
        const keywordTargets = new Map<string, string>();
        const html = dialog
            .map((message, index) => {
                const side: Side = message.side === "right" ? "right" : "left";
                const bubbleNumber = `<span class="chat-bubble__index">${index + 1}</span>`;
                const bubbleId = getDialogBubbleId(pageId, index);
                const speaker = message.speaker
                    ? `<p class="chat-bubble__speaker">${escapeHtml(message.speaker)}</p>`
                    : "";
                const renderedText = message.text ? renderMessageText(message.text) : null;
                if (renderedText) {
                    mergeKeywordSets(keywords, renderedText.keywords);
                    renderedText.keywords.forEach((keyword) => {
                        if (!keywordTargets.has(keyword)) {
                            keywordTargets.set(keyword, bubbleId);
                        }
                    });
                }
                const text = renderedText ? renderedText.html : "";
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

                return `<div class="chat-row chat-row--${side}"><article id="${escapeHtml(
                    bubbleId
                )}" class="chat-bubble chat-bubble--${side}">${bubbleNumber}${speaker}${text}${code}</article></div>`;
            })
            .join("");

        return {
            html,
            keywords,
            keywordTargets,
        };
    };

    const renderNav = (pageId: string): void => {
        const nav = document.querySelector("[data-learn-nav]");
        if (!nav) {
            return;
        }

        const allPages = getAllPages();
        const navLinks = allPages
            .map((page) => {
                const currentAttr = page.id === pageId ? ' aria-current="page"' : "";
                return `<a href="${withLearnRoot(page.slug)}"${currentAttr}>${page.navTitle}</a>`;
            })
            .join("");

        nav.innerHTML = `<div class="doc-nav__title">${LEARN_SERIES.title}</div>${navLinks}`;
    };

    const renderChapter = (dialogMessages: LearnDialogMessage[] = [], pageId: string): void => {
        setMarginTop("[data-learn-section]", "0");

        const section = document.querySelector("[data-learn-section]");
        if (!section) {
            return;
        }

        section.id = pageId;

        const sectionTitle = section.querySelector("[data-learn-section-title]");
        if (sectionTitle) {
            sectionTitle.toggleAttribute("hidden", true);
            sectionTitle.textContent = "";
        }

        const sectionBody = section.querySelector("[data-learn-section-body]");
        if (sectionBody) {
            sectionBody.toggleAttribute("hidden", true);
            sectionBody.textContent = "";
        }

        const renderedDialog = renderDialog(dialogMessages, pageId);

        const dialog = section.querySelector("[data-learn-dialog]");
        if (dialog) {
            dialog.innerHTML = renderedDialog.html;
        }

        const keywords = document.querySelector("[data-learn-keywords]");
        if (keywords) {
            keywords.innerHTML = renderKeywordList(renderedDialog.keywords, renderedDialog.keywordTargets);
        }

        const ast = learnWindow.PYPIE_AST;
        const setBlocks = learnWindow.PYPIE_SET_BLOCKS;
        if (ast && typeof setBlocks === "function") {
            const blocks: RenderBlock[] = [];

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

    const renderPage = (config: LearnPageConfig = {}): void => {
        const pageId = config.id || document.body?.dataset.learnPage;
        if (!pageId) {
            return;
        }

        const currentBodyPageId = document.body?.dataset.learnPage || pageId;
        renderNav(currentBodyPageId);

        const currentNavPage = getNavPageById(currentBodyPageId) || getNavPageById(pageId);
        const renderedTitle = currentNavPage ? currentNavPage.navTitle : formatPageTitle(pageId);
        setText("[data-learn-eyebrow]", renderedTitle);

        const baseTitle = `PyPie - ${LEARN_SERIES.title}`;
        const documentTitle = currentNavPage ? formatPageTitle(currentNavPage.id) : formatPageTitle(pageId);
        document.title = `${baseTitle}: ${documentTitle}`;

        setHidden("[data-learn-title]", true);
        setHidden("[data-learn-lead]", true);
        setText("[data-learn-title]", "");
        setText("[data-learn-lead]", "");
        renderChapter(config.dialog, pageId);
    };

    learnWindow.PYPIE_LEARN_RENDER = renderPage;
})();
