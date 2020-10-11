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
      supported: {
        1: [
          { rect: ["b1", "d3"] },
          { rect: ["a6", "c8"] },
          { rect: ["f7", "h9"] },
          { rect: ["g2", "i4"] },
        ],
        2: [
          { rect: ["a2", "c4"] },
          { rect: ["b7", "d9"] },
          { rect: ["g6", "i8"] },
          { rect: ["f1", "h3"] },
        ],
      },
    },
  },
};

export default supportBoardBook;
