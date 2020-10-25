import { TowertwoDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const towertwoBoardBook: TowertwoDefinition["boards"] = {
  basic: {
    height: 6,
    width: 6,
    terrain: {
      base: {
        1: ["b2", "b5"],
        2: ["e2", "e5"],
      },
    },
  },
};

export default towertwoBoardBook;
