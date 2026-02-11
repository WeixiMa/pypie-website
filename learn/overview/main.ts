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
                "This tutorial is about writing programs for machine learning problems in the real world, with clarity and elegance.\n\n" +
                "Clarity is achieved by types. Types serve as annotations during authoring, to remind us the behavior of each module. " +
                "Types serve as contracts before programs run, to detect bugs early.\n\n" +
                "Elegance is achieved by abstractions. Abstractions enable reusing the core concepts while ignoring implementation details. " +
                "So programming becomes a pleasing experience that puts some creativity on top of a recurring pattern.\n\n" +
                "This tutorial is simply for programming. We hope readers with high school math knowledge may internalize all examples without difficulties. " +
                "We begin with types in chapter 1 and 2, focusing on tensor shapes and rank polymorphism. " +
                "Then we show how the core concepts apply to a linear regression model (chapter 3 & 4), a CNN, and an RNN.\n\n"
            ),
        ],
    });
})();
