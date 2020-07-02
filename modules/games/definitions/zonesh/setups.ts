import { ZoneshDefinition } from "./_types";

const zoneshSetupBook: ZoneshDefinition["setups"] = {
  basic: {
    soldiers: {
      1: [{ holerect: ["a1", "d4", "b4", "c3", "c4", "d2", "d3", "d4"] }],
      2: [{ holerect: ["c3", "f6", "c3", "c4", "c5", "d3", "d4", "e3"] }],
    },
  },
  mini: {
    soldiers: {
      1: ["a1", "a2", "a3", "b1", "b2", "c1"],
      2: ["c5", "d4", "d5", "e3", "e4", "e5"],
    },
  },
};

export default zoneshSetupBook;
