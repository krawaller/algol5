import { NeutronDefinition } from "./_types";

const neutronSetupBook: NeutronDefinition["setups"] = {
  basic: {
    soldiers: {
      "0": ["c3"],
      "1": [{ rect: ["a1", "e1"] }],
      "2": [{ rect: ["a5", "e5"] }],
    },
  },
  paperneutron: {
    soldiers: {
      "0": ["b3", "c2"],
      "1": [{ rect: ["a1", "d1"] }],
      "2": [{ rect: ["a4", "d4"] }],
    },
  },
};

export default neutronSetupBook;
