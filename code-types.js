// @ts-nocheck
const DEFAULT_TYPE = "float";
const HOVER_RADIUS = 10;
const id = (name, role, type) => ({
    kind: "Identifier",
    name,
    role,
    type,
});
const varId = (name, type = DEFAULT_TYPE) => id(name, "var", type);
const fnId = (name) => id(name, "fn");
const typeId = (name) => id(name, "type");
const plainId = (name) => id(name, "plain");
const typeList = (items) => ({ kind: "TypeList", items });
const typeSubscript = (base, index) => ({ kind: "TypeSubscript", base, index });
const arg = (name, annotation, type) => ({
    kind: "Arg",
    name: varId(name, type),
    annotation,
});
const funcDef = (name, args, returns, body) => ({
    kind: "FunctionDef",
    name: fnId(name),
    args,
    returns,
    body,
    decorator: fnId("op"),
});
const assign = (target, value) => ({ kind: "Assign", target, value });
const ret = (value) => ({ kind: "Return", value });
const exprStmt = (value) => ({ kind: "ExprStmt", value });
const replInput = (value) => ({ kind: "ReplInput", value });
const replOutput = (value) => ({ kind: "ReplOutput", value });
const replAssign = (target, value) => ({ kind: "ReplAssign", target, value });
const attr = (value, name) => ({ kind: "Attribute", value, attr: plainId(name) });
const call = (callee, args) => ({ kind: "Call", callee, args });
const subscript = (value, index) => ({ kind: "Subscript", value, index });
const listExpr = (elements) => ({ kind: "List", elements });
const listComp = (elt, target, iter) => ({ kind: "ListComp", elt, target, iter });
const binOp = (left, op, right) => ({ kind: "BinOp", left, op, right });
const unaryOp = (op, operand) => ({ kind: "UnaryOp", op, operand });
const number = (value) => ({ kind: "Number", value: String(value) });
const tensorType = (scalarType, shapeVars) => {
    const base = typeSubscript(typeId("Tensor"), typeId(scalarType));
    const shape = typeList([typeList(shapeVars)]);
    return typeSubscript(base, shape);
};
const typeM = varId("m", "int");
const typeN = varId("n", "int");
const softmaxBlock = {
    kind: "Block",
    body: [
        funcDef("softmax", [arg("x", tensorType("float", [typeM, typeN]))], tensorType("float", [typeM, typeN]), [
            assign(varId("x_exp"), call(attr(varId("x"), "exp"), [])),
            assign(varId("sums", "int"), call(attr(call(attr(varId("x_exp"), "sum"), [number(1)]), "reshape"), [listExpr([varId("m", "int"), number(1)])])),
            ret(binOp(varId("x_exp", "int"), "/", varId("sums", "int"))),
        ]),
    ],
};
const crossEntropyBlock = {
    kind: "Block",
    body: [
        funcDef("cross_entropy", [
            arg("pred", tensorType("float", [typeM, typeN])),
            arg("indices", tensorType("int", [typeM]), "int"),
        ], typeId("float"), [
            assign(varId("probs"), call(plainId("softmax"), [varId("pred")])),
            assign(varId("labels"), listComp(subscript(varId("row"), varId("idx", "int")), [varId("row"), varId("idx", "int")], call(plainId("zip"), [varId("probs"), varId("indices", "int")]))),
            ret(unaryOp("-", call(attr(call(attr(varId("labels"), "log"), []), "mean"), []))),
        ]),
    ],
};
const exampleBlock = {
    kind: "Block",
    body: [
        replAssign(varId("pred"), call(typeId("Tensor"), [
            listExpr([
                listExpr([number(0.1), number(0.3), number(0.6)]),
                listExpr([number(0.3), number(0.2), number(0.5)]),
            ]),
        ])),
        replAssign(varId("indices", "int"), call(typeId("Tensor"), [listExpr([number(0), number(2)])])),
        replInput(call(plainId("print"), [
            call(fnId("cross_entropy"), [varId("pred"), varId("indices", "int")]),
        ])),
        replOutput(number(1.1465)),
    ],
};
const blocks = [
    { selector: ".hero-code", block: softmaxBlock },
    { selector: ".hero-code-secondary", block: crossEntropyBlock },
    { selector: ".hero-code-example", block: exampleBlock },
];
const escapeHtml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
class DocBuilder {
    constructor() {
        this.lines = [[]];
        this.indentLevel = 0;
        this.indentText = "    ";
    }
    token(text, className, dataType) {
        if (this.lines.length === 0) {
            this.lines.push([]);
        }
        const line = this.lines[this.lines.length - 1];
        if (line.length === 0) {
            line.push({ text: this.indentText.repeat(this.indentLevel) });
        }
        line.push({ text, className, dataType });
    }
    space() {
        this.token(" ");
    }
    newline() {
        this.lines.push([]);
    }
    indent() {
        this.indentLevel += 1;
    }
    dedent() {
        this.indentLevel = Math.max(0, this.indentLevel - 1);
    }
    toHtml() {
        const lines = this.lines.slice();
        if (lines.length > 0 && lines[lines.length - 1].length === 0) {
            lines.pop();
        }
        return lines
            .map((line) => line
            .map((segment) => {
            const text = escapeHtml(segment.text);
            if (!segment.className && !segment.dataType) {
                return text;
            }
            const attrs = [];
            if (segment.className) {
                attrs.push(`class=\"${segment.className}\"`);
            }
            if (segment.dataType) {
                attrs.push(`data-type=\"${escapeHtml(segment.dataType)}\"`);
            }
            return `<span ${attrs.join(" ")}>${text}</span>`;
        })
            .join(""))
            .join("\n");
    }
}
const printIdentifier = (builder, node) => {
    if (node.role === "fn") {
        builder.token(node.name, "fn");
    }
    else if (node.role === "type") {
        builder.token(node.name, "type");
    }
    else if (node.role === "var") {
        builder.token(node.name, "code-var", node.type || DEFAULT_TYPE);
    }
    else {
        builder.token(node.name);
    }
};
const printType = (builder, node) => {
    if (!node) {
        return;
    }
    if (node.kind === "TypeList") {
        builder.token("[");
        node.items.forEach((item, index) => {
            printType(builder, item);
            if (index < node.items.length - 1) {
                builder.token(",");
                builder.space();
            }
        });
        builder.token("]");
        return;
    }
    if (node.kind === "TypeSubscript") {
        printType(builder, node.base);
        builder.token("[");
        printType(builder, node.index);
        builder.token("]");
        return;
    }
    if (node.kind === "Identifier") {
        printIdentifier(builder, node);
    }
};
const printExpr = (builder, node) => {
    if (!node) {
        return;
    }
    switch (node.kind) {
        case "Identifier":
            printIdentifier(builder, node);
            return;
        case "Attribute":
            printExpr(builder, node.value);
            builder.token(".");
            printIdentifier(builder, node.attr);
            return;
        case "Call":
            printExpr(builder, node.callee);
            builder.token("(");
            node.args.forEach((argNode, index) => {
                printExpr(builder, argNode);
                if (index < node.args.length - 1) {
                    builder.token(",");
                    builder.space();
                }
            });
            builder.token(")");
            return;
        case "Subscript":
            printExpr(builder, node.value);
            builder.token("[");
            printExpr(builder, node.index);
            builder.token("]");
            return;
        case "List":
            builder.token("[");
            node.elements.forEach((element, index) => {
                printExpr(builder, element);
                if (index < node.elements.length - 1) {
                    builder.token(",");
                    builder.space();
                }
            });
            builder.token("]");
            return;
        case "ListComp":
            builder.token("[");
            printExpr(builder, node.elt);
            builder.space();
            builder.token("for", "kw");
            builder.space();
            node.target.forEach((targetNode, index) => {
                printExpr(builder, targetNode);
                if (index < node.target.length - 1) {
                    builder.token(",");
                    builder.space();
                }
            });
            builder.space();
            builder.token("in", "kw");
            builder.space();
            printExpr(builder, node.iter);
            builder.token("]");
            return;
        case "BinOp":
            printExpr(builder, node.left);
            builder.space();
            builder.token(node.op, "op");
            builder.space();
            printExpr(builder, node.right);
            return;
        case "UnaryOp":
            builder.token(node.op, "op");
            printExpr(builder, node.operand);
            return;
        case "Number":
            builder.token(node.value, "num");
            return;
        default:
            return;
    }
};
const printStatement = (builder, node) => {
    switch (node.kind) {
        case "FunctionDef":
            if (node.decorator) {
                builder.token("@", "op");
                printIdentifier(builder, node.decorator);
                builder.newline();
            }
            builder.token("def", "kw");
            builder.space();
            printIdentifier(builder, node.name);
            builder.token("(");
            node.args.forEach((argNode, index) => {
                printIdentifier(builder, argNode.name);
                builder.token(":");
                builder.space();
                printType(builder, argNode.annotation);
                if (index < node.args.length - 1) {
                    builder.token(",");
                    builder.space();
                }
            });
            builder.token(")");
            builder.space();
            builder.token("->", "op");
            builder.space();
            printType(builder, node.returns);
            builder.token(":");
            builder.newline();
            builder.indent();
            node.body.forEach((stmt) => {
                printStatement(builder, stmt);
            });
            builder.dedent();
            return;
        case "Assign":
            printExpr(builder, node.target);
            builder.space();
            builder.token("=", "op");
            builder.space();
            printExpr(builder, node.value);
            builder.newline();
            return;
        case "ReplAssign":
            builder.token(">", "op");
            builder.space();
            printExpr(builder, node.target);
            builder.space();
            builder.token("=", "op");
            builder.space();
            printExpr(builder, node.value);
            builder.newline();
            return;
        case "Return":
            builder.token("return", "kw");
            builder.space();
            printExpr(builder, node.value);
            builder.newline();
            return;
        case "ExprStmt":
            printExpr(builder, node.value);
            builder.newline();
            return;
        case "ReplInput":
            builder.token(">", "op");
            builder.space();
            printExpr(builder, node.value);
            builder.newline();
            return;
        case "ReplOutput":
            printExpr(builder, node.value);
            builder.newline();
            return;
        default:
            return;
    }
};
const renderBlocks = () => {
    blocks.forEach(({ selector, block }) => {
        const element = document.querySelector(selector);
        if (!element) {
            return;
        }
        const builder = new DocBuilder();
        block.body.forEach((stmt) => {
            printStatement(builder, stmt);
        });
        element.innerHTML = builder.toHtml();
    });
};
const positionTypeMap = new Map();
let rectEntries = [];
const getPosKey = (rect) => {
    const left = Math.round(rect.left);
    const top = Math.round(rect.top);
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);
    return `${left}:${top}:${width}:${height}`;
};
const rebuildMap = () => {
    positionTypeMap.clear();
    rectEntries = [];
    const vars = document.querySelectorAll(".code-var");
    vars.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const key = getPosKey(rect);
        const dataType = el.getAttribute("data-type") || DEFAULT_TYPE;
        positionTypeMap.set(key, dataType);
        rectEntries.push({ rect, key });
    });
};
const findTypeAt = (x, y) => {
    for (const entry of rectEntries) {
        const rect = entry.rect;
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            return positionTypeMap.get(entry.key) || DEFAULT_TYPE;
        }
    }
    let nearest = null;
    let nearestDist = Infinity;
    for (const entry of rectEntries) {
        const rect = entry.rect;
        const cx = (rect.left + rect.right) / 2;
        const cy = (rect.top + rect.bottom) / 2;
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < nearestDist) {
            nearestDist = dist;
            nearest = entry;
        }
    }
    if (nearest && nearestDist <= HOVER_RADIUS) {
        return positionTypeMap.get(nearest.key) || DEFAULT_TYPE;
    }
    return null;
};
const tooltip = document.querySelector(".code-type-tooltip");
const hero = document.querySelector(".hero");
if (tooltip && hero) {
    const show = (x, y, type) => {
        tooltip.textContent = type;
        tooltip.style.opacity = "1";
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
    };
    const hide = () => {
        tooltip.style.opacity = "0";
    };
    const handleMove = (event) => {
        const heroRect = hero.getBoundingClientRect();
        if (event.clientX < heroRect.left ||
            event.clientX > heroRect.right ||
            event.clientY < heroRect.top ||
            event.clientY > heroRect.bottom) {
            hide();
            return;
        }
        const type = findTypeAt(event.clientX, event.clientY);
        if (type) {
            show(event.clientX, event.clientY, type);
            return;
        }
        const target = event.target;
        if (target instanceof Element && target.closest(".hero-content")) {
            hide();
            return;
        }
        hide();
    };
    const rebuildAndSync = () => {
        renderBlocks();
        rebuildMap();
    };
    window.addEventListener("resize", rebuildAndSync);
    window.addEventListener("load", rebuildAndSync);
    document.addEventListener("mousemove", handleMove);
    hero.addEventListener("mouseleave", hide);
    if (document.fonts && "ready" in document.fonts) {
        document.fonts.ready.then(rebuildAndSync);
    }
    requestAnimationFrame(rebuildAndSync);
}
