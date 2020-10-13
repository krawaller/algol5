import { DesdemonaDefinition } from "./_types";

const desdemonaSetupBook: DesdemonaDefinition["setups"] = {
  basic: {
    amazons: {
      1: ["b2", "g2", "a4"],
      2: ["b7", "g7", "h5"],
    },
  },
  small: {
    amazons: {
      1: ["b2", "f2"],
      2: ["b6", "f6"],
    },
  },
  large: {
    amazons: { "1": ["d10", "g10", "a7", "j7"], "2": ["a4", "d1", "g1", "j4"] },
  },
};

export default desdemonaSetupBook;
