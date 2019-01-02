import {Instructions} from '../../types';

const kickrunInstructions: Instructions = {
  startTurn: "Select which unit to move",
  selectunit: ["ifelse", ["anyat", "runners", "selectunit"],
    ["line", "Select where to move your", "selectunit", "bishop"],
    ["line", "Select where to move your", "selectunit", "pawn"]
  ],
  selectmovetarget: ["line", "Press", "move", "to", ["ifelse", ["anyat", "runners", "selectunit"],
    ["line", "slide your bishop from", "selectunit", "to", "selectmovetarget"],
    ["line", "move your pawn from", "selectunit", "to", "selectmovetarget", ["if", ["anyat", "units", "selectmovetarget"], "and capture the enemy there"]]
  ]]
};

export default kickrunInstructions;
