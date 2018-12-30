import * as isArray from 'lodash/isArray';

import { Definition } from '../types';
import makeParser from './';

export default function parsePosition(gameDef: Definition, player: 1 | 2, action: string, expression){
  const parse = makeParser(gameDef,player,action,"position");
  if (!isArray(expression)){
    return parse.position(["mark",expression]);
  }
  const [type, ...args] = expression;
  switch(type){
    case "mark": {
      const [markName] = args;
      return `MARKS[${parse.value(markName)}]`;
    }
    case "turnpos": {
      const [pos] = args;
      return `TURNVARS['${pos}']`; // TODO - Not parse value here?
    }
    case "battlepos": {
      const [pos] = args;
      return `BATTLEVARS['${pos}']`; // TODO - Not parse value here?
    }
    case "pos": {
      const [pos] = args;
      return parse.value(pos);
    }
    case "target": {
      return "POS"; // TODO - had useforpos in O here.... OMG! GONNA BREAK :P or not. 
    }
    case "start": {
      return "STARTPOS";
    }
    case "onlyin": { // TODO - is really "firstin"
      const [set] = args;
      return `Object.keys(${parse.set(set)})[0]`;
    }
    default:
      throw "Unknown position " + expression;
  }
}
