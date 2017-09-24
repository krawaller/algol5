/*
Used in API.startGameSession and API.makeSessionAction.
Returns an object used to draw board in an app.
Pure.
*/

import getStepUI from './getstepui';
import getStepControlUI from './getstepcontrolui';

import {BattleUI, Session, Step} from '../types';

export default function getBattleUI(session: Session, step: Step): BattleUI {
  let {game,turn,undo,markTimeStamps} = session;
  return {
    gameId: game.id,
    sessionId: session.id,
    board: game.board,
    players: session.players,
    save: session.saveString,
    endedBy: session.endedBy,
    winner: session.winner,
    current: {
      ...getStepUI(session, step),
      ...getStepControlUI(session, step)
    },
    history: session.history
  };
}
