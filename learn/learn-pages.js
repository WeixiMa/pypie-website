(() => {
    const buildTensorsBlock = (ast) => {
        const typeB = ast.varId("b", "int");
        const typeD = ast.varId("d", "int");

        return ast.block([
            ast.funcDef(
                "scale",
                [
                    ast.arg("x", ast.tensorType("float", [typeB, typeD])),
                    ast.arg("alpha", ast.typeId("float"), "float"),
                ],
                ast.tensorType("float", [typeB, typeD]),
                [ast.ret(ast.binOp(ast.varId("x"), "*", ast.varId("alpha", "float")))]
            ),
        ]);
    };

    const buildForwardLineBlock = (ast) => {
        const typeB = ast.varId("b", "int");
        const typeD = ast.varId("d", "int");
        const typeO = ast.varId("o", "int");

        return ast.block([
            ast.funcDef(
                "forward_line",
                [
                    ast.arg("x", ast.tensorType("float", [typeB, typeD])),
                    ast.arg("w", ast.tensorType("float", [typeD, typeO])),
                    ast.arg("bias", ast.tensorType("float", [typeO])),
                ],
                ast.tensorType("float", [typeB, typeO]),
                [
                    ast.assign(
                        ast.varId("y"),
                        ast.binOp(
                            ast.call(ast.attr(ast.varId("x"), "matmul"), [ast.varId("w")]),
                            "+",
                            ast.varId("bias")
                        )
                    ),
                    ast.ret(ast.varId("y")),
                ]
            ),
        ]);
    };

    const buildLearningLineBlock = (ast) => {
        const typeB = ast.varId("b", "int");
        const typeD = ast.varId("d", "int");
        const typeO = ast.varId("o", "int");

        return ast.block([
            ast.funcDef(
                "train_step",
                [
                    ast.arg("x", ast.tensorType("float", [typeB, typeD])),
                    ast.arg("y", ast.tensorType("float", [typeB, typeO])),
                    ast.arg("w", ast.tensorType("float", [typeD, typeO])),
                    ast.arg("bias", ast.tensorType("float", [typeO])),
                    ast.arg("lr", ast.typeId("float"), "float"),
                ],
                ast.tensorType("float", [typeD, typeO]),
                [
                    ast.assign(
                        ast.varId("pred"),
                        ast.binOp(
                            ast.call(ast.attr(ast.varId("x"), "matmul"), [ast.varId("w")]),
                            "+",
                            ast.varId("bias")
                        )
                    ),
                    ast.assign(
                        ast.varId("error"),
                        ast.binOp(ast.varId("pred"), "-", ast.varId("y"))
                    ),
                    ast.assign(
                        ast.varId("grad"),
                        ast.call(
                            ast.attr(ast.attr(ast.varId("x"), "T"), "matmul"),
                            [ast.varId("error")]
                        )
                    ),
                    ast.assign(
                        ast.varId("w_next"),
                        ast.binOp(
                            ast.varId("w"),
                            "-",
                            ast.binOp(ast.varId("lr", "float"), "*", ast.varId("grad"))
                        )
                    ),
                    ast.ret(ast.varId("w_next")),
                ]
            ),
        ]);
    };

    const buildLearningQuadBlock = (ast) => {
        const typeB = ast.varId("b", "int");

        return ast.block([
            ast.funcDef(
                "quad",
                [
                    ast.arg("x", ast.tensorType("float", [typeB])),
                    ast.arg("a", ast.typeId("float"), "float"),
                    ast.arg("b", ast.typeId("float"), "float"),
                    ast.arg("c", ast.typeId("float"), "float"),
                ],
                ast.tensorType("float", [typeB]),
                [
                    ast.ret(
                        ast.binOp(
                            ast.binOp(
                                ast.binOp(
                                    ast.varId("a", "float"),
                                    "*",
                                    ast.binOp(ast.varId("x"), "*", ast.varId("x"))
                                ),
                                "+",
                                ast.binOp(ast.varId("b", "float"), "*", ast.varId("x"))
                            ),
                            "+",
                            ast.varId("c", "float")
                        )
                    ),
                ]
            ),
        ]);
    };

    const LEARN_SERIES = {
        title: "Deep Learning 101",
        eyebrow: "Deep Learning 101",
        overview: {
            id: "overview",
            slug: "index.html",
            title: "0. Overview",
            lead:
                "Four short chapters that move from tensors to fitting a quadratic. Each page pairs prose with a PyPie AST snippet you can reuse.",
            callout: "Tip: Use the left navigation to hop between chapters.",
        },
        pages: [
            {
                id: "tensors",
                slug: "tensors.html",
                title: "1. Tensors",
                lead:
                    "Tensors are typed arrays with explicit shapes. PyPie keeps shapes in the type system, so you can reason about batch size, features, and outputs before you run.",
                summary: "Typed arrays with explicit shapes and a scaling helper.",
                section: {
                    id: "tensor-basics",
                    title: "Tensor Basics",
                    body: "A small helper keeps scaling explicit while preserving batch and feature dimensions.",
                    codeClass: "tensors-code",
                },
                buildBlock: buildTensorsBlock,
            },
            {
                id: "forward-line",
                slug: "forward-line.html",
                title: "2. A Forward Line",
                lead:
                    "A single linear layer maps inputs into a new space. This forward pass is the core primitive behind every dense layer.",
                summary: "The matrix multiply plus bias that powers dense layers.",
                section: {
                    id: "forward-pass",
                    title: "Forward Pass",
                    body: "Matrix multiply plus bias is the full story for a dense layer.",
                    codeClass: "forward-line-code",
                },
                buildBlock: buildForwardLineBlock,
            },
            {
                id: "learning-line",
                slug: "learning-line.html",
                title: "3. Learning a Line",
                lead:
                    "Training a line means nudging weights in the direction of lower error. Even with a tiny batch, gradient steps look the same.",
                summary: "One gradient step for a linear model.",
                section: {
                    id: "gradient-step",
                    title: "Gradient Step",
                    body: "This step computes prediction, error, gradient, and the next weight matrix.",
                    codeClass: "learning-line-code",
                },
                buildBlock: buildLearningLineBlock,
            },
            {
                id: "learning-quad",
                slug: "learning-quad.html",
                title: "4. Learning a Quad",
                lead:
                    "Quadratics can be learned by expanding the forward pass. This example keeps the shape annotations explicit so you can track the math.",
                summary: "Expanding the model to a quadratic.",
                section: {
                    id: "quadratic-model",
                    title: "Quadratic Model",
                    body: "A scalar quadratic still benefits from explicit types, especially when batched.",
                    codeClass: "learning-quad-code",
                },
                buildBlock: buildLearningQuadBlock,
            },
        ],
    };

    const setText = (selector, value) => {
        const element = document.querySelector(selector);
        if (element && value) {
            element.textContent = value;
        }
    };

    const pageId = document.body?.dataset.learnPage;
    if (!pageId) {
        return;
    }

    const allPages = [LEARN_SERIES.overview, ...LEARN_SERIES.pages];
    const currentPage = allPages.find((page) => page.id === pageId);
    if (!currentPage) {
        return;
    }

    const nav = document.querySelector("[data-learn-nav]");
    if (nav) {
        const navLinks = allPages
            .map((page) => {
                const isCurrent = page.id === currentPage.id;
                const currentAttr = isCurrent ? ' aria-current="page"' : "";
                return `<a href="${page.slug}"${currentAttr}>${page.title}</a>`;
            })
            .join("");
        nav.innerHTML = `<div class="doc-nav__title">${LEARN_SERIES.title}</div>${navLinks}`;
    }

    setText("[data-learn-eyebrow]", LEARN_SERIES.eyebrow);
    setText("[data-learn-title]", currentPage.title);
    setText("[data-learn-lead]", currentPage.lead);

    const baseTitle = `PyPie - ${LEARN_SERIES.title}`;
    document.title =
        currentPage.id === LEARN_SERIES.overview.id
            ? baseTitle
            : `${baseTitle}: ${currentPage.title}`;

    if (currentPage.id === LEARN_SERIES.overview.id) {
        const list = document.querySelector("[data-learn-overview-list]");
        if (list) {
            list.innerHTML = LEARN_SERIES.pages
                .map(
                    (page) =>
                        `<p><a href="${page.slug}">${page.title}</a> - ${page.summary}</p>`
                )
                .join("");
        }
        setText("[data-learn-callout]", LEARN_SERIES.overview.callout);
        return;
    }

    const section = document.querySelector("[data-learn-section]");
    if (section && currentPage.section) {
        section.id = currentPage.section.id;
        const sectionTitle = section.querySelector("[data-learn-section-title]");
        if (sectionTitle) {
            sectionTitle.textContent = currentPage.section.title;
        }
        const sectionBody = section.querySelector("[data-learn-section-body]");
        if (sectionBody) {
            sectionBody.textContent = currentPage.section.body;
        }
        const codeBlock = section.querySelector("[data-learn-code]");
        if (codeBlock) {
            codeBlock.className = `doc-code ${currentPage.section.codeClass}`;
            codeBlock.setAttribute(
                "aria-label",
                currentPage.section.ariaLabel || currentPage.section.title
            );
        }
    }

    const ast = window.PYPIE_AST;
    if (ast && window.PYPIE_SET_BLOCKS && typeof currentPage.buildBlock === "function") {
        const block = currentPage.buildBlock(ast);
        if (block) {
            window.PYPIE_SET_BLOCKS([
                { selector: `.${currentPage.section.codeClass}`, block },
            ]);
        }
    }
})();
