import mapValues from 'lodash/object/mapValues'

let endgameactions = {win:1,lose:1,draw:1}

let play = {
    inflateFromSave: (game,turnnbr,save)=> {
        let turn = game.newGame()
        turn = play.hydrateTurn(game,turn)
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
                turn = play.hydrateTurn(game,turn.next[stepid])
                stepid = 'root'
            } else {
                stepid = stepid+'-'+[action]
            } // TODO endgame funcs too!
            console.log(action,available.length === 1)
        }
        return turn
    },
    startGameSession: (game)=> {
        let turn = game.newGame()
        turn = play.hydrateTurn(game,turn)
        let session = {
            game: game,
            turn: turn,
            step: turn.steps.root,
            save: [],
            markTimeStamps: {},
            undo: []
        }
        session.UI = play.getSessionUI(session)
        return session;
    },
    makeSessionAction: (session,action)=> {
        if (session.markTimeStamps[action]){ // removing a mark
            session.step = session.turn.steps[session.markTimeStamps[action]]
            delete session.markTimeStamps[action] // not really necessary
            session.UI = play.getSessionUI(session)
        } else if (action==='undo') {
            let gobackto = session.undo.pop()
            session.step = session.turn.steps[gobackto]
            session.UI = play.getSessionUI(session)
        } else if (endgameactions[action]){
            // TODO - end the session!
        } else if (action==='endturn'){
            session.save = session.save.concat( play.calculateSave(session.turn,session.step) )
            session.turn = play.hydrateTurn(session.game, session.turn.next[session.step.stepid])
            session.step = session.turn.steps.root
            session.markTimeStamps = {}
            session.undo = []
            session.UI = play.getSessionUI(session)
        } else {
            if (!session.game.commands[action]){
                session.markTimeStamps[action] = session.step.stepid
            } else {
                session.undo.push(session.step.stepid)
            }
            session.step = session.turn.steps[session.step.stepid+'-'+action]
            session.UI = play.getSessionUI(session)
        }
        console.log("SESS",session)
        return session
    },
    calculateSave: (turn,step)=> {
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
    getSessionUI: ({game,turn,step,undo,markTimeStamps})=> Object.keys(turn.links[step.stepid]).reduce((mem,action)=> {
        if (endgameactions[action]||action=='endturn'||action==='next'){
            mem.system.push(action)
        } else if (game.commands[action]){
            mem.commands.push(action)
        } else {
            mem.marks.push(action)
        }
        return mem
    },{marks:[],commands:[],system:undo.length?['undo']:[],removeMarks:Object.keys(step.MARKS).reduce((mem,markname)=>{
        let pos = step.MARKS[markname]
        mem[pos] = markTimeStamps[pos]
        return mem
    },{})}),
    hydrateStep: (game,turn,step)=> {
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
                let newturn = play.tryToReachTurnEnd(game, game[func](turn,step))
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
                if (play.hydrateStep(game,turn,nextstep)){
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
    hydrateTurn: (game,turn)=> {
        turn.ends = {
            win: [],
            draw: [],
            lose: [],
        }
        turn.next = {}
        play.hydrateStep(game,turn,turn.steps.root)
        return turn;
    },
    tryToReachTurnEnd: (game,turn)=> {
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
    }
}

export default play
