import { AriesInstructions } from './_types';

const ariesInstructions: AriesInstructions = {
  startTurn: ["line", "Select a", "rook", "to move"],
  selectunit: ["line", "Select where to move your", "selectunit", "rook"],
  selectmovetarget: ["line", "Press", "move", "to move your", "selectunit", "rook", "to", "selectmovetarget", ["if", ["notempty", "squished"],
    ["line", "and squash the enemy at", ["pos", ["onlyin", "squished"]]]
  ]]
};

export default ariesInstructions;
