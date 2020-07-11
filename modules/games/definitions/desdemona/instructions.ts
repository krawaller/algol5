import { DesdemonaDefinition } from "./_types";

const desdemonaInstructions: DesdemonaDefinition["instructions"] = {
  startTurn: { line: ["Select", "amazons", "to move"] },
  selectunit: { line: ["Select where to move", { unitat: "selectunit" }] },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to move",
      { unitat: "selectunit" },
      "to",
      "selectmovetarget",
    ],
  },
  move: {
    line: ["Select where to fire with", { unitat: { turnpos: "movedto" } }],
  },
  selectfiretarget: {
    line: [
      "Press",
      "fire",
      "to spawn",
      { unittypepos: ["stones", ["player"], "selectfiretarget"] },
      {
        if: [
          { notempty: "victims" },
          { line: ["and capture", { unitlist: "victims" }] },
        ],
      },
    ],
  },
};

export default desdemonaInstructions;
