/*
Used in API.makeSessionAction and API.inflateFromSave
Mutates the given session according to the given action and returns it.
*/

import executeCommand from './executeCommand';
import addMark from './addMark';
import removeMark from './removemark';
import undoCommand from './undocommand';
import endBattle from './endbattle';
import endTurn from './endturn';
import isGameEndCommand from '../various/isgameendcmnd';

import { Session } from '../types'

export default function makeSessionAction(session: Session, action: string): Session {
  // removing an existing mark, going back in time
  if (session.markTimeStamps[action] && !session.turn.links[session.step.stepid][action]){
    return removeMark(session, action);
  }
  // undoing last action (stored in session)
  else if (action==='undo' || action.substr(0,5) === 'undo ') {
    return undoCommand(session, action);
  }
  // ending the battle!
  else if (isGameEndCommand(action)){
    return endBattle(session, action);
  }
  // ending the turn, creating a new one
  else if (action==='endturn'){
    return endTurn(session, action);
  }
  // adding a mark
  else if (!session.game.commands[action]){
    return addMark(session, action);
  // performing a command
  } else {
    return executeCommand(session, action);
  }
}