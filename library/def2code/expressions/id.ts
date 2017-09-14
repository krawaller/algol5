import * as isArray from 'lodash/isArray';

import { Definition } from '../types';
import withUniversal from './universal';
import makeParser from './';

function innerId(gameDef: Definition, player: 1 | 2, action: string, expression){
  const parse = makeParser(gameDef, player, action);
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
        const val = parse.value(expression);
        return val;
      } catch(e) {
        throw "Unknown id: " + expression;
      }
  }
}

const id = withUniversal(innerId);

export default id;
