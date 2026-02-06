(() => {
    const render = window.PYPIE_LEARN_RENDER;
    if (typeof render !== "function") {
        return;
    }

    render({
        id: "overview",
    });
})();
