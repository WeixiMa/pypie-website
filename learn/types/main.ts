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
        id: "Types",
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
            message(
                "D",
                "On machines, `42` and `42.42` are stored differently. When running programs, they may also behave differently.\n" +
                "We have a special name for `Num`s like `42`: `int`. And we have another name, `float`, for `Num`s like `42.42`. " +
                "`int` and `float` are **type**s. A type describes the behavior of a set of values.",
            ),
            message("W", "Is `Num` also a type?"),
            message(
                "D",
                "`Num` is a type that describes the behavior shared by all `int` values and all `float` values.",
            ),
            message("W", "Interesting. Are there values of other types?"),
            message("D", "Here's one `[1, 2, 3]`."),
            message("W", "It groups three `int`s together! What do we call it?"),
            message("D", "We call `[1, 2, 3]` a `List[int]`."),
            message(
                "W",
                "So `List[t]` is a type, as long as `t` is a type.\nThen there must be a type called `List[List[int]]`, right?",
            ),
            message("D", "Yes, `List` can be nested, such as `[[1, 2, 3], [4, 5, 6]]`."),
            message("W", "What about `[[1, 2, 3], [4, 5]]`?"),
            message(
                "D",
                "That's also a `List[List[int]]`, since its first element is a `List[int]`...",
            ),
            message(
                "W",
                "... because all elements inside that element are `int`s.\n" +
                "Then its second element is also a `List[int]`, since all elements there are `int`s.\n" +
                "Phew... that's a lot of reasoning.",
            ),
            message(
                "D",
                "Fortunately, machines may do that reasoning for us, rigorously and efficiently.\n" +
                    "Now, there is a stricter way to group things.",
            ),
            message("W", "Go for it!"),
            message("D", "```Tensor([[1, 2, 3], [4, 5, 6]])```"),
            message(
                "W",
                "It merely wraps this `Tensor` thing around the list. How is it different?",
            ),
            message(
                "D",
                "It has the type `Tensor[int][[2, 3]]`. In addition to the element type, we set a constraint on the element shape.",
            ),
            message(
                "W",
                "Oh! `[2, 3]` is a `List` that describes the shape of `[[1, 2, 3], [4, 5, 6]]`, since the outer layer contains two `List[int]`s and each inner layer contains three `int`s?",
            ),
            message(
                "D",
                "That's almost right.\n" +
                    "The elements of the outer layer, however, are not `List[int]`s; they are `Tensor[int][[3]]`s.\n" +
                    "Here is how we see that `Tensor([[1, 2, 3], [4, 5, 6]])` has type `Tensor[int][[2, 3]]`:\n" +
                    "The outer layer contains two `Tensor[int][[3]]`s, and each inner layer contains three `Tensor[int][[]]`s.",
            ),
            message(
                "W",
                "I see.\n- `Tensor[int][[2, 3]]` and `Tensor[Tensor[int][[3]]][[2]]` are the same type.\n- `int` and `Tensor[int][[]]` are also the same type.",
            ),
            message(
                "D",
                "That's right. `42` is an `int`, and also a `Tensor[int][[]]`. When a `Tensor` has shape `[]`, we call it a scalar.",
            ),
            message("W", "Why do we need `Tensor`s, since we already have `List`s?"),
            message("D", "Good question! Can we make `[[1, 2, 3], [4, 5]]` a `Tensor`?"),
            message("W", "Hmm... I don't know how to describe its shape."),
            message(
                "D",
                "Neither do I. We cannot make `[[1, 2, 3], [4, 5]]` a `Tensor`, since no one can describe its shape!",
            ),
            message("W", "So, shapes are important to `Tensor`s!"),
            message(
                "D",
                "`Tensor[t][s]` is a type as long as `t` is a type and `s` is a `List[int]`.\n" +
                    "With shapes, `Tensor`s describe their values more accurately than `List`s do.\n" +
                    "This precision enables many cool things.",
            ),
            message("W", "Such as?"),
            message(
                "D",
                "Running programs on GPUs, in parallel and efficiently!",
            ),
            message("W", "Sounds like a cool thing! Let's see see an example!"),
            message(
                "D",
                "We will, in the next chapter. Now it's time to take a break."
            ),
            message("W", "See you there!"),
        ],
    });
})();
