/*
Return a sorted array with all commands available in the UI at this time
*/
import {BattleUI} from '../types';

export default function optionsInUI(UI:BattleUI): string[] {
  const current = UI.current;
  let ret = [].concat(current.potentialMarks.map(m => m.pos));
  ret = ret.concat( Object.keys(current.commands).reduce((mem,c)=> {
    return current.commands[c] ? mem.concat(c) : mem;
  }, []));
  ret = ret.concat( current.submit || [] );
  return ret.sort();
}