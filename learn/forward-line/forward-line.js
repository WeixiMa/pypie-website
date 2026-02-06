(() => {
    const render = window.PYPIE_LEARN_RENDER;
    if (typeof render !== "function") {
        return;
    }
    const buildForwardLineBlock = (ast) => {
        const typeB = ast.varId("b", "int");
        const typeD = ast.varId("d", "int");
        const typeO = ast.varId("o", "int");
        return ast.block([
            ast.funcDef("forward_line", [
                ast.arg("x", ast.tensorType("float", [typeB, typeD])),
                ast.arg("w", ast.tensorType("float", [typeD, typeO])),
                ast.arg("bias", ast.tensorType("float", [typeO])),
            ], ast.tensorType("float", [typeB, typeO]), [
                ast.assign(ast.varId("y"), ast.binOp(ast.call(ast.attr(ast.varId("x"), "matmul"), [ast.varId("w")]), "+", ast.varId("bias"))),
                ast.ret(ast.varId("y")),
            ]),
        ]);
    };
    const exprBlock = (ast, expr) => ast.block([ast.exprStmt(expr)]);
    render({
        id: "forward-line",
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
                buildCodeBlock: (ast) => exprBlock(ast, ast.binOp(ast.call(ast.attr(ast.varId("x"), "matmul"), [ast.varId("w")]), "+", ast.varId("bias"))),
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
                buildCodeBlock: (ast) => exprBlock(ast, ast.listExpr([ast.varId("d", "int"), ast.varId("o", "int")])),
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
                buildCodeBlock: (ast) => exprBlock(ast, ast.listExpr([ast.varId("b", "int"), ast.varId("o", "int")])),
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
                codeLabel: "Linear forward pass",
                buildCodeBlock: buildForwardLineBlock,
            },
        ],
    });
})();
