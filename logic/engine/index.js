/*
The public methods of the Algol system.
Meant to be consumed by an app.
*/

import omit from 'lodash/omit';

import games from '../games/temp/ALLGAMES';

import isTurnEndCommand from './various/isturnendcmnd';
import encodeSessionSave from './save/encodesessionsave';
import newSession from './session/newsession';
import getSessionUI from './session/getsessionui';
import makeSessionAction from './session/makesessionaction';
import hydrateTurn from './hydration/hydrateturn';
import findBestTurnEnd from './ai/findbestturnend';

let sessions = {}

const api = {
    /*
    Start a new session for a given game with the given players
    */
    startGame(gameId,plr1,plr2){
        let session = newSession(gameId,plr1,plr2);
        sessions[session.id] = session;
        return getSessionUI(session, session.step);
    },
    /*
    Make a mark, do a command, etc. Perform an action in a session!
    */
    performAction(sessionId,action){
        let session = sessions[sessionId];
        //console.log('Gonna do',action,'in session',sessionId,'which has state',session);
        session = makeSessionAction(session,action);
        return getSessionUI(session, session.step);
    },
    /*
    Returns array of best moves for finishing current turn according to named brain.
    */
    findBestOption(sessionId,brain){
        return findBestTurnEnd(sessionId, brain);
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
    }
}

export default api
