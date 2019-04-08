import { MurusgallicusInstructions } from './_types';

const murusgallicusInstructions: MurusgallicusInstructions = {
  startTurn: ["line", "Select a", "rook", "to act with"],
  selecttower: ["line", "Select", ["orlist", [
      ["notempty", "movetargets"], "a move target"
    ],
    [
      ["notempty", "killtargets"],
      ["line", "an enemy", "pawn", "to kill"]
    ]
  ], "for the", "selecttower", "rook"],
  selectmove: ["line", "Press", "move", "to overturn your", "selecttower", "rook", "towards", "selectmove"],
  selectkill: ["line", "Press", "kill", "to make a section of the", "selecttower", "rook", "crush the enemy", "pawn", "at", "selectkill"]
};

export default murusgallicusInstructions;
