import bool from './bool';
import id from './id';
import list from './list';
import position from './position';
import set from './set';
import value from './value';
import content from './content';
import universal from './universal';

import { Definition } from '../types';

export default function makeParser(gameDef: Definition, player: 1 | 2, action: string, from?: string){
  return ({
    bool: expr => universal(gameDef, player, action, bool, expr, from),
    id: expr => universal(gameDef, player, action, id, expr, from),
    list: expr => universal(gameDef, player, action, list, expr, from),
    position: expr => universal(gameDef, player, action, position, expr, from),
    pos: expr => universal(gameDef, player, action, position, expr, from),
    set: expr => universal(gameDef, player, action, set, expr, from),
    value: expr => universal(gameDef, player, action, value, expr, from),
    val: expr => universal(gameDef, player, action, value, expr, from),
    content: expr => universal(gameDef, player, action, content, expr, from),
  });
}
