import { YonmoqueDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const yonmoqueBoardBook: YonmoqueDefinition["boards"] = {
  basic: {
    height: 5,
    width: 5,
    terrain: {
      base: {
        1: ["a3", "b2", "b4", "c1", "c5", "d2", "d4", "e3"],
        2: [
          "a2",
          "a4",
          "b1",
          "b3",
          "b5",
          "c2",
          "c4",
          "d1",
          "d3",
          "d5",
          "e2",
          "e4",
        ],
      },
      edge: [{ rect: ["a1", "a5"] }, { rect: ["b1", "e1"] }],
    },
  },
};

export default yonmoqueBoardBook;
