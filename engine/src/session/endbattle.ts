import { Session } from '../types'

import makeEndGameHistoryEntry from '../history/makeendgamehistoryentry';
import calcTurnSave from '../save/calcturnsave'
import encodeSessionSave from '../save/encodesessionsave';

export default function endBattle(session: Session, action: string) {
  session.winner = <0|1|2>(action === 'win' ? session.turn.player : action === 'lose' ? {1:2,2:1}[session.turn.player] : 0);
  session.endedBy = session.turn.links[session.step.stepid][action];
  session.currentSteps.push(makeEndGameHistoryEntry(session)); // = session.history.concat(compressHistoryForTurn(session)).concat(makeEndGameHistoryEntry(session));
  session.savedIndexes = session.savedIndexes.concat( calcTurnSave(session.turn,session.step,action) );
  session.saveString = encodeSessionSave({
    gameId: session.gameId,
    turnNumber: session.turn.turn,
    battleId: session.battleId,
    moveIndexes: session.savedIndexes,
    ended: true
  });
  return session;
}
