/*
Returns array of best moves for finishing current turn according to named brain.
*/
export default function findBestTurnEnd(sessionId,brain){
    let {game,turn} = sessions[sessionId]
    let func = game['brain_'+brain+'_'+turn.player],
        winners = [], highscore = -1000000;
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
}