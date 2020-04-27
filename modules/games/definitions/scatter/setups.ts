import { ScatterDefinition } from "./_types";

const scatterSetupBook: ScatterDefinition["setups"] = {
  basic: {
    nobles: {
      0: ["c3", "d3", "d4"],
    },
    kings: {
      0: ["c4"],
    },
    pawns: {
      1: [{ rect: ["c1", "d2"] }, { rect: ["c5", "d6"] }],
      2: [{ rect: ["a3", "b4"] }, { rect: ["e3", "f4"] }],
    },
  },
};

export default scatterSetupBook;
