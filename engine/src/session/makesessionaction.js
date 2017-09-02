/*
Used in API.makeSessionAction and API.inflateFromSave
Mutates the given session according to the given action and returns it.
*/

import hydrateTurn from '../hydration/hydrateturn';
import isGameEndCommand from '../various/isgameendcmnd';
import calcTurnSave from '../save/calcturnsave'
import encodeSessionSave from '../save/encodesessionsave';
import decodeSessionSave from '../save/decodesessionsave';

export default function makeSessionAction(session,action){
      // removing an existing mark, going back in time
    if (session.markTimeStamps[action] && !session.turn.links[session.step.stepid][action]){
        console.log("Going back to",session.markTimeStamps[action]);
        session.step = session.turn.steps[session.markTimeStamps[action]]
        delete session.markTimeStamps[action] // not really necessary
    }
    // undoing last action (stored in session)
    else if (action==='undo' || action.substr(0,5) === 'undo ') {
        let undo = session.undo.pop()
        session.step = session.turn.steps[undo.backTo]
    }
    // ending the game!
    else if (isGameEndCommand(action)){
        session.savedIndexes = session.savedIndexes.concat( calcTurnSave(session.turn,session.step,action) );
        session.saveString = encodeSessionSave({
            gameId: session.gameId,
            turnNumber: session.turn.turn,
            battleId: session.battleId,
            moveIndexes: session.savedIndexes,
            ended: true
        });
        session.winner = (action === 'win' ? session.turn.player : action === 'lose' ? {1:2,2:1}[session.turn.player] : 0);
        session.endedBy = session.turn.links[session.step.stepid][action];
    }
    // ending the turn, creating a new one
    else if (action==='endturn'){
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
        // TODO also add to session history
    }
    // doing an action or adding a mark
    else {
        if (!session.game.commands[action]){
            session.markTimeStamps[action] = session.step.stepid
        } else {
            session.undo.push({
                backTo: session.step.stepid,
                actionName: action
            });
        }
        session.step = session.turn.steps[session.step.stepid+'-'+action] // TODO - or create, if not there!
    }
    return session;
}