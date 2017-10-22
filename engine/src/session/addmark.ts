import { Session } from '../types'

export default function addMark(session: Session, action: string) {
  session.markTimeStamps[action] = session.step.stepid
  session.step = session.turn.steps[session.step.stepid+'-'+action] // TODO - or create, if not there!
  return session;
}