import { NeutronDefinition } from "./_types";

const neutronSetupBook: NeutronDefinition["setups"] = {
  basic: {
    soldiers: {
      "0": ["c3"],
      "1": [{ rect: ["a1", "e1"] }],
      "2": [{ rect: ["a5", "e5"] }],
    },
  },
};

export default neutronSetupBook;
