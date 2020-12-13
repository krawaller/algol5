import { OutwitDefinition } from "./_types";

const outwitInstructions: OutwitDefinition["instructions"] = {
  startTurn: { line: ["Select a non-canned", "sardines", "to move"] },
  selectunit: { line: ["Select where to move", { unitat: "selectunit" }] },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to move",
      { unitat: "selectunit" },
      {
        ifelse: [
          { anyat: ["corner", "selectmovetarget"] },
          "into the corner at",
          "to",
        ],
      },
      "selectmovetarget",
    ],
  },
};

export default outwitInstructions;
