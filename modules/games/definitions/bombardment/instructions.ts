import { BombardmentDefinition } from "./_types";

const bombardmentInstructions: BombardmentDefinition["instructions"] = {
  startTurn: {
    line: [
      "Select",
      "which",
      { unittype: ["rockets", ["player"]] },
      "to move or detonate",
    ],
  },
  selectunit: {
    line: [
      "Select",
      "where to move",
      { unitat: "selectunit" },
      "or press",
      "detonate",
      "to destroy it",
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
    ],
  },
};

export default bombardmentInstructions;
