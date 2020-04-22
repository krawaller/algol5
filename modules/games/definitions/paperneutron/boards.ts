import { PaperneutronDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const paperneutronBoardBook: PaperneutronDefinition["boards"] = {
  basic: {
    height: 4,
    width: 4,
    terrain: {
      base: { "1": [{ rect: ["a1", "d1"] }], "2": [{ rect: ["a4", "d4"] }] },
    },
  },
};

export default paperneutronBoardBook;
