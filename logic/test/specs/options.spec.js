/*
This test executes scipted steps, for each making sure that the available options
in the resulting UI is exactly what is expected (excluding undos and removeMarks).
*/

import algol from '../../dist/algol';
import games from '../../dist/gamelibrary';

const scripts = [
  ["Basic Amazon script", "amazon", [
    [["d10"],["a10", "b10", "b8", "c10", "c9", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "e10", "e9", "f10", "f8", "g7", "h6", "i5"]],
    [["d4","move"],["a1", "b2", "b4", "b6", "c3", "c4", "c5", "d10", "d2", "d3", "d5", "d6", "d7", "d8", "d9", "e3", "e4", "e5", "f2", "f4", "f6", "g4", "g7", "h4", "h8", "i4", "i9", "j10"]],
    [["g4","fire","endturn","g1"],["e1", "e3", "f1", "f2", "g2", "g3", "h1", "h2", "i1", "i3", "j1"]],
    [["f2","move"],["a2", "b2", "c2", "d2", "e1", "e2", "e3", "f1", "f10", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "g1", "g2", "g3", "h2", "h4", "i2", "i5", "j2", "j6"]],
    [["f4","fire","endturn","d4"],["a1", "b2", "b4", "b6", "c3", "c4", "c5", "d10", "d2", "d3", "d5", "d6", "d7", "d8", "d9", "e3", "e4", "e5", "f6", "g7", "h8", "i9", "j10"]],
    [["d7","move"],["a10", "b5", "b7", "b9", "c6", "c7", "c8", "d10", "d2", "d3", "d4", "d5", "d6", "d8", "d9", "e6", "e7", "e8", "f5", "f7", "f9", "g7", "h7", "i7"]]
  ]],
  ["Basic Aries script", "aries", [
    [[],["a4", "b4", "c4", "d1", "d2", "d3", "d4"]],
    [["d4"],["d5", "d6", "d7", "d8", "e4", "f4", "g4", "h4"]],
    [["g4","move","endturn"],["e5", "e6", "e7", "e8", "f5", "g5", "h5"]],
    [["g5","g4","move","endturn"],["a4", "b4", "c4", "d1", "d2", "d3", "g3"]],
    [["c4"],["c5", "c6", "c7", "c8", "d4", "e4", "f4", "g4"]],
    [["g4","move","endturn"],["e5", "e6", "e7", "e8", "f5", "g6", "h4", "h5"]],
  ]],
  ["Basic Atrium script", "atrium", [
    [[],["a2", "a3", "c5", "d1", "d5", "e2"]],
    [["e2"],["d2", "d3", "e1"]],
    [["d3","move","endturn"],["a4", "b1", "b5", "c1", "e3", "e4"]],
    [["e3"],["d2", "d4", "e2"]],
    [["d2","move","endturn"],["a2", "a3", "c5", "d1", "d3", "d5"]]
  ]],
  ["Basic Castle script", "castle", [
    [[],["c8", "f1", "h2", "h6", "l2", "l6", "n1", "q8"]],
    [["c8"],["b8", "c2", "c3", "c4", "c5", "c6", "c7", "c9", "d8", "e8", "f8", "g8", "h8", "i8"]],
    [["c9","move","endturn"],["c12", "f19", "h14", "h18", "l14", "l18", "n19", "q12"]],
    [["q12"],["k12", "l12", "m12", "n12", "o12", "p12", "q11", "q13", "q14", "q15", "q16", "q17", "q18", "r12"]],
    [["q11","move","endturn"],["c9", "f1", "h2", "h6", "l2", "l6", "n1", "q8"]],
    [["c9"],["a9", "b9", "c10", "c11", "c8", "d9", "e9", "f9", "g9", "h9", "i9", "j9", "k9", "l9", "m9", "n9", "o9", "p9", "q9", "r9", "s9"]]
  ]],
  ["Basic Coffee script", "coffee", [
    [[],["a1", "a2", "a3", "a4", "a5", "b1", "b2", "b3", "b4", "b5", "c1", "c2", "c3", "c4", "c5", "d1", "d2", "d3", "d4", "d5", "e1", "e2", "e3", "e4", "e5"]],
    [["c3"],["downhill", "horisontal", "uphill", "vertical"]],
    [["downhill","endturn"],["a5", "b4", "d2", "e1"]],
    [["b4"],["horisontal", "uphill", "vertical"]],
    [["uphill","endturn"],["a3", "c5"]],
    [["c5","vertical","endturn"],["c1", "c2", "c4"]],
    [["c2"],["downhill", "horisontal", "uphill"]],
  ]],
  ["Basic Daggers script", "daggers", [
    [[],["c7", "d7", "d8", "e7", "e8", "f7"]],
    [["c7"],["a5", "b6", "b8", "c4", "c5", "c6", "c8", "d6", "e5", "f4", "g3", "h2"]],
    [["g3","move","endturn"],["b2", "c1", "c2", "c3", "d2", "e2", "f1", "f2", "f3", "g2"]],
    [["f2"],["e1", "e3", "g1", "g3"]],
    [["e3","move","endturn"],["d7", "d8", "e7", "e8", "f7", "g3"]],
    [["g3"],["e1", "f2", "f4", "g4", "h2", "h4"]],
    [["f2","move","endturn"],["b2", "c1", "c2", "c3", "d2", "e2", "e3", "f1", "f3", "g2"]],
    [["f1"],["e1", "f2", "g1"]]
  ]],
  ["Basic Gogol script", "gogol", [
    [[],["a3", "a4", "a5", "a6", "a7", "b3", "b4", "b5", "b6", "b7", "c3", "c4", "c5", "c6", "c7", "d3", "d4", "d5", "d6", "d7", "e3", "e4", "e5", "e6", "e7", "f3", "f4", "f5", "f6", "f7", "g3", "g4", "g5", "g6", "g7", "h3", "h4", "h5", "h6", "h7"]],
    [["g4","deploy","endturn"],["a2", "a3", "a4", "a5", "a6", "b2", "b3", "b4", "b5", "b6", "c2", "c3", "c4", "c5", "c6", "d2", "d3", "d4", "d5", "d6", "e2", "e3", "e4", "e5", "e6", "f2", "f3", "f4", "f5", "f6", "g2", "g3", "g5", "g6", "h2", "h3", "h4", "h5", "h6"]],
    [["f4","deploy","endturn"],["a1", "b1", "c1", "d1", "e1", "f1", "g1", "g4", "h1"]],
    [["g4"],["d7", "e4", "e6", "f3", "f5", "g3", "g5", "g6", "g7", "h3", "h4", "h5"]],
    [["d7","move","endturn"],["a8", "b8", "c8", "d8", "e8", "f4", "f8", "g8", "h8"]],
    [["e8"],["a2", "a3", "a4", "a5", "a6", "a7", "b2", "b3", "b4", "b5", "b6", "b7", "c2", "c3", "c4", "c5", "c6", "c7", "d2", "d3", "d4", "d5", "d6", "e2", "e3", "e4", "e5", "e6", "e7", "f2", "f3", "f5", "f6", "f7", "g2", "g3", "g4", "g5", "g6", "g7", "h2", "h3", "h4", "h5", "h6", "h7"]],
    [["d6","move","endturn"],["a1", "b1", "c1", "d1", "d7", "e1", "f1", "g1", "h1"]],
    [["d7"],["a4", "a7", "b5", "b7", "c6", "c7", "d5", "e6", "e7", "e8", "f5", "f7", "g4", "g7", "h3", "h7"]],
    [["d5","jump","endturn"],["a8", "b8", "c8", "d8", "f4", "f8", "g8", "h8"]]
  ]],
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
  ]],
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
