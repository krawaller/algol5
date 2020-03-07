import { ChameleonDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const chameleonBoardBook: ChameleonDefinition["boards"] = {
  basic: {
    height: 5,
    width: 5,
    terrain: {
      base: { "1": [{ rect: ["a1", "e1"] }], "2": [{ rect: ["a5", "e5"] }] }
    },
    offset: "knight"
  }
};

export default chameleonBoardBook;
