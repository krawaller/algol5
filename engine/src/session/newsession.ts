/*
Used in API.startGameSession and API.inflateFromSave
Creates a new session and returns it.
Pure.
*/

import hydrateTurn from '../hydration/hydrateturn';
import {games} from '../../gamesproxy';
import {generateBattleId} from '../id/battleid';

import { Session, Player } from '../types';

let nextSessionId = 1;

export default function newSession(gameId: string, plr1: Player, plr2: Player, battleId: string): Session {
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
    players: [plr1, plr2] as [Player,Player],
    id: 's'+(nextSessionId++),
    battleId: battleId || generateBattleId()
  };
  return session;
}