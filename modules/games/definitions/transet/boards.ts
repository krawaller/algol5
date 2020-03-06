import { TransetDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const transetBoardBook: TransetDefinition["boards"] = {
  basic: {
    height: 5,
    width: 5,
    terrain: {
      base: { "1": [{ rect: ["a1", "e1"] }], "2": [{ rect: ["a5", "e5"] }] }
    }
  }
};

export default transetBoardBook;
