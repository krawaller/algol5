/*
Returns array of UI objects for given turn, with adjusted marks
*/

import getStepUI from '../ui/getstepui';
import {pos2coords} from '../../../common';
import { Session, Turn, StepUI } from '../types';

export default function compressedHistoryForTurn(session: Session): StepUI[] {
  return session.step.path.reduce((mem,action,n)=> {
    mem.id += '-' + action
    if (session.game.commands[action]){
      let UI = getStepUI(session, session.turn.steps[mem.id]);
      UI.idx = mem.UIs.length + session.history.length;
      UI.marks = mem.marks.map(pos=>({pos, coords: pos2coords(pos)}));
      UI.description = action + ' ' + mem.marks.join('-') + '';
      mem.UIs.push(UI);
      mem.marks = [];
    } else {
      mem.marks.push(action);
    }
    return mem;
  },{marks:[], UIs: [], id: 'root'}).UIs.map((UI,n,list) => ({
    ...UI,
    stepIdx: n + 1,
    maxStepIdx: list.length
  }));
}
