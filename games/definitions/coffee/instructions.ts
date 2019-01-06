import {Instructions} from '../../../types';
import { CoffeePhase } from './_types';

const coffeeInstructions: Instructions<CoffeePhase> = {
  startTurn: ["ifelse", ["isempty", "neutralunits"], "Select any square to place the first unit of the game", "Select which neutral unit to take over"],
  selectdrop: ["line", "Press", ["orlist", [
      ["notempty", "uphill"], "uphill"
    ],
    [
      ["notempty", "downhill"], "downhill"
    ],
    [
      ["notempty", "vertical"], "vertical"
    ],
    [
      ["notempty", "horisontal"], "horisontal"
    ]
  ], "to give your opponent placing options in that direction"]
};

export default coffeeInstructions;
