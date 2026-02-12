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
                kind: "ImportFrom",
                module: {
                    kind: "Identifier",
                    name: "pypie",
                    role: "plain",
                },
                names: [
                    {
                        kind: "Identifier",
                        name: "op",
                        role: "fn",
                    },
                    {
                        kind: "Identifier",
                        name: "Tensor",
                        role: "type",
                    },
                ],
            },
            {
                kind: "ImportFrom",
                module: {
                    kind: "Identifier",
                    name: "typing",
                    role: "plain",
                },
                names: [
                    {
                        kind: "Identifier",
                        name: "Tuple",
                        role: "type",
                    },
                ],
            },
            {
                kind: "BlankLine",
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
                    name: "bad_line",
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
                kind: "ImportFrom",
                module: {
                    kind: "Identifier",
                    name: "pypie",
                    role: "plain",
                },
                names: [
                    {
                        kind: "Identifier",
                        name: "Var",
                        role: "fn",
                    },
                ],
            },
            {
                kind: "BlankLine",
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
                            kind: "String",
                            value: "n",
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
                            kind: "String",
                            value: "m",
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
            message("D", "Ready to define a function?"),
            message("W", "At last!"),
            {
                ...message("D", "First: !!`line`!!."),
                codeLabel: "`line` definition",
                buildCodeBlock: (_ast) => lineDefinitionBlock,
            },
            message("W", "These imports are new."),
            message("D", "`pypie` gives us tensors and learning primitives.\n" +
                "`typing` gives us other type annotations like `Tuple`.\n" +
                "`Tuple[float, float]` means `params` contains exactly two `float`s."),
            message("W", "What about `op`?"),
            message("D", "!!`@op`!! marks the next `def` as a `pypie` operator.\n" +
                "That lets `pypie` validate it, like matching shapes."),
            message("W", "In `line`, we unpack `params` into `w` and `b`, compute `y = w * x + b`, then return `y`.\n" +
                "Is that the whole story?"),
            message("D", "Yes.\n" +
                "What is the type of `y`?"),
            message("W", "I want to sanity-check.\n" +
                "Earlier, `+` showed up with `int` tensors.\n" +
                "Here `w`, `x`, and `b` are `float`s.\n" +
                "Why is `w * x + b` still valid?"),
            message("D", "Good check. Let's generalize the type of `+`:\n" +
                "`{T: Num} (x: Tensor[T][[]], y: Tensor[T][[]]) -> Tensor[T][[]]`.\n" +
                "Both inputs must share the same numeric type. At call time, `pypie` figures out the concrete `T` from the actual inputs.\n" +
                "BTW, `*` has the same type as `+`."),
            message("W", "So here `T` becomes `float`, and `w * x + b` has type `float`."),
            message("D", "Exactly. `pypie` compares the return expression type against the definition.\n" +
                "If they differ, it raises a type error."),
            {
                ...message("W", "Then if I annotate the result as `int`..."),
                codeLabel: "wrong `line` definition",
                buildCodeBlock: (_ast) => wrongLineDefinitionBlock,
                textAfterCode: "Right. The type checker reports:\n`int != float`.",
            },
            message("D", "Because `line` is rank polymorphic, the same definition applies to tensors.\n" +
                "Let's try `params = (1.0, 0.5)` and a `Tensor` of `x`s."),
            {
                ...message("W", "Like this?"),
                codeLabel: "`line` run",
                buildCodeBlock: (_ast) => lineWithParamsRunBlock,
                textAfterCode: "Result: `Tensor([-3.7, 1.5, 2.0, 3.5])`.",
            },
            {
                ...message("D", "Those are the four points on the line.*"),
                figureSrc: "forward_line/first_line.png",
                figureAlt: "Visualization of four points on the line",
            },
            message("W", "Clean line! No surprises."),
            message("D", "Next step: learn the line."),
            message("W", "Learn what?"),
            message("D", "It means finding `params` from `xs` and `ys`.\n" +
                "So far, we chose `params`, made `xs`, and computed `ys`.\n" +
                "In practice, we first have some real data for `xs` and `ys` and then estimate `params`.\n" +
                "Let's pretend:\n" +
                "`xs` and `ys` are real data;\n" +
                "true `params` are unknown.\n" +
                "Then we write a program that estimates `params`."),
            message("W", "Okay. How do we begin?"),
            message("D", "Start with an initial guess for `params`.\n" +
                "Any guess works; say `(0.0, 0.0)`.\n" +
                "Run `line(xs, params)` and call the output `ys_pred`."),
            {
                ...message("W", "You mean this?"),
                codeLabel: "init run",
                buildCodeBlock: (_ast) => runningInitParams,
                textAfterCode: "We get `Tensor([-0.0, 0.0, 0.0, 0.0])`. `ys_pred` is far from the real `ys`.",
            },
            message("D", "Expected.\n" +
                "Now we need to measure how far off we are. This is called the !!loss!!."),
            message("W", "Do we create a new function to measure the loss?"),
            {
                ...message("D", "We will define that function soon, but first we need one more tool from `pypie`.\n" +
                    "Look at this function."),
                codeLabel: "problematic minus",
                buildCodeBlock: (_ast) => problematicMinus,
            },
            message("W", "We imported one more thing.\n" +
                "What are `Var(\"n\", int)` and `Var(\"m\", int)`?"),
            message("D", "They are values of type `int`.\n" +
                "When validating a function, different !!`Var`!!s are distinct.\n" +
                "When using the function, each `Var` is instantiated with a concrete `int`.\n" +
                "Now ask `pypie` to validate `bad_sub`."),
            message("W", "It says `n != m`.\n" +
                "Is that because `-` expects matching tensor shapes, just like `+` and `*`, " +
                "but `n` and `m` are different values?"),
            message("D", "Exactly. Let's fix the definition."),
            {
                ...message("W", "Then both inputs must use the same `Var` in their shapes."),
                codeLabel: "correct minus",
                buildCodeBlock: (_ast) => correctMinus,
                textAfterCode: "The type error is gone."
            },
            {
                ...message("D", "Great. Now we can define `loss`."),
                codeLabel: "`loss` definition",
                buildCodeBlock: (_ast) => lossDefinitionBlock,
            },
            message("W", "It looks like `good_sub` plus extras.\n" +
                "Why square with `** 2.0` and then call `sum`?"),
            message("D", "Almost always, we use a scalar as the loss.\n" +
                "`sum` collapses a tensor into that scalar. " +
                "We square each difference first, so negatives and positives cannot cancel out.\n" +
                "Now run `loss`."),
            {
                ...message("W", "Like this?"),
                codeLabel: "run `loss`",
                buildCodeBlock: (_ast) => runLossBlock,
                textAfterCode: "It prints `32.19`, the loss at `(0.0, 0.0)`?",
            },
            message("D", "Exactly.\n" +
                "Then we update `params`, recompute loss, and repeat."),
            message("W", "Do we keep going until loss is `0`?"),
            message("D", "Usually not.\n" +
                "For real data, exact zero is uncommon and often undesirable.\n" +
                "In practice, the training data usually contain some noise and errors. " +
                "Reaching zero often means overfitting: `params` have also learned from the noise and errors, " +
                "and may perform worse on new, unseen data.\n" +
                "For now, we simply update and repeat for a fixed number of iterations."),
            message("W", "Will we define more functions to update and repeat?"),
            message("D", "We will, in the next chapter."),
            message("W", "Brain break earned!")
        ],
        notes: "* The figure is generated by feeding `xs` and `ys` to [matplotlib](https://matplotlib.org/stable/tutorials/pyplot.html)."
    });
})();
