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
                "Here we write programs for machine learning with PyPie. " +
                "We assume readers are familiar with high school math, and leave having built a linear regression model, a CNN, and an RNN.\n\n" +
                "Through these models, we show two principles that apply to real-world programming: clarity and elegance. " +
                "Clarity comes from PyPie's type system. It ensures predictable behavior and catches bugs before our code runs. " +
                "Elegance comes from abstractions: reusing core concepts while hiding low-level mechanics. " +
                "This lets we focus on creative and enjoyable work, trusting recurring patterns to handle the implementation details.\n\n" +
                "We believe in \"teaching by asking questions\" and \"learning it by building it.\" " +
                "Each chapter is organized as a dialog between a teacher and a student, containing questions, answers, and programs. " + 
                "To best internalize this tutorial, type in and run these programs in PyPie, as the conversation progresses.\n\n" +
                "PyPie is inspired by The Little Learner written by Friedman and Mendhekar, which gives the logical foundation " +
                "of PyPie's programming system. " + 
                "The CNN and RNN examples originate from Dive into Deep Learning, which dives into the detailed mathematics underlying these models."
            ),
        ],
    });
})();
