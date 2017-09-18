/*
Return a sorted array with all commands available in the UI at this time
*/
import {UI} from '../types';

export default function optionsInUI(UI:UI): string[] {
  let ret = [].concat(UI.potentialMarks.map(m => m.pos));
  ret = ret.concat( Object.keys(UI.commands).reduce((mem,c)=> {
    return UI.commands[c] ? mem.concat(c) : mem;
  }, []));
  ret = ret.concat( UI.submit || [] );
  return ret.sort(); //UI.commands.concat(UI.potentialMarks.map(m => m.pos)).concat(UI.system.filter(c => c.substr(0,4) !== 'undo')).sort();
}