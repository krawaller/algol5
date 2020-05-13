import { BreakthroughDefinition } from "./_types";

const breakthroughSetupBook: BreakthroughDefinition["setups"] = {
  basic: {
    soldiers: {
      1: [{ rect: ["a1", "h2"] }],
      2: [{ rect: ["a7", "h8"] }],
    },
  },
  mini: {
    soldiers: {
      1: [{ rect: ["a1", "e2"] }],
      2: [{ rect: ["a4", "e5"] }],
    },
  },
};

export default breakthroughSetupBook;
