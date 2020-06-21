import { HobbesDefinition } from "./_types";

const hobbesSetupBook: HobbesDefinition["setups"] = {
  basic: {
    stones: {
      0: [{ holerect: ["b1", "d2", "c1"] }, { holerect: ["b4", "d5", "c5"] }],
    },
    kings: {
      1: ["c1"],
      2: ["c5"],
    },
  },
};

export default hobbesSetupBook;
