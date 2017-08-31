/*
The public methods of the Algol system.
Meant to be consumed by an app.
*/

import omit from 'lodash/omit';
import random from 'lodash/random';

import games from '../games/temp/ALLGAMES';
import library from '../games/temp/gamelibrary';

import decodeSessionSave from './save/decodesessionsave';
import optionsInUI from './various/optionsinui';
import newSession from './session/newsession';
import getSessionUI from './session/getsessionui';
import makeSessionAction from './session/makesessionaction';
import findBestTurnEndPaths from './ai/findbestturnendpaths';
import getRandomTurnEndPath from './ai/getrandomturnendpath';

let sessions = {}

// TODO - rename startGame to startBattle

const api = {
    /*
    Start a new session for a given game with the given players
    BattleId is optional, otherwise one will be randomised
    */
    startGame(gameId,plr1,plr2,battleid){
        let session = newSession(gameId,plr1,plr2,battleid);
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
        let UI = api.startGame(gameId,'plr1','plr2',battleId);
        while(UI.turn < turnNumber || UI.turn == turnNumber && ended && !UI.endedBy){
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
        return library;
    }
}

export default api
