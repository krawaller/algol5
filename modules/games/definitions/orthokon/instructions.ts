import { OrthokonDefinition } from "./_types";

const orthokonInstructions: OrthokonDefinition["instructions"] = {
  startTurn: { line: ["Select", "which", "soldiers", "to slide"] },
  selectunit: { line: ["Select", "where to slide", { unitat: "selectunit" }] },
  selectslidetarget: {
    line: [
      "Press",
      "slide",
      "to make",
      { unitat: "selectunit" },
      "go to",
      "selectslidetarget",
      {
        if: [
          { notempty: "victims" },
          { line: ["and turn", { unitlist: "victims" }, "into", "soldiers"] },
        ],
      },
    ],
  },
};

export default orthokonInstructions;
