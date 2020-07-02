import { TunnelerDefinition } from "./_types";

const tunnelerSetupBook: TunnelerDefinition["setups"] = {
  basic: {
    foremen: {
      1: ["c2", "i2"],
      2: ["c10", "i10"],
    },
    tunnelers: {
      1: ["e2", "e4", "g4", "g2"],
      2: ["e10", "e8", "g8", "g10"],
    },
    rocks: {
      0: [
        {
          holerect: [
            "a1",
            "k11",
            "c2",
            "i2",
            "c10",
            "i10",
            "e2",
            "e4",
            "g4",
            "g2",
            "e10",
            "e8",
            "g8",
            "g10",
          ],
        },
      ],
    },
  },
};

export default tunnelerSetupBook;
