

let endgameactions = {win:1,lose:1,draw:1}

let play = {
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
                    turn.next[stepid] = newturn // TODO - save newturn too?
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
                    delete steplinks[action]
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
