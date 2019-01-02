import {Instructions} from '../../types';

const orthokonInstructions: Instructions = {
  startTurn: ["line", "Select which", "pawn", "to move"],
  selectunit: ["line", "Select where to move the", "selectunit", "pawn"],
  selectmovetarget: ["line", "Press", "move", "to move the", "selectunit", "pawn", "to", "selectmovetarget", ["if", ["notempty", "victims"],
    ["line", "and take over", ["pluralise", ["sizeof", "victims"],
      ["line", "enemy", "pawn"],
      ["line", "enemy", "pawns"]
    ]]
  ]]
};

export default orthokonInstructions;
