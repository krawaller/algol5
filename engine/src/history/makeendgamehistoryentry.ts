/*

*/

import getStepUI from '../ui/getstepui';
import {pos2coords} from '../../gamesproxy';
import { Session, Turn, StepUI } from '../types';

export default function makeEndGameHistoryEntry(session: Session): StepUI {
  let UI = getStepUI(session, session.step);
  UI.description = {
    type: "line",
    content: session.winner === 0
      ? ["Ended in",{type:"end",name:session.endedBy},"draw"]
      : session.winner === session.turn.player
      ? ["Won by",{type:"end",name:session.endedBy}]
      : ["Lost by",{type:"end",name:session.endedBy}],
  };
  UI.marks = Object.keys((session.turn.endMarks[session.step.stepid] || {})[session.endedBy] || {}).map(pos => ({pos:pos, coords: pos2coords(pos)}));
  UI.idx = session.history.length + session.currentSteps.length;
  return UI;
}
