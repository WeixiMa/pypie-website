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
            message("D", 
                "Now let's run programs with `Tensor`s.\n" +
                "What is `1 + 1`?"
            ),
            message(
                "W",
                "`2`. That's easy and they are not even `Tensor`s!"
            ),
            message("D", 
                "`2` is correct, but [it wasn't too easy.](https://en.wikipedia.org/wiki/Principia_Mathematica#/media/File:Principia_Mathematica_54-43.png)\n" + 
                "Also, `1` is actually a `Tensor[int][[]]`.\n" + 
                "Here's a more interesting one: `Tensor([1]) + Tensor([1])`."
            ),
            message("W", 
                "Ok, perhaps we may add elements at matching positions. " +
                "It's `Tensor([2])`, right?\n" + 
                "I have another example:\n"  +
                "`Tensor([1, 2, 3]) + Tensor([5, 7, 9])` becomes `Tensor([6, 9, 12])`."
            ),
            message(
                "D",
                "Exactly! How about `Tensor([[1, 2, 3], [3, 2, 1]]) + Tensor([5, 7, 9])`?"
            ),
            message(
                "W",
                "Can we add these two `Tensor`s at all? Their types are different:\n" +
                "one is `Tensor[int][[2, 3]]` and the other is `Tensor[int][[3]]`."
            ),
            message(
                "D",
                "Yes, as long as the smaller shape is a tail of the larger shape.\n" + 
                "Then we add the smaller tensors, repeatedly on leading positions.\n" +
                "Here, `[3]` is a tail of `[2, 3]`.\n" +
                "So we first run `Tensor([1, 2, 3]) + Tensor([5, 7, 9])`, then run `Tensor([3, 2, 1]) + Tensor([5, 7, 9])`..."
            ),
            message(
                "W",
                "...and get `Tensor([[6, 9, 12], [8, 9, 10]])`?"
            ),
            message(
                "D",
                "Correct. What is the type of the result?"
            ),
            message(
                "W",
                "The result is `Tensor[int][[2, 3]]`, the same as the input with the larger shape.\n" +
                "This trick is handy!"
            ),
            message(
                "D",
                "This trick is called **rank polymorphism**. "
            ),
            message(
                "W",
                "Ooph! What an intimidating word!"
            ),
            message(
                "D",
                "It is actually warmer and fuzzier than it sounds. Here, **rank** tells us the size of the shape.\n" +
                "For example, " +
                "`Tensor[int][[3]]` is rank `1` and `Tensor[int][[2, 3]]` is rank `2`."
            ),
            message(
                "W",
                "So, `42` has type `Tensor[int][[]]`, which makes it rank `0`?"
            ),
            message(
                "D",
                "Correct! When designing a function, we need to define the shapes for its inputs and output. " +
                "Often times, this function encouters inputs with larger ranks than defined. " +
                "Then, rank polymorphism decides whether we may use the function on these inputs."
            ),
            message(
                "W",
                "Now it's less intimidating. You mentioned functions, is `+` a **function**?"
            ),
            message(
                "D",
                "`+` is a function. Just like\n" +
                "`5` has type `Tensor[int][[]]`,\n" +
                "`+` has type `(x: Tensor[int][[]], y: Tensor[int][[]]) -> Tensor[int][[]]`."
            ),
            message(
                "W",
                "Let me guess. This function type tells us:\n" +
                "- The function `+` expects two inputs, called `x` and `y`.\n" +
                "- `x` must be rank `0` tensor containing `int`s, so do `y`.\n" +
                "- `+` results in a `Tensor` that is also rank `0` containing `int`s.\n"
            ),
            message(
                "D",
                "Very well! Now imagine feeding `+` with `1` as `x` and `1` as `y`."
            ),
            message(
                "W",
                "`1` is a `Tensor[int][[]]`. Its type matches the expected `x` and `y`, precisely.\n" +
                "So, `1 + 1` results in a `Tensor[int][[]]`, which is the type of `2`."
            ),
            message(
                "D",
                "Let's try the more difficult one!\n`Tensor([[1, 2, 3], [3, 2, 1]]) + Tensor([5, 7, 9])`."
            ),
            message(
                "W",
                "Now `x` has type `Tensor[int][[2, 3]]` and `y` has type `Tensor[int][[3]]`. "+
                "Neither precisely matches the expected `Tensor[int][[]]`... now what?"
            ),
            message(
                "D",
                "Rank polymophism comes to rescue. It works in two steps, both rely on our **tail** trick."
            ),
            message(
                "W",
                "Please show me the tail trick!"
            ),
            message(
                "D",
                "The trick is to find the **tail** and the **lead**. When comparing two shapes of different ranks, " +
                "we try to make them equal, by copying the leading numbers from the larger one to the smaller one.\n" +
                "If we can do that, then the tail is the smaller shape and the lead is the leading numbers."
            ),
            message(
                "W",
                "Let me see...\n" +
                "When comparing `[2, 3]` and `[3]`, the tail is `[3]` and the lead is `[2]`.\n" +
                "When comparing `[2, 3]` and `[]`, the tail is `[]` and the lead is `[2, 3]`.\n"
            ),
            message(
                "D",
                "Now we use the trick, twice.\n" +
                "- First, for each input of `+`, we compare the given shape and the expected shape. This result in a lead and a tail for each input.\n" +
                "- Then, we compare the two leads and find a lead of the leads!"
            ),
            message(
                "W",
                "Please let me try the first step!\n" +
                "`x` expects a `Tensor[int][[]]`, but was given a `Tensor[int][[2, 3]]`--the lead for `x` is `[2, 3]`.\n" +
                "`y` expects a `Tensor[int][[]]`, but was given a `Tensor[int][[3]]`--the lead for `y` is `[3]`."
            ),
            message(
                "D",
                "We now have the leads! Go for the lead of leads."
            ),
            message(
                "W",
                "Between `[2, 3]` and `[3]`, the lead is `[2]`."
            ),
            message(
                "D",
                "Great! By finding the lead of leads, we have showned that `+` may apply to a `Tensor[int][[2, 3]]]` and a `Tensor[int][[3]]`.\n" +
                "We are not done yet--the function also has an output type."
            ),
            message(
                "W",
                "In `+`'s type, its output is `Tensor[int][[]]`. Is it changed by rank polymorphism?"
            ),
            message(
                "D",
                "We are applying `+` on the tail, repeatedly for the leading positions. Our output should be a repeated `Tensor[int][[]]`."
            ),
            message(
                "W",
                "So, we just need to find out the number of repetitions--the lead that contributes to the lead of the leads!"
            ),
            message(
                "D",
                "Mouthful, but a good observation. In our case, it is ...?"
            ),
            message(
                "W",
                "`[2, 3]`. The result of `Tensor([[1, 2, 3], [3, 2, 1]]) + Tensor([5, 7, 9])` has type `Tensor[Tensor[int][[]]][[2, 3]]`!\n" +
                "That is repeating `Tensor[int][[]]`, for `[2, 3]` times.\n"  +
                "And machines should be able to simplify it to the equivalent `Tensor[int][[2, 3]]`."
            ),
            message(
                "D",
                "Congratz on mastering rank polymorphism!\n" +
                "Come up with some examples where rank polymorphism would say no, that is, the inputs do not share a lead.\n" +
                "It reinforces your understanding."
            ),
            message(
                "W",
                "Good idea! Will do."
            ),
            message(
                "D",
                "To learn how and why it works, we walked through the reasoning step by step manually. " +
                "From now on, machines will do the reasoning for us on all functions."
            ),
            message(
                "W",
                "Are there other functions besides `+`?"
            ),
            message(
                "D",
                "A lot. In fact, you can define as many as you need.\n" +
                "We have it covered in the next chapter."
            ),
            message(
                "W",
                "Can't wait!"
            )
        ],
    });
})();
