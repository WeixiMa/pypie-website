(() => {
    type Side = "left" | "right";

    type LearnDialogMessage = {
        side: Side;
        speaker: string;
        text: string;
    };

    type LearnPageConfig = {
        id: string;
        dialog: LearnDialogMessage[];
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

    render({
        id: "ops-on-tensors",
        dialog: [
            message(
                "D",
                "Now let's run programs with `Tensor`s.\n" +
                "What is `1 + 1`?"
            ),
            message("W", "`2`. But are those even `Tensor`s?"),
            message(
                "D",
                "Correct. And yes: `1` has type `Tensor[int][[]]`.\n" +
                "Try this one: `Tensor([1]) + Tensor([1])`."
            ),
            message(
                "W",
                "Then we add matching positions.\n" +
                "So it is `Tensor([2])`, right?\n" +
                "Likewise, `Tensor([1, 2, 3]) + Tensor([5, 7, 9])` gives `Tensor([6, 9, 12])`."
            ),
            message(
                "D",
                "Exactly. What about `Tensor([[1, 2, 3], [3, 2, 1]]) + Tensor([5, 7, 9])`?"
            ),
            message(
                "W",
                "Can we add them at all? Their types are different:\n" +
                "`Tensor[int][[2, 3]]` and `Tensor[int][[3]]`."
            ),
            message(
                "D",
                "We can. A `Tensor[int][[2, 3]]` contains two `Tensor[int][[3]]`.\n" +
                "So we apply `+` twice on each. This way, each run still adds matching positions."
            ),
            message(
                "W",
                "Right.\n" +
                "First: `Tensor([1, 2, 3]) + Tensor([5, 7, 9])`.\n" +
                "Second: `Tensor([3, 2, 1]) + Tensor([5, 7, 9])`.\n" +
                "Then we combine the results as `Tensor([[6, 9, 12], [8, 9, 10]])`?"
            ),
            message("D", "Correct. What is the result type?"),
            message(
                "W",
                "The result is `Tensor[int][[2, 3]]`, same as the larger input shape.\n" +
                "So we align shapes from the right."
            ),
            message("D", "Exactly. That rule is called rank polymorphism."),
            message("W", "An intimidating name!"),
            message(
                "D",
                "It is warmer and fuzzier than it sounds. Here, **rank** is just the length of the shape.\n" +
                "`Tensor[int][[3]]` has rank `1`, and `Tensor[int][[2, 3]]` has rank `2`."
            ),
            message("W", "Then `42` has type `Tensor[int][[]]`, so rank `0`?"),
            message(
                "D",
                "Exactly.\n" +
                "When we design a function, we define its expected types for inputs and result.\n" +
                "Rank polymorphism lets us apply that function to higher-rank inputs when they are compatible, and it lifts the result type accordingly."
            ),
            message(
                "W",
                "So one function definition works across different input ranks.\n" +
                "Is `+` a **function**?"
            ),
            message(
                "D",
                "`+` is a function. Just like\n" +
                "`5` has type `Tensor[int][[]]`,\n" +
                "`+` has type `(x: Tensor[int][[]], y: Tensor[int][[]]) -> Tensor[int][[]]`."
            ),
            message(
                "W",
                "This function type seems to suggeest three things:\n" +
                "- `+` expects two inputs, `x` and `y`.\n" +
                "- `x` is `Tensor[int][[]]`, and so is `y`.\n" +
                "- The result is also `Tensor[int][[]]`."
            ),
            message(
                "D",
                "Exactly. Now imagine applying `+` with `1` as `x` and `1` as `y`."
            ),
            message(
                "W",
                "`1` is `Tensor[int][[]]`, so both inputs match exactly.\n" +
                "Therefore `1 + 1` returns `Tensor[int][[]]`, which is the type of `2`."
            ),
            message(
                "D",
                "Next: `Tensor([[1, 2, 3], [3, 2, 1]]) + Tensor([5, 7, 9])`.\n" +
                "From the earlier exercise, we know the result is `Tensor[int][[2, 3]]` by evaluating values.\n" +
                "Now we derive that type directly.\n" +
                "Let's start by validating the inputs."
            ),
            message(
                "W",
                "Here, `x` has type `Tensor[int][[2, 3]]` and `y` has type `Tensor[int][[3]]`.\n" +
                "Neither exactly matches the expected `Tensor[int][[]]`.\n" +
                "Do we align shapes from the right again?"
            ),
            message("D", "Yes, but we will do it rigorously."),
            message("W", "Let's do it."),
            message(
                "D",
                "Two `List[int]` are compatible if the shorter one matches a suffix of the longer one.\n" +
                "That matching suffix is the **tail**.\n" +
                "Any remaining prefix of the longer list is the **lead**.\n" +
                "Find the tails and leads for `x` and `y`."
            ),
            message(
                "W",
                "For `x`, compare `[2, 3]` with `[]`: tail `[]`, lead `[2, 3]`.\n" +
                "For `y`, compare `[3]` with `[]`: tail `[]`, lead `[3]`.\n" +
                "So each given input is compatible with its expected type."
            ),
            message("D", "Great. Next, validate compatibility between the two leads."),
            message(
                "W",
                "So we compare `[2, 3]` with `[3]`.\n" +
                "Right-aligned, the tail is `[3]` and the lead is `[2]`.\n" +
                "That means the leads are compatible, and `[2, 3]` is the larger lead."
            ),
            message(
                "D",
                "Exactly. We have shown:\n" +
                "- each given input type is compatible with its expected type;\n" +
                "- the two leads are compatible with each other.\n" +
                "So these are valid inputs for `+`."
            ),
            message("W", "Nice. How do we derive the result type?"),
            message(
                "D",
                "Since `[2, 3]` is the larger lead, the result is lifted by `[2, 3]`."
            ),
            message(
                "W",
                "Then the result is `Tensor[Tensor[int][[]]][[2, 3]]`,\n" +
                "which simplifies to `Tensor[int][[2, 3]]`.\n" +
                "Exactly what we saw from evaluation."
            ),
            message(
                "D",
                "Great work!\n" +
                "Try a few failing examples too: cases where a given type is incompatible with an expected type, or where the leads are incompatible.\n" +
                "It helps to internalize this rule."
            ),
            message(
                "W",
                "Will do.\n" +
                "My recap for applying **rank polymorphism**:\n" +
                "- (1) for each input, validate compatibility between given and expected types, and compute the lead;" +
                "\\note{This rule does not exist in systems with [broadcasting](https://docs.pytorch.org/docs/stable/notes/broadcasting.html)}, since broadcasting is a simplified form of rank polymorphism, where expected input ranks are fixed to 0." + 
                "- (2) validate compatibility between the leads;\n" +
                "- (3) lift the result type by the largest lead.\n" +
                ", (2) and (3) look similar, but (1) often does not. Why?"
            ),
            message(
                "D",
                "Broadcasting is a restricted form of rank polymorphism where expected input ranks are usually fixed by convention.\n" +
                "So step (1) is often implicit.\n" +
                "Many dynamic systems also enforce these rules at runtime rather than through static function types.\n" +
                "Here, rank polymorphism is part of the function typing rule itself."
            ),
            message("W", "Nice. Are there other functions besides `+`?"),
            message(
                "D",
                "Many. You can define as many as you need.\n" +
                "We'll cover that in the next chapter."
            ),
            message("W", "Can't wait!"),
        ],
    });
})();
