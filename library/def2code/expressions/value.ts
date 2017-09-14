import { Definition } from '../types';
import lib from '../../logic/';

export default function value(gameDef: Definition, player: 1 | 2, action: string, expression){
  return lib.value({rules: gameDef, player, action}, expression);
}