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
        id: "tensors",
        dialog: [
            message("D", "Alrighty, let's get started."),
            message("W", "Can't wait!"),
            message("D", "What is `5`?"),
            message("W", "Is `5` a `Num`?"),
            message("D", "That's right! Do you know other `Num`s?"),
            message("W", "Hmm... `0` and `-42`?"),
            message("D", "Good, they are `Num`s too."),
            message("W", "What about `-42.42`?"),
            message("D", "Yes, `-42.42` is also a `Num`, but it is different from `42`."),
            message("W", "How?"),
            message("D", "On machines, `42` and `42.42` are stored differently. When running programs, they may also behave differently.\n" +
                "We have a special name for the `Num`s like `42`, called `int`. And we have another name, `float`, for the `Num`s like `42.42`.\n" +
                "`int` and `float` are *types*. A *type* describes the behavior of a set of values."),
            message("W", "Is `Num` also a type?"),
            message("D", "`Num` is a type that describes the shared behavior of all `int` values and all `float` values."),
            message("W", "Interesting. Are there values of other types?"),
            message("D", "Here's one `[1, 2, 3]`."),
            message("W", "It groups three `int`s together! What do we call it?"),
            message("D", "We call `[1, 2, 3]` a `List[int]`."),
            message("W", "Seems like, `List[t]` is a type, as long as `t` is a type.\nSo, there must be a type called `List[List[int]]`?"),
            message("D", "Yes, `List` can be nested, such as `[[1, 2, 3], [4, 5, 6]]`."),
            message("W", "What about `[[1, 2, 3], [4, 5]]`?"),
            message("D", "That's also a `List[List[int]]`, since its first element is a `List[int]`..."),
            message("W", "... because all sub-elements in its element are `ints`.\n" +
                "Then, its second element is also a `List[int]`, since all elements there are `ints`.\n" +
                "Phew... that's a lot of reasoning."),
            message("D", "Fortunately, we have machine to do the reasoning for us, rigorously and efficiently.\n" +
                "Next, there is a stricter way to group things."),
            message("W", "Go for it!"),
            message("D", "```Tensor([[1, 2, 3], [4, 5, 6]])```"),
            message("W", "It merely wraps this `Tensor` thing around the list. How is it different?"),
            message("D", "It has the type `Tensor[int][[2, 3]]`. In addition to the type of elements, we set a constrain on the shape of elements."),
            message("W", "Oh! `[2, 3]` is a `List` that describes the shape of `[[1, 2, 3], [4, 5, 6]]`, since the outer layer contains two `List[int]`s and the inner layer contains three `int`s?"),
            message("D", "You are almost right!\n" +
                "Tho, the elements of the outer layer are not `List[int]`s, they are `Tensor[int][[3]]`s.\n" +
                "Here's how we think `Tensor([[1, 2, 3], [4, 5, 6]])` is a `Tensor[int][[2, 3]]`:\n" +
                "the ourter layer of the Tensor contains two `Tensor[int][[3]]`s, while the inner layer contains three `Tensor[int][[]]`s\n"),
            message("W", "I see.\n\t-`Tensor[int][[2, 3]]` and `Tensor[Tensor[int][[3]]][[2]]` are the same type.\n\t-`int` and `Tensor[int][[]]` are also the same type!.\n"),
            message("D", "They are. `42` is an `int`, as well as a `Tensor[int][[]]`. When a `Tensor`'s shape is `[]`, we may call this `Tensor` a scalar.\n"),
            message("W", "Why do we need `Tensor`s, since we already have `List`s?"),
            message("D", "Good question! Can we make `[[1, 2, 3], [4, 5]]` a `Tensor`?"),
            message("W", "Hmm... I don't know how to describe its shape."),
            message("D", "Neither do I. We cannot make `[[1, 2, 3], [4, 5]]` a `Tensor`, since no one can describe its shape!"),
            message("W", "So, shapes are important to `Tensor`s!"),
            message("D", "`Tensor[t][s]` is a type, as long as `t` is a type and `s` is a `List[int]`.\n" +
                "With shapes, `Tensor`s describe the behaviors of their values more accurately than `List`s do.\n" +
                "This accuracy unblocks many cool things."),
            message("W", "such as?"),
            message("D", "Running programs on GPU, in parallel and efficiently!"),
            message("W", "Sounds like a cool thing! I want to see an example!"),
            message("D", "You will, in the next chapter. Now it's time to take a break."),
            message("W", "See you there!"),
        ],
    });
})();
