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

    const buildForwardLineBlock = (ast: AstApi) => {
        const typeB = ast.varId("b", "int");
        const typeD = ast.varId("d", "int");
        const typeO = ast.varId("o", "int");

        return ast.block([
            ast.funcDef(
                "forward_line",
                [
                    ast.arg("x", ast.tensorType("float", [typeB, typeD])),
                    ast.arg("w", ast.tensorType("float", [typeD, typeO])),
                    ast.arg("bias", ast.tensorType("float", [typeO])),
                ],
                ast.tensorType("float", [typeB, typeO]),
                [
                    ast.assign(
                        ast.varId("y"),
                        ast.binOp(
                            ast.call(ast.attr(ast.varId("x"), "matmul"), [ast.varId("w")]),
                            "+",
                            ast.varId("bias"),
                        ),
                    ),
                    ast.ret(ast.varId("y")),
                ],
            ),
        ]);
    };

    const exprBlock = (ast: AstApi, expr: unknown) => ast.block([ast.exprStmt(expr)]);

    render({
        id: "forward-line",
        lead: "A single linear layer maps inputs into a new space. This page explains the forward pass in a dialogue format.",
        section: {
            id: "forward-pass",
            title: "Forward Pass Chat",
            body: "The left side asks and the right side answers with code-ready statements.",
            codeClass: "forward-line-code",
            dialog: [
                {
                    side: "left",
                    speaker: "Learner",
                    text: "How do we build one linear layer?",
                },
                {
                    side: "right",
                    speaker: "Guide",
                    text: "Use this expression:",
                    codeLabel: "Linear expression",
                    buildCodeBlock: (ast: AstApi) =>
                        exprBlock(
                            ast,
                            ast.binOp(
                                ast.call(ast.attr(ast.varId("x"), "matmul"), [ast.varId("w")]),
                                "+",
                                ast.varId("bias"),
                            ),
                        ),
                },
                {
                    side: "left",
                    speaker: "Learner",
                    text: "Why is w shaped as d by o?",
                },
                {
                    side: "right",
                    speaker: "Guide",
                    text: "Input has d features and output wants o features.",
                    codeLabel: "Weight shape",
                    buildCodeBlock: (ast: AstApi) =>
                        exprBlock(
                            ast,
                            ast.listExpr([ast.varId("d", "int"), ast.varId("o", "int")]),
                        ),
                },
                {
                    side: "left",
                    speaker: "Learner",
                    text: "What shape comes out?",
                },
                {
                    side: "right",
                    speaker: "Guide",
                    text: "Output keeps batch size and uses output width:",
                    codeLabel: "Output shape",
                    buildCodeBlock: (ast: AstApi) =>
                        exprBlock(
                            ast,
                            ast.listExpr([ast.varId("b", "int"), ast.varId("o", "int")]),
                        ),
                },
                {
                    side: "left",
                    speaker: "Learner",
                    text: "Is that the whole forward pass?",
                },
                {
                    side: "right",
                    speaker: "Guide",
                    text: "Yes. Dense layers start from exactly this pattern:",
                    codeClass: "forward-line-code",
                    codeLabel: "Linear forward pass",
                },
            ],
        },
        buildBlock: buildForwardLineBlock,
    });
})();
