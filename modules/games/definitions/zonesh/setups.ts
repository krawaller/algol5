import { ZoneshDefinition } from "./_types";

const zoneshSetupBook: ZoneshDefinition["setups"] = {
  basic: {
    soldiers: {
      1: [{ holerect: ["a1", "d4", "b4", "c3", "c4", "d2", "d3", "d4"] }],
      2: [{ holerect: ["c3", "f6", "c3", "c4", "c5", "d3", "d4", "e3"] }],
    },
  },
};

export default zoneshSetupBook;
