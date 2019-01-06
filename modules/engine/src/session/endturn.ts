import { Session } from '../types'

import compressHistoryForTurn from '../history/compresshistoryforturn';
import calcTurnSave from '../save/calcturnsave';
import updateSessionSave from '../save/updatesessionsave';

import hydrateTurn from '../hydration/hydrateturn';

import optionsInUI from '../various/optionsinui';
import getBattleUI from '../ui/getbattleui';

export default function endTurn(session: Session, action: string) {
  session.history = session.history.concat( compressHistoryForTurn(session) );
  session.savedIndexes = session.savedIndexes.concat( calcTurnSave(session.turn,session.step,'endturn') );

  const path = session.step.path;
  const stepId = session.step.stepid;

  if (!session.inflating){
    session.turn = hydrateTurn(session.game, session.turn.next[stepId]);
    session = updateSessionSave(session);
  } else if (session.turn.next && session.turn.next[stepId]) {
    session.turn = session.turn.next[stepId];
  } else {
    session.turn.next = session.turn.next || {};
    session.turn = session.turn.next[stepId] = session.game[session.turn.links[stepId].endturn](session.turn, session.step);
  }
  session.step = session.turn.steps.root;
  session.markTimeStamps = {};
  session.undo = [];
  session.currentSteps = [];
  return session;
}
