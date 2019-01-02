import {Instructions} from '../../types';
import { ShoveoffPhase } from './_types';

const shoveoffInstructions: Instructions<ShoveoffPhase> = {
  startTurn: ["line", "Select where to shove in", ["ifelse", ["same", ["sizeof", "myunits"], 7], "your last off-board unit", ["ifelse", ["same", ["sizeof", "myunits"], 8], "a neutral unit", ["line", "one of your", ["minus", 8, ["sizeof", "myunits"]], "remaining off-board units"]]]],
  selectpushpoint: ["line", "Press", ["orlist", [
      ["notempty", "spawnsouth"], "south"
    ],
    [
      ["notempty", "spawnnorth"], "north"
    ],
    [
      ["notempty", "spawnwest"], "west"
    ],
    [
      ["notempty", "spawneast"], "east"
    ]
  ], "to shove in that direction and make room for the new unit at", "selectpushpoint"]
};

export default shoveoffInstructions;
