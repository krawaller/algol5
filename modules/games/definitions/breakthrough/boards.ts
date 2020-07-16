import { BreakthroughDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const breakthroughBoardBook: BreakthroughDefinition["boards"] = {
  basic: {
    height: 8,
    width: 8,
    terrain: {
      base: {
        1: [{ rect: ["a1", "h1"] }],
        2: [{ rect: ["a8", "h8"] }],
      },
    },
  },
  mini: {
    height: 5,
    width: 5,
    terrain: {
      base: {
        1: [{ rect: ["a1", "e1"] }],
        2: [{ rect: ["a5", "e5"] }],
      },
    },
  },
  siege: {
    height: 8,
    width: 8,
    terrain: {
      base: { 1: ["h1"], 2: ["a8"] },
    },
  },
};

export default breakthroughBoardBook;
