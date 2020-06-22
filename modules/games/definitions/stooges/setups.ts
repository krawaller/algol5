import { StoogesDefinition } from "./_types";

const stoogesSetupBook: StoogesDefinition["setups"] = {
  basic: {
    singles: {
      1: ["b2", "b4", "c1", "c5", "d2", "d4"],
      2: ["c2", "c4", "d1", "d5", "e2", "e4"],
    },
    doubles: {
      1: ["a3", "c3", "e3"],
      2: ["b3", "d3", "f3"],
    },
  },
};

export default stoogesSetupBook;
