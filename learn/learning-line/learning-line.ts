(() => {
    type AstApi = any;

    type LearnDialogMessage = {
        side: "left" | "right";
        speaker: string;
        text: string;
        codeClass?: string;
        codeLabel?: string;
        buildCodeBlock?: (ast: AstApi) => unknown;
    };

    type LearnSectionConfig = {
        id: string;
        title: string;
        body: string;
        codeClass?: string;
        dialog: LearnDialogMessage[];
    };

    type LearnPageConfig = {
        id: string;
        lead: string;
        section: LearnSectionConfig;
        buildBlock?: (ast: AstApi) => unknown;
    };

    type LearnRender = (config: LearnPageConfig) => void;

    type LearnWindow = Window & {
        PYPIE_LEARN_RENDER?: LearnRender;
    };

    const render = (window as LearnWindow).PYPIE_LEARN_RENDER;
    if (typeof render !== "function") {
        return;
    }

    const buildLearningLineBlock = (ast: AstApi) => {
        const typeB = ast.varId("b", "int");
        const typeD = ast.varId("d", "int");
        const typeO = ast.varId("o", "int");

        return ast.block([
            ast.funcDef(
                "train_step",
                [
                    ast.arg("x", ast.tensorType("float", [typeB, typeD])),
                    ast.arg("y", ast.tensorType("float", [typeB, typeO])),
                    ast.arg("w", ast.tensorType("float", [typeD, typeO])),
                    ast.arg("bias", ast.tensorType("float", [typeO])),
                    ast.arg("lr", ast.typeId("float"), "float"),
                ],
                ast.tensorType("float", [typeD, typeO]),
                [
                    ast.assign(
                        ast.varId("pred"),
                        ast.binOp(
                            ast.call(ast.attr(ast.varId("x"), "matmul"), [ast.varId("w")]),
                            "+",
                            ast.varId("bias"),
                        ),
                    ),
                    ast.assign(ast.varId("error"), ast.binOp(ast.varId("pred"), "-", ast.varId("y"))),
                    ast.assign(
                        ast.varId("grad"),
                        ast.call(ast.attr(ast.attr(ast.varId("x"), "T"), "matmul"), [ast.varId("error")]),
                    ),
                    ast.assign(
                        ast.varId("w_next"),
                        ast.binOp(
                            ast.varId("w"),
                            "-",
                            ast.binOp(ast.varId("lr", "float"), "*", ast.varId("grad")),
                        ),
                    ),
                    ast.ret(ast.varId("w_next")),
                ],
            ),
        ]);
    };

    const stmtBlock = (ast: AstApi, statement: unknown) => ast.block([statement]);

    render({
        id: "learning-line",
        lead: "Training a line means nudging weights in the direction of lower error. This chapter uses turn-by-turn dialogue to explain one training step.",
        section: {
            id: "gradient-step",
            title: "Gradient Step Chat",
            body: "Follow the conversation from prediction to update.",
            codeClass: "learning-line-code",
            dialog: [
                {
                    side: "left",
                    speaker: "Learner",
                    text: "How does the model learn from one batch?",
                },
                {
                    side: "right",
                    speaker: "Guide",
                    text: "Predict, measure error, compute gradient, then update.",
                },
                {
                    side: "left",
                    speaker: "Learner",
                    text: "What is the error expression?",
                },
                {
                    side: "right",
                    speaker: "Guide",
                    text: "Use this:",
                    codeLabel: "Error expression",
                    buildCodeBlock: (ast: AstApi) =>
                        stmtBlock(
                            ast,
                            ast.assign(
                                ast.varId("error"),
                                ast.binOp(ast.varId("pred"), "-", ast.varId("y")),
                            ),
                        ),
                },
                {
                    side: "left",
                    speaker: "Learner",
                    text: "How do we compute the gradient?",
                },
                {
                    side: "right",
                    speaker: "Guide",
                    text: "Compute it like this:",
                    codeLabel: "Gradient expression",
                    buildCodeBlock: (ast: AstApi) =>
                        stmtBlock(
                            ast,
                            ast.assign(
                                ast.varId("grad"),
                                ast.call(
                                    ast.attr(ast.attr(ast.varId("x"), "T"), "matmul"),
                                    [ast.varId("error")],
                                ),
                            ),
                        ),
                },
                {
                    side: "left",
                    speaker: "Learner",
                    text: "How are weights updated?",
                },
                {
                    side: "right",
                    speaker: "Guide",
                    text: "Update step:",
                    codeLabel: "Weight update",
                    buildCodeBlock: (ast: AstApi) =>
                        stmtBlock(
                            ast,
                            ast.assign(
                                ast.varId("w_next"),
                                ast.binOp(
                                    ast.varId("w"),
                                    "-",
                                    ast.binOp(ast.varId("lr", "float"), "*", ast.varId("grad")),
                                ),
                            ),
                        ),
                },
                {
                    side: "left",
                    speaker: "Learner",
                    text: "Can I see the full step?",
                },
                {
                    side: "right",
                    speaker: "Guide",
                    text: "Here is the complete training-step function:",
                    codeClass: "learning-line-code",
                    codeLabel: "Linear train step",
                },
            ],
        },
        buildBlock: buildLearningLineBlock,
    });
})();
