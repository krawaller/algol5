import { UisgeDefinition } from "./_types";

const uisgeInstructions: UisgeDefinition["instructions"] = {
  startTurn: {
    line: [
      "Select",
      { unittype: ["soldiers", ["player"]] },
      "or",
      { unittype: ["kings", ["player"]] },
      "to act with",
    ],
  },
  selectunit: {
    line: [
      "Select where to jump",
      { if: [{ anyat: ["kings", "selectunit"] }, "or step"] },
      "with",
      { unitat: "selectunit" },
    ],
  },
  selectjumptarget: {
    line: [
      "Press",
      "jump",
      "to make",
      { unitat: "selectunit" },
      "flip to",
      {
        unittypepos: [
          { ifelse: [{ anyat: ["kings", "selectunit"] }, "soldiers", "kings"] },
          ["player"],
          "selectjumptarget",
        ],
      },
    ],
  },
  selectsteptarget: {
    line: [
      "Press",
      "step",
      "to move",
      { unitat: "selectunit" },
      "to",
      "selectsteptarget",
    ],
  },
};

export default uisgeInstructions;
