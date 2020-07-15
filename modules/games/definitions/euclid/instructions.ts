import { EuclidDefinition } from "./_types";

const euclidInstructions: EuclidDefinition["instructions"] = {
  startTurn: {
    line: [
      "Select",
      { unittype: ["soldiers", ["player"]] },
      "or",
      { unittype: ["kings", ["player"]] },
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
      "to",
      "selectmovetarget",
      {
        if: [
          { notempty: "intersection" },
          { line: ["and kill", { unitlist: "intersection" }] },
        ],
      },
    ],
  },
};

export default euclidInstructions;
