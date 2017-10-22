import { Session } from '../types'

import compressHistoryForTurn from '../history/compresshistoryforturn';

export default function executeCommand(session: Session, action: string) {
  session.undo.push({
    backTo: session.step.stepid,
    actionName: action
  });
  session.step = session.turn.steps[session.step.stepid+'-'+action] // TODO - or create, if not there!
  session.currentSteps = compressHistoryForTurn(session);
  return session;
}
