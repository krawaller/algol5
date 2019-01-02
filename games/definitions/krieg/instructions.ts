import {Instructions} from '../../types';
import { KriegPhase } from './_types';

const kriegInstructions: Instructions<KriegPhase> = {
  startTurn: ["ifelse", ["morethan", ["turn"], 2],
    ["line", "Select a unit to move that your didn't move last turn"],
    ["line", "Select a unit to move"]
  ],
  selectunit: "Select an empty square to move to",
  selectmove: ["line", "Press", "move", "to go from", "selectunit", ["ifelse", ["and", ["anyat", "oppbases", "selectmove"],
      ["noneat", "oppbases", "selectunit"]
    ],
    ["line", "into the opponent base at", "selectmove"],
    ["line", "to", "selectmove"]
  ]]
};

export default kriegInstructions;
