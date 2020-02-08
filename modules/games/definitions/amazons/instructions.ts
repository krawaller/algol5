import { AmazonsInstructions } from "./_types";

const amazonsInstructions: AmazonsInstructions = {
  startTurn: { line: ["Select", "amazons", "to move and fire with"] },
  selectunit: { line: ["Select", "where to move", { unitat: "selectunit" }] },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to make",
      { unitat: "selectunit" },
      "go to",
      "selectmovetarget",
    ],
  },
  move: "Now select where to fire at",
  selectfiretarget: {
    line: [
      "Press",
      "fire",
      "to spawn",
      { unittypeset: ["fires", 0, { single: "selectfiretarget" }] },
    ],
  },
};

export default amazonsInstructions;
