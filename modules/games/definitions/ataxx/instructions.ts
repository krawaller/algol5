import { AtaxxDefinition } from "./_types";

const ataxxInstructions: AtaxxDefinition["instructions"] = {
  startTurn: { line: ["Select", "microbes", "to act with"] },
  selectunit: {
    line: ["Select where to jump or split with", { unitat: "selectunit" }],
  },
  selectjumptarget: {
    line: [
      "Press",
      "jump",
      "to move",
      { unitat: "selectunit" },
      "to",
      "selectjumptarget",
      {
        if: [
          { notempty: "assimilated" },
          { line: ["and assimilate", { unitlist: "assimilated" }] },
        ],
      },
    ],
  },
  selectsplittarget: {
    line: [
      "Press",
      "split",
      "to spawn",
      { unittypepos: ["microbes", ["player"], "selectsplittarget"] },
      {
        if: [
          { notempty: "assimilated" },
          { line: ["and assimilate", { unitlist: "assimilated" }] },
        ],
      },
    ],
  },
};

export default ataxxInstructions;
