import { ScatterDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const scatterBoardBook: ScatterDefinition["boards"] = {
  basic: {
    height: 6,
    width: 6,
    terrain: {
      odd: [
        { holerect: ["a5", "f6", "c5", "c6", "d5", "d6"] },
        { holerect: ["a1", "f2", "c1", "c2", "d1", "d2"] },
        { rect: ["c3", "d4"] },
      ],
    },
    offsets: [
      ["ortho", 2, 0],
      ["ortho", 2, -1],
      ["ortho", 2, 1],
      ["ortho", 3, 0],
      ["ortho", 3, 1],
      ["ortho", 3, -1],
    ],
    grids: {
      binary: [
        [1, 1, 2, 2, 4, 4],
        [1, 1, 2, 2, 4, 4],
        [8, 8, 16, 16, 32, 32],
        [8, 8, 16, 16, 32, 32],
        [64, 64, 128, 128, 256, 256],
        [64, 64, 128, 128, 256, 256],
      ],
    },
  },
};

export default scatterBoardBook;
