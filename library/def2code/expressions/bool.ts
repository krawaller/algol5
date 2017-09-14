import { Definition } from '../types';
import lib from '../../logic/';

export default function bool(gameDef: Definition, player: 1 | 2, action: string, expression){
  return lib.boolean({rules: gameDef, player, action}, expression);
}