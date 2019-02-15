import { AtriumInstructions } from './_types';

const atriumInstructions: AtriumInstructions = {
  startTurn: { line: ["Select a", "king", "or", "queen", "to move"] },
  selectunit: {
    line: [
      "Select an orthogonal empty neighbour to move the",
      "selectunit",
      { nameat: "selectunit" },
      "to"
    ]
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to walk the",
      "selectunit",
      { nameat: "selectunit" },
      "to",
      "selectmovetarget"
    ]
  }
};

export default atriumInstructions;
