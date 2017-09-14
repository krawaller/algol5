import { Definition } from '../types';
import lib from '../../logic/';

export default function list(gameDef: Definition, player: 1 | 2, action: string, expression){
  return lib.list({rules: gameDef, player, action}, expression);
}
