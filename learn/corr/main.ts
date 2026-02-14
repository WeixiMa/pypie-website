(() => {
    type AstApi = unknown;

    type LearnPageConfig = {
        id: string;
        dialog: LearnDialogMessage[];
        notes?: string;
    };

    type Side = "left" | "right";

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

    const dotDefinitionBlock = {
        kind: "Block",
        body: [
            {
                kind: "ImportFrom",
                module: {
                    kind: "Identifier",
                    name: "__future__",
                    role: "plain",
                },
                names: [
                    {
                        kind: "Identifier",
                        name: "annotations",
                        role: "plain",
                    },
                ],
            },
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
                kind: "BlankLine",
            },
            {
                kind: "FunctionDef",
                name: {
                    kind: "Identifier",
                    name: "dot",
                    role: "fn",
                },
                args: [
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "p",
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
                            name: "s",
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
                                        kind: "Identifier",
                                        name: "p",
                                        role: "var",
                                    },
                                    op: "*",
                                    right: {
                                        kind: "Identifier",
                                        name: "s",
                                        role: "var",
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

    const corr1dDefinitionBlock = {
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
                        name: "iota",
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
                kind: "BlankLine",
            },
            {
                kind: "FunctionDef",
                name: {
                    kind: "Identifier",
                    name: "corr1d",
                    role: "fn",
                },
                args: [
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "p",
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
                            name: "s",
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
                                        kind: "BinOp",
                                        left: {
                                            kind: "BinOp",
                                            left: {
                                                kind: "Identifier",
                                                name: "m",
                                                role: "var",
                                                type: "int",
                                            },
                                            op: "-",
                                            right: {
                                                kind: "Identifier",
                                                name: "n",
                                                role: "var",
                                                type: "int",
                                            },
                                        },
                                        op: "+",
                                        right: {
                                            kind: "Number",
                                            value: "1",
                                        },
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
                            kind: "ListComp",
                            elt: {
                                kind: "Call",
                                callee: {
                                    kind: "Identifier",
                                    name: "dot",
                                    role: "fn",
                                },
                                args: [
                                    {
                                        kind: "Identifier",
                                        name: "p",
                                        role: "var",
                                    },
                                    {
                                        kind: "Subscript",
                                        value: {
                                            kind: "Identifier",
                                            name: "s",
                                            role: "var",
                                        },
                                        index: {
                                            kind: "Slice",
                                            start: {
                                                kind: "Identifier",
                                                name: "idx",
                                                role: "var",
                                                type: "int",
                                            },
                                            end: {
                                                kind: "BinOp",
                                                left: {
                                                    kind: "Identifier",
                                                    name: "idx",
                                                    role: "var",
                                                    type: "int",
                                                },
                                                op: "+",
                                                right: {
                                                    kind: "Identifier",
                                                    name: "n",
                                                    role: "var",
                                                    type: "int",
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                            target: [
                                {
                                    kind: "Identifier",
                                    name: "idx",
                                    role: "var",
                                    type: "int",
                                },
                            ],
                            iter: {
                                kind: "Call",
                                callee: {
                                    kind: "Identifier",
                                    name: "iota",
                                    role: "fn",
                                },
                                args: [
                                    {
                                        kind: "BinOp",
                                        left: {
                                            kind: "BinOp",
                                            left: {
                                                kind: "Identifier",
                                                name: "m",
                                                role: "var",
                                                type: "int",
                                            },
                                            op: "-",
                                            right: {
                                                kind: "Identifier",
                                                name: "n",
                                                role: "var",
                                                type: "int",
                                            },
                                        },
                                        op: "+",
                                        right: {
                                            kind: "Number",
                                            value: "1",
                                        },
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
            {
                kind: "BlankLine",
            },
        ],
    };

    const pad1dDefinitionBlock = {
        kind: "Block",
        body: [
            {
                kind: "FunctionDef",
                name: {
                    kind: "Identifier",
                    name: "pad1d",
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
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "padding",
                            role: "var",
                            type: "int",
                        },
                        annotation: {
                            kind: "Identifier",
                            name: "int",
                            role: "type",
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
                                        kind: "BinOp",
                                        left: {
                                            kind: "Identifier",
                                            name: "n",
                                            role: "var",
                                            type: "int",
                                        },
                                        op: "+",
                                        right: {
                                            kind: "BinOp",
                                            left: {
                                                kind: "Number",
                                                value: "2",
                                            },
                                            op: "*",
                                            right: {
                                                kind: "Identifier",
                                                name: "padding",
                                                role: "var",
                                                type: "int",
                                            },
                                        },
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
                            kind: "ListComp",
                            elt: {
                                kind: "IfExpr",
                                body: {
                                    kind: "Subscript",
                                    value: {
                                        kind: "Identifier",
                                        name: "xs",
                                        role: "var",
                                    },
                                    index: {
                                        kind: "BinOp",
                                        left: {
                                            kind: "Identifier",
                                            name: "i",
                                            role: "var",
                                            type: "int",
                                        },
                                        op: "-",
                                        right: {
                                            kind: "Identifier",
                                            name: "padding",
                                            role: "var",
                                            type: "int",
                                        },
                                    },
                                },
                                test: {
                                    kind: "BoolOp",
                                    op: "and",
                                    values: [
                                        {
                                            kind: "Compare",
                                            left: {
                                                kind: "Identifier",
                                                name: "padding",
                                                role: "var",
                                                type: "int",
                                            },
                                            op: "<=",
                                            right: {
                                                kind: "Identifier",
                                                name: "i",
                                                role: "var",
                                                type: "int",
                                            },
                                        },
                                        {
                                            kind: "Compare",
                                            left: {
                                                kind: "Identifier",
                                                name: "i",
                                                role: "var",
                                                type: "int",
                                            },
                                            op: "<",
                                            right: {
                                                kind: "BinOp",
                                                left: {
                                                    kind: "Identifier",
                                                    name: "n",
                                                    role: "var",
                                                    type: "int",
                                                },
                                                op: "+",
                                                right: {
                                                    kind: "Identifier",
                                                    name: "padding",
                                                    role: "var",
                                                    type: "int",
                                                },
                                            },
                                        },
                                    ],
                                },
                                orelse: {
                                    kind: "Number",
                                    value: "0.0",
                                },
                            },
                            target: [
                                {
                                    kind: "Identifier",
                                    name: "i",
                                    role: "var",
                                    type: "int",
                                },
                            ],
                            iter: {
                                kind: "Call",
                                callee: {
                                    kind: "Identifier",
                                    name: "iota",
                                    role: "fn",
                                },
                                args: [
                                    {
                                        kind: "BinOp",
                                        left: {
                                            kind: "Identifier",
                                            name: "n",
                                            role: "var",
                                            type: "int",
                                        },
                                        op: "+",
                                        right: {
                                            kind: "BinOp",
                                            left: {
                                                kind: "Number",
                                                value: "2",
                                            },
                                            op: "*",
                                            right: {
                                                kind: "Identifier",
                                                name: "padding",
                                                role: "var",
                                                type: "int",
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    };

    const corr1dPaddedDefinitionBlock = {
        kind: "Block",
        body: [
            {
                kind: "FunctionDef",
                name: {
                    kind: "Identifier",
                    name: "corr1d_padded",
                    role: "fn",
                },
                args: [
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "p",
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
                            name: "s",
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
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "padding",
                            role: "var",
                            type: "int",
                        },
                        annotation: {
                            kind: "Identifier",
                            name: "int",
                            role: "type",
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
                                        kind: "BinOp",
                                        left: {
                                            kind: "BinOp",
                                            left: {
                                                kind: "BinOp",
                                                left: {
                                                    kind: "Identifier",
                                                    name: "m",
                                                    role: "var",
                                                    type: "int",
                                                },
                                                op: "+",
                                                right: {
                                                    kind: "BinOp",
                                                    left: {
                                                        kind: "Number",
                                                        value: "2",
                                                    },
                                                    op: "*",
                                                    right: {
                                                        kind: "Identifier",
                                                        name: "padding",
                                                        role: "var",
                                                        type: "int",
                                                    },
                                                },
                                            },
                                            op: "-",
                                            right: {
                                                kind: "Identifier",
                                                name: "n",
                                                role: "var",
                                                type: "int",
                                            },
                                        },
                                        op: "+",
                                        right: {
                                            kind: "Number",
                                            value: "1",
                                        },
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
                            kind: "Call",
                            callee: {
                                kind: "Identifier",
                                name: "corr1d",
                                role: "fn",
                            },
                            args: [
                                {
                                    kind: "Identifier",
                                    name: "p",
                                    role: "var",
                                },
                                {
                                    kind: "Call",
                                    callee: {
                                        kind: "Identifier",
                                        name: "pad1d",
                                        role: "fn",
                                    },
                                    args: [
                                        {
                                            kind: "Identifier",
                                            name: "s",
                                            role: "var",
                                        },
                                        {
                                            kind: "Identifier",
                                            name: "i",
                                            role: "var",
                                            type: "int",
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                ],
            },
        ],
    };

    const rangeDefinitionBlock = {
        kind: "Block",
        body: [
            {
                kind: "FunctionDef",
                name: {
                    kind: "Identifier",
                    name: "range",
                    role: "fn",
                },
                args: [
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "start",
                            role: "var",
                            type: "int",
                        },
                        annotation: {
                            kind: "Identifier",
                            name: "int",
                            role: "type",
                        },
                    },
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "end",
                            role: "var",
                            type: "int",
                        },
                        annotation: {
                            kind: "Identifier",
                            name: "int",
                            role: "type",
                        },
                    },
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "stride",
                            role: "var",
                            type: "int",
                        },
                        annotation: {
                            kind: "Identifier",
                            name: "int",
                            role: "type",
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
                            name: "int",
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
                                        kind: "BinOp",
                                        left: {
                                            kind: "BinOp",
                                            left: {
                                                kind: "Identifier",
                                                name: "end",
                                                role: "var",
                                                type: "int",
                                            },
                                            op: "-",
                                            right: {
                                                kind: "Identifier",
                                                name: "start",
                                                role: "var",
                                                type: "int",
                                            },
                                        },
                                        op: "/",
                                        right: {
                                            kind: "Identifier",
                                            name: "stride",
                                            role: "var",
                                            type: "int",
                                        },
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
                            name: "size",
                            role: "var",
                            type: "int",
                        },
                        value: {
                            kind: "BinOp",
                            left: {
                                kind: "BinOp",
                                left: {
                                    kind: "Identifier",
                                    name: "end",
                                    role: "var",
                                    type: "int",
                                },
                                op: "-",
                                right: {
                                    kind: "Identifier",
                                    name: "start",
                                    role: "var",
                                    type: "int",
                                },
                            },
                            op: "/",
                            right: {
                                kind: "Identifier",
                                name: "stride",
                                role: "var",
                                type: "int",
                            },
                        },
                    },
                    {
                        kind: "Return",
                        value: {
                            kind: "BinOp",
                            left: {
                                kind: "BinOp",
                                left: {
                                    kind: "Call",
                                    callee: {
                                        kind: "Identifier",
                                        name: "iota",
                                        role: "fn",
                                    },
                                    args: [
                                        {
                                            kind: "Identifier",
                                            name: "size",
                                            role: "var",
                                            type: "int",
                                        },
                                    ],
                                },
                                op: "*",
                                right: {
                                    kind: "Identifier",
                                    name: "stride",
                                    role: "var",
                                    type: "int",
                                },
                            },
                            op: "+",
                            right: {
                                kind: "Identifier",
                                name: "start",
                                role: "var",
                                type: "int",
                            },
                        },
                    },
                ],
            },
        ],
    };

    const corr1dStrideDefinitionBlock = {
        kind: "Block",
        body: [
            {
                kind: "FunctionDef",
                name: {
                    kind: "Identifier",
                    name: "corr1d_stride",
                    role: "fn",
                },
                args: [
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "p",
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
                            name: "s",
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
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "stride",
                            role: "var",
                            type: "int",
                        },
                        annotation: {
                            kind: "Identifier",
                            name: "int",
                            role: "type",
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
                                        kind: "BinOp",
                                        left: {
                                            kind: "BinOp",
                                            left: {
                                                kind: "BinOp",
                                                left: {
                                                    kind: "Identifier",
                                                    name: "m",
                                                    role: "var",
                                                    type: "int",
                                                },
                                                op: "-",
                                                right: {
                                                    kind: "Identifier",
                                                    name: "n",
                                                    role: "var",
                                                    type: "int",
                                                },
                                            },
                                            op: "+",
                                            right: {
                                                kind: "Identifier",
                                                name: "stride",
                                                role: "var",
                                                type: "int",
                                            },
                                        },
                                        op: "/",
                                        right: {
                                            kind: "Identifier",
                                            name: "stride",
                                            role: "var",
                                            type: "int",
                                        },
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
                            kind: "ListComp",
                            elt: {
                                kind: "Call",
                                callee: {
                                    kind: "Identifier",
                                    name: "dot",
                                    role: "fn",
                                },
                                args: [
                                    {
                                        kind: "Identifier",
                                        name: "p",
                                        role: "var",
                                    },
                                    {
                                        kind: "Subscript",
                                        value: {
                                            kind: "Identifier",
                                            name: "s",
                                            role: "var",
                                        },
                                        index: {
                                            kind: "Slice",
                                            start: {
                                                kind: "Identifier",
                                                name: "idx",
                                                role: "var",
                                                type: "int",
                                            },
                                            end: {
                                                kind: "BinOp",
                                                left: {
                                                    kind: "Identifier",
                                                    name: "idx",
                                                    role: "var",
                                                    type: "int",
                                                },
                                                op: "+",
                                                right: {
                                                    kind: "Identifier",
                                                    name: "n",
                                                    role: "var",
                                                    type: "int",
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                            target: [
                                {
                                    kind: "Identifier",
                                    name: "idx",
                                    role: "var",
                                    type: "int",
                                },
                            ],
                            iter: {
                                kind: "Call",
                                callee: {
                                    kind: "Identifier",
                                    name: "range",
                                    role: "fn",
                                },
                                args: [
                                    {
                                        kind: "Number",
                                        value: "0",
                                    },
                                    {
                                        kind: "BinOp",
                                        left: {
                                            kind: "BinOp",
                                            left: {
                                                kind: "Identifier",
                                                name: "m",
                                                role: "var",
                                                type: "int",
                                            },
                                            op: "-",
                                            right: {
                                                kind: "Identifier",
                                                name: "n",
                                                role: "var",
                                                type: "int",
                                            },
                                        },
                                        op: "+",
                                        right: {
                                            kind: "Identifier",
                                            name: "stride",
                                            role: "var",
                                            type: "int",
                                        },
                                    },
                                    {
                                        kind: "Identifier",
                                        name: "stride",
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

    const corr1dPaddedStrideDefinitionBlock = {
        kind: "Block",
        body: [
            {
                kind: "FunctionDef",
                name: {
                    kind: "Identifier",
                    name: "corr1d_padded_stride",
                    role: "fn",
                },
                args: [
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "p",
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
                            name: "s",
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
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "padding",
                            role: "var",
                            type: "int",
                        },
                        annotation: {
                            kind: "Identifier",
                            name: "int",
                            role: "type",
                        },
                    },
                    {
                        kind: "Arg",
                        name: {
                            kind: "Identifier",
                            name: "stride",
                            role: "var",
                            type: "int",
                        },
                        annotation: {
                            kind: "Identifier",
                            name: "int",
                            role: "type",
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
                                        kind: "BinOp",
                                        left: {
                                            kind: "BinOp",
                                            left: {
                                                kind: "BinOp",
                                                left: {
                                                    kind: "BinOp",
                                                    left: {
                                                        kind: "Identifier",
                                                        name: "m",
                                                        role: "var",
                                                        type: "int",
                                                    },
                                                    op: "+",
                                                    right: {
                                                        kind: "BinOp",
                                                        left: {
                                                            kind: "Number",
                                                            value: "2",
                                                        },
                                                        op: "*",
                                                        right: {
                                                            kind: "Identifier",
                                                            name: "padding",
                                                            role: "var",
                                                            type: "int",
                                                        },
                                                    },
                                                },
                                                op: "-",
                                                right: {
                                                    kind: "Identifier",
                                                    name: "n",
                                                    role: "var",
                                                    type: "int",
                                                },
                                            },
                                            op: "+",
                                            right: {
                                                kind: "Identifier",
                                                name: "stride",
                                                role: "var",
                                                type: "int",
                                            },
                                        },
                                        op: "/",
                                        right: {
                                            kind: "Identifier",
                                            name: "stride",
                                            role: "var",
                                            type: "int",
                                        },
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
                            kind: "Call",
                            callee: {
                                kind: "Identifier",
                                name: "corr1d_stride",
                                role: "fn",
                            },
                            args: [
                                {
                                    kind: "Identifier",
                                    name: "p",
                                    role: "var",
                                },
                                {
                                    kind: "Call",
                                    callee: {
                                        kind: "Identifier",
                                        name: "pad1d",
                                        role: "fn",
                                    },
                                    args: [
                                        {
                                            kind: "Identifier",
                                            name: "s",
                                            role: "var",
                                        },
                                        {
                                            kind: "Identifier",
                                            name: "padding",
                                            role: "var",
                                            type: "int",
                                        },
                                    ],
                                },
                                {
                                    kind: "Identifier",
                                    name: "stride",
                                    role: "var",
                                    type: "int",
                                },
                            ],
                        },
                    },
                ],
            },
        ],
    };

    const corr1dStridePairDefinitionBlock = {
        kind: "Block",
        body: [
            ...corr1dStrideDefinitionBlock.body,
            {
                kind: "BlankLine",
            },
            ...corr1dPaddedStrideDefinitionBlock.body,
        ],
    };

    const corr1dRunBlock = {
        kind: "Block",
        body: [
            {
                kind: "Assign",
                target: {
                    kind: "Identifier",
                    name: "pattern",
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
                                    value: "0.0",
                                },
                                {
                                    kind: "Number",
                                    value: "1.0",
                                },
                                {
                                    kind: "Number",
                                    value: "0.0",
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
                    name: "signal",
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
                                    value: "0.0",
                                },
                                {
                                    kind: "Number",
                                    value: "1.0",
                                },
                                {
                                    kind: "Number",
                                    value: "0.0",
                                },
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
                            kind: "Call",
                            callee: {
                                kind: "Identifier",
                                name: "corr1d",
                                role: "fn",
                            },
                            args: [
                                {
                                    kind: "Identifier",
                                    name: "pattern",
                                    role: "var",
                                },
                                {
                                    kind: "Identifier",
                                    name: "signal",
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
        id: "prelude",
        dialog: [
            message(
                "D",
                "Our next model handles images. We will use it on the Fashion-MNIST dataset. " +
                "It has 70,000 pictures, each picture containing one item: a T-shirt, a dress, a coat, etc." 
            ),
            message(
                "W",
                "Given a picture, our model predicts which item it is?\nLet's get started!"
            ),
            message(
                "D",
                "We begin with a baby step, detecting signals in rank-1 tensors.\n" +
                "Here's a signal:\n`Tensor([0.0, 1.0, 0.0, 0.0, 0.0])`.\nLet's detect if it has the pattern\n`Tensor([0.0, 1.0, 0.0])`.\n" +
                "We left-align the pattern and the signal, and slide the pattern all the way to the right. " +
                "For each segment in the signal, we compute a score of how well it matches the pattern."
            ),
            message(
                "W",
                "Let's define a function to compute it!"
            ),
            {
                ...message(
                    "D",
                    "The score is the dot-product between the pattern and the segment, which share the same shape."
                ),
                codeLabel: "`dot` definition",
                buildCodeBlock: (_ast: AstApi) => dotDefinitionBlock,
                textAfterCode: "From now on, we attach the import from `__future__` to the beginning of every file.\n" +
                "It helps Python to recognize the `Var`s from PyPie."
            },
            message(
                "W",
                "In our case, `n` is `3`, the length of the pattern? For the first segment in the signal, we have `dot(Tensor([0.0, 1.0, 0.0]), Tensor([0.0, 1.0, 0.0]))`, which is `1.0`."
            ),
            {
                ...message(
                    "D",
                    "Next we slide the pattern and compute `dot` on every segment. The function is called `corr1d` for correlation of rank-1 tensors.\n"
                ),
                codeLabel: "`corr1d` definition",
                buildCodeBlock: (_ast: AstApi) => corr1dDefinitionBlock,
                textAfterCode: "It's a long function. Let's start with its type."
            },
            message(
                "W",
                "The pattern `p` and signal `s` are rank-1 tensors, but have different shapes. " +
                "The result is also rank-1, with `m - n + 1` elements, since there are `m - n + 1 ` segments.\n" +
                "Does `corr1d` return a tensor?"
            ),
            message(
                "D",
                "It does. `[... for ... in ...]` is a !!tensor comprehension!!.\n" +
                "Here's how `corr1d` slides through the signal:\n" +
                "`iota` gives us a `Tensor[int][[m - n + 1]]`: from `0` to `m - n`. We use these `int`s as the beginning indices of the segments;\n" +
                "for each index, we take `n` selements from the signal to compute the dot product.\n" +
                "Let's run our example."
            ),
            {
                ...message(
                    "W",
                    "Of course."
                ),
                codeLabel: "`corr.py` lines 22-24",
                buildCodeBlock: (_ast: AstApi) => corr1dRunBlock,
                textAfterCode: "It prints `Tensor([1.0, 0.0, 0.0])`--three `dot`s for three segments."
            },
            message(
                "D",
                "Now we enhance the coverage of `corr1d`."
            ),
            message(
                "W",
                "The coverage on what?"
            ),
            {
                ...message(
                    "D",
                    "On the elements at the front and at the end.\n" +
                    "Our `corr1d` underused the first and the last elements in the signal--" +
                    "each of them was used only once. But middle element was used three times.\n" +
                    "To use each element equal times, we can pad the signal before computing `corr1d`, by attaching `0.0`s to the front and the end."
                ),
                codeLabel: "`pad1d` definition",
                buildCodeBlock: (_ast: AstApi) => pad1dDefinitionBlock,
                textAfterCode: "Define `corr1d_padded` that extends `corr1d` with !!padding!!. How many elements does it return?"
            },
            {
                ...message(
                    "W",
                    "It returns additional `2 * padding` elements, comparing with the vanilla `corr1d`."
                ),
                codeLabel: "`corr1d_padded` definition",
                buildCodeBlock: (_ast: AstApi) => corr1dPaddedDefinitionBlock,
                textAfterCode: "Running `corr1d_padded(pattern, signal, 2)`...\n" +
                "It gives `Tensor([0.0, 1.0, 0.0, 0.0, 0.0])`. Each element in the signal is equally used!"
            },
            {
                ...message(
                    "D",
                    "There is also a trick to make `corr1d` more flexible.\n" + 
                    "In our example, `corr1d` stops at each element every time.\n"+
                    "On some other occasions, we might want to stop less frequently, like two or three elements at a time.\n" +
                    "To do that, we need a new function to generate indices."
                ),
                codeLabel: "`range` definition",
                buildCodeBlock: (_ast: AstApi) => rangeDefinitionBlock,
                textAfterCode: "For example, `range(0, 10, 2)` gives `Tensor([0, 2, 4, 6, 8])`.\n" +
                "Create a new version of `corr1d` to use indices with flexible !!strides!!."
            },
            {
                ...message(
                    "W",
                    "`corr1d_stride` should return `(m - n + stride) / stride` elements."
                ),
                codeLabel: "`corr1d_stride` and `corr1d_padded_stride` definitions",
                buildCodeBlock: (_ast: AstApi) => corr1dStridePairDefinitionBlock,
            }
        ],
    });
})();
