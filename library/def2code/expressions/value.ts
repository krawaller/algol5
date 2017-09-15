import { Definition } from '../types';
//import withUniversal from './universal';
import makeParser from './';
import * as isArray from 'lodash/isArray';

import lib from '../../logic';

function innerValue(gameDef: Definition, player: 1 | 2, action: string, expression){
  const parse = makeParser(gameDef, player, action);
  const [type, ...args] = expression;
  switch(type){
    case "indexlist": {
      const [index,list] = args;
      return `${parse.list(list)}[${parse.val(index)}]`;
    }
    case "pos": {
      const [pos] = args;
      return parse.pos(pos);
    }
    case "reldir": {
      const [dir,rel] = args;
      return `relativedirs[${parse.val(rel) - 2 + parse.val(dir)}]`;
    }
    case "value": {
      const [val] = args;
      return typeof value === "string" ? `'${value}'` : value;
    }
    case "val": {
      const [val] = args;
      return typeof value === "string" ? `'${value}'` : value;
    }
    case "player": {
      return player;
    }
    case "currentplayer": {
      return player;
    }
    case "otherplayer": { // TODO - obsolete? the above too, anyone using?
      return player === 1 ? 2 : 1;
    }
    case "sum": {
      return `(${args.map(v => parse.val(v)).join(' + ')})`;
    }
    case "concat": {
      return `(${args.map(v => `(${parse.val(v)}+'')`).join(' + ')})`;
    }
    case "prod": {
      return `(${args.map(v => parse.val(v)).join(' * ')})`;
    }
    case "minus": {
      const [val1,val2] = args;
      return `(${parse.val(val1)} - ${parse.val(val2)})`;
    }
    case "ctxval": {
      const [name] = args;
      return `CONTEXT[${parse.val(name)}]`;
    }
    case "dir": {
      return "DIR"; // TODO - was usefordir too, breaks?
    }
    case "max": {
      return "MAX";
    }
    case "stopreason": {
      return "STOPREASON";
    }
    case "countsofar": {
      return "CURRENTCOUNT";
    }
    case "totalcount": {
      return "TOTALCOUNT";
    }
    case "walklength": {
      return "WALKLENGTH";
    }
    case "neighbourcount": {
      return "NEIGHBOURCOUNT";
    }
    case "step": {
      return "STEP";
    }
    case "read": {
      const [layer,pos,prop] = args;
      return layer === 'board' // no need for failsafe
        ? `${parse.set(layer)}[${parse.pos(pos)}][${parse.val(prop)}]`
        : `(${parse.set(layer)}[${parse.pos(pos)}]||{})[${parse.val(prop)}]`;
    }
    case "sizeof": {
      const [set] = args;
      return `Object.keys(${parse.set(set)}).length`;
    }
    case "harvest": {
      const [set,prop] = args;
      return `
        reduce(${parse.set(set)},function(mem,obj){
          return mem+obj[${parse.val(prop)}];
        },0)
      `;
    }
    case "score": { // TODO - real reduce, or do object.keys above too? also, parse score name?
      const [set,score] = args;
      return `
        Object.keys(${parse.set(set)}).reduce(function(mem,pos){
          return mem + (${score}[pos]||0);
        },0)
      `;
    }
    case "turn": {
      return "turn.turn";
    }
    default: {
      if (!isArray(expression)){ // TODO - really?
        return parse.val([expression]);
      } else {
        try {
          const ret = parse.id(expression);
          return ret;
        } catch(e) {
          try {
            const ret = parse.pos(expression);
            return ret;
          } catch(e) {
            throw "Unknown value def: " + expression;
          }
        }
      }
    }
  }
}

//const value = withUniversal(innerValue);
//export default value;

export default function value(gameDef: Definition, player: 1 | 2, action: string, expression){
  const O = {rules: gameDef, player, action};
  return lib.value(O,expression);
}
