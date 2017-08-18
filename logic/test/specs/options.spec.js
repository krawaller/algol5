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
  ]],
  ["Basic Transet script", "transet", [
    [[], ["a1", "b1", "c1", "d1", "e1"]],
    [["c1"], ["b2", "c2", "d2"]],
    [["c2","move","endturn"], ["a5", "b5", "c5", "d5", "e5"]],
    [["b5"], ["a4", "c4"]],
    [["c4","move","endturn"], ["a1", "b1", "c2", "d1", "e1"]],
    [["c2"], ["a1", "b1", "b3", "c3", "d1", "d3", "e1"]],
    [["d1"], ["c1", "d2"]],
    [["d2","swap","endturn"], ["a5", "c4", "c5", "d5", "e5"]],
    [["c4"], ["a5", "b3", "c5", "d3"]],
    [["d3","move","endturn"], ["a1", "b1", "c1", "d2", "e1"]],
    [["d2"], ["a1", "b1", "c1", "c3", "d3", "e1", "e3"]],
    [["d3","b5","move","endturn"], ["a5", "b5", "c5", "d5", "e5"]]
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
