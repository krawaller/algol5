import { SupportDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const supportBoardBook: SupportDefinition["boards"] = {
  basic: {
    height: 9,
    width: 9,
    holes: ["a1", "a9", "i1", "i9"],
    terrain: {
      edge: [
        { rect: ["b1", "h1"] },
        { rect: ["a2", "a8"] },
        { rect: ["i2", "i8"] },
        { rect: ["b9", "h9"] },
      ],
      center: {
        0: [{ rect: ["d4", "f6"] }],
      },
    },
  },
};

export default supportBoardBook;
