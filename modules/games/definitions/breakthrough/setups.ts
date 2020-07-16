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
  siege: {
    soldiers: {
      1: [{ holerect: ["e1", "h4", "e3", "e4", "f4", "h1"] }, "d1", "h5"],
      2: [{ holerect: ["a5", "d8", "c5", "d5", "d6", "a8"] }, "a4", "e8"],
    },
  },
};

export default breakthroughSetupBook;
