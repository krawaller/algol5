import { TowersDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const towersBoardBook: TowersDefinition["boards"] = {
  basic: {
    height: 5,
    width: 5,
    terrain: {
      base: {
        1: ["d1", "e1", "d2", "e2"],
        2: ["a5", "b5", "a4", "b4"]
      }
    }
  }
};

export default towersBoardBook;
