import lib from '../logic/';

import { Definition } from './types';

import {ifCodeContains} from './utils';

export default function addCommandFunction(def: Definition, cmndname: string, player: 1 | 2){
  const O = {rules: def, player, cmndname};
  return `
    game.${cmndname}${player} = ${lib.makeCommandFunction(O)};
    game.${cmndname}${player}instruction = ${lib.makeInstructionFunction(O,lib.cmndRules(O).instruction)};
  `;
}