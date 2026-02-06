(() => {
    type Side = "left" | "right";

    type LearnDialogMessage = {
        side: Side;
        speaker: string;
        text: string;
    };

    type LearnSectionConfig = {
        id: string;
        title: string;
        body: string;
        dialog: LearnDialogMessage[];
    };

    type LearnPageConfig = {
        id: string;
        lead: string;
        section: LearnSectionConfig;
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
        id: "tensors",
        lead: "Tensor basics from numbers to strict shapes, presented as a dialogue.",
        section: {
            id: "tensor-basics",
            title: "Tensor Chapter",
            body: "Manually converted from txt. Single backticks render inline; triple backticks render code blocks.",
            dialog: [
                message("D", "Alrighty, let's get started."),
                message("W", "Can't wait!"),
                message("D", "What is `5`?"),
                message("W", "Is `5` a `Num`?"),
                message("D", "That's right! Do you know other `Num`s?"),
                message("W", "Hmm... `0` and `-42`?"),
                message("D", "Good, they also `Num`s too."),
                message("W", "What about `-42.42`?"),
                message("D", "Yes, `-42.42` is also a `Num`, but it is different from `42`."),
                message("W", "How?"),
                message(
                    "D",
                    "On machines, `42` and `42.42` are stored differently.\nFor practical matters, we have a special name for the `Num`s like `42`, called `int`. And we have another name, `float`, for the `Num`s like `42.42`.",
                ),
                message("W", "Interesting. Are there other kinds of values?"),
                message("D", "Here's one `[1, 2, 3]`."),
                message("W", "It groups three `int`s together! What do we call it?"),
                message("D", "We call `[1, 2, 3]` a `List[int]`."),
                message("W", "Is there a `List[List[int]]`?"),
                message("D", "Yes, `List` can be nested, such as `[[1, 2, 3], [4, 5, 6]]`."),
                message("W", "What about `[[1, 2, 3], [4, 5]]`?"),
                message(
                    "D",
                    "That's also a `List[List[int]]`, since all its elements are `List[int]`...",
                ),
                message(
                    "W",
                    "... and all elements in its first elements are `int`s, all elements in its second elements are `int`s.",
                ),
                message("D", "Exactly.\nThere is a stricter way to group things."),
                message("W", "Go for it!"),
                message("D", "```Tensor([[1, 2, 3], [4, 5, 6]])```"),
                message(
                    "W",
                    "It merely wraps this `Tensor` thing around the list. How is it different?",
                ),
                message(
                    "D",
                    "We call this one a `Tensor[int][[2, 3]]`. More than saying that all elements are `int`s, we set a constrain on how many elements the `Tensor` may contain.",
                ),
                message(
                    "W",
                    "Oh! `[2, 3]` is a `List` that describes the shape of `[[1, 2, 3], [4, 5, 6]]`, since the outer layer has contains `List[int]`s and the inner layer contains three `int`s?",
                ),
                message("D", "Exactly!\nCan we make `[[1, 2, 3], [4, 5]]` a `Tensor`?"),
                message("W", "Hmm... I don't know how to describe its shape."),
                message(
                    "D",
                    "Neither do I. We cannot make `[[1, 2, 3], [4, 5]]` a `Tensor`, since no one can describe its shape!",
                ),
                message("W", "Got it.\nCan we nest `Tensor`s, just like nesting `List`s?"),
                message(
                    "D",
                    "Yes, `Tensors` can be nested. Actually, `Tensor[int][[2, 3]]` is aleady nested.",
                ),
                message(
                    "W",
                    "So, `Tensor[int][[2, 3]]` and `Tensor[Tensor[int][[3]]][[2]]` must be identical!",
                ),
                message(
                    "D",
                    "Right. We say that they are the same type.\nNow, how about `Tensor[int][[]]`? Is it identical to another type?",
                ),
                message("W", "Are `Tensor[int][[]]` and `int` the same type?"),
                message(
                    "D",
                    "They are. `42` is an `int`, as well as a `Tensor[int][[]]`. We call such values scalars.",
                ),
            ],
        },
    });
})();
