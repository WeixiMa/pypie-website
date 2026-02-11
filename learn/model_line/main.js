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
    const atesModelBlock = {
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
                        name: "Model",
                        role: "type",
                    },
                    {
                        kind: "Identifier",
                        name: "Tensor",
                        role: "type",
                    },
                    {
                        kind: "Identifier",
                        name: "Var",
                        role: "fn",
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
                kind: "BlankLine",
            },
            {
                kind: "ClassDef",
                name: {
                    kind: "Identifier",
                    name: "Line",
                    role: "type",
                },
                bases: [
                    {
                        kind: "Identifier",
                        name: "Model",
                        role: "type",
                    },
                ],
                body: [
                    {
                        kind: "FunctionDef",
                        name: {
                            kind: "Identifier",
                            name: "predict",
                            role: "fn",
                        },
                        args: [
                            {
                                kind: "Arg",
                                name: {
                                    kind: "Identifier",
                                    name: "x",
                                    role: "var",
                                    type: "float",
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
                        body: [
                            {
                                kind: "Assign",
                                target: {
                                    kind: "Identifier",
                                    name: "w",
                                    role: "var",
                                    type: "float",
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
                                    type: "float",
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
                                    type: "float",
                                },
                                value: {
                                    kind: "BinOp",
                                    left: {
                                        kind: "BinOp",
                                        left: {
                                            kind: "Identifier",
                                            name: "w",
                                            role: "var",
                                            type: "float",
                                        },
                                        op: "*",
                                        right: {
                                            kind: "Identifier",
                                            name: "x",
                                            role: "var",
                                            type: "float",
                                        },
                                    },
                                    op: "+",
                                    right: {
                                        kind: "Identifier",
                                        name: "b",
                                        role: "var",
                                        type: "float",
                                    },
                                },
                            },
                            {
                                kind: "Return",
                                value: {
                                    kind: "Identifier",
                                    name: "y",
                                    role: "var",
                                    type: "float",
                                },
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
            },
        ],
    };
    const lineUpdateBlock = {
        kind: "Block",
        body: [
            {
                kind: "IndentedBlock",
                level: 1,
                body: [
                    {
                        kind: "FunctionDef",
                        name: {
                            kind: "Identifier",
                            name: "update",
                            role: "fn",
                        },
                        args: [
                            {
                                kind: "Arg",
                                name: {
                                    kind: "Identifier",
                                    name: "p",
                                    role: "var",
                                    type: "float",
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
                                    name: "g",
                                    role: "var",
                                    type: "float",
                                },
                                annotation: {
                                    kind: "Identifier",
                                    name: "float",
                                    role: "type",
                                },
                            },
                        ],
                        returns: {
                            kind: "Identifier",
                            name: "float",
                            role: "type",
                        },
                        body: [
                            {
                                kind: "Return",
                                value: {
                                    kind: "BinOp",
                                    left: {
                                        kind: "Identifier",
                                        name: "p",
                                        role: "var",
                                        type: "float",
                                    },
                                    op: "-",
                                    right: {
                                        kind: "BinOp",
                                        left: {
                                            kind: "Number",
                                            value: "0.01",
                                        },
                                        op: "*",
                                        right: {
                                            kind: "Identifier",
                                            name: "g",
                                            role: "var",
                                            type: "float",
                                        },
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    };
    const lineTrainRunBlock = {
        kind: "Block",
        body: [
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
                        name: "Tensor",
                        role: "type",
                    },
                    args: [
                        {
                            kind: "List",
                            elements: [
                                {
                                    kind: "Number",
                                    value: "-3.7",
                                },
                                {
                                    kind: "Number",
                                    value: "1.5",
                                },
                                {
                                    kind: "Number",
                                    value: "2.0",
                                },
                                {
                                    kind: "Number",
                                    value: "3.5",
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
                    name: "revs",
                    role: "var",
                    type: "int",
                },
                value: {
                    kind: "Number",
                    value: "10",
                },
            },
            {
                kind: "BlankLine",
            },
            {
                kind: "Assign",
                target: {
                    kind: "Identifier",
                    name: "params",
                    role: "var",
                },
                value: {
                    kind: "Call",
                    callee: {
                        kind: "Attribute",
                        value: {
                            kind: "Identifier",
                            name: "Line",
                            role: "type",
                        },
                        attr: {
                            kind: "Identifier",
                            name: "train",
                            role: "plain",
                        },
                    },
                    args: [
                        {
                            kind: "Identifier",
                            name: "xs",
                            role: "var",
                        },
                        {
                            kind: "Identifier",
                            name: "ys",
                            role: "var",
                        },
                        {
                            kind: "Identifier",
                            name: "params",
                            role: "var",
                        },
                        {
                            kind: "Identifier",
                            name: "revs",
                            role: "var",
                            type: "int",
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
                        role: "fn",
                    },
                    args: [
                        {
                            kind: "Identifier",
                            name: "params",
                            role: "var",
                        },
                    ],
                },
            },
        ],
    };
    const lineChallengeRunBlock = {
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
                        name: "rand",
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
                    name: "xs",
                    role: "var",
                },
                value: {
                    kind: "Call",
                    callee: {
                        kind: "Identifier",
                        name: "rand",
                        role: "fn",
                    },
                    args: [
                        {
                            kind: "List",
                            elements: [
                                {
                                    kind: "Number",
                                    value: "1000",
                                },
                            ],
                        },
                        {
                            kind: "Number",
                            value: "-10.0",
                        },
                        {
                            kind: "Number",
                            value: "10.0",
                        },
                    ],
                },
            },
            {
                kind: "Assign",
                target: {
                    kind: "Identifier",
                    name: "real_params",
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
                    name: "ys",
                    role: "var",
                },
                value: {
                    kind: "BinOp",
                    left: {
                        kind: "Call",
                        callee: {
                            kind: "Attribute",
                            value: {
                                kind: "Identifier",
                                name: "Line",
                                role: "type",
                            },
                            attr: {
                                kind: "Identifier",
                                name: "predict",
                                role: "plain",
                            },
                        },
                        args: [
                            {
                                kind: "Identifier",
                                name: "xs",
                                role: "var",
                            },
                            {
                                kind: "Identifier",
                                name: "real_params",
                                role: "var",
                            },
                        ],
                    },
                    op: "+",
                    right: {
                        kind: "Call",
                        callee: {
                            kind: "Identifier",
                            name: "rand",
                            role: "fn",
                        },
                        args: [
                            {
                                kind: "List",
                                elements: [
                                    {
                                        kind: "Number",
                                        value: "1000",
                                    },
                                ],
                            },
                            {
                                kind: "Number",
                                value: "-1.0",
                            },
                            {
                                kind: "Number",
                                value: "1.0",
                            },
                        ],
                    },
                },
            },
        ],
    };
    const lineChallengeTrainBlock = {
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
                    kind: "Call",
                    callee: {
                        kind: "Attribute",
                        value: {
                            kind: "Identifier",
                            name: "Line",
                            role: "type",
                        },
                        attr: {
                            kind: "Identifier",
                            name: "train",
                            role: "plain",
                        },
                    },
                    args: [
                        {
                            kind: "Identifier",
                            name: "xs",
                            role: "var",
                        },
                        {
                            kind: "Identifier",
                            name: "ys",
                            role: "var",
                        },
                        {
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
                        {
                            kind: "Number",
                            value: "100",
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
                        role: "fn",
                    },
                    args: [
                        {
                            kind: "Identifier",
                            name: "params",
                            role: "var",
                        },
                    ],
                },
            },
        ],
    };
    const lineInflateDeflateBlock = {
        kind: "Block",
        body: [
            {
                kind: "IndentedBlock",
                level: 1,
                body: [
                    {
                        kind: "FunctionDef",
                        name: {
                            kind: "Identifier",
                            name: "inflate",
                            role: "fn",
                        },
                        args: [
                            {
                                kind: "Arg",
                                name: {
                                    kind: "Identifier",
                                    name: "p",
                                    role: "var",
                                    type: "float",
                                },
                                annotation: {
                                    kind: "Identifier",
                                    name: "float",
                                    role: "type",
                                },
                            },
                        ],
                        returns: {
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
                        body: [
                            {
                                kind: "Return",
                                value: {
                                    kind: "Tuple",
                                    elements: [
                                        {
                                            kind: "Identifier",
                                            name: "p",
                                            role: "var",
                                            type: "float",
                                        },
                                        {
                                            kind: "Number",
                                            value: "0.0",
                                        },
                                    ],
                                },
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
                            name: "deflate",
                            role: "fn",
                        },
                        args: [
                            {
                                kind: "Arg",
                                name: {
                                    kind: "Identifier",
                                    name: "P",
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
                        body: [
                            {
                                kind: "Return",
                                value: {
                                    kind: "Subscript",
                                    value: {
                                        kind: "Identifier",
                                        name: "P",
                                        role: "var",
                                    },
                                    index: {
                                        kind: "Number",
                                        value: "0",
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    };
    const lineSmoothBlock = {
        kind: "Block",
        body: [
            {
                kind: "FunctionDef",
                name: {
                    kind: "Identifier",
                    name: "smooth",
                    role: "fn",
                },
                decorator: {
                    kind: "Identifier",
                    name: "op",
                    role: "fn",
                },
                args: [
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "decay",
                            role: "var",
                            type: "float",
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
                            name: "avg",
                            role: "var",
                            type: "float",
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
                            name: "g",
                            role: "var",
                            type: "float",
                        },
                        annotation: {
                            kind: "Identifier",
                            name: "float",
                            role: "type",
                        },
                    },
                ],
                returns: {
                    kind: "Identifier",
                    name: "float",
                    role: "type",
                },
                body: [
                    {
                        kind: "Return",
                        value: {
                            kind: "BinOp",
                            left: {
                                kind: "BinOp",
                                left: {
                                    kind: "Identifier",
                                    name: "decay",
                                    role: "var",
                                    type: "float",
                                },
                                op: "*",
                                right: {
                                    kind: "Identifier",
                                    name: "avg",
                                    role: "var",
                                    type: "float",
                                },
                            },
                            op: "+",
                            right: {
                                kind: "BinOp",
                                left: {
                                    kind: "BinOp",
                                    left: {
                                        kind: "Number",
                                        value: "1.0",
                                    },
                                    op: "-",
                                    right: {
                                        kind: "Identifier",
                                        name: "decay",
                                        role: "var",
                                        type: "float",
                                    },
                                },
                                op: "*",
                                right: {
                                    kind: "Identifier",
                                    name: "g",
                                    role: "var",
                                    type: "float",
                                },
                            },
                        },
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
                    name: "mean",
                    role: "fn",
                },
                decorator: {
                    kind: "Identifier",
                    name: "op",
                    role: "fn",
                },
                args: [
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "xs",
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
                body: [
                    {
                        kind: "Return",
                        value: {
                            kind: "BinOp",
                            left: {
                                kind: "Call",
                                callee: {
                                    kind: "Attribute",
                                    value: {
                                        kind: "Identifier",
                                        name: "xs",
                                        role: "var",
                                    },
                                    attr: {
                                        kind: "Identifier",
                                        name: "sum",
                                        role: "plain",
                                    },
                                },
                                args: [],
                            },
                            op: "/",
                            right: {
                                kind: "Call",
                                callee: {
                                    kind: "Identifier",
                                    name: "float",
                                    role: "fn",
                                },
                                args: [
                                    {
                                        kind: "Identifier",
                                        name: "n",
                                        role: "var",
                                        type: "int",
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    };
    const lineRmsUpdateBlock = {
        kind: "Block",
        body: [
            {
                kind: "IndentedBlock",
                level: 1,
                body: [
                    {
                        kind: "FunctionDef",
                        name: {
                            kind: "Identifier",
                            name: "update",
                            role: "fn",
                        },
                        args: [
                            {
                                kind: "Arg",
                                name: {
                                    kind: "Identifier",
                                    name: "P",
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
                            {
                                kind: "Arg",
                                name: {
                                    kind: "Identifier",
                                    name: "g",
                                    role: "var",
                                    type: "float",
                                },
                                annotation: {
                                    kind: "Identifier",
                                    name: "float",
                                    role: "type",
                                },
                            },
                        ],
                        returns: {
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
                        body: [
                            {
                                kind: "Assign",
                                target: {
                                    kind: "Identifier",
                                    name: "avg",
                                    role: "var",
                                    type: "float",
                                },
                                value: {
                                    kind: "Call",
                                    callee: {
                                        kind: "Identifier",
                                        name: "smooth",
                                        role: "fn",
                                    },
                                    args: [
                                        {
                                            kind: "Number",
                                            value: "0.9",
                                        },
                                        {
                                            kind: "Subscript",
                                            value: {
                                                kind: "Identifier",
                                                name: "P",
                                                role: "var",
                                            },
                                            index: {
                                                kind: "Number",
                                                value: "1",
                                            },
                                        },
                                        {
                                            kind: "BinOp",
                                            left: {
                                                kind: "Identifier",
                                                name: "g",
                                                role: "var",
                                                type: "float",
                                            },
                                            op: "**",
                                            right: {
                                                kind: "Number",
                                                value: "2.0",
                                            },
                                        },
                                    ],
                                },
                            },
                            {
                                kind: "Assign",
                                target: {
                                    kind: "Identifier",
                                    name: "alpha",
                                    role: "var",
                                    type: "float",
                                },
                                value: {
                                    kind: "BinOp",
                                    left: {
                                        kind: "Number",
                                        value: "0.001",
                                    },
                                    op: "/",
                                    right: {
                                        kind: "BinOp",
                                        left: {
                                            kind: "Number",
                                            value: "1e-8",
                                        },
                                        op: "+",
                                        right: {
                                            kind: "Call",
                                            callee: {
                                                kind: "Identifier",
                                                name: "sqrt",
                                                role: "fn",
                                            },
                                            args: [
                                                {
                                                    kind: "Identifier",
                                                    name: "avg",
                                                    role: "var",
                                                    type: "float",
                                                },
                                            ],
                                        },
                                    },
                                },
                            },
                            {
                                kind: "Return",
                                value: {
                                    kind: "Tuple",
                                    elements: [
                                        {
                                            kind: "BinOp",
                                            left: {
                                                kind: "Subscript",
                                                value: {
                                                    kind: "Identifier",
                                                    name: "P",
                                                    role: "var",
                                                },
                                                index: {
                                                    kind: "Number",
                                                    value: "0",
                                                },
                                            },
                                            op: "-",
                                            right: {
                                                kind: "BinOp",
                                                left: {
                                                    kind: "Identifier",
                                                    name: "alpha",
                                                    role: "var",
                                                    type: "float",
                                                },
                                                op: "*",
                                                right: {
                                                    kind: "Identifier",
                                                    name: "g",
                                                    role: "var",
                                                    type: "float",
                                                },
                                            },
                                        },
                                        {
                                            kind: "Identifier",
                                            name: "avg",
                                            role: "var",
                                            type: "float",
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    };
    const lineSmoothExampleBlock = {
        kind: "Block",
        body: [
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
                                    value: "-50.0",
                                },
                                {
                                    kind: "Number",
                                    value: "0.5",
                                },
                                {
                                    kind: "Number",
                                    value: "1000.42",
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
                    name: "xs_smoothed",
                    role: "var",
                },
                value: {
                    kind: "Call",
                    callee: {
                        kind: "Identifier",
                        name: "smooth",
                        role: "fn",
                    },
                    args: [
                        {
                            kind: "Number",
                            value: "0.9",
                        },
                        {
                            kind: "Call",
                            callee: {
                                kind: "Identifier",
                                name: "mean",
                                role: "fn",
                            },
                            args: [
                                {
                                    kind: "Identifier",
                                    name: "xs",
                                    role: "var",
                                },
                            ],
                        },
                        {
                            kind: "Identifier",
                            name: "xs",
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
                        role: "fn",
                    },
                    args: [
                        {
                            kind: "Identifier",
                            name: "xs_smoothed",
                            role: "var",
                        },
                    ],
                },
            },
        ],
    };
    render({
        id: "model-line",
        dialog: [
            {
                ...message("D", "We are ready for our first `Model`. Let's start with the refreshed `Line`."),
                codeLabel: "`ates.py`",
                buildCodeBlock: (_ast) => atesModelBlock,
                textAfterCode: "We always omit `@op`s for the definitions in a `Model`."
            },
            message("W", "So we put `line` and `loss` under the same `Model`, which is called `Line`.\n" +
                "Why is `line` renamed to `predict`?"),
            message("D", "We train a !!`Model`!! by repeating three steps: `predict` with the current `params`, " +
                "compute a `loss`, and then update the `params`.\n" +
                "`Line` is not complete, since it doesn't know how to `update` yet."),
            message("W", "Indeed. I asked `pypie` to validate `Line` and received an error.\n" +
                "`Method update is missing in Line`.\n"),
            {
                ...message("D", "Here's how we !!`update`!!."),
                codeLabel: "`update` definition",
                buildCodeBlock: (_ast) => lineUpdateBlock,
                textAfterCode: "On each step, for each scalar `p` in `params`, the `Model` computes a !!gradient!! `g`. " +
                    "`g` is the local slope of `loss` with respect to `p`: if `g` is positive, increasing `p` raises `loss`; " +
                    "if `g` is negative, increasing `p` lowers `loss`.\n" +
                    "The update moves `p` in the opposite direction of `g`, then uses the new `params` for the next `predict`."
            },
            message("W", "`Line` is now complete!"),
            message("D", "Yes, it is now ready for training. The !!`train`!! function expects four inputs: `xs`, `ys`, `params`, and `revs`.\n" +
                "Try `10` revs, with the `xs`, `ys`, and `params` from the last chapter."),
            {
                ...message("W", "Like this?"),
                codeLabel: "`train` run",
                buildCodeBlock: (_ast) => lineTrainRunBlock,
                textAfterCode: "It prints `(1.009, 0.302)`--very close to the real `params`.\nOur example seems too easy--how about something more challenging?"
            },
            {
                ...message("D", "Now that's a challenge!"),
                codeLabel: "`ates.py` challenge run",
                buildCodeBlock: (_ast) => lineChallengeRunBlock,
                textAfterCode: "`rand` takes a shape, a lower bound, and an upper bound. It generates a `Tensor` of that shape using random numbers within the bounds."
            },
            {
                ...message("W", "So `xs` is a `Tensor[float][[1000]]`. We then generate `ys` of the same shape--with some additional noise?\n" +
                    "Let me train it..."),
                codeLabel: "`ates.py` lines 59-60",
                buildCodeBlock: (_ast) => lineChallengeTrainBlock,
                textAfterCode: "It prints `(nan, nan)`. Whoa! What are these?"
            },
            message("D", "`nan` means not a number.\n" +
                "Gradients can become unstable during training. If their magnitudes get very large, updates become huge " +
                "and parameters can overflow to `inf` or `nan`; this is called exploding gradients.\n" +
                "If gradients get very small, updates become tiny and learning nearly stops; this is called vanishing gradients."),
            message("W", "Can we make `update` smarter to reduce exploding and vanishing gradients?"),
            {
                ...message("D", "Yes, it requires a new function, `smooth`."),
                codeLabel: "`smooth` definition",
                buildCodeBlock: (_ast) => lineSmoothBlock,
                textAfterCode: "Try an example. For `decay`, `0.9` is usually a safe default."
            },
            {
                ...message("W", "Let's see."),
                codeLabel: "`ates.py` lines 32-34",
                buildCodeBlock: (_ast) => lineSmoothExampleBlock,
                textAfterCode: "It prints `Tensor([280.276, 285.326, 385.318])`.\n`xs_smoothed` is indeed smoother than `xs`."
            },
            {
                ...message("D", "Now we give `update` extra information. Here are two buddies of `update`, " +
                    "called !!`inflate`!! and !!`deflate`!!."),
                codeLabel: "`inflate` and `deflate`",
                buildCodeBlock: (_ast) => lineInflateDeflateBlock,
                textAfterCode: "When `train` starts, it `inflate`s each scalar in `params` with an additional `float`.\n" +
                    "When `train` ends, it `deflate`s `params` by removing the additional `float`s."
            },
            message("W", "Then `update` should handle the inflated `Tuple[float, float]`?"),
            {
                ...message("D", "Good observation. Here is the updated `update`."),
                codeLabel: "`LineRMS.update`",
                buildCodeBlock: (_ast) => lineRmsUpdateBlock,
                textAfterCode: "The key difference is `alpha * g`, which is smarter than the fixed `0.01 * g`. " +
                    "`alpha` depends on the moving average, which accompanies `p` during training.\n" +
                    "This approach is called RMSProp."
            },
            message("W", "The returned tuple makes sense to me. But in the definition, these numbers still seem magical and arbitrary."),
            message("D", "Maybe magical, but not arbitrary. In practice, people place variables in those positions, called !!hyperparameters!!, " +
                "and then adjust their values based on science, engineering, and sometimes alchemy.\n" +
                "Alright, let's call it a chapter."),
            message("W", "Wait, fewer frames?"),
            message("D", "Because this chapter answers a simpler question: " +
                "how to `train` `Model`s with `predict`, `loss`, `update`, " +
                "and occasionally `inflate` and `deflate`."),
            message("W", "And `Tensor` shapes!"),
        ],
    });
})();
