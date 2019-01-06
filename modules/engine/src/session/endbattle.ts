import { Session } from '../types'

import makeEndGameHistoryEntry from '../history/makeendgamehistoryentry';
import calcTurnSave from '../save/calcturnsave'
import updateSessionSave from '../save/updatesessionsave';

export default function endBattle(session: Session, action: string) {
  session.winner = <0|1|2>(action === 'win' ? session.turn.player : action === 'lose' ? {1:2,2:1}[session.turn.player] : 0);
  session.endedBy = session.turn.links[session.step.stepid][action];
  session.currentSteps.push(makeEndGameHistoryEntry(session)); // = session.history.concat(compressHistoryForTurn(session)).concat(makeEndGameHistoryEntry(session));
  session.savedIndexes = session.savedIndexes.concat( calcTurnSave(session.turn,session.step,action) );
  session = updateSessionSave(session);
  return session;
}
