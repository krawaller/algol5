import { KingsvalleyDefinition } from "./_types";

const kingsvalleyInstructions: KingsvalleyDefinition["instructions"] = {
  startTurn: { line: ["Select", "soldiers", "or", "kings", "to slide"] },
  selectunit: { line: ["Select where to slide", { unitat: "selectunit" }] },
  selectmovetarget: {
    line: [
      "Press",
      "slide",
      "to move",
      { unitat: "selectunit" },
      "to",
      "selectmovetarget",
    ],
  },
};

export default kingsvalleyInstructions;
