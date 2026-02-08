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
    render({
        id: "ops-on-tensors",
        dialog: [
            message("D", "Let's run programs with `Tensor`s.\n" +
                "Quick warm-up: what is `1 + 1`?"),
            message("W", "`2`. But are those even `Tensor`s?"),
            message("D", "Yes, `1` has type `Tensor[int][[]]`.\n" +
                "Try this next: `Tensor([1]) + Tensor([1])`."),
            message("W", "How about adding matching positions?"),
            message("D", "Great instinct. That's exactly how we do it."),
            message("W", "Then it is `Tensor([2])`, right?\n" +
                "Likewise, `Tensor([1, 2, 3]) + Tensor([5, 7, 9])` gives `Tensor([6, 9, 12])`."),
            message("D", "What about `Tensor([[1, 2, 3], [3, 2, 1]]) + Tensor([5, 7, 9])`?"),
            message("W", "Can we add them at all? Their types are different:\n" +
                "`Tensor[int][[2, 3]]` and `Tensor[int][[3]]`."),
            message("D", "We can. A `Tensor[int][[2, 3]]` contains two `Tensor[int][[3]]`s.\n" +
                "So we run `+` twice. Every run still adds matching positions."),
            message("W", "Right.\n" +
                "First: `Tensor([1, 2, 3]) + Tensor([5, 7, 9])`.\n" +
                "Second: `Tensor([3, 2, 1]) + Tensor([5, 7, 9])`.\n" +
                "Then we combine the results as `Tensor([[6, 9, 12], [8, 9, 10]])`?"),
            message("D", "What is the result type?"),
            message("W", "The result is `Tensor[int][[2, 3]]`, same as the larger input shape.\n" +
                "It's a nice trick to split the larger `Tensor`!"),
            message("D", "The trick is called rank polymorphism."),
            message("W", "An intimidating name!"),
            message("D", "It's actually warmer and fuzzier than it looks. Here, **rank** is just the length of the shape.\n" +
                "`Tensor[int][[3]]` has rank `1`, and `Tensor[int][[2, 3]]` has rank `2`."),
            message("W", "Then `42` has type `Tensor[int][[]]`, so rank `0`?"),
            message("D", "Yes.\n" +
                "When we design a function, we define its expected types for inputs and result.\n" +
                "Rank polymorphism lets us apply that function to higher-rank inputs when they are compatible, and it lifts the result type accordingly."),
            message("W", "So one function definition works across different input ranks.\n" +
                "Is `+` a **function**?"),
            message("D", "`+` is a function. Just like\n" +
                "`5` has type `Tensor[int][[]]`,\n" +
                "`+` has type `(x: Tensor[int][[]], y: Tensor[int][[]]) -> Tensor[int][[]]`."),
            message("W", "This function type seems to suggest three things:\n" +
                "- `+` expects two inputs, `x` and `y`.\n" +
                "- `x` is `Tensor[int][[]]`, and so is `y`.\n" +
                "- The result is also a `Tensor[int][[]]`."),
            message("D", "Now imagine applying `+` with `1` as `x` and `1` as `y`."),
            message("W", "`1` is `Tensor[int][[]]`, so both inputs match exactly.\n" +
                "Therefore `1 + 1` has result type `Tensor[int][[]]`, which is the type of `2`."),
            message("D", "Next: `Tensor([[1, 2, 3], [3, 2, 1]]) + Tensor([5, 7, 9])`. " +
                "In the earlier exercise, we virtually ran the program and found its result type `Tensor[int][[2, 3]]`.\n" +
                "Now we derive the result type using polymorphism, without needing to run the program.\n" +
                "Let's start by validating the inputs."),
            message("W", "Here, `x` has type `Tensor[int][[2, 3]]` and `y` has type `Tensor[int][[3]]`.\n" +
                "Neither exactly matches the expected `Tensor[int][[]]`.\n" +
                "Are they compatible?"),
            message("D", "To decide that, we need a rule for compatibility of `List[int]`s."),
            message("W", "Let's see it!"),
            message("D", "Two `List[int]` are compatible if the shorter one matches a **suffix** of the longer one. " +
                "Then we split the longer shape into two `List[int]`s: the suffix and the remaining **prefix**.\n" +
                "Find the suffix and prefix for `x` and `y`."),
            message("W", "For `x`, compare `[2, 3]` with `[]`: suffix `[]`, prefix `[2, 3]`.\n" +
                "For `y`, compare `[3]` with `[]`: suffix `[]`, prefix `[3]`.\n" +
                "Each given input is compatible with its expected type!"),
            message("D", "Great. Next, validate compatibility between the two prefixes."),
            message("W", "Does compatibility work on prefixes too?"),
            message("D", "Yes. Compatibility applies to `List[int]`s, and prefixes are `List[int]`s too."),
            message("W", "So we compare `[2, 3]` with `[3]`.\n" +
                "The suffix is `[3]` and the prefix is `[2]`.\n" +
                "That means the prefixes from the inputs are also compatible."),
            message("D", "Good progress! We have shown:\n" +
                "- each given input type is compatible with its expected type;\n" +
                "- the two prefixes from the inputs are compatible with one another.\n" +
                "So `Tensor[int][[2, 3]]` and `Tensor[int][[3]]` are valid inputs for `+`."),
            message("W", "Nice. What's our next step?"),
            message("D", "Now we lift the result type. Under rank polymorphism, we repeatedly apply `+` to generate many `Tensor[int][[]]`s.\n" +
                "The number of repetitions depends on the longer prefix."),
            message("W", "Got it. The longer prefix is `[2, 3]`, so we lift `Tensor[int][[]]` by `[2, 3]`. " +
                "That is `Tensor[Tensor[int][[]]][[2, 3]]`, which simplifies to `Tensor[int][[2, 3]]`.\n" +
                "Exactly same with running the program!"),
            message("D", "Great work!\n" +
                "Try a few failing examples too: cases where a given type is incompatible with an expected type, or where the suffixes are incompatible.\n" +
                "It helps to internalize this trick."),
            message("W", "Will do."),
            message("D", "Let's recap **rank polymorphism**:\n" +
                "- (1) for each input, validate compatibility between the given and expected types, then find the prefixes*;\n" +
                "- (2) validate compatibility between those prefixes;\n" +
                "- (3) lift the result type by the longer prefix.\n" +
                "This process applies to all functions."),
            message("W", "Are there other functions besides `+`?"),
            message("D", "Yes, you can define as many as you need. " +
                "We'll cover that in the next chapter.\n" +
                "Time for another break!"),
            message("W", "Okay, ciao!"),
        ],
        notes: "* Many broadcasting systems, such as [PyTorch](https://docs.pytorch.org/docs/stable/notes/broadcasting.html) " +
            "and [NumPy](https://numpy.org/doc/stable/user/basics.broadcasting.html), do not include rule (1). " +
            "Those systems are usually dynamically typed and use a restricted form of rank polymorphism. " +
            "Effectively, they assume that all expected inputs share the same rank in the broadcasted function, so rule (1) always holds."
    });
})();
