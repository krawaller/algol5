import { KingsvalleyDefinition } from "./_types";

const kingsvalleySetupBook: KingsvalleyDefinition["setups"] = {
  basic: {
    kings: {
      1: ["c1"],
      2: ["c5"],
    },
    soldiers: {
      1: ["a1", "b1", "d1", "e1"],
      2: ["a5", "b5", "d5", "e5"],
    },
  },
  retrieve: {
    kings: {
      1: ["c5"],
      2: ["c1"],
    },
    soldiers: {
      1: ["a1", "b1", "d1", "e1"],
      2: ["a5", "b5", "d5", "e5"],
    },
  },
  labyrinth: {
    kings: {
      1: ["d7"],
      2: ["d1"],
    },
    soldiers: {
      1: ["a1", "b1", "c1", "e1", "f1", "g1"],
      2: ["a7", "b7", "c7", "e7", "f7", "g7"],
    },
  },
};

export default kingsvalleySetupBook;
