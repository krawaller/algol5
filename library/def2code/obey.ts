import makeParser from './expressions';

import { Definition } from './types';

export default function obey(gameDef: Definition, player: 1 | 2, action: string, instr: any, callback: Function){
  const parse = makeParser(gameDef, player, action);
  const [type, ...details] = instr;
  switch(type){
    case 'if': {
      const [expr,newInstr] = details;
      return `
        if (${parse.bool(expr)}){
          ${obey(gameDef, player, action, newInstr, callback)}
        }
      `;
    }
    case 'ifelse': {
      const [expr,alt1,alt2] = details;
      return `
        if (${parse.bool(expr)}){
          ${obey(gameDef, player, action, alt1, callback)}
        } else {
          ${obey(gameDef, player, action, alt2, callback)}
        }
      `;
    }
    case 'ifplayer': {
      const [ifPlr, newInstr] = details;
      return player === ifPlr ? obey(gameDef, player, action, newInstr, callback) : ' ';
    }
    case 'playercase': {
      const [alt1, alt2] = details;
      return obey(gameDef, player, action, player === 1 ? alt1 : alt2, callback);
    }
    case 'all': {
      return details.map(d => obey(gameDef, player, action, d, callback)).join(' ');
    }
    default:
      return callback(instr);
  }
}
