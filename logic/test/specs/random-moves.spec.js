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
      console.log('Random moves bombed! Path', path);
      throw e;
    }
  } while (turncount < n && path[path.length-1] !== 'win'); // TODO - check gamestatus in UI once implemented
}

const TURNS = 10;

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
