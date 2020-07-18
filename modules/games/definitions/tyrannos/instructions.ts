import { TyrannosDefinition } from "./_types";

const tyrannosInstructions: TyrannosDefinition["instructions"] = {
  startTurn: { line: ["Select a unit to act with"] },
  selectunit: {
    line: [
      "Select where to move",
      { if: [{ noneat: ["barricades", "selectunit"] }, "or attack"] },
      "with",
      { unitat: "selectunit" },
    ],
  },
  selectattacktarget: {
    line: [
      "Press",
      "attack",
      "to make",
      { unitat: "selectunit" },
      "kill",
      { unitat: "selectattacktarget" },
    ],
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to move",
      { unitat: "selectunit" },
      "to",
      "selectmovetarget",
      {
        if: [
          { anyat: ["oppbase", "selectmovetarget"] },
          { line: ["and turn it into", { unittype: ["heroes", ["player"]] }] },
        ],
      },
    ],
  },
};

export default tyrannosInstructions;
