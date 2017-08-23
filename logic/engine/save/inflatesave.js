/*
Not in use yet.
a save is = [turnnbr,moves]
*/
export default function inflateFromSave(gameId,save){
    let [turnnbr,moves] = save
    let game = games[gameId]
    let turn = hydrateTurn(game, game.newGame())
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
            turn = hydrateTurn(game,turn.next[stepid])
            stepid = 'root'
        } else {
            stepid = stepid+'-'+[action]
        } // TODO endgame funcs too!
        console.log(action,available.length === 1)
    }
    return turn // TODO return session instead? Rather, session id? Or UI, even?
}