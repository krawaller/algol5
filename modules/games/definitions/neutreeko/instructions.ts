import { NeutreekoDefinition } from "./_types";

const neutreekoInstructions: NeutreekoDefinition["instructions"] = {
  startTurn: { line: ["Select", { unittype: ["pieces", ["player"]]}, "to move"]},
  selectunit: { line: ["Select", "where to move", { unitat: "selectunit" }] },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to move",
      { unitat: "selectunit" },
      "to",
      "selectmovetarget"
    ],
  }
};

export default neutreekoInstructions;
