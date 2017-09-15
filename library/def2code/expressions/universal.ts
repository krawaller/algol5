import { Definition } from '../types';
import boolean from './bool';

function innerUniversal(gameDef: Definition, player: 1 | 2, action: string, parser, expression){
  const me = (expr) => innerUniversal(gameDef, player, action, parser, expr);
  const [type, ...details] = expression;
  switch(type){
    case "ifelse": {
      const [bool,alt1,alt2] = details;
      return `(${boolean(gameDef,player,action,bool)} ? ${me(alt1)} : ${me(alt2)})`
    }
    case "playercase": {
      const [alt1,alt2] = details;
      return me(player === 1 ? alt1 : alt2);
    }
    case "actionor": {
      const [name,then,otherwise] = details;
      return me(action === name ? then : otherwise);
    }
    default:
      return parser(gameDef, player, action, expression);
  }
}

export default function withUniversal(parser){
  return (gameDef: Definition, player: 1 | 2, action: string, expression) => {
    return innerUniversal(gameDef, player, action, parser, expression);
  }
}
