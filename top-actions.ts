(() => {
    type LearnLink = {
        href: string;
        label: string;
    };

    type ThemeName = "theme-dark" | "theme-solaris";

    const THEME_STORAGE_KEY = "pypie.theme";
    const THEME_QUERY_PARAM = "theme";
    const THEME_CHANGE_EVENT = "pypie:theme-change";

    const isThemeName = (value: unknown): value is ThemeName =>
        value === "theme-dark" || value === "theme-solaris";

    const readThemeFromQuery = (): ThemeName | null => {
        try {
            const theme = new URL(window.location.href).searchParams.get(THEME_QUERY_PARAM);
            return isThemeName(theme) ? theme : null;
        } catch {
            return null;
        }
    };

    const readStoredTheme = (): ThemeName | null => {
        try {
            const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
            return isThemeName(stored) ? stored : null;
        } catch {
            return null;
        }
    };

    const writeStoredTheme = (theme: ThemeName): void => {
        try {
            window.localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch {
            // Ignore storage failures (private mode, quotas, etc.).
        }
    };

    const getRootUrl = (): URL => {
        const currentScript = document.currentScript as HTMLScriptElement | null;
        if (currentScript && currentScript.src) {
            return new URL(".", currentScript.src);
        }
        return new URL("./", window.location.href);
    };

    const rootUrl = getRootUrl();
    const withRoot = (href: string): string => new URL(href, rootUrl).href;
    const withThemeParam = (href: string, theme: ThemeName): string => {
        const themedUrl = new URL(href, rootUrl);
        themedUrl.searchParams.set(THEME_QUERY_PARAM, theme);
        return themedUrl.href;
    };

    const syncLocationTheme = (theme: ThemeName): void => {
        try {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set(THEME_QUERY_PARAM, theme);
            window.history.replaceState(
                window.history.state,
                "",
                `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`
            );
        } catch {
            // Ignore URL synchronization failures.
        }
    };

    const links: LearnLink[] = [
        { href: withRoot("learn/overview/index.html"), label: "Deep Learning 101" },
        { href: withRoot("language-reference.html"), label: "Language Reference" },
        { href: withRoot("installation.html"), label: "Installation" },
    ];

    const syncTopActionLinks = (theme: ThemeName): void => {
        const topActionLinks = document.querySelectorAll<HTMLAnchorElement>(
            '[data-top-actions] a[data-theme-link="true"]'
        );
        topActionLinks.forEach((link) => {
            const baseHref = link.dataset.baseHref;
            if (!baseHref) {
                return;
            }
            link.href = withThemeParam(baseHref, theme);
        });
    };

    const renderTopActions = (theme: ThemeName): HTMLButtonElement | null => {
        const container = document.querySelector("[data-top-actions]");
        if (!container) {
            return null;
        }

        const linksMarkup = links
            .map(
                (link) =>
                    `<a class="btn" data-theme-link="true" data-base-href="${link.href}" href="${withThemeParam(
                        link.href,
                        theme
                    )}">${link.label}</a>`
            )
            .join("");

        container.innerHTML = `
        <div class="top-actions">
            ${linksMarkup}
            <button class="theme-toggle" id="theme-toggle" type="button" aria-label="To the light side!" title="To the light side!"></button>
        </div>
    `.trim();

        return container.querySelector<HTMLButtonElement>("#theme-toggle");
    };

    const notifyThemeChange = (theme: ThemeName): void => {
        window.dispatchEvent(
            new CustomEvent(THEME_CHANGE_EVENT, {
                detail: { theme },
            })
        );
    };

    const initialTheme = readThemeFromQuery() || readStoredTheme() || "theme-dark";
    const themeToggle = renderTopActions(initialTheme);
    const root = document.body;
    if (!root) {
        return;
    }

    const setTheme = (name: ThemeName): void => {
        root.classList.remove("theme-dark", "theme-solaris");
        root.classList.add(name);
        writeStoredTheme(name);
        syncLocationTheme(name);
        syncTopActionLinks(name);
        notifyThemeChange(name);
        if (themeToggle) {
            const label = name === "theme-solaris" ? "To the dark side!" : "To the light side!";
            themeToggle.setAttribute("aria-label", label);
            themeToggle.setAttribute("title", label);
        }
    };

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isSolaris = root.classList.contains("theme-solaris");
            setTheme(isSolaris ? "theme-dark" : "theme-solaris");
        });
    }

    setTheme(initialTheme);
})();
