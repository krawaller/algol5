import { KriegDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const kriegBoardBook: KriegDefinition["boards"] = {
  basic: {
    width: 4,
    height: 4,
    terrain: {
      southeast: ["a4", "c2"],
      northwest: ["b3", "d1"],
      corners: { "1": ["a4"], "2": ["d1"] },
      bases: { "1": ["b4", "a3", "b3"], "2": ["c2", "d2", "c1"] }
    }
  }
};

export default kriegBoardBook;
