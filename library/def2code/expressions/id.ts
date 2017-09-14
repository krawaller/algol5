import { Definition } from '../types';
import lib from '../../logic/';

export default function id(gameDef: Definition, player: 1 | 2, action: string, expression){
  return lib.id({rules: gameDef, player, action}, expression);
}
