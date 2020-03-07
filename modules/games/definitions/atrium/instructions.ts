import { AtriumDefinition } from "./_types";

const atriumInstructions: AtriumDefinition["instructions"] = {
  startTurn: { line: ["Select", "a", "king", "or", "queen", "to move"] },
  selectunit: {
    line: [
      "Select",
      "orthogonal empty neighbour to move",
      { unitat: "selectunit" },
      "to"
    ]
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to walk",
      { unitat: "selectunit" },
      "to",
      "selectmovetarget"
    ]
  }
};

export default atriumInstructions;
