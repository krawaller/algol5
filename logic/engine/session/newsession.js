/*
Used in API.startGameSession and API.inflateFromSave
Creates a new session and returns it.
Pure.
*/

import hydrateTurn from '../hydration/hydrateturn';
import games from '../../games/temp/ALLGAMES';

let nextSessionId = 1;

export default function newSession(gameId,plr1,plr2){
    let game = games[gameId];
    let turn = game.newGame()
    turn = hydrateTurn(game,turn)
    let session = {
        game: game,
        turn: turn,
        step: turn.steps.root,
        savedIndexes: [],
        markTimeStamps: {},
        undo: [],
        players: [plr1,plr2],
        id: 's'+(nextSessionId++)
    };
    return session;
}