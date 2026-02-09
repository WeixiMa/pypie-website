(() => {
    type Side = "left" | "right";
    type AstApi = unknown;

    type LearnDialogMessage = {
        side: Side;
        speaker: string;
        text: string;
        textAfterCode?: string;
        figureSrc?: string;
        figureAlt?: string;
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
                    kind: "TypeSubscript",
                    base: {
                        kind: "TypeSubscript",
                        base: {
                            kind: "Identifier",
                            name: "Tensor",
                            role: "type",
                        },
                        index: {
                            kind: "Identifier",
                            name: "float",
                            role: "type",
                        },
                    },
                    index: {
                        kind: "TypeList",
                        items: [
                            {
                                kind: "TypeList",
                                items: [
                                    {
                                        kind: "Identifier",
                                        name: "n",
                                        role: "var",
                                        type: "int",
                                    },
                                ],
                            },
                        ],
                    },
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

    const wrongLineDefinitionBlock = {
        kind: "Block",
        body: [
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
                    name: "int",
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

    const lineWithParamsRunBlock = {
        kind: "Block",
        body: [
            {
                kind: "Assign",
                target: {
                    kind: "Identifier",
                    name: "params",
                    role: "var",
                },
                value: {
                    kind: "Tuple",
                    elements: [
                        {
                            kind: "Number",
                            value: "1.0",
                        },
                        {
                            kind: "Number",
                            value: "0.5",
                        },
                    ],
                },
            },
            {
                kind: "Assign",
                target: {
                    kind: "Identifier",
                    name: "xs",
                    role: "var",
                },
                value: {
                    kind: "Call",
                    callee: {
                        kind: "Identifier",
                        name: "Tensor",
                        role: "type",
                    },
                    args: [
                        {
                            kind: "List",
                            elements: [
                                {
                                    kind: "Number",
                                    value: "-4.2",
                                },
                                {
                                    kind: "Number",
                                    value: "1.0",
                                },
                                {
                                    kind: "Number",
                                    value: "1.5",
                                },
                                {
                                    kind: "Number",
                                    value: "3.0",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                kind: "Assign",
                target: {
                    kind: "Identifier",
                    name: "ys",
                    role: "var",
                },
                value: {
                    kind: "Call",
                    callee: {
                        kind: "Identifier",
                        name: "line",
                        role: "fn",
                    },
                    args: [
                        {
                            kind: "Identifier",
                            name: "xs",
                            role: "var",
                        },
                        {
                            kind: "Identifier",
                            name: "params",
                            role: "var",
                        },
                    ],
                },
            },
            {
                kind: "ExprStmt",
                value: {
                    kind: "Call",
                    callee: {
                        kind: "Identifier",
                        name: "print",
                        role: "plain",
                    },
                    args: [
                        {
                            kind: "Identifier",
                            name: "ys",
                            role: "var",
                        },
                    ],
                },
            },
        ],
    };

    const runningInitParams = {
        kind: "Block",
        body: [
            {
                kind: "Assign",
                target: {
                    kind: "Identifier",
                    name: "params",
                    role: "var",
                },
                value: {
                    kind: "Tuple",
                    elements: [
                        {
                            kind: "Number",
                            value: "0.0",
                        },
                        {
                            kind: "Number",
                            value: "0.0",
                        },
                    ],
                },
            },
            {
                kind: "Assign",
                target: {
                    kind: "Identifier",
                    name: "ys_pred",
                    role: "var",
                },
                value: {
                    kind: "Call",
                    callee: {
                        kind: "Identifier",
                        name: "line",
                        role: "fn",
                    },
                    args: [
                        {
                            kind: "Identifier",
                            name: "xs",
                            role: "var",
                        },
                        {
                            kind: "Identifier",
                            name: "params",
                            role: "var",
                        },
                    ],
                },
            },
            {
                kind: "ExprStmt",
                value: {
                    kind: "Call",
                    callee: {
                        kind: "Identifier",
                        name: "print",
                        role: "plain",
                    },
                    args: [
                        {
                            kind: "Identifier",
                            name: "ys_pred",
                            role: "var",
                        },
                    ],
                },
            },
        ],
    };

    const problematicMinus = {
        kind: "Block",
        body: [
            {
                kind: "ExprStmt",
                value: {
                    kind: "Identifier",
                    name: "from pypie import Var",
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
                kind: "Assign",
                target: {
                    kind: "Identifier",
                    name: "n",
                    role: "var",
                    type: "int",
                },
                value: {
                    kind: "Call",
                    callee: {
                        kind: "Identifier",
                        name: "Var",
                        role: "fn",
                    },
                    args: [
                        {
                            kind: "Identifier",
                            name: "\"n\"",
                            role: "plain",
                        },
                        {
                            kind: "Identifier",
                            name: "int",
                            role: "type",
                        },
                    ],
                },
            },
            {
                kind: "Assign",
                target: {
                    kind: "Identifier",
                    name: "m",
                    role: "var",
                    type: "int",
                },
                value: {
                    kind: "Call",
                    callee: {
                        kind: "Identifier",
                        name: "Var",
                        role: "fn",
                    },
                    args: [
                        {
                            kind: "Identifier",
                            name: "\"m\"",
                            role: "plain",
                        },
                        {
                            kind: "Identifier",
                            name: "int",
                            role: "type",
                        },
                    ],
                },
            },
            {
                kind: "FunctionDef",
                name: {
                    kind: "Identifier",
                    name: "bad_sub",
                    role: "fn",
                },
                args: [
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "ys_pred",
                            role: "var",
                        },
                        annotation: {
                            kind: "TypeSubscript",
                            base: {
                                kind: "TypeSubscript",
                                base: {
                                    kind: "Identifier",
                                    name: "Tensor",
                                    role: "type",
                                },
                                index: {
                                    kind: "Identifier",
                                    name: "float",
                                    role: "type",
                                },
                            },
                            index: {
                                kind: "TypeList",
                                items: [
                                    {
                                        kind: "TypeList",
                                        items: [
                                            {
                                                kind: "Identifier",
                                                name: "n",
                                                role: "var",
                                                type: "int",
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                    },
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "ys",
                            role: "var",
                        },
                        annotation: {
                            kind: "TypeSubscript",
                            base: {
                                kind: "TypeSubscript",
                                base: {
                                    kind: "Identifier",
                                    name: "Tensor",
                                    role: "type",
                                },
                                index: {
                                    kind: "Identifier",
                                    name: "float",
                                    role: "type",
                                },
                            },
                            index: {
                                kind: "TypeList",
                                items: [
                                    {
                                        kind: "TypeList",
                                        items: [
                                            {
                                                kind: "Identifier",
                                                name: "m",
                                                role: "var",
                                                type: "int",
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                    },
                ],
                returns: {
                    kind: "TypeSubscript",
                    base: {
                        kind: "TypeSubscript",
                        base: {
                            kind: "Identifier",
                            name: "Tensor",
                            role: "type",
                        },
                        index: {
                            kind: "Identifier",
                            name: "float",
                            role: "type",
                        },
                    },
                    index: {
                        kind: "TypeList",
                        items: [
                            {
                                kind: "TypeList",
                                items: [
                                    {
                                        kind: "Identifier",
                                        name: "n",
                                        role: "var",
                                        type: "int",
                                    },
                                ],
                            },
                        ],
                    },
                },
                decorator: {
                    kind: "Identifier",
                    name: "op",
                    role: "fn",
                },
                body: [
                    {
                        kind: "Return",
                        value: {
                            kind: "BinOp",
                            left: {
                                kind: "Identifier",
                                name: "ys_pred",
                                role: "var",
                            },
                            op: "-",
                            right: {
                                kind: "Identifier",
                                name: "ys",
                                role: "var",
                            },
                        },
                    },
                ],
            },
        ],
    };

    const correctMinus = {
        kind: "Block",
        body: [
            {
                kind: "FunctionDef",
                name: {
                    kind: "Identifier",
                    name: "good_sub",
                    role: "fn",
                },
                args: [
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "ys_pred",
                            role: "var",
                        },
                        annotation: {
                            kind: "TypeSubscript",
                            base: {
                                kind: "TypeSubscript",
                                base: {
                                    kind: "Identifier",
                                    name: "Tensor",
                                    role: "type",
                                },
                                index: {
                                    kind: "Identifier",
                                    name: "float",
                                    role: "type",
                                },
                            },
                            index: {
                                kind: "TypeList",
                                items: [
                                    {
                                        kind: "TypeList",
                                        items: [
                                            {
                                                kind: "Identifier",
                                                name: "n",
                                                role: "var",
                                                type: "int",
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                    },
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "ys",
                            role: "var",
                        },
                        annotation: {
                            kind: "TypeSubscript",
                            base: {
                                kind: "TypeSubscript",
                                base: {
                                    kind: "Identifier",
                                    name: "Tensor",
                                    role: "type",
                                },
                                index: {
                                    kind: "Identifier",
                                    name: "float",
                                    role: "type",
                                },
                            },
                            index: {
                                kind: "TypeList",
                                items: [
                                    {
                                        kind: "TypeList",
                                        items: [
                                            {
                                                kind: "Identifier",
                                                name: "n",
                                                role: "var",
                                                type: "int",
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                    },
                ],
                returns: {
                    kind: "TypeSubscript",
                    base: {
                        kind: "TypeSubscript",
                        base: {
                            kind: "Identifier",
                            name: "Tensor",
                            role: "type",
                        },
                        index: {
                            kind: "Identifier",
                            name: "float",
                            role: "type",
                        },
                    },
                    index: {
                        kind: "TypeList",
                        items: [
                            {
                                kind: "TypeList",
                                items: [
                                    {
                                        kind: "Identifier",
                                        name: "n",
                                        role: "var",
                                        type: "int",
                                    },
                                ],
                            },
                        ],
                    },
                },
                decorator: {
                    kind: "Identifier",
                    name: "op",
                    role: "fn",
                },
                body: [
                    {
                        kind: "Return",
                        value: {
                            kind: "BinOp",
                            left: {
                                kind: "Identifier",
                                name: "ys_pred",
                                role: "var",
                            },
                            op: "-",
                            right: {
                                kind: "Identifier",
                                name: "ys",
                                role: "var",
                            },
                        },
                    },
                ],
            },
        ],
    };

    const lossDefinitionBlock = {
        kind: "Block",
        body: [
            {
                kind: "FunctionDef",
                name: {
                    kind: "Identifier",
                    name: "loss",
                    role: "fn",
                },
                args: [
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "ys_pred",
                            role: "var",
                        },
                        annotation: {
                            kind: "TypeSubscript",
                            base: {
                                kind: "TypeSubscript",
                                base: {
                                    kind: "Identifier",
                                    name: "Tensor",
                                    role: "type",
                                },
                                index: {
                                    kind: "Identifier",
                                    name: "float",
                                    role: "type",
                                },
                            },
                            index: {
                                kind: "TypeList",
                                items: [
                                    {
                                        kind: "TypeList",
                                        items: [
                                            {
                                                kind: "Identifier",
                                                name: "n",
                                                role: "var",
                                                type: "int",
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                    },
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "ys",
                            role: "var",
                        },
                        annotation: {
                            kind: "TypeSubscript",
                            base: {
                                kind: "TypeSubscript",
                                base: {
                                    kind: "Identifier",
                                    name: "Tensor",
                                    role: "type",
                                },
                                index: {
                                    kind: "Identifier",
                                    name: "float",
                                    role: "type",
                                },
                            },
                            index: {
                                kind: "TypeList",
                                items: [
                                    {
                                        kind: "TypeList",
                                        items: [
                                            {
                                                kind: "Identifier",
                                                name: "n",
                                                role: "var",
                                                type: "int",
                                            },
                                        ],
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
                        kind: "Return",
                        value: {
                            kind: "Call",
                            callee: {
                                kind: "Attribute",
                                value: {
                                    kind: "BinOp",
                                    left: {
                                        kind: "BinOp",
                                        left: {
                                            kind: "Identifier",
                                            name: "ys_pred",
                                            role: "var",
                                        },
                                        op: "-",
                                        right: {
                                            kind: "Identifier",
                                            name: "ys",
                                            role: "var",
                                        },
                                    },
                                    op: "**",
                                    right: {
                                        kind: "Number",
                                        value: "2.0",
                                    },
                                },
                                attr: {
                                    kind: "Identifier",
                                    name: "sum",
                                    role: "plain",
                                },
                            },
                            args: [],
                        },
                    },
                ],
            },
        ],
    };

    const runLossBlock = {
        kind: "Block",
        body: [
            {
                kind: "ExprStmt",
                value: {
                    kind: "Call",
                    callee: {
                        kind: "Identifier",
                        name: "print",
                        role: "plain",
                    },
                    args: [
                        {
                            kind: "Call",
                            callee: {
                                kind: "Identifier",
                                name: "loss",
                                role: "fn",
                            },
                            args: [
                                {
                                    kind: "Identifier",
                                    name: "ys_pred",
                                    role: "var",
                                },
                                {
                                    kind: "Identifier",
                                    name: "ys",
                                    role: "var",
                                },
                            ],
                        },
                    ],
                },
            },
        ],
    };

    render({
        id: "forward-line",
        dialog: [
            message(
                "D",
                "Ready to define a function?"
            ),
            message(
                "W",
                "At last!"
            ),
            {
                ...message(
                    "D",
                    "First up: `line`."
                ),
                codeLabel: "`line` definition",
                buildCodeBlock: (_ast: AstApi) => lineDefinitionBlock,
            },
            message(
                "W",
                "These imports are new to me."
            ),
            message(
                "D",
                "`pypie` gives us tensors and learning primitives.\n" +
                "`typing` gives us type notation such as `Tuple`.\n" +
                "`Tuple[float, float]` means `params` has exactly two `float` values."
            ),
            message(
                "W",
                "And `op`?"
            ),
            message(
                "D",
                "`@op` marks the next `def` as a `pypie` op.\n" +
                "This enables `pypie` to validate its type with rank polymorphism."
            ),
            message(
                "W",
                "So in `line`, we unpack `params` into `w` and `b`, compute `y = w * x + b`, then return `y`.\n" +
                "Is that the whole story?"
            ),
            message(
                "D",
                "Yes.\n" +
                "What is the type of `y`?"
            ),
            message(
                "W",
                "I want to sanity-check.\n" +
                "Earlier, `+` showed up with `int` tensors.\n" +
                "Here `w`, `x`, and `b` are `float`s.\n" +
                "Why is `w * x + b` still valid?"
            ),
            message(
                "D",
                "Good check. We need to generalize `+`:\n" +
                "`{T: Num} (x: Tensor[T][[]], y: Tensor[T][[]]) -> Tensor[T][[]]`\n" +
                "Here `x` and `y` must share the same `Num` type. `pypie` then decides the concrete `T` when apply `+` to concrete inputs."
            ),
            message(
                "W",
                "So the concrete `T` is `float`. " +
                "Then `w * x + b` is `float`, which matches `line`."
            ),
            message(
                "D",
                "Exactly. `pypie` compares the returned type with the annotation.\n" +
                "If they differ, `pypie` reports an error."
            ),
            {
                ...message(
                "W",
                "Then if I annotate the result as `int`..."
                ),
                codeLabel: "wrong `line` definition",
                buildCodeBlock: (_ast: AstApi) => wrongLineDefinitionBlock,
                textAfterCode: "Yep. The checker says:\n`int != float`.",
            },
            message(
                "D",
                "Because `line` is rank polymorphic, it also works on a tensor of many `x`s.\n" +
                "Let's try `params = (1.0, 0.5)` with many `x`s."
            ),
            {
                ...message(
                    "W",
                    "Like this?"
                ),
                codeLabel: "`line` run",
                buildCodeBlock: (_ast: AstApi) => lineWithParamsRunBlock,
                textAfterCode: "And we get `Tensor([-3.7, 1.5, 2.0, 3.5])`.",
            },
            {
                ...message(
                    "D",
                    "These are the four points on that line.*"
                ),
                figureSrc: "forward_line/first_line.png",
                figureAlt: "Visualization of four points on the line",
            },
            message(
                "W",
                "Clean line. No surprises."
                ),
            message(
                "D",
                "Now we learn the line."
            ),
            message(
                "W",
                "What does it mean to learn the line?" 
            ),
            message(
                "D",
                "It means finding `params` using `xs` and `ys`.\n" +
                "A minute ago we picked `params`, then computed `ys`.\n" +
                "In real work, it is the reverse: we have the data of `xs` and `ys, and need to infer `params.\n" +
                "Let's pretend:\n" +
                "- `xs` and `ys` are observed data\n" +
                "- true `params` are hidden.\n" +
                "Then we write a program to find `params`."
            ),
            message(
                "W",
                "Okay. How to we begin?"
            ),
            message(
                "D",
                "Start with a guess for `params`.\n" +
                "Any guess is fine; say `(0.0, 0.0)`.\n" +
                "Run `line(xs, params)` and call the output `ys_pred`."
            ),
            {
                ...message(
                    "W",
                    "You mean this?"
                ),
                codeLabel: "init run",
                buildCodeBlock: (_ast: AstApi) => runningInitParams,
                textAfterCode: "We get `Tensor([-0.0, 0.0, 0.0, 0.0])`. `ys_pred` is far from the real `ys`.",
            },
            message(
                "D",
                "Far is expected.\n" +
                "Now we need a numeric measure of \"far\"."
            ),
            message(
                "W",
                "How to we measure it?"
            ),
            {
                ...message(
                    "D",
                    "We'll define a function soon, but first we need one more type-checking tool.\n" +
                    "Look at this function."
                ),
                codeLabel: "problematic minus",
                buildCodeBlock: (_ast: AstApi) => problematicMinus,
            },
            message(
                "W",
                "We imported one more thing from `pypie`.\n" +
                "What are `Var(\"n\", int)` and `Var(\"m\", int)`?"
            ),
            message(
                "D",
                "**`Var`** creates a type variable.\n" +
                "During definition checking, each `Var` is distinct.\n" +
                "During use, it can be instantiated with any value of its type.\n" +
                "Now ask `pypie` to validate `bad_sub`."
            ),
            message(
                "W",
                "The checker says `n != m`.\n" +
                "Is that because `-` needs both tensors to share the same shape, but `n` and `m` are distinct?"
            ),
            message(
                "D",
                "Exactly right. Fix the definition."
            ),
            {
                ...message(
                    "W",
                    "Then both inputs must use the same variable in their shapes."
                ),
                codeLabel: "correct minus",
                buildCodeBlock: (_ast: AstApi) => correctMinus,
                textAfterCode: "Nice. The type error disappears."
            },
            {
                ...message(
                    "D",
                    "Great. Now we can define **`loss`**."
                ),
                codeLabel: "`loss` definition",
                buildCodeBlock: (_ast: AstApi) => lossDefinitionBlock,
            },
            message(
                "W",
                "It looks like `good_sub` plus extras.\n" +
                "Why square with `** 2.0` and then call `sum`?"
            ),
            message(
                "D",
                "`loss` must return one scalar `float`.\n" +
                "`sum` collapses the tensor to one number.\n" +
                "Before `sum`, we square each difference to remove negative numbers, so that negatives and positives don't cancel each other.\n" +
                "Run `loss`."
            ),
            {
                ...message(
                    "W",
                    "Like this?"
                ),
                codeLabel: "run `loss`",
                buildCodeBlock: (_ast: AstApi) => runLossBlock,
                textAfterCode: "It prints `32.19`. So that is the loss at `(0.0, 0.0)`.",
            },
            message(
                "D",
                "Exactly.\n" +
                "Then we update `params`, recompute loss, and repeat."
            ),
            message(
                "W",
                "Do we keep going until loss is `0`?"
            ),
            message(
                "D",
                "Usually not.\n" +
                "For real data, exact zero is uncommon and often undesirable.\n" +
                "Chasing zero can overfit noise and hurt generalization.\n" +
                "Here we focus on updating `params` and run a fixed number of steps."
            ),
            message(
                "W",
                "We are defining functions for updating `params`!"
            ),
            message(
                "D",
                "Yes. Next chapter."
            ),
            message(
                "W",
                "Good. Brain break earned."
            )
        ],
        notes: "* The figure is generated by feeding `xs` and `ys` to [matplotlib](https://matplotlib.org/stable/tutorials/pyplot.html)."
    });
})();
