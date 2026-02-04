(() => {
    const container = document.querySelector("[data-top-actions]");
    if (!container) {
        return;
    }

    const getRootUrl = () => {
        if (document.currentScript && document.currentScript.src) {
            return new URL(".", document.currentScript.src);
        }
        return new URL("./", window.location.href);
    };

    const rootUrl = getRootUrl();
    const withRoot = (href) => new URL(href, rootUrl).href;

    const links = [
        { href: withRoot("learn/index.html"), label: "Deep Learning 101" },
        { href: withRoot("language-reference.html"), label: "Language Reference" },
        { href: withRoot("installation.html"), label: "Installation" }
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
    const setTheme = (name) => {
        root.classList.remove("theme-dark", "theme-solaris");
        root.classList.add(name);
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

    setTheme("theme-dark");
})();
