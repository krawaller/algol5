import {Instructions} from '../../types';

const atriumInstructions: Instructions = {
  startTurn: ["line", "Select a", "king", "or", "queen", "to move"],
  selectunit: ["line", "Select an orthogonal empty neighbour to move the", "selectunit", ["unitnameat", "selectunit"], "to"],
  selectmovetarget: ["line", "Press", "move", "to walk the", "selectunit", ["unitnameat", "selectunit"], "to", "selectmovetarget"]
};

export default atriumInstructions;
