import { BreakthroughDefinition } from "./_types";

const breakthroughInstructions: BreakthroughDefinition["instructions"] = {
  startTurn: {
    line: ["Select", "soldiers", "to move"],
  },
  selectunit: {
    line: [
      "Select",
      "a square closer to the enemy base to move",
      { unitat: "selectunit" },
      "to",
    ],
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to",
      "advance",
      { unitat: "selectunit" },
      {
        ifelse: [
          { anyat: ["oppbase", "selectmovetarget"] },
          { line: ["into the opponent base at", "selectmovetarget"] },
          { line: ["to", "selectmovetarget"] },
        ],
      },
      {
        if: [
          { anyat: ["oppunits", "selectmovetarget"] },
          { line: [", killing", { unitat: "selectmovetarget" }] },
        ],
      },
    ],
  },
};

export default breakthroughInstructions;
