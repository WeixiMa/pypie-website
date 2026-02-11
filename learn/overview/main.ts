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
                "This tutorial trains programmers.\n\n" +
                "By working through three models--linear regression, CNN, and RNN--" +
                "we show how to write programs for machine learning, with types and abstraction. " +
                "Types give clarity to our programs and catch bugs before the programs run. " +
                "Abstraction lets us reuse core concepts while hiding low-level mechanics. " +
                "This allows us to focus on the creative and enjoyable parts, trusting recurring patterns to handle the less interesting details.\n\n" +
                "These fundamental principles are simple to demonstrate and require little prior background: " +
                "high school math is sufficient and first-time programmers are encouraged to join. " +
                "We, however, ask for patience and hands-on practice: fully explore every chapter and learn by building. " +
                "Each chapter is a dialog between a teacher and a student, with questions, answers, and programs. " + 
                "As you are enjoying the dialogs, internalize them by typing in and running the programs in PyPie.\n\n" +
                "Now let's welcome our teacher."
            ),
        ],
    });
})();
