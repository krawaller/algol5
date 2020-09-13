import { HippolytaDefinition } from "./_types";

const hippolytaSetupBook: HippolytaDefinition["setups"] = {
  basic: {
    amazons: {
      1: [
        { rect: ["a8", "h8"] },
        { rect: ["h2", "h7"] },
        { rect: ["b2", "g2"] },
        { rect: ["b3", "b6"] },
        { rect: ["c6", "f6"] },
        "f5",
        "f4",
        "e4",
        "d4",
      ],
      2: [
        { rect: ["a1", "h1"] },
        {
          rect: ["a2", "a7"],
        },
        { rect: ["b7", "g7"] },
        { rect: ["g3", "g6"] },
        { rect: ["c3", "f3"] },
        "c4",
        "c5",
        "d5",
        "e5",
      ],
    },
  },
};

export default hippolytaSetupBook;
