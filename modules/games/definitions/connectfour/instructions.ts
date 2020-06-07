import { ConnectfourDefinition } from "./_types";

const connectfourInstructions: ConnectfourDefinition["instructions"] = {
  startTurn: { line: ["Select", "a column to drop a", "markers", "into"] },
  selectdroptarget: {
    line: [
      "Press",
      "drop",
      "to spawn",
      { unittypepos: ["markers", ["player"], "selectdroptarget"] },
    ],
  },
};

export default connectfourInstructions;
