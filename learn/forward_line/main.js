(() => {
    const render = window.PYPIE_LEARN_RENDER;
    if (typeof render !== "function") {
        return;
    }
    const message = (speaker, text) => ({
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
    const lossDefinitionBlock = {
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
            message("D", "Ready to define a function?"),
            message("W", "At last!"),
            {
                ...message("D", "Here is the first one: `line`."),
                codeLabel: "`line` definition",
                buildCodeBlock: (_ast) => lineDefinitionBlock,
            },
            message("W", "These imports are new to me."),
            message("D", "Because we borrow tools.\n" +
                "`pypie` gives us tensor and learning tools.\n" +
                "`typing` gives us some additional type notations, like `Tuple`.\n" +
                "`Tuple[float, float]` says `params` contains exactly two `float`s."),
            message("W", "Then what does `op` do?"),
            message("D", "`@op` marks the next `def` as a `pypie` function.\n" +
                "This enables `pypie` to validate the function type with rank polymorphism."),
            message("W", "`line` names `params` as `w` and `b`, computes `w * x + b`, and then names the computation `y`.\n" +
                "Is `y` the result of `line`?"),
            message("D", "Yes.\n" +
                "What is the type of `y`?"),
            message("W", "Earlier, `+` was typed only for `int` tensors.\n" +
                "But `w`, `x`, and `b` are `float`s.\n" +
                "How does `+` work here?"),
            message("D", "Good observation. We need generalize `+`:\n" +
                "`{T: Num} (x: Tensor[T][[]], y: Tensor[T][[]]) -> Tensor[T][[]]`\n" +
                "Read it this way:\n" +
                "`T` must be a `Num`: either `int` or `float`. And both inputs must share that same `T`."),
            message("W", "Then in our case, `T` becomes `float`.\n" +
                "So `w * x + b` is a `float`, matching the result type `line`."),
            message("D", "Right. `pypie` checks the returned type against the annotation in the `def`.\n" +
                "If they differ, `pypie` reports an error."),
            {
                ...message("W", "So if I change the result annotation in `int`..."),
                codeLabel: "wrong `line` definition",
                buildCodeBlock: (_ast) => wrongLineDefinitionBlock,
                textAfterCode: "... indeed! The checker complains:\n`int != float`.",
            },
            message("D", "With rank polymorphism, our `line` applies to a tensor of many `x`s.\n" +
                "Let us try `params = (1.0, 0.5)` and make some `x`s."),
            {
                ...message("W", "Like this?"),
                codeLabel: "`line` run",
                buildCodeBlock: (_ast) => lineWithParamsRunBlock,
                textAfterCode: "And we get `Tensor([-3.7, 1.5, 2.0, 3.5])`.",
            },
            {
                ...message("D", "Here are the four points on that line.*"),
                figureSrc: "forward_line/first_line.png",
                figureAlt: "Visualization of four points on the line",
            },
            message("W", "A nice line!"),
            message("D", "Now we learn the line."),
            message("W", "What does it mean to learn?"),
            message("D", "To learn the line is to find `params` from `xs` and `ys`.\n" +
                "Just now, we chose `params` and then synthesized `ys`.\n" +
                "In real work, it is the reverse: we gather data for `xs` and `ys`, then infer `params`.\n" +
                "Let's pretend that\n" +
                "- `xs` and `ys` are real data\n" +
                "- the true values of `params` are unknown.\n" +
                "Then we write a program to learn `params`."),
            message("W", "How do we begin?"),
            message("D", "Start with a guess for `params`.\n" +
                "For now, any guess is fine; say `(0.0, 0.0)`.\n" +
                "Run `line` on `xs` with the `param`. Let's call the result `ys_pred`, for the predicated `ys`."),
            {
                ...message("W", "You mean this?"),
                codeLabel: "init run",
                buildCodeBlock: (_ast) => runningInitParams,
                textAfterCode: "We get `Tensor([-0.0, 0.0, 0.0, 0.0])`. That is far from `ys`.",
            },
            message("D", "Being far is fine.\n" +
                "But we must measure how far."),
            message("W", "Do we need a function to measure?"),
            {
                ...message("D", "Yes. Call it `loss`."),
                codeLabel: "`loss` definition",
                buildCodeBlock: (_ast) => lossDefinitionBlock,
            },
            message("W", "We imported one more thing from `pypie`.\n" +
                "What is `Var(\"n\", int)`?"),
            message("D", "`Var(\"n\", int)` creates a symbolic integer.\n" +
                "We place `n` in types of `ys_pred` and `ys`, to enforce a shared shape for their inputs."),
            message("W", "Then `ys_pred - ys` is valid because shapes match.\n" +
                "But why square with `** 2.0`, then call `sum`?"),
            message("D", "`loss` should return one scalar `float`.\n" +
                "`sum` reduces a tensor into one scalar, by adding all elements together. " +
                "Before `sum`, we square each difference to remove negative numbers.\n" +
                "Now run `loss`."),
            {
                ...message("W", "Like this?"),
                codeLabel: "run `loss`",
                buildCodeBlock: (_ast) => runLossBlock,
                textAfterCode: "It prints `32.19`. That's the loss at `(0.0, 0.0)`!",
            },
        ],
        notes: "* The figure is generated by feeding `xs` and `ys` to [matplotlib](https://matplotlib.org/stable/tutorials/pyplot.html)."
    });
})();
