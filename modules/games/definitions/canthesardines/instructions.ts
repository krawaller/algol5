import { CanthesardinesDefinition } from "./_types";

const canthesardinesInstructions: CanthesardinesDefinition["instructions"] = {
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
          { anyat: ["can", "selectmovetarget"] },
          "into the can at",
          "to",
        ],
      },
      "selectmovetarget",
    ],
  },
};

export default canthesardinesInstructions;
