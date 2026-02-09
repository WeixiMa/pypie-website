(() => {
    type LearnLink = {
        href: string;
        label: string;
    };

    type ThemeName = "theme-dark" | "theme-solaris";

    const THEME_STORAGE_KEY = "pypie.theme";

    const isThemeName = (value: unknown): value is ThemeName =>
        value === "theme-dark" || value === "theme-solaris";

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

    const container = document.querySelector("[data-top-actions]");
    if (!container) {
        return;
    }

    const getRootUrl = (): URL => {
        const currentScript = document.currentScript as HTMLScriptElement | null;
        if (currentScript && currentScript.src) {
            return new URL(".", currentScript.src);
        }
        return new URL("./", window.location.href);
    };

    const rootUrl = getRootUrl();
    const withRoot = (href: string): string => new URL(href, rootUrl).href;

    const links: LearnLink[] = [
        { href: withRoot("learn/overview/index.html"), label: "Deep Learning 101" },
        { href: withRoot("language-reference.html"), label: "Language Reference" },
        { href: withRoot("installation.html"), label: "Installation" },
    ];

    const linksMarkup = links
        .map((link) => `<a class="btn" href="${link.href}">${link.label}</a>`)
        .join("");

    container.innerHTML = `
        <div class="top-actions">
            ${linksMarkup}
            <button class="theme-toggle" id="theme-toggle" type="button" aria-label="To the light side!" title="To the light side!"></button>
        </div>
    `.trim();

    const themeToggle = container.querySelector("#theme-toggle");
    const root = document.body;

    const setTheme = (name: ThemeName): void => {
        root.classList.remove("theme-dark", "theme-solaris");
        root.classList.add(name);
        writeStoredTheme(name);
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

    setTheme(readStoredTheme() || "theme-dark");
})();
