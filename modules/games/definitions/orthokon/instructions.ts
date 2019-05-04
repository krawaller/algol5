import { OrthokonInstructions } from './_types';

const orthokonInstructions: OrthokonInstructions = {
  startTurn: { line: ["Select", "which", "soldiers", "to move"] },
  selectunit: { line: ["Select", "where to move", { unitat: "selectunit" }] },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to make",
      { unitat: "selectunit" },
      "go to",
      "selectmovetarget",
      {
        if: [
          { notempty: "victims" },
          { line: ["and turn", { unitlist: "victims" }, "into", "soldiers"] }
        ]
      }
    ]
  }
};

export default orthokonInstructions;
