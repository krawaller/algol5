import { RazzledazzleDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const razzledazzleBoardBook: RazzledazzleDefinition["boards"] = {
  basic: {
    height: 7,
    width: 8,
    terrain: {
      base: {
        1: [{ rect: ["a1", "a7"] }],
        2: [{ rect: ["h1", "h7"] }],
      },
    },
    offset: "knight",
  },
};

export default razzledazzleBoardBook;
