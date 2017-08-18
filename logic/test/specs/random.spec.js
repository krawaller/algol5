/*
This test loops all games and makes random moves for NUMBEROFTURNS turns,
making sure no error is thrown. If an error is thrown, the path to the
state is logged to the console before the error is thrown.
*/

const NUMBEROFTURNS = 10;

import algol from '../../dist/algol';
import games from '../../dist/gamelibrary';
import _ from 'lodash';

function makeRandomMovesInGame(gameId, n){
  let UI = algol.startGameSession(gameId, 'plr1', 'plr2');
  let turncount = 0;
  let path = [];
  do {
    let available = UI.commands.concat(UI.potentialMarks.map(m => m.pos)).concat(UI.system.filter(c => c.substr(0,4) !== 'undo'));
    let cmnd = _.shuffle(available)[0];
    if (cmnd === 'endturn'){
      turncount++;
    }
    path.push(cmnd);
    try {
      UI = algol.makeSessionAction(UI.sessionId, cmnd);
    } catch(e){
      console.log(`Random moves in game ${gameId} bombed! Path`, path);
      throw e;
    }
  } while (turncount < n && path[path.length-1] !== 'win'); // TODO - check gamestatus in UI once implemented
}

describe(`doing ${NUMBEROFTURNS} random moves`, ()=> {
  Object.keys(games).forEach(gameKey => {
    let game = games[gameKey];
    it(`works in game ${game.id}`, ()=> {
      expect(()=> {
        makeRandomMovesInGame(game.id, NUMBEROFTURNS);
      }).not.toThrow();
    });
  });
});
