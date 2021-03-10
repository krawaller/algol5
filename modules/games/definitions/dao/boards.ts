import { DaoDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const daoBoardBook: DaoDefinition["boards"] = {
  basic: {
    height: 4,
    width: 4,
    terrain: {
      corners: ["a1", "a4", "d1", "d4"],
    },
  },
};

export default daoBoardBook;
