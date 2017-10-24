/*
This test loops all games and makes random moves for NUMBEROFTURNS turns,
making sure no error is thrown. If an error is thrown, the path to the
state is logged to the console before the error is thrown.
*/

const NUMBEROFTURNS = 8;

import algol from '../../src';
import optionsInUI from '../../src/various/optionsinui';
import makePlayer from '../makeplayer';

import * as test from "tape";

import * as shuffle from 'lodash/shuffle';
import * as omit from 'lodash/omit';


function makeRandomMovesInGame(gameId, n){
  let UI = algol.startGame(gameId, makePlayer(1), makePlayer(2));
  let turncount = 0;
  let path = [];
  do {
    let available = optionsInUI(UI,true);
    let cmnd = shuffle(available)[0];
    if (cmnd === 'endturn'){
      turncount++;
    }
    path.push(cmnd);
    try {
      UI = algol.performAction(UI.sessionId, cmnd);
    } catch(e){
      console.log(`Random moves in game ${gameId} bombed! Path`, path);
      throw e;
    }
  } while (turncount < n && !UI.endedBy);
  return UI;
}

let games = algol.gameLibrary();

Object.keys(omit(games,['_test'])).forEach(gameKey => {
  let game = games[gameKey];
  test(`Doing random moves in ${game.id}`, t => {
    let UI;
    t.plan(2);
    t.doesNotThrow(()=> {
      UI = makeRandomMovesInGame(game.id, NUMBEROFTURNS);
    }, `No error is thrown`);
    let restored = algol.inflateFromSave(UI.save);
    console.log("Save str length", UI.save.length);
    t.deepEqual( omit(restored,['sessionId']), omit(UI,['sessionId']), `Save restores to same state` );
  });
});
