import { Session } from '../types'

export default function removeMark(session: Session, action: string) {
  session.step = session.turn.steps[session.markTimeStamps[action]]
  delete session.markTimeStamps[action] // not really necessary
  return session;
}