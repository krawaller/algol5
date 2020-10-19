import { KingsvalleyDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const kingsvalleyBoardBook: KingsvalleyDefinition["boards"] = {
  basic: {
    height: 5,
    width: 5,
    terrain: {
      goal: { 0: ["c3"] },
    },
  },
  labyrinth: {
    height: 7,
    width: 7,
    holes: ["b3", "b5", "f3", "f5"],
    terrain: {
      goal: { 0: ["d4"] },
    },
  },
};

export default kingsvalleyBoardBook;
