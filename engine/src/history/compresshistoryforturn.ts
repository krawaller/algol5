/*
WIP?
Returns array of UI objects for given turn, with adjusted marks
*/

import getStepUI from '../ui/getstepui';
import {pos2coords} from '../../gamesproxy';
import { Session, Turn, StepUI } from '../types';

export default function compressedHistoryForTurn(session: Session): StepUI[] {
  return session.step.path.reduce((mem,action)=> {
    mem.id += '-' + action
    if (session.game.commands[action]){ // TODO - do boilUntil here instead? :D have cmnds array as default?
      let UI = getStepUI(session, session.turn.steps[mem.id]);
      UI.marks = mem.marks.map(pos=>({pos, coords: pos2coords(pos)}));
      UI.description = action + ' ' + mem.marks.join('-') + ''; // TODO - have way to include cmnds too?
      mem.UIs.push(UI);
      mem.marks = [];
    } else {
      mem.marks.push(action);
    }
    return mem;
  },{marks:[], UIs: [], id: 'root'}).UIs;
}
