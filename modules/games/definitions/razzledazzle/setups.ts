import { RazzledazzleDefinition } from "./_types";

const razzledazzleSetupBook: RazzledazzleDefinition["setups"] = {
  basic: {
    carriers: {
      1: ["a4"],
      2: ["h4"],
    },
    receivers: {
      1: ["a2", "a3", "a5", "a6"],
      2: ["h2", "h3", "h5", "h6"],
    },
  },
};

export default razzledazzleSetupBook;
