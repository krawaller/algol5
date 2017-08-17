import algol from '../../dist/algol';
import games from '../../dist/gamelibrary';
import _ from 'lodash';

function makeRandomMovesInGame(gameId, n){
  let UI = algol.startGameSession(gameId, 'plr1', 'plr2');
  let turncount = 0;
  do {
    let available = UI.commands.concat(UI.potentialMarks.map(m => m.pos)).concat(UI.system.filter(c => c === 'endturn'));
    let cmnd = _.shuffle(available)[0];
    if (cmnd === 'endturn'){
      turncount++;
    }
    UI = algol.makeSessionAction(UI.sessionId, cmnd);
  } while (turncount < n);
}

const TURNS = 5;

describe(`doing ${TURNS} random moves`, ()=> {
  Object.keys(games).map(gameKey => {
    let game = games[gameKey];
    it(`works in game ${game.id}`, ()=> {
      expect(()=> {
        makeRandomMovesInGame(game.id, TURNS);
      }).not.toThrow();
    });
  });
});
