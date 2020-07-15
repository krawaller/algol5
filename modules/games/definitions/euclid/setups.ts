import { EuclidDefinition } from "./_types";

const euclidSetupBook: EuclidDefinition["setups"] = {
  basic: {
    kings: {
      1: ["a1"],
      2: ["h8"],
    },
    soldiers: {
      1: [{ holerect: ["a1", "d4", "a1"] }],
      2: [{ holerect: ["e5", "h8", "h8"] }],
    },
  },
};

export default euclidSetupBook;
