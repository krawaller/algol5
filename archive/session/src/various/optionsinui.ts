/*
Return a sorted array with all commands available in the UI at this time
*/
import {BattleUI} from '../types';

export default function optionsInUI(UI:BattleUI, excludeDeadEnds?: boolean): string[] {
  const controls = UI.current.controls;
  let ret = [].concat(controls.potentialMarks.map(m => m.pos));
  ret = ret.concat( Object.keys(controls.commands).reduce((mem,c)=> {
    return controls.commands[c] ? mem.concat(c) : mem;
  }, []));
  ret = ret.concat( controls.submit || [] );
  if (excludeDeadEnds && controls.deadEnds){
    ret = ret.filter(action => !controls.deadEnds[action]);
  }
  return ret.sort();
}