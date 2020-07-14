import { BombardmentDefinition } from "./_types";

const bombardmentSetupBook: BombardmentDefinition["setups"] = {
  basic: {
    rockets: {
      1: [{ rect: ["a1", "h2"] }],
      2: [{ rect: ["a7", "h8"] }],
    },
  },
};

export default bombardmentSetupBook;
