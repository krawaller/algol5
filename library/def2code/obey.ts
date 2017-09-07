import lib from '../logic/';

import { Definition } from './types';

export default function obey(gameDef: Definition, player: 1 | 2, instr: any, callback: Function){
  const O = {rules: gameDef, player};
  const [type, ...details] = instr;
  switch(type){
    case 'if': {
      const [bool,newInstr] = details;
      return `
        if (${lib.boolean(O,bool)}){
          ${obey(gameDef, player, newInstr, callback)}
        }
      `;
    }
    case 'ifelse': {
      const [bool,alt1,alt2] = details;
      return `
        if (${lib.boolean(O,bool)}){
          ${obey(gameDef, player, alt1, callback)}
        } else {
          ${obey(gameDef, player, alt2, callback)}
        }
      `;
    }
    case 'ifplayer': {
      const [ifPlr, newInstr] = details;
      return player === ifPlr ? obey(gameDef, player, newInstr, callback) : ' ';
    }
    case 'playercase': {
      const [alt1, alt2] = details;
      return obey(gameDef, player, player === 1 ? alt1 : alt2, callback);
    }
    case 'all': {
      return details.map(d => obey(gameDef, player, d, callback)).join(' ');
    }
    default:
      return callback(instr);
  }
}
