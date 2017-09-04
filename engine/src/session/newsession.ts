/*
Used in API.startGameSession and API.inflateFromSave
Creates a new session and returns it.
Pure.
*/

import hydrateTurn from '../hydration/hydrateturn';
import {games} from '../../gamesproxy';
import {generateBattleId} from '../id/battleid';

let nextSessionId = 1;

export default function newSession(gameId,plr1,plr2,battleId){
    let game = games[gameId];
    let turn = game.newGame()
    turn = hydrateTurn(game,turn)
    let session = {
        gameId: gameId,
        game: game,
        turn: turn,
        step: turn.steps.root,
        savedIndexes: [],
        markTimeStamps: {},
        undo: [],
        players: [plr1,plr2],
        id: 's'+(nextSessionId++),
        battleId: battleId || generateBattleId()
    };
    return session;
}