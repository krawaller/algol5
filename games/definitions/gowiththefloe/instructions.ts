import {Instructions} from '../../../types';
import { GowiththefloePhase } from './_types';

const gowiththefloeInstructions: Instructions<GowiththefloePhase> = {
  startTurn: ["Select a unit to move"],
  selectunit: ["Select where to move"],
  selectmovetarget: ["Press", "move", "to go here"],
  selecteattarget: ["Press", "eat", "to, well, eat"]
};

export default gowiththefloeInstructions;
