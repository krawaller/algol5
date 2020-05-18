import { KachitknightDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const kachitknightBoardBook: KachitknightDefinition["boards"] = {
  basic: {
    height: 4,
    width: 4,
    terrain: {
      base: {
        1: ["b1", "c1", "c2", "d2", "d3"],
        2: ["a2", "a3", "b3", "b4", "c4"],
      },
      throne: {
        1: ["d1"],
        2: ["a4"],
      },
      promotion: ["a1", "b2", "c3", "d4"],
    },
  },
};

export default kachitknightBoardBook;
