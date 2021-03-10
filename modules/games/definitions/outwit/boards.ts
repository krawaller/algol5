import { OutwitDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const outwitBoardBook: OutwitDefinition["boards"] = {
  basic: {
    height: 9,
    width: 10,
    terrain: {
      base: {
        1: [{ rect: ["h1", "j3"] }],
        2: [{ rect: ["a7", "c9"] }],
      },
    },
  },
};

export default outwitBoardBook;
