import lib from '../logic/';

import { Definition } from './types';

import {ifCodeContains} from './utils';

export default function addCommandFunction(def: Definition, cmndname: string, player: 1 | 2){
  const O = {rules: def, player, cmndname};
  const cmndDef = def.commands[cmndname];
  const instruction = lib.value(O, cmndDef.instruction||'');
  return `
    game.${cmndname}${player} = ${lib.makeCommandFunction(O)};
    game.${cmndname}${player}instruction = function(step){
      ${ifCodeContains(instruction,{
        MARKS: 'var MARKS = step.MARKS; ',
        ARTIFACTS: 'var ARTIFACTS = step.ARTIFACTS; ',
        UNITLAYERS: 'var UNITLAYERS = step.UNITLAYERS; ',
        UNITDATA: 'var UNITDATA = step.UNITDATA; ',
      })}
      return ${instruction};
    };
  `;
}