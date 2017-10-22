import { Session } from '../types'

import compressHistoryForTurn from '../history/compresshistoryforturn';
import calcTurnSave from '../save/calcturnsave';
import encodeSessionSave from '../save/encodesessionsave';
import hydrateTurn from '../hydration/hydrateturn';

export default function endTurn(session: Session, action: string) {
  session.history = session.history.concat( compressHistoryForTurn(session) );
  session.savedIndexes = session.savedIndexes.concat( calcTurnSave(session.turn,session.step,'endturn') );
  session.turn = hydrateTurn(session.game, session.turn.next[session.step.stepid]);
  session.saveString = encodeSessionSave({
    gameId: session.gameId,
    turnNumber: session.turn.turn,
    battleId: session.battleId,
    moveIndexes: session.savedIndexes
  });
  session.step = session.turn.steps.root;
  session.markTimeStamps = {};
  session.undo = [];
  session.currentSteps = [];
  return session;
}
