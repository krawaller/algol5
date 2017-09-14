import { Definition } from '../types';
import lib from '../../logic/';

export default function set(gameDef: Definition, player: 1 | 2, action: string, expression){
  return lib.set({rules: gameDef, player, action}, expression);
}