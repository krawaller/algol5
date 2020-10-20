import {NeutreekoDefinition} from "./_types";

const neutreekoSetupBook: NeutreekoDefinition["setups"] = {
  basic: {
    pieces: {
      1: ["b1", "c4", "d1"],
      2: ["b5", "c2", "d5"]
    }
  },
  small: {
    pieces: {
      1: ["b1", "c3", "d1"],
      2: ["b4", "c2", "d4"]
    }
  },
  mini: {
    pieces: {
      1: ["a1", "c1", "d2"],
      2: ["a2", "b1", "d1"]
    }
  }
};

export default neutreekoSetupBook;
