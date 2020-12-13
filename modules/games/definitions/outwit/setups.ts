import { OutwitDefinition } from "./_types";

const outwitSetupBook: OutwitDefinition["setups"] = {
  basic: {
    kings: {
      1: ["e5"],
      2: ["f5"],
    },
    soldiers: {
      1: ["a1", "b2", "c3", "d4", "f6", "g7", "h8", "i9"],
      2: ["b1", "c2", "d3", "e4", "g6", "h7", "i8", "j9"],
    },
  },
};

export default outwitSetupBook;
