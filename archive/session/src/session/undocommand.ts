import { Session } from '../types'

import compressHistoryForTurn from '../history/compresshistoryforturn';

export default function undoCommand(session: Session, action: string) {
  let undo = session.undo.pop()
  session.step = session.turn.steps[undo.backTo];
  session.currentSteps = [];
  session.currentSteps = compressHistoryForTurn(session);
  return session;
}