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

/*
    instruction: (O,def)=> {
        if (C['instr_'+def[0]]) {
            return C['instr_'+def[0]](O,tail(def));
        } else if (O && O.effect){
            return C.applyeffect(O,def)
        } else if (O && O.generating && O.rules && O.rules.generators[def]){
            return C.applyGenerator(O,O.rules.generators[def])
        } else if (O && O.linking) {
            return C.applyLink(O,def)
        } else {
            throw "Unknown instruction def: "+def;
        }
    },

    instr_if: (O,[bool,instr])=> 'if ('+C.boolean(O,bool)+'){'+C.instruction(O,instr)+'} ',
    instr_ifelse: (O,[bool,alt1,alt2])=> "if (" + C.boolean(O,bool) + "){" + C.instruction(O,alt1) + "} else {" + C.instruction(O,alt2) + "}",
    instr_ifplayer: (O,[plr,instr])=> plr === O.player ? C.instruction(O,instr) : '',
    instr_playercase: (O,[alt1,alt2])=> C.instruction(O,O.player === 1 ? alt1 : alt2),
    instr_all: (O,defs)=> defs.map(d=>C.instruction(O,d)).join(' '),
*/