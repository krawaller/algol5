/*
Used in API.startGameSession and API.makeSessionAction.
Returns an object used to draw board in an app.
Pure.
*/

import mapValues from 'lodash/mapValues'
import values from 'lodash/values'

import isEndGameCommand from '../various/isgameendcmnd';
import { pos2coords } from '../../gamesproxy';

export default function getSessionUI(session, step){
    let {game,turn,undo,markTimeStamps} = session;
    let UI = {
        activeMarks: values(step.MARKS).map(pos=>({pos, coords: pos2coords(pos)})),
        units: mapValues(step.UNITDATA,u=> Object.assign({},u,{
            group: game.graphics.icons[u.group],
            coords: pos2coords(u.pos),
            spawnCoords: u.from ? pos2coords(u.from) : undefined
        })),
        players: session.players,
        playing: turn.player,
        board: game.board,
        sessionId: session.id,
        turnStart: session.step.stepid === 'root',
        gameId: game.id,
        turn: turn.turn,
        save: session.saveString,
        potentialMarks: [],
        commands: [],
        system: []
    };
    if (!session.endedBy){
        let links = Object.keys(turn.links[step.stepid]).reduce((mem,action)=> {
            if (isEndGameCommand(action)||action=='endturn'||action==='next'){
                mem.system.push(action)
            } else if (game.commands[action]){
                mem.commands.push(action)
            } else {
                mem.potentialMarks.push({
                    coords: pos2coords(action),
                    pos: action
                })
            }
            return mem
        },{potentialMarks:[],commands:[],system:undo.length?[ 'undo '+undo[undo.length-1].actionName ]:[]});
        Object.assign(UI, links, {
            instruction: game[step.name+turn.player+'instruction'](step)
        });
    } else {
        UI.endedBy = session.endedBy;
        UI.winner = session.winner;
    }
    return UI;
}