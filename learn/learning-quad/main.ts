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

    type LearnPageConfig = {
        id: string;
        dialog: LearnDialogMessage[];
        notes?: string;
    };

    type LearnRender = (config: LearnPageConfig) => void;

    type LearnWindow = Window & {
        PYPIE_LEARN_RENDER?: LearnRender;
    };

    const render = (window as LearnWindow).PYPIE_LEARN_RENDER;
    if (typeof render !== "function") {
        return;
    }

    const buildLearningQuadBlock = (ast: AstApi) => {
        const typeB = ast.varId("b", "int");

        return ast.block([
            ast.funcDef(
                "quad",
                [
                    ast.arg("x", ast.tensorType("float", [typeB])),
                    ast.arg("a", ast.typeId("float"), "float"),
                    ast.arg("b", ast.typeId("float"), "float"),
                    ast.arg("c", ast.typeId("float"), "float"),
                ],
                ast.tensorType("float", [typeB]),
                [
                    ast.ret(
                        ast.binOp(
                            ast.binOp(
                                ast.binOp(
                                    ast.varId("a", "float"),
                                    "*",
                                    ast.binOp(ast.varId("x"), "*", ast.varId("x")),
                                ),
                                "+",
                                ast.binOp(ast.varId("b", "float"), "*", ast.varId("x")),
                            ),
                            "+",
                            ast.varId("c", "float"),
                        ),
                    ),
                ],
            ),
        ]);
    };

    const exprBlock = (ast: AstApi, expr: unknown) => ast.block([ast.exprStmt(expr)]);

    render({
        id: "learning-quad",
        dialog: [
            {
                side: "left",
                speaker: "Learner",
                text: "What if the relationship is curved instead of linear?",
            },
            {
                side: "right",
                speaker: "Guide",
                text: "Use this quadratic expression:",
                codeLabel: "Quadratic formula",
                buildCodeBlock: (ast: AstApi) =>
                    exprBlock(
                        ast,
                        ast.binOp(
                            ast.binOp(
                                ast.binOp(
                                    ast.varId("a", "float"),
                                    "*",
                                    ast.binOp(ast.varId("x"), "*", ast.varId("x")),
                                ),
                                "+",
                                ast.binOp(ast.varId("b", "float"), "*", ast.varId("x")),
                            ),
                            "+",
                            ast.varId("c", "float"),
                        ),
                    ),
            },
            {
                side: "left",
                speaker: "Learner",
                text: "Can this still run on a batch?",
            },
            {
                side: "right",
                speaker: "Guide",
                text: "Yes. Input and output keep the same batch axis:",
                codeLabel: "Batched axis",
                buildCodeBlock: (ast: AstApi) => exprBlock(ast, ast.listExpr([ast.varId("b", "int")])),
            },
            {
                side: "left",
                speaker: "Learner",
                text: "Why keep types visible here too?",
            },
            {
                side: "right",
                speaker: "Guide",
                text: "Type annotations catch shape mistakes before runtime.",
            },
            {
                side: "left",
                speaker: "Learner",
                text: "Show me the full function.",
            },
            {
                side: "right",
                speaker: "Guide",
                text: "Here is the batched quadratic definition:",
                codeLabel: "Quadratic forward model",
                buildCodeBlock: buildLearningQuadBlock,
            },
        ],
    });
})();
