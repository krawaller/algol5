import { OutwitDefinition } from "./_types";

const outwitInstructions: OutwitDefinition["instructions"] = {
  startTurn: {
    line: [
      "Select a",
      "soldiers",
      "or",
      "kings",
      "to move",
    ],
  },
  selectunit: { line: ["Select where to move", { unitat: "selectunit" }] },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to move",
      { unitat: "selectunit" },
      {
        ifelse: [
          { anyat: ["base", "selectmovetarget"] },
          "into the base at",
          "to",
        ],
      },
      "selectmovetarget",
    ],
  },
};

export default outwitInstructions;
