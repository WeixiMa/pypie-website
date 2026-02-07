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
                "Before that, what is `1 + 1`?"),
            message("W", "`2`. That's easy."),
            message("D", "`2` is correct, but it wasn't easy.\n" +
                "How about `Tensor([1]) + Tensor([1])`."),
            message("W", "`Tensor([2])`.\n" +
                "We add elements at matching positions. So, " +
                "`Tensor([1, 2, 3]) + Tensor([5, 7, 9])` becomes `Tensor([6, 9, 12])`."),
            message("D", "How about `Tensor([[1, 2, 3], [3, 2, 1]]) + Tensor([5, 7, 9])`?"),
            message("W", "Can we add these two `Tensor`s? Their shapes are different:\n" +
                "one is `Tensor[int][[2, 3]]` and the other is `Tensor[int][[3]]`."),
            message("D", "Yes, as long as the smaller shape is a suffix of the larger shape.\n" +
                "Then we add the smaller tensors, repeatedly across the leading dimensions.\n" +
                "Here, `[3]` is a suffix of `[2, 3]`.\n" +
                "So we run `Tensor([1, 2, 3]) + Tensor([5, 7, 9])` and `Tensor([3, 2, 1]) + Tensor([5, 7, 9])`..."),
            message("W", "...and get `Tensor([[6, 9, 12], [8, 9, 10]])`?"),
            message("D", "Correct. What is the type of the result?"),
            message("W", "The result is `Tensor[int][[2, 3]]`, the same as the input with the larger shape.\n" +
                "This trick is handy!"),
            message("D", "This trick is called rank polymorphism. It applies to many `Tensor` `op`s."),
            message("W", "Are there other `op`s besides `+`?"),
            message("D", "Many. In fact, you can define as many `op`s as you need.\n" +
                "We'll cover that in the next chapter."),
            message("W", "Can't wait!")
        ],
    });
})();
