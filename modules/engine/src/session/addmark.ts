import { Session } from '../types'

export default function addMark(session: Session, action: string) {
  const stepId = session.step.stepid;
  session.markTimeStamps[action] = stepId;
  const nextStepId = session.step.stepid+'-'+action;
  if (session.turn.steps[nextStepId]){
    session.step = session.turn.steps[nextStepId];
  } else {
    const funcName = session.turn.links[stepId][action];
    session.step = session.turn.steps[nextStepId] = session.game[funcName](session.turn, session.step, action);
  }
  return session;
}