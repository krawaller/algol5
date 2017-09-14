import bool from './bool';
import id from './id';
import list from './list';
import position from './position';
import set from './set';
import value from './value';
import layerRef from './layerref';

import { Definition } from '../types';

export default function parseExpression(gameDef: Definition, player: 1 | 2, action: string){
  return {
    bool: (expr) => bool(gameDef, player, action, expr),
    id: (expr) => id(gameDef, player, action, expr),
    list: (expr) => list(gameDef, player, action, expr),
    position: (expr) => position(gameDef, player, action, expr),
    set: (expr) => set(gameDef, player, action, expr),
    value: (expr) => value(gameDef, player, action, expr),
    layerRef: (expr) => layerRef(gameDef, player, action, expr)
  };
}
