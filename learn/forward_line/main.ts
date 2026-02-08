(() => {
    type Side = "left" | "right";
    type AstApi = unknown;

    type LearnDialogMessage = {
        side: Side;
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

    const message = (speaker: "D" | "W", text: string): LearnDialogMessage => ({
        side: speaker === "W" ? "right" : "left",
        speaker,
        text,
    });

    const lineDefinitionBlock = {
        kind: "Block",
        body: [
            {
                kind: "ExprStmt",
                value: {
                    kind: "Identifier",
                    name: "from pypie import op, Tensor",
                    role: "plain",
                },
            },
            {
                kind: "ExprStmt",
                value: {
                    kind: "Identifier",
                    name: "from typing import Tuple",
                    role: "plain",
                },
            },
            {
                kind: "ExprStmt",
                value: {
                    kind: "Identifier",
                    name: "",
                    role: "plain",
                },
            },
            {
                kind: "FunctionDef",
                name: {
                    kind: "Identifier",
                    name: "line",
                    role: "fn",
                },
                args: [
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "x",
                            role: "var",
                        },
                        annotation: {
                            kind: "Identifier",
                            name: "float",
                            role: "type",
                        },
                    },
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "params",
                            role: "var",
                        },
                        annotation: {
                            kind: "TypeSubscript",
                            base: {
                                kind: "Identifier",
                                name: "Tuple",
                                role: "type",
                            },
                            index: {
                                kind: "TypeList",
                                items: [
                                    {
                                        kind: "Identifier",
                                        name: "float",
                                        role: "type",
                                    },
                                    {
                                        kind: "Identifier",
                                        name: "float",
                                        role: "type",
                                    },
                                ],
                            },
                        },
                    },
                ],
                returns: {
                    kind: "Identifier",
                    name: "float",
                    role: "type",
                },
                decorator: {
                    kind: "Identifier",
                    name: "op",
                    role: "fn",
                },
                body: [
                    {
                        kind: "Assign",
                        target: {
                            kind: "Identifier",
                            name: "w",
                            role: "var",
                        },
                        value: {
                            kind: "Subscript",
                            value: {
                                kind: "Identifier",
                                name: "params",
                                role: "var",
                            },
                            index: {
                                kind: "Number",
                                value: "0",
                            },
                        },
                    },
                    {
                        kind: "Assign",
                        target: {
                            kind: "Identifier",
                            name: "b",
                            role: "var",
                        },
                        value: {
                            kind: "Subscript",
                            value: {
                                kind: "Identifier",
                                name: "params",
                                role: "var",
                            },
                            index: {
                                kind: "Number",
                                value: "1",
                            },
                        },
                    },
                    {
                        kind: "Assign",
                        target: {
                            kind: "Identifier",
                            name: "y",
                            role: "var",
                        },
                        value: {
                            kind: "BinOp",
                            left: {
                                kind: "BinOp",
                                left: {
                                    kind: "Identifier",
                                    name: "w",
                                    role: "var",
                                },
                                op: "*",
                                right: {
                                    kind: "Identifier",
                                    name: "x",
                                    role: "var",
                                },
                            },
                            op: "+",
                            right: {
                                kind: "Identifier",
                                name: "b",
                                role: "var",
                            },
                        },
                    },
                    {
                        kind: "Return",
                        value: {
                            kind: "Identifier",
                            name: "y",
                            role: "var",
                        },
                    },
                ],
            },
        ],
    };

    render({
        id: "forward-line",
        dialog: [
            message(
                "D",
                "We are ready to define some functions!"
            ),
            message(
                "W",
                "Finally!"
            ),
            {
                ...message(
                    "D",
                    "Here's our first function. It's called `line`."
                ),
                codeLabel: "`line` definition",
                buildCodeBlock: (_ast: AstApi) => lineDefinitionBlock,
            },
            message(
                "W",
                "To define `line`, we have imported things from elsewhere?"
            ),
            message(
                "D",
                "Yes, we imported from existing Python libraries. " +
                "`pypie` is our own library that provides tools for tensor programming and deep learning. " +
                "`typing` is Python's built-in library for type annotations.\n" +
                "Here, `Tuple` is another way to group values together. It tells us that `params` always contain two `float`s."
            ),
            message(
                "W",
                "How about the **`op`** imported from `pypie`?"
            ),
            message(
                "D",
                "With `@op`, the following Python `def`inition becomes special to us. " +
                "Most importantly, that Python `def` uses rank polymorphism. " +
                "Later, when `pypie` runs this `def`, it optimizes the run with parallelism."
            ),
            message(
                "W",
                "`line`'s `def` makes sense to me. We give names to the `float`s in `params`: `w` and `b`. " +
                "Then we run some arithmetics on `w` `x` and `b`, call it `y`.\n" +
                "Do `return y` suggest that `y` is the result of `line`?"
            )
        ],
    });
})();
