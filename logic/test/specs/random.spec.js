/*
This test loops all games and makes random moves for NUMBEROFTURNS turns,
making sure no error is thrown. If an error is thrown, the path to the
state is logged to the console before the error is thrown.
*/

const NUMBEROFTURNS = 8;

import algol from '../../dist/algol';
import games from '../../dist/gamelibrary';
import shuffle from 'lodash/shuffle';
import omit from 'lodash/omit';
import optionsInUI from '../../engine/various/optionsinui';

function makeRandomMovesInGame(gameId, n){
  let UI = algol.startGame(gameId, 'plr1', 'plr2');
  let turncount = 0;
  let path = [];
  do {
    let available = optionsInUI(UI);
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
  } while (turncount < n && path[path.length-1] !== 'win'); // TODO - check gamestatus in UI once implemented
  return UI;
}

describe(`doing ${NUMBEROFTURNS} random moves`, ()=> {
  Object.keys(omit(games,['_test'])).forEach(gameKey => {
    let game = games[gameKey];
    describe(`in game ${game.id}`, ()=> {
      let UI;
      it(`doesnt throw and can be restored`, ()=> {
        expect(()=> {
          UI = makeRandomMovesInGame(game.id, NUMBEROFTURNS);
        }).not.toThrow();
        let restored = algol.inflateFromSave(UI.save);
        expect(omit(restored,['sessionId'])).toEqual(omit(UI,['sessionId']));
      });
    });
  });
});
