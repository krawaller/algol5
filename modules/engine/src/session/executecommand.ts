import { Session } from '../types'

import compressHistoryForTurn from '../history/compresshistoryforturn';

export default function executeCommand(session: Session, action: string) {
  const stepId = session.step.stepid;
  const nextStepId = session.step.stepid+'-'+action;
  session.undo.push({
    backTo: stepId,
    actionName: action
  });
  if (session.turn.steps[nextStepId]){
    session.step = session.turn.steps[nextStepId];
  } else {
    const funcName = session.turn.links[stepId][action];
    session.step = session.turn.steps[nextStepId] = session.game[funcName](session.turn, session.step);
  }
  session.currentSteps = compressHistoryForTurn(session);
  return session;
}
