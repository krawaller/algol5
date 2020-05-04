import { AmbivalenteDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const ambivalenteBoardBook: AmbivalenteDefinition["boards"] = {
  basic: {
    height: 6,
    width: 6,
    terrain: {
      corners: ["a1", "f1", "a6", "f6"],
    },
    offsets: [["rose", 2, 0]],
  },
};

export default ambivalenteBoardBook;
