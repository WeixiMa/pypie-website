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
            message("D", "We are ready to define some functions!"),
            message("W", "Finally!"),
            {
                ...message("D", "Here's our first function. It's called `line`."),
                codeLabel: "`line` definition",
                buildCodeBlock: (_ast) => lineDefinitionBlock,
            },
            message("W", "To define `line`, we have imported things from elsewhere?"),
            message("D", "Yes, we imported from existing Python libraries. " +
                "`pypie` is our own library that provides tools for tensor programming and deep learning. " +
                "`typing` is Python's built-in library for type annotations.\n" +
                "Here, `Tuple` is another way to group values together. It tells us that `params` always contain two `float`s."),
            message("W", "How about the **`op`** imported from `pypie`?"),
            message("D", "With `@op`, the following Python `def`inition becomes special to us. " +
                "Most importantly, that Python `def` uses rank polymorphism. " +
                "Later, when `pypie` runs this `def`, it optimizes the run with parallelism."),
            message("W", "**`line`**'s `def` makes sense to me. We first give names to the `float`s in `params`: `w` and `b`. " +
                "Then we run arithmetic on `w`, `x`, and `b`, and call it `y`.\n" +
                "Does `return y` suggest that `y` is the result of `line`?"),
            message("D", "Exactly!\n" +
                "With the arithmetic, what is the type of `y`?"),
            message("W", "We've learned that `+` has type `(x: Tensor[int][[]], y: Tensor[int][[]]) -> Tensor[int][[]]`. " +
                "But `w`, `x`, `b` are `float`s. It does not work!"),
            message("D", "It's time to upgrade the type for `+`:\n" +
                "`{T: Num} (x: Tensor[T][[]], y: Tensor[T][[]]) -> Tensor[T][[]]`\n" +
                "It says that `x` and `y` are rank-0 `Tensor`s that contain a type call `T`. " +
                "`T` must be a `Num`: either `float` or `int`. " +
                "`x` and `y` must contain the same kind of `Num`."),
            message("W", "I see. With the upgraded type, `+` now applies to our case, where `T` becomes `float`. " +
                "Then, `w * x + b` has type `float`. The same with the `float` in `line`'s `def`."),
            message("D", "Right. `pypie` validates if the type of `y` matches the expected result. " +
                "Should there be a mismatch, `pypie` alerts us."),
            {
                ...message("W", "Let me try a wrong example to trigger the alert: turning the expected type to `int`."),
                codeLabel: "wrong `line` definition",
                buildCodeBlock: (_ast) => wrongLineDefinitionBlock,
                textAfterCode: "Nice, it gives an error!\n`int != float`",
            },
            message("D", "Our `line` appears to take a single value, `float`, for `x`. But with rank polymorphism, " +
                "`line` applies to `Tensor`s of many `x`s.\n" +
                "Let's use `(1.0, 0.5)` for `params` and make up some `x`s for our `line`."),
            {
                ...message("W", "Like this?"),
                codeLabel: "`line` run",
                buildCodeBlock: (_ast) => lineWithParamsRunBlock,
                textAfterCode: "And we get `Tensor([-3.7, 1.5, 2.0, 3.5])`.",
            },
            {
                ...message("D", "Here's a visualization of the four points on our line.*"),
                figureSrc: "forward_line/first_line.png",
                figureAlt: "Visualization of four points on the line",
            },
            message("W", "A pretty line it is!"),
            message("D", "Next, we learn the line."),
            message("W", "What does learning mean?"),
            message("D", "By **learning** the line, we mean to find the **`params`** for the line, using our `xs` and `ys`.\n" +
                "Remember that, we started with making up `(1.0, 0.5)` for the `params`, and then synthesized our data `xs` and `ys`. " +
                "In the real world, it's just the opposite. We first gather data for `xs` and `ys`, and then find `params` using the data.\n" +
                "Now let's pretend that\n" +
                "- `xs` and `ys` are real data\n" +
                "- we don't know the actual values for `params`.\n" +
                "And we write programs to learn the `params`."),
            message("W", "Sounds like fun. How do we start?"),
            message("D", "We start with initializing the values for `params`. For the time being, the initial pick doesn't matter. Let's use `(0.0, 0.0)`.\n" +
                "Let's run our `line` with the given `xs` and the initial `params`. It predicts some `ys`--let's call it `ys_pred`."),
            {
                ...message("W", "Do you mean the following?"),
                codeLabel: "init run",
                buildCodeBlock: (_ast) => runningInitParams,
                textAfterCode: "We get `Tensor([-0.0, 0.0, 0.0, 0.0])`, far off from the real `ys`!",
            },
            message("D", "It's not a problem to be far off. But we need to know how far it is."),
            message("W", "Shall we define a new function to compute how far?"),
            {
                ...message("D", "Yes, we call this function **`loss`**."),
                codeLabel: "`loss` definition",
                buildCodeBlock: (_ast) => lossDefinitionBlock,
            },
            message("W", "We just imported something new from `pypie`.\n" +
                "What is `Var(\"n\", int)`?"),
            message("D", "It creates a **`Var`**iable that represents an arbitrary `int`. " +
                "We use `n` in the types of `ys_pred` and `ys`, to signify that they expect inputs of the same shape."),
            message("W", "So we may apply `-` on `ys_pred` and `ys`. I suppose that `-` has the same type as `*` and `+`, " +
                "expecting the same shape from both inputs.\n" +
                "Why do we then calculate the power of `2.0` and use `sum`?"),
            message("D", "The goal of `loss` is to find a scalar `float` to represent how far, by comparing two tensors `ys_pred` and `ys`.\n" +
                "**`sum`** is a function that adds all elements in a tensor together, resulting in one scalar.\n" +
                "Since there are both negative and positive values from `ys_pred - ys`, we need to avoid them accidentally canceling each other during the `sum`. " +
                "So we turn them all to positive using `** 2.0`.\n" +
                "Let's run the `loss`."),
            {
                ...message("W", "Like this?"),
                codeLabel: "run `loss`",
                buildCodeBlock: (_ast) => runLossBlock,
                textAfterCode: "It shows `Tensor([32.19])`. So our loss at `(0.0, 0.0)` is `32.19`?",
            },
        ],
        notes: "* The figure is generated by feeding `xs` and `ys` to [matplotlib](https://matplotlib.org/stable/tutorials/pyplot.html)."
    });
})();
