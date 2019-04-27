import { AmazonsInstructions } from "./_types";

const amazonsInstructions: AmazonsInstructions = {
  startTurn: { line: ["Select", "a", "queen", "to move and fire with"] },
  selectunit: { line: ["Select", "where to move the", "selectunit", "queen"] },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to go from",
      "selectunit",
      "to",
      "selectmovetarget"
    ]
  },
  move: "Now select where to fire at",
  selectfiretarget: {
    line: ["Press", "fire", "to destroy the square at", "selectfiretarget"]
  }
};

export default amazonsInstructions;
