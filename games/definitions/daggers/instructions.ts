import {Instructions} from '../../types';
import { DaggersPhase } from './_types';

const daggersInstructions: Instructions<DaggersPhase> = {
  startTurn: ["line", "Select a", "bishop", "or", "king", "to move"],
  selectunit: ["line", "Select where to move the", "selectunit", ["unitnameat", "selectunit"]],
  selectmovetarget: ["line", "Press", "move", "to go", ["ifelse", ["higher", "selectmovetarget", "selectunit"], "uphill", ["if", ["higher", "selectunit", "selectmovetarget"], "downhill"]], "from", "selectunit", ["ifelse", ["anyat", "units", "selectmovetarget"],
    ["line", "and kill the enemy", ["unitnameat", "selectmovetarget"], "at", "selectmovetarget"],
    ["line", "to", "selectmovetarget"]
  ]]
};

export default daggersInstructions;
