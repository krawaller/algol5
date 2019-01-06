import {Instructions} from '../../../types';
import { DescentPhase } from './_types';

const descentInstructions: Instructions<DescentPhase> = {
  startTurn: "Select a unit to move and dig with",
  selectunit: "Select where to move this unit",
  selectmovetarget: ["line", "Press", "move", "to", ["ifelse", ["same", ["read", "units", "selectunit", "group"],
    ["read", "units", "selectmovetarget", "group"]
  ], "walk", ["ifelse", ["or", ["anyat", "rooks", "selectunit"],
    ["anyat", "pawns", "selectmovetarget"]
  ], "descend", "climb"]], "from", "selectunit", "to", "selectmovetarget"],
  move: "Now select an empty neighbouring square to dig",
  selectdigtarget: ["ifelse", ["anyat", "rooks", "selectdigtarget"],
    ["line", "Press", "dig", "to lower", "selectdigtarget", "from level 3 to level 2"],
    ["ifelse", ["anyat", "knights", "selectdigtarget"],
      ["line", "Press", "dig", "to lower", "selectdigtarget", "from level 2 to level 1"],
      ["line", "Press", "dig", "to destroy", "selectdigtarget"]
    ]
  ]
};

export default descentInstructions;
