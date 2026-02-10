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
                            name: "forward",
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
                                name: "forward",
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

    render({
        id: "model-line",
        dialog: [
            {
                ...message(
                    "D",
                    "We are ready for our first Model. Let's start with a new look of `line`."
                ),
                codeLabel: "`ates.py`",
                buildCodeBlock: (_ast: AstApi) => atesModelBlock,
            },
            message(
                "W",
                "So we put `line` and `loss` under the same `Model`, which is called `Line`.\n" +
                "Why is `line` renamed to `forward`?"
            ),
            message(
                "D",
                "A **`Model`** learns `params` by repeating revisions. In each revision, it uses `forward` to find a `ys_pred`, " +
                "computes a `loss`, and then updates the `params`.\n" +
                "We omitted the `@op`s, since every definition in a `Model` is automatically a `pypie` operator.\n" +
                "This `Model` is not complete, since it doesn't know how to `update` yet."
            ),
            message(
                "W",
                "Indeed. I asked `pypie` to validate `Line` and received an error.\n" +
                "`Method update is missing in the Line class`.\n"
            ),
            {
                ...message(
                    "D",
                    "Now we define the !!`update`!! function for `Line`."
                ),
                codeLabel: "`update` definition",
                buildCodeBlock: (_ast: AstApi) => lineUpdateBlock,
                textAfterCode: "For each scalar `p` in `params`, the `Model` finds a gradient* `g` using `loss` and adjusts `p` with `g`**."
            },
            message(
                "W",
                "Can we see an example of revising `params`?"
            ),
            message(
                "D",
                "A complete `Model` provides the !!`train`!! function. The function expects four inputs: `xs`, `ys`, `params`, and `revs`.\n" +
                "Let's `train` the `Model` with `xs`, `ys`, and `params` from the last chapter--for 10 `revs`."
            ),
            {
                ...message(
                    "W",
                    "Like this?"
                ),
                codeLabel: "`train` run",
                buildCodeBlock: (_ast: AstApi) => lineTrainRunBlock,
                textAfterCode: "It prints `(1.009, 0.302)`--very close to the real `params`.\nOur example sees too easy--how about something more challanging?"
            },
            {
                ...message(
                    "D",
                    "Now you asked for it!"
                ),
                codeLabel: "`ates.py` challenge run",
                buildCodeBlock: (_ast: AstApi) => lineChallengeRunBlock,
                textAfterCode: "!!`rand`!! takes a shape, a lower bound, and a upper bound. It generates a `Tensor` of the specified shape, using random numbers within the bounds."
            },
            {
                ...message(
                    "W",
                    "So `xs` is a `Tensor[int][[1000]]`. We then generate `ys` of the same shape--with some additional noise?\n"+
                    "Let me train it..."
                ),
                codeLabel: "`ates.py` lines 59-60",
                buildCodeBlock: (_ast: AstApi) => lineChallengeTrainBlock,
                textAfterCode: "It prints `(nan, nan)`. Whoa! What are these?"
            },
            message(
                "D",
                "`nan` is short for not-a-number.\n" +
                "Machines have limited storages for each number. As we squared and added many numbers over and over, " +
                "we updated `params` with too large gradients to be stored. This is known as !!exploding gradients!!.\n" +
                "On the other extreme, gardients may sometimes get too small. Then `update`s are not effective--known " +
                "as !!vanishing gradients!!."
            ),
            message(
                "W",
                "Can we give some smartness to `update` to prevent exploding and vanishing?"
            ),
            {
                ...message(
                    "D",
                    "Yes. A smarter `update` needs some additional information. Here are two buddies of `update`, " +
                    "named !!`inflate`!! and !!`deflate`!!."
                ),
                codeLabel: "`inflate` and `deflate`",
                buildCodeBlock: (_ast: AstApi) => lineInflateDeflateBlock,
                textAfterCode: "When `train` starts, it `inflate`s each scalar in `params` with an additional `float`.\n" +
                "When `train` ends, it `delfate`s the `params` back."
            },
            message(
                "W",
                "Then at each `update`, `p` should be a `Tuple[float, float]`?" 
            ),
            {
                ...message(
                    "D",
                    "Good observation. Here's the updated `update`."
                ),
                codeLabel: "`LineRMS.update`",
                buildCodeBlock: (_ast: AstApi) => lineRmsUpdateBlock,
                textAfterCode: "Here, we calculate some `alpha * g` --smarter than the fixed `0.01 * g`. " +
                "`alpha` depends on the moving average of `p`, which accompanies `p` in the `Tuple[float, float]`.\n" +
                "This approach is called RMSProp."
            }
        ],
        notes: "* The mathematical definition of [gradient](https://en.wikipedia.org/wiki/Gradient) can be found in ...\n" +
        "** In `pypie`, a `Model` may also use different update methods for different `params`."
    });
})();
