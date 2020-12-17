import { GrensholmDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const grensholmBoardBook: GrensholmDefinition["boards"] = {
  basic: {
    height: 4,
    width: 6,
    terrain: {
      homerow: { "1": [{ rect: ["a1", "a4"] }], "2": [{ rect: ["f1", "f4"] }] }
    },
    offset: "knight"
  }
};

export default grensholmBoardBook;
