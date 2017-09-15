import { Definition } from '../types';
import withUniversal from './universal';
import makeParser from './';

function innerBool(gameDef: Definition, player: 1 | 2, action: string, expression){
  const parse = makeParser(gameDef, player, action);
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

const bool = withUniversal(innerBool);

export default bool;

/*
        bool_truthy: (O,[value])=> "!!" + T.value(O,value),
        bool_falsy: (O,[value])=> "!" + T.value(O,value),
        bool_same: (O,[v1,v2])=> "(" + T.value(O,v1) + "===" + T.value(O,v2) + ")",
        bool_different: (O,[v1,v2])=> "(" + T.value(O,v1) + "!==" + T.value(O,v2) + ")",
        bool_morethan: (O,[v1,v2])=> "(" + T.value(O,v1) + ">" + T.value(O,v2) + ")",
        bool_anyat: (O,[set,pos])=> "!!("+T.set(O,set)+"["+T.position(O,pos)+"])",
        bool_noneat: (O,[set,pos])=> "!("+T.set(O,set)+"["+T.position(O,pos)+"])",
        bool_overlaps: (O,[s1,s2])=> T.boolean(O,['notempty',['intersect',s1,s2]]),  //"(!isEmpty("+T.set(O,["intersect",s1,s2])+"))",
        bool_isempty: (O,[s1])=> "Object.keys("+T.set(O,s1)+" || {}).length===0",
        bool_notempty: (O,[s1])=> "Object.keys("+T.set(O,s1)+" || {}).length!==0",
        bool_and: (O,bools)=> "(" + bools.map(b=>T.boolean(O,b)).join(" && ") + ")",
        bool_or: (O,bools)=> "(" + bools.map(b=>T.boolean(O,b)).join(" || ") + ")",
        bool_not: (O,[bool])=> "!"+T.boolean(O,bool),
        bool_true: (O)=> "true",
        bool_false: (O)=> "false",
        bool_valinlist: (O,[val,list])=> '('+T.list(O,list)+'.indexOf('+T.value(O,val)+')!==-1)',
        bool_justinone: (O,[pos,set1,set2])=> `((TEMP=${T.position(O,pos)}) && !${T.set(O,set1)}[TEMP] !== !${T.set(O,set2)}[TEMP])`,

*/