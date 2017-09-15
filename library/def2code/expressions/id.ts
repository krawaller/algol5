import * as isArray from 'lodash/isArray';

import { Definition } from '../types';
import makeParser from './';

export default function parseId(gameDef: Definition, player: 1 | 2, action: string, expression, from){
  const parse = makeParser(gameDef, player, action, "id");
  if (!isArray(expression)){
    return parse.value(expression);
  }
  const [type, ...args] = expression;
  switch(type){
    case "idat": {
      const [pos] = expression;
      return `(UNITLAYERS.units[${parse.position(pos)}] || [{}]).id`;
    }
    case "loopid":
      return "LOOPID";
    default:
      try {
        if (from === 'value') throw "No, coming from value, dont try that";
        const val = parse.value(expression);
        return val;
      } catch(e) {
        throw "Unknown id: " + expression;
      }
  }
}
