(() => {
    const container = document.querySelector("[data-top-actions]");
    if (!container) {
        return;
    }

    const links = [
        { href: "learn.html", label: "Deep Learning 101" },
        { href: "language-reference.html", label: "Language Reference" },
        { href: "installation.html", label: "Installation" }
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
