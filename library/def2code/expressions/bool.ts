import { Definition } from '../types';
import makeParser from './';

export default function parseBool(gameDef: Definition, player: 1 | 2, action: string, expression){
  const parse = makeParser(gameDef, player, action, "boolean");
  const [type, ...args] = expression;
  switch(type){
    case "truthy": {
      const [val] = args;
      return `!!${parse.val(val)}`;
    }
    case "falsy": {
      const [val] = args;
      return `!${parse.val(val)}`;
    }
    case "same": {
      const [v1,v2] = args;
      return `(${parse.val(v1)} === ${parse.val(v2)})`;
    }
    case "different": {
      const [v1,v2] = args;
      return `(${parse.val(v1)} !== ${parse.val(v2)})`;
    }
    case "morethan": {
      const [v1,v2] = args;
      return `(${parse.val(v1)} > ${parse.val(v2)})`;
    }
    case "moreorequal": {
      const [v1,v2] = args;
      return `(${parse.val(v1)} >= ${parse.val(v2)})`;
    }
    case "anyat": {
      const [set,pos] = args;
      return `!!(${parse.set(set)}[${parse.pos(pos)}])`;
    }
    case "noneat": {
      const [set,pos] = args;
      return `!(${parse.set(set)}[${parse.pos(pos)}])`;
    }
    case "overlaps": {
      const [s1,s2] = args;
      return parse.bool(['notempty',['intersect',s1,s2]]);
    }
    case "isempty": {
      const [set] = args;
      return `Object.keys(${parse.set(set)}).length === 0`;
    }
    case "notempty": {
      const [set] = args;
      return `Object.keys(${parse.set(set)}).length !== 0`;
    }
    case "and": {
      const bools = args;
      return `(${ bools.map(b => parse.bool(b)).join(' && ') })`;
    }
    case "or": {
      const bools = args;
      return `(${ bools.map(b => parse.bool(b)).join(' || ') })`;
    }
    case "not": {
      const [bool] = args;
      return `!${parse.bool(bool)}`;
    }
    case "true": {
      return "true";
    }
    case "false": {
      return "false";
    }
    case "valinlist": {
      const [val,list] = args;
      return `(${parse.list(list)}.indexOf(${parse.val(val)}) !== -1)`;
    }
    case "justinone": { // TODO - support more than two sets? or rename to notinboth
      const [pos,set1,set2] = args;
      return `((TEMP=${parse.pos(pos)}) && !${parse.set(set1)}[TEMP] !== !${parse.set(set2)}[TEMP])`;
    }
    default:
      throw "Unknown bool! Boolshit! " + expression;
  }
}
