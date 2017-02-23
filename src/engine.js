import mapValues from 'lodash/object/mapValues'
import reduce from 'lodash/collection/reduce'
import values from 'lodash/object/values'

import lib from './games/logic'

import games from './games/temp/ALLGAMES'

let endgameactions = {win:1,lose:1,draw:1}

let next = 1
function newSessionId(){
    return 's'+(next++);
}

let sessions = {}

let engine = {
    /*
    Public API function, called from app.
    */
    startGameSession(gameId,plr1,plr2){
        console.log("NEW GAME SESSION",gameId)
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
            id: newSessionId()
        }
        sessions[session.id] = session;
        return engine.getSessionUI(session);
    },
    /*
    Public API function, called from app.
    */
    makeSessionAction(sessionId,action){
        let session = sessions[sessionId];
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
            session.step = session.turn.steps[session.step.stepid+'-'+action]
        }
        return engine.getSessionUI(session)
    },
    /*
    Public API function. Returns array of best moves according to named brain.
    */
    findBestOption(sessionId,brain){
        let {game,turn} = sessions[sessionId]
        let func = game['brain_'+brain+'_'+turn.player],
            winners = [], highscore = -1000000
        if (turn.ends.win.length){
            winners = turn.ends.win.map(winId => turn.steps[winId].path);
        } else {
            for(var stepid in turn.next){
                var stepscore = func(turn.steps[stepid])
                if (stepscore > highscore){
                    winners = [turn.steps[stepid].path]
                    highscore = stepscore
                } else if (stepscore === highscore) {
                    winners.push(turn.steps[stepid].path)
                }
            }
        }
        return winners;
    },
    /*
    Inner utility function used in .makeSessionAction when ending a turn.
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
            if (available.length>1){
                ret.push(index)
            }
            id += '-'+action
        }
        return ret
    },
    /*
    Used in .startGameSession and .makeSessionAction. Returns an object used to draw board in an app.
    */
    getSessionUI(session){
        let {game,turn,step,undo,markTimeStamps} = session
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
    used in .hydrateTurn
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
    Will create links for current turn for all steps that can lead to turn end
    */
    hydrateTurn(game,turn){
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
    Inner utility, used in .hydrateStep
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
    Not in use yet.
    */
    inflateFromSave(game,turnnbr,save){
        let turn = game.newGame()
        turn = engine.hydrateTurn(game,turn)
        let moves = save
        let stepid = 'root'
        while(turn.turn < turnnbr){
            let action, available = Object.keys(turn.links[stepid]).sort()
            if (available.length === 1){
                action = available[0]
            } else if (available.length > 1){
                if (!moves.length){ throw "Many available but no save index left!" }
                action = available[moves.shift()]
            } else {
                throw "No available actions!"
            }
            let func = turn.links[stepid][action]
            if (action === 'endturn'){
                turn = engine.hydrateTurn(game,turn.next[stepid])
                stepid = 'root'
            } else {
                stepid = stepid+'-'+[action]
            } // TODO endgame funcs too!
            console.log(action,available.length === 1)
        }
        return turn // TODO return session instead?
    }
}

export default engine
