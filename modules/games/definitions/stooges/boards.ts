import { StoogesDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const stoogesBoardBook: StoogesDefinition["boards"] = {
  basic: {
    height: 5,
    width: 6,
    terrain: {
      corners: [
        "a1",
        "a2",
        "b1",
        "a4",
        "a5",
        "b5",
        "e1",
        "f1",
        "f2",
        "e5",
        "f4",
        "f5",
      ],
    },
  },
};

export default stoogesBoardBook;
