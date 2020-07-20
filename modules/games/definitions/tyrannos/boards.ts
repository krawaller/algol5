import { TyrannosDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const tyrannosBoardBook: TyrannosDefinition["boards"] = {
  basic: {
    height: 9,
    width: 9,
    terrain: {
      base: {
        1: [{ rect: ["a1", "i1"] }],
        2: [{ rect: ["a9", "i9"] }],
      },
      temple: ["e5"],
    },
  },
};

export default tyrannosBoardBook;
