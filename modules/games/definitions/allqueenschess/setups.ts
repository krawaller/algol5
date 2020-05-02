import { AllqueenschessDefinition } from "./_types";

const allqueenschessSetupBook: AllqueenschessDefinition["setups"] = {
  basic: {
    queens: {
      1: ["a1", "c1", "e1", "b5", "d5", "a3"],
      2: ["a5", "c5", "e5", "b1", "d1", "e3"],
    },
  },
};

export default allqueenschessSetupBook;
