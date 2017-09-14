import * as isArray from 'lodash/isArray';
import * as tail from 'lodash/tail';

import { Definition } from '../types';
import withUniversal from './universal';
import makeParser from './';
import lib from '../../logic/';

function innerList(gameDef: Definition, player: 1 | 2, action: string, expression){
  const parse = makeParser(gameDef,player,action);
  if (!isArray(expression)){
    console.log(typeof expression, expression);
    throw "List that wasn't array! " + expression;
  }
  const items = (expression[0] === "list" ? expression[1] : expression);
  return `[${items.map(v => parse.value(v)).join(',')}]`;
}

const list = withUniversal(innerList);

export default list;


/*
        list: (O,def)=> {
            if (T['list_'+def[0]]) {
                return T['list_'+def[0]](O,tail(def));
            } else if (isArray(def)) {
                return T.list_list(O,[def]);
            } else {
                throw "Unknown list def: "+def;
            }
        },

        list_list: (O,[vals])=> {
            var ret = vals.map(v=>T.value(O,v))
            return '['+ret.join(',')+']'
        },
*/