import { Definition } from '../types';
import boolean from './bool';

export default function withUniversal(parser){
  return (gameDef: Definition, player: 1 | 2, action: string, expression) => {
    const p = (expr) => parser(gameDef, player, action, expr);
    const [type, ...details] = expression;
    switch(type){
      case "ifelse": {
        const [bool,alt1,alt2] = details;
        return `(${boolean(gameDef,player,action,bool)} ? ${p(alt1)} : ${p(alt2)})`
      }
      case "playercase": {
        const [alt1,alt2] = details;
        return p(player === 1 ? alt1 : alt2);
      }
      case "actionor": {
        const [name,then,otherwise] = details;
        return p(action === name ? then : otherwise);
      }
      default:
        return p(expression);
    }
  }
}


/*
    const universal = {
        ifelse: (datatype)=> (O,[bool,alt1,alt2])=> {
            if (typeof T[datatype] !== "function"){
                console.log("ODIWNFE",datatype,"FOO",typeof T[datatype],T[datatype])
            }
            return "(" + T.boolean(O,bool) + "?" + T[datatype](O,alt1) + ":" + T[datatype](O,alt2) + ")"
        },
        playercase: (datatype)=> (O,[alt1,alt2])=> T[datatype](O,O.player === 1 ? alt1 : alt2),
        actionor: (datatype)=> (O,[action,alt1,alt2])=> {
            if (!T[datatype]){
                console.log("ALARM",datatype)
            }
            return T[datatype](O,O.cmndname===action||O.markname===action||O.name===action||O.action===action?alt1:alt2)
        }
    }
*/