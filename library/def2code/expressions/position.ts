import { Definition } from '../types';
import lib from '../../logic/';

export default function position(gameDef: Definition, player: 1 | 2, action: string, expression){
  return lib.position({rules: gameDef, player, action}, expression);
}