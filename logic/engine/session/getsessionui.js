/*
Used in API.startGameSession and API.makeSessionAction.
Returns an object used to draw board in an app.
Pure.
*/

import mapValues from 'lodash/mapValues'
import values from 'lodash/values'

import isEndGameCommand from '../various/isgameendcmnd';
import lib from '../../games/logic';

export default function getSessionUI(session, step){
    let {game,turn,undo,markTimeStamps} = session
    let links = Object.keys(turn.links[step.stepid]).reduce((mem,action)=> {
        if (isEndGameCommand(action)||action=='endturn'||action==='next'){
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
        gameId: game.id,
        turn: turn.turn,
        save: session.saveString
    }, links)
}