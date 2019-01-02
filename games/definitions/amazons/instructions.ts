import {Instructions} from '../../types';

const amazonsInstructions: Instructions = {
  startTurn: ["Select a", "queen", "to move and fire with"],
  selectunit: ["Select where to move the", "selectunit", "queen"],
  selectmovetarget: ["Press", "move", "to go from", "selectunit", "to", "selectmovetarget"],
  move: "Now select where to fire at",
  selectfiretarget: ["Press", "fire", "to destroy the square at", "selectfiretarget"]
};

export default amazonsInstructions;
