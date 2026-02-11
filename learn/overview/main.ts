(() => {
    type LearnPageConfig = {
        id: string;
        dialog: LearnDialogMessage[];
        notes?: string;
    };

    type Side = "left" | "right";

    type LearnDialogMessage = {
        side: Side;
        speaker: string;
        text: string;
    };

    type LearnRender = (config: LearnPageConfig) => void;

    type LearnWindow = Window & {
        PYPIE_LEARN_RENDER?: LearnRender;
    };

    const render = (window as LearnWindow).PYPIE_LEARN_RENDER;
    if (typeof render !== "function") {
        return;
    }

    const message = (speaker: "D" | "W", text: string): LearnDialogMessage => ({
        side: speaker === "W" ? "right" : "left",
        speaker,
        text,
    });

    render({
        id: "prelude",
        dialog: [
            message(
                "W",
                "This tutorial is about writing programs for machine learning using `pypie`. "+
                "We assume readers come with a high school math background and " +
                "walk away after building a linear regression model, a CNN, and an RNN.\n\n" +
                "More than these three models, we help readers to internalize the underlying principles that apply to real world problems: clairity and elegance.\n\n" +
                "Clarity is achieved by types. Types serve as annotations during authoring, to remind us the behavior of each module. " +
                "Types serve as contracts before programs run, to detect bugs early.\n\n" +
                "Elegance is achieved by abstractions. Abstractions enable reusing the core concepts while ignoring implementation details. " +
                "So programming becomes a pleasing experience that puts some creativity on top of a recurring pattern.\n\n"
            ),
        ],
    });
})();
