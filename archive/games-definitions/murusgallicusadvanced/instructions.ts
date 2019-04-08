import { MurusgallicusadvancedInstructions } from './_types';

const murusgallicusadvancedInstructions: MurusgallicusadvancedInstructions = {
  startTurn: ["line", "Select a", ["orlist", [
      ["notempty", "mytowers"], "rook"
    ],
    [
      ["notempty", "mycatapults"], "queen"
    ]
  ], "to act with"],
  selecttower: ["line", "Select", ["orlist", [
      ["notempty", "movetargets"], "a move target"
    ],
    [
      ["notempty", "killtargets"],
      ["line", "an enemy", "pawn", "to kill"]
    ]
  ], "for the", "selecttower", "rook"],
  selectmove: ["line", "Press", "move", "to overturn your", "selecttower", "rook", "towards", "selectmove"],
  selectkill: ["line", "Press", "kill", "to make a section of the", "selecttower", "rook", ["ifelse", ["anyat", "walls", "selectkill"],
    ["line", "crush the enemy", "pawn", "at", "selectkill"],
    ["line", "reduce the enemy", "queen", "at", "selectkill", "to a", "rook", ", or", "sacrifice", "your", "rook", "entirely to turn the", "queen", "to a", "pawn", "!"]
  ]],
  selectcatapult: ["line", "Select where to fire the top section of your", "selectcatapult", "queen"],
  selectfire: ["line", "Press", "fire", "to shoot a section of the", "selectcatapult", "queen", ["ifelse", ["anyat", "walls", "selectfire"],
    ["line", "and destroy the enemy", "pawn", "at", "selectfire"],
    ["ifelse", ["anyat", "units", "selectfire"],
      [", reducing the enemy", ["unitnameat", "selectfire"], "at", "selectfire", "to a", ["ifelse", ["anyat", "catapults", "selectfire"], "rook", "pawn"]],
      ["line", "at", "selectfire", ", gaining a", "pawn", "there"]
    ]
  ]]
};

export default murusgallicusadvancedInstructions;
