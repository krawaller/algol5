import { Definition } from '../types';
import withUniversal from './universal';
import lib from '../../logic/';

function bool(gameDef: Definition, player: 1 | 2, action: string, expression){
  return lib.boolean({rules: gameDef, player, action}, expression);
}

export default withUniversal(bool);
