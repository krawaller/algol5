/*
WIP?
Returns array of UI objects for given turn, with adjusted marks
*/

import getSessionUI from '../session/getsessionui';
import {pos2coords} from '../../gamesproxy';
import { Session, Turn, UI } from '../types';

export default function compressedHistoryForTurn(session: Session, turn: Turn): UI[] {
  return session.step.path.reduce((mem,action)=>{ // TODO - step here, should that be in params instead/too?
    mem.id += '-' + action
    if (session.game.commands[action]){ // TODO - do boilUntil here instead? :D have cmnds array as default?
      let UI = getSessionUI(session, turn.steps[mem.id]);
      UI.potentialMarks = [];
      UI.activeMarks = mem.marks.map(pos=>({pos, coords: pos2coords(pos)}));
      UI.description = action + '(' + mem.marks.join(',') + ')';
      mem.UIs.push(UI);
      mem.marks = [];
    } else {
      mem.marks.push(action);
    }
    return mem;
  },{marks:[], UIs: [], id: 'root'}).UIs;
}
