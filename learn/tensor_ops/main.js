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
            message("D", "Now let's run programs with `Tensor`s.\n" +
                "What is `1 + 1`?"),
            message("W", "`2`. Are those even `Tensor`s?"),
            message("D", "2 is correct! " +
                "And yes, `1` is actually a `Tensor[int][[]]`.\n" +
                "Here's a more interesting one: `Tensor([1]) + Tensor([1])`."),
            message("W", "Ok, maybe we add elements at matching positions. " +
                "It's `Tensor([2])`, right?\n" +
                "I have another example:\n" +
                "`Tensor([1, 2, 3]) + Tensor([5, 7, 9])` becomes `Tensor([6, 9, 12])`."),
            message("D", "Exactly! How about `Tensor([[1, 2, 3], [3, 2, 1]]) + Tensor([5, 7, 9])`?"),
            message("W", "Can we add these two `Tensor`s at all? Their types are different:\n" +
                "one is `Tensor[int][[2, 3]]` and the other is `Tensor[int][[3]]`."),
            message("D", "In `Tensor[int][[2, 3]]`, there are two `Tensor[int][[3]]`.\n" +
                "So we may run `+` twice. In each run, we may still add elements at matching positions."),
            message("W", "I see.\nFirst: `Tensor([1, 2, 3]) + Tensor([5, 7, 9])`,\nsecond: `Tensor([3, 2, 1]) + Tensor([5, 7, 9])`.\n" +
                "Then we combine the results and get `Tensor([[6, 9, 12], [8, 9, 10]])`?"),
            message("D", "Correct. What is the type of the result?"),
            message("W", "The result is a `Tensor[int][[2, 3]]`, the same as the input with the larger shape. " +
                "Seems like, we just need to align the two shapes, starting from their right-most.\n" +
                "A nice and handy trick!"),
            message("D", "This trick is called rank polymorphism. "),
            message("W", "What an intimidating name!"),
            message("D", "It is actually warmer and fuzzier than it sounds. Here, the **rank** is just the shape length.\n" +
                "For example, " +
                "`Tensor[int][[3]]` is rank `1` and `Tensor[int][[2, 3]]` is rank `2`."),
            message("W", "So, `42` has type `Tensor[int][[]]`, which makes it rank `0`?"),
            message("D", "That's right!\nWhen designing a function, we need to define its expected inputs and output. " +
                "Oftentimes, we use this function by giving it some inputs of larger ranks than expected. " +
                "Then, **rank polymorphism** decides whether the given inputs are valid for the function and adjusts the output correspondingly."),
            message("W", "I see. One definition may work on different types of inputs. That's the polymorphism.\n" +
                "Is `+` a **function**?"),
            message("D", "`+` is a function. Just like\n" +
                "`5` has type `Tensor[int][[]]`,\n" +
                "`+` has type `(x: Tensor[int][[]], y: Tensor[int][[]]) -> Tensor[int][[]]`."),
            message("W", "Let me guess. This function type tells us three things:\n" +
                "- The function `+` expects two inputs, called `x` and `y`.\n" +
                "- `x` is a `Tensor[int][[]]`, so is `y`.\n" +
                "- The result of `+` is also a `Tensor[int][[]]`."),
            message("D", "Very well! Now imagine feeding `+` with `1` as `x` and `1` as `y`."),
            message("W", "`1` is a `Tensor[int][[]]`. Its type matches the expected `x` and `y`, precisely.\n" +
                "So, `1 + 1` results in a `Tensor[int][[]]`, which is the type of `2`."),
            message("D", "Next one: `Tensor([[1, 2, 3], [3, 2, 1]]) + Tensor([5, 7, 9])`.\n" +
                "From the earlier excercise, we know it's a `Tensor[int][[2, 3]]`, by running its value. " +
                "Now, we are ready to derive the type directly.\n" +
                "Let's start with validating the inputs."),
            message("W", "Here, `x` has type `Tensor[int][[2, 3]]` and `y` has type `Tensor[int][[3]]`. " +
                "Neither precisely matches the expected `Tensor[int][[]]`... shall we align the two shapes from the right-most?"),
            message("D", "Yes, we do it in a rigorous way to validate compatibility."),
            message("W", "Let's see it!"),
            message("D", "Two `List[int]`s are compatible, if we find their **lead** and their **tail**.\n" +
                "When comparing two `List[int]`s, " +
                "we count from their right-most, see if the smaller list aligns with the tail of the larger one.\n" +
                "If succeeds, the remaining in the larger `List[int]` becomes the lead."),
            message("W", "Let me see...\n" +
                "For `x`, when comparing `[2, 3]` and `[]`, the tail is `[]` and the lead is `[2, 3]`.\n" +
                "For `y`, when comparing `[3]` and `[]`, the tail is `[]` and the lead is `[3]`.\n" +
                "So the first input is compatible with `x` and the second input is compatible with `y`!"),
            message("D", "Next, we validate the compatiblity between the two leads."),
            message("W", "Do you mean the compatibility between `[2, 3]` and `[3]`? Using the same approach to align from the right-most, we have the tail `[3]` and the lead `[2]`.\n" +
                "So, `[2, 3]` and `[3]` are compatible, while `[2, 3]` is the larger lead."),
            message("D", "Great! Here's what we have validated:\n" +
                "- On each input, the given type is compatible with the expected type. And we have found two leads.\n" +
                "- These two leads are compatible with one another.\n" +
                "So, `Tensor[int][[2, 3]]` and `Tensor[int][[3]]` are valid inputs to `Tensor[int][[]]` and `Tensor[int][[]]`!"),
            message("W", "Nice progress! How about the output type?"),
            message("D", "By validating the compatibility between the leads, we have learned that `[2, 3]` is the larger lead.\n" +
                "That means we will apply `+`, repeatedly, for `[2, 3]` times."),
            message("W", "Got it. The output must be `Tensor[Tensor[int][]][[2, 3]]` " +
                "and can be simplified to `Tensor[int][[2, 3]]`.\n" +
                "This is exactly what we got by running the values before!"),
            message("D", "Congrats on mastering rank polymorphism! " +
                "And good job for solving the validations problems in your mind.\n" +
                "Come up with some examples where rank polymorphism would say no: " +
                "either the given type is not compatible with the expected, or the leads are not compatible.\n" +
                "It reinforces your understanding."),
            message("W", "Good idea! Will do.\n" +
                "My recap on using rank polymorphism when applying a function:\n" +
                "- (1) for each input, it validates the compatibility between the given type and the expected type, it also computes the leads\n" +
                "- (2) it validates the compatiblity between the leads\n" +
                "- (3) it adjust the output type with the largest lead\n" +
                "In other systems with [broadcasting](https://docs.pytorch.org/docs/stable/notes/broadcasting.html). There are similar rules for (2) and (3), but not (1). Why is that?"),
            message("D", "Broadcasting is a simplification of rank polymorphism, with the assumption that all expected types are of the same rank. " +
                "So (1) always trivally succeeds. " +
                "After all, these systems do not have static types and cannot specify expected types for functions.\n" +
                "But here, rank polymorphism works for all functions."),
            message("W", "Cool! Are there other functions besides `+`?"),
            message("D", "A lot. In fact, you can define as many as you need.\n" +
                "We'll cover it in the next chapter."),
            message("W", "Can't wait!")
        ],
    });
})();
