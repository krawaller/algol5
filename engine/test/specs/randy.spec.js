/*
This test makes sure the AI Randy works ok, by making him play through a full game
of Semaphor versus himself. This game always ends with a winner, which means we
also test if AI:s can finish games correctly.
*/

import algol from '../../engine';

describe(`the Randy AI`, ()=> {
  it(`plays Semaphor against itself to the end`, () => {
    let UI = algol.startGame('semaphor', 'plr1', 'plr2');
    while (!UI.endedBy) {
      let cmnds = algol.findBestOption(UI.sessionId, 'Randy');
      cmnds.forEach(cmnd => {
        UI = algol.performAction(UI.sessionId, cmnd);
      });
    }
    expect(UI.endedBy).toBe('madeline');
  });
});
