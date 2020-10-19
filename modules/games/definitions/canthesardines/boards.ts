import { CanthesardinesDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const canthesardinesBoardBook: CanthesardinesDefinition["boards"] = {
  basic: {
    height: 9,
    width: 9,
    terrain: {
      can: {
        0: [{ rect: ["c4", "g6"] }],
      },
      canedge: [{ holerect: ["c4", "g6", "d5", "e5", "f5"] }],
    },
  },
};

export default canthesardinesBoardBook;
