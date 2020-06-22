import { TobitoDefinition } from "./_types";

const tobitoSetupBook: TobitoDefinition["setups"] = {
  basic: {
    runners: {
      1: ["a1", "a2", "a3"],
      2: ["e1", "e2", "e3"],
    },
  },
  neutral: {
    runners: {
      0: ["c2"],
      1: ["a1", "a2", "a3"],
      2: ["e1", "e2", "e3"],
    },
  },
};

export default tobitoSetupBook;
