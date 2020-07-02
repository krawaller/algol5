import { ZoneshDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const zoneshBoardBook: ZoneshDefinition["boards"] = {
  basic: {
    height: 6,
    width: 6,
    terrain: {
      throne: {
        1: ["a1"],
        2: ["f6"],
      },
      base: {
        1: [
          { holerect: ["a1", "d4", "a1", "b4", "c3", "c4", "d2", "d3", "d4"] },
        ],
        2: [
          { holerect: ["c3", "f6", "f6", "c3", "c4", "c5", "d3", "d4", "e3"] },
        ],
      },
    },
  },
  mini: {
    height: 5,
    width: 5,
    terrain: {
      throne: {
        1: ["a1"],
        2: ["e5"],
      },
      base: {
        1: ["a2", "a3", "b1", "b2", "c1"],
        2: ["c5", "d4", "d5", "e3", "e4"],
      },
    },
  },
};

export default zoneshBoardBook;
