

let endgameactions = {win:1,lose:1,draw:1}

let play = {
    hydrateTurn: (game,turn)=> {
        let {steps,links} = turn
        let checkSteps = [steps.root]
        turn.ends = {
            win: [],
            draw: [],
            lose: [],
        }
        turn.next = {

        }
        while(checkSteps.length){
            let step = checkSteps.pop()
            let stepid = step.stepid
            let steplinks = links[stepid]
            let checkActions = Object.keys(steplinks)
            while(checkActions.length){
                let action = checkActions.pop()
                let func = links[action]
                if (endgameactions[action]){
                    turn.ends[action].push(stepid)
                } else if (action === 'endturn'){
                    let newturn = play.tryToReachTurnEnd(game, game[func]())
                    if (newturn.canend){
                        turn.next[stepid] = newturn
                    } else {
                        steplinks.win = newturn.blockedby || 'starvation' // TODO - gamespec logic?
                        turn.ends.win.push(stepid)
                        delete steplinks.endturn
                    }
                } else {
                    let nextstepid = stepid + '_' + action
                    checkSteps.push( steps[nextstepid] || (steps[nextstepid] = game[func](turn,step,action)) )
                }
            }
        }
    },
    tryToReachTurnEnd: (game,turn)=> {
        let {steps,links} = turn
        let checkSteps = [steps.root]
        let canalwaysend = game.canalwaysend || {}
        while(!turn.canend && checkSteps.length){
            let step = checkSteps.pop()
            let stepid = step.stepid
            let checkActions = Object.keys(links[stepid])
            while(!turn.canend && checkActions.length){
                let action = checkActions.pop()
                let func = links[action]
                if (endgameactions[action] || action === 'endturn' || canalwaysend[func]){
                    turn.canend = true
                } else {
                    let nextstepid = stepid + '_' + action
                    checkSteps.push( steps[nextstepid] || (steps[nextstepid] = game[func](turn,step,action)) )
                }
            }
        }
    }
}

export default play
