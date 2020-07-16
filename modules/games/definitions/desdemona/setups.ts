import { DesdemonaDefinition } from "./_types";

const desdemonaSetupBook: DesdemonaDefinition["setups"] = {
  basic: {
    amazons: {
      1: ["b2", "f2"],
      2: ["b6", "f6"],
    },
  },
  xl: {
    amazons: {
      1: ["b2", "g2", "a4"],
      2: ["b7", "g7", "h5"],
    },
  },
  basic_OLD: {
    amazons: {
      1: ["a1", "g7"],
      2: ["a7", "g1"],
    },
  },
  xl_OLD: {
    amazons: {
      1: ["a1", "h8"],
      2: ["a8", "h1"],
    },
  },
};

export default desdemonaSetupBook;
