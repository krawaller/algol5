import bool from './expressions/bool';

import { Definition } from './types';

// TODO - add action! :P

export default function obey(gameDef: Definition, player: 1 | 2, instr: any, callback: Function){
  const action = "TODO - PASS ME IN!";
  const [type, ...details] = instr;
  switch(type){
    case 'if': {
      const [expr,newInstr] = details;
      return `
        if (${bool(gameDef,player,action,expr)}){
          ${obey(gameDef, player, newInstr, callback)}
        }
      `;
    }
    case 'ifelse': {
      const [expr,alt1,alt2] = details;
      return `
        if (${bool(gameDef,player,action,expr)}){
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
