/*
The engine for the public API.
Consumed by api.js
*/

import mapValues from 'lodash/mapValues'
import values from 'lodash/values'

import lib from '../games/logic'

import games from '../games/temp/ALLGAMES'

const endgameactions = {win:1,lose:1,draw:1}

let nextSessionId = 1

let engine = {
    /*
    Used in API.makeSessionAction and API.inflateFromSave
    Mutates the given session according to the given action and returns it.
    */
    makeSessionAction(session,action){
         // removing an existing mark, going back in time
        if (session.markTimeStamps[action] && !session.turn.links[session.step.stepid][action]){
            console.log("Going back to",session.markTimeStamps[action])
            session.step = session.turn.steps[session.markTimeStamps[action]]
            delete session.markTimeStamps[action] // not really necessary
        }
        // undoing last action (stored in session)
        else if (action==='undo' || action.substr(0,5) === 'undo ') {
            let undo = session.undo.pop()
            session.step = session.turn.steps[undo.backTo]
        }
        // ending the game!
        else if (endgameactions[action]){
            //  TODO - finish this functionality
        }
        // ending the turn, creating a new one
        else if (action==='endturn'){
            session.save = session.save.concat( engine.calculateSave(session.turn,session.step) )
            session.turn = engine.hydrateTurn(session.game, session.turn.next[session.step.stepid])
            session.step = session.turn.steps.root
            session.markTimeStamps = {}
            session.undo = []
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
    },
    /*
    Used in API.startGameSession and API.inflateFromSave
    Creates a new session and returns it.
    Pure.
    */
    newSession(gameId,plr1,plr2){
        let game = games[gameId];
        let turn = game.newGame()
        turn = engine.hydrateTurn(game,turn)
        let session = {
            game: game,
            turn: turn,
            step: turn.steps.root,
            save: [],
            markTimeStamps: {},
            undo: [],
            players: [plr1,plr2],
            id: 's'+(nextSessionId++)
        };
        return session;
    },
    /*
    Used in .makeSessionAction when ending a turn.
    Calculates array of choices leading up to the given step in the given turn.
    Returns that array.
    Pure.
    */
    calculateSave(turn,step){
        let ret = []
        let id='root'
        let followActions=step.path.concat('endturn');
        while(followActions.length){
            let action = followActions.shift()
            let available = Object.keys(turn.links[id]).sort()
            let index = available.indexOf(action)
            if (index === -1){
                throw "Didnt find action!" // TODO - make it work for win/lose/draw
            }
            if (available.length>1){ // We only store the step if we had choices, otherwise it is implied
                ret.push(index)
            }
            id += '-'+action
        }
        return ret
    },
    /*
    Used in API.startGameSession and API.makeSessionAction.
    Returns an object used to draw board in an app.
    Pure.
    */
    getSessionUI(session, step){
        let {game,turn,undo,markTimeStamps} = session
        let links = Object.keys(turn.links[step.stepid]).reduce((mem,action)=> {
            if (endgameactions[action]||action=='endturn'||action==='next'){
                mem.system.push(action)
            } else if (game.commands[action]){
                mem.commands.push(action)
            } else {
                mem.potentialMarks.push({
                    coords: lib.pos2coords(action),
                    pos: action
                })
            }
            return mem
        },{potentialMarks:[],commands:[],system:undo.length?[ 'undo '+undo[undo.length-1].actionName ]:[]})
        let instrfuncname = step.name+turn.player+'instruction'
        let instruction = game[step.name+turn.player+'instruction'](step)
        return Object.assign({
            activeMarks: values(step.MARKS).map(pos=>({pos, coords: lib.pos2coords(pos)})),
            units: mapValues(step.UNITDATA,u=> Object.assign({},u,{
                group: game.graphics.icons[u.group],
                coords: lib.pos2coords(u.pos),
                spawnCoords: u.from ? lib.pos2coords(u.from) : undefined
            })),
            players: session.players,
            playing: turn.player,
            board: game.board,
            instruction: instruction,
            sessionId: session.id,
            turnStart: session.step.stepid === 'root',
            gameId: game.id
        }, links)
    },
    /*
    Used in .hydrateTurn, and will recursively call itself
    Mutates the given turn with links for the given step
    Will create linked steps if they didn't exist and hydrate those,
    but only keep them around if they lead to turn end.
    Returns whether or not the given step can lead to turn end
    */
    hydrateStep(game,turn,step){
        let steps = turn.steps
        let stepid = step.stepid
        let links = turn.links
        let steplinks = links[stepid]
        let checkActions = Object.keys(steplinks)
        let canend = false
        while(checkActions.length){
            let action = checkActions.pop()
            let func = steplinks[action]
            if (endgameactions[action]){
                turn.ends[action].push(stepid)
                canend = true
            } else if (action === 'endturn'){
                let newturn = engine.tryToReachTurnEnd(game, game[func](turn,step))
                if (newturn.canend){
                    turn.next[stepid] = newturn
                } else {
                    steplinks.win = newturn.blockedby || 'starvation' // TODO - gamespec logic?
                    turn.ends.win.push(stepid)
                    delete steplinks.endturn
                }
                canend = true
            } else {
                let nextstepid = stepid + '-' + action
                let nextstep = steps[nextstepid] || (steps[nextstepid] = game[func](turn,step,action))
                if (engine.hydrateStep(game,turn,nextstep)){
                    canend = true
                } else {
                    delete steplinks[action] // TODO - only this is actually needed
                    delete steps[nextstepid]
                    delete links[nextstepid]
                }
            }
        }
        return canend
    },
    /*
    Used in .inflateFromSave, .startGameSession and .makeSessionAction (when ending turn)
    Mutates the given turn with all steps that can lead to turn end, and links for those steps
    Returns the mutated turn
    */
    hydrateTurn(game,turn){ // TODO - forcefully flag if we're AI analyzing! or just always do it :P
        turn.ends = {
            win: [],
            draw: [],
            lose: [],
        }
        turn.next = {}
        engine.hydrateStep(game,turn,turn.steps.root)
        return turn;
    },
    /*
    Used in .hydrateStep for links leading to a new turn, to see if that turn is a dead end
    Mutates the given turn with .canend boolean, and returns same boolean
    */
    tryToReachTurnEnd(game,turn){
        let {steps,links} = turn
        let checkSteps = [steps.root]
        let canalwaysend = game.canalwaysend || {}
        while(!turn.canend && checkSteps.length){
            let step = checkSteps.pop()
            let stepid = step.stepid
            let steplinks = links[stepid]
            let checkActions = Object.keys(steplinks)
            while(!turn.canend && checkActions.length){
                let action = checkActions.pop()
                let func = steplinks[action]
                if (endgameactions[action] || action === 'endturn' || canalwaysend[func]){
                    turn.canend = true
                } else {
                    let nextstepid = stepid + '-' + action
                    checkSteps.push( steps[nextstepid] || (steps[nextstepid] = game[func](turn,step,action)) )
                }
            }
        }
        return turn;
    },
    /*
    WIP?
    Returns array of UI objects for given turn, with adjusted marks
    */
    compressedHistoryForTurn(session,turn){
        return session.step.path.reduce((mem,action)=>{
            mem.id += '-' + action
            if (session.game.commands[action]){
                let UI = engine.getSessionUI(session, turn.steps[mem.id]);
                UI.potentialMarks = {};
                UI.activeMarks = mem.marks.map(pos=>({pos, coords: lib.pos2coords(pos)}));
                UI.description = action + '(' + mem.marks.join(',') + ')';
                mem.UIs.push(UI);
                mem.marks = [];
            } else {
                mem.marks.push(action);
            }
            return mem;
        },{marks:[], UIs: [], id: 'root'}).UIs;
    }
}

export default engine
