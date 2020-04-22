import { PaperneutronDefinition } from "./_types";

const paperneutronSetupBook: PaperneutronDefinition["setups"] = {
  basic: {
    soldiers: {
      "0": ["b3", "c2"],
      "1": [{ rect: ["a1", "d1"] }],
      "2": [{ rect: ["a4", "d4"] }],
    },
  },
};

export default paperneutronSetupBook;
