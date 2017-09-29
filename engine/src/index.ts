/*
The public methods of the Algol system.
Meant to be consumed by an app.
*/

import {games,meta} from '../gamesproxy';

import * as omit from 'lodash/omit';
import * as random from 'lodash/random';

import decodeSessionSave from './save/decodesessionsave';
import optionsInUI from './various/optionsinui';
import newSession from './session/newsession';
import getBattleUI from './ui/getbattleui';
import makeSessionAction from './session/makesessionaction';
import findBestTurnEndPaths from './ai/findbestturnendpaths';
import getRandomTurnEndPath from './ai/getrandomturnendpath';
import compressHistoryForTurn from './history/compresshistoryforturn';

import makePlayer from '../test/makeplayer';

import { Session, Player } from './types';

let sessions: {[sessionid: string]: Session} = {};

// TODO - rename startGame to startBattle

const api = {
  /*
  Start a new session for a given game with the given players
  BattleId is optional, otherwise one will be randomised
  */
  startGame(gameId,plr1:Player,plr2:Player,battleid?: string){
    let session = newSession(gameId,plr1,plr2,battleid);
    sessions[session.id] = session;
    return getBattleUI(session, session.step);
  },
  /*
  Make a mark, do a command, etc. Perform an action in a session!
  */
  performAction(sessionId,action){
    let session = sessions[sessionId];
    //console.log('Gonna do',action,'in session',sessionId,'which has state',session);
    session = makeSessionAction(session,action);
    return getBattleUI(session, session.step);
  },
  /*
  Returns array of best moves for finishing current turn according to named brain.
  TODO - randomize all using battleId as a seed
  */
  findBestOption(sessionId,brain){
    switch(brain){
      case "Randy": return getRandomTurnEndPath(sessions[sessionId]);
      default:
      let paths = findBestTurnEndPaths(sessions[sessionId], brain);
      return paths[random(0,paths.length-1)];
    }
  },
  /*
  Take a wild guess! :D
  */
  debug(sessionId){
    let session = sessions[sessionId];
    return {
      ...omit(session, ['game']),
      ...session.game.debug()
    };
  },
  /*
  Yeeeah
  */
  inflateFromSave(saveString){
    let {gameId, battleId, turnNumber, moveIndexes, ended} = decodeSessionSave(saveString);
    let UI = api.startGame(gameId,makePlayer(1),makePlayer(2),battleId); // TODO - make save handle player info! :P
    while(UI.current.UI.turn < turnNumber || UI.current.UI.turn == turnNumber && ended && !UI.endedBy){
      let action, available = optionsInUI(UI);
      if (available.length === 1){
        action = available[0]
      } else if (available.length > 1){
        if (!moveIndexes.length){ throw "Many available but no save index left!" }
        action = available[moveIndexes.shift()]
      } else {
        throw "No available actions!"
      }
      UI = api.performAction(UI.sessionId, action);
    }
    if (moveIndexes.length){
      console.log(moveIndexes)
      throw "Oh noes, we had indexes still to go :("
    }
    return UI;
  },
  /*
  Wooh! :D
  */
  gameLibrary(){
    return meta;
  },
  /*
  History woo!
  */
  getHistoryForTurn(sessionId){
    let session = sessions[sessionId];
    return compressHistoryForTurn(session);
  }
}

export default api
