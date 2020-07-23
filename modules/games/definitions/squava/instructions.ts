import { SquavaDefinition } from "./_types";

const squavaInstructions: SquavaDefinition["instructions"] = {
  startTurn: {
    line: ["Select where to drop a", { unittype: ["markers", ["player"]] }],
  },
  selectspace: {
    line: [
      "Press",
      "drop",
      "to place",
      { unittypepos: ["markers", ["player"], "selectspace"] },
    ],
  },
};

export default squavaInstructions;
