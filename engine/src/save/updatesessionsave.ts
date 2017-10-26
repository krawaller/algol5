import { Session } from '../types'

import encodeSessionSave from '../save/encodesessionsave';

export default function updateSessionSave(session: Session) {
  session.saveString = encodeSessionSave({
    gameId: session.gameId,
    turnNumber: session.turn.turn,
    battleId: session.battleId,
    moveIndexes: session.savedIndexes,
    ended: !!session.endedBy
  });
  return session;
}
