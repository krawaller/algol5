/*
This test executes scipted steps, for each making sure that the available options
in the resulting UI is exactly what is expected (excluding undos and removeMarks).
*/

import algol from '../../dist/algol';
import games from '../../dist/gamelibrary';

const scripts = [
  ["Basic Kickrun script", "kickrun", [
    [["c1"], ["c2", "d1"]],
    [["c2","move","endturn"], ["c5", "d5", "e3", "e4"]],
    [["d5"], ["b3", "c4", "d1", "d2", "d3", "d4"]],
    [["d1", "move", "endturn"], ["a2", "a3", "b1", "c2"]],
    [["c2"], ["c3", "d1", "d2"]],
    [["d1","move","endturn"], ["c5", "e3", "e4", "e5"]],
    [["e4"], ["a4", "b4", "c2", "c4", "d3", "d4"]]
  ]]
];

describe('Following scripted moves', ()=> {
  scripts.forEach(([name, gameId,lines], n) => it(`works for ${name}`, () => {
    let UI = algol.startGameSession(gameId, 'plr1', 'plr2');
    lines.forEach(([cmnds, expectedUI]) => {
      cmnds.forEach(cmnd => {
        UI = algol.makeSessionAction(UI.sessionId, cmnd);
      });
      const available = UI.commands.concat(UI.potentialMarks.map(m => m.pos)).concat(UI.system.filter(c => c.substr(0,4) !== 'undo')).sort();
      expect(available).toEqual(expectedUI);
    });
  }));
});
