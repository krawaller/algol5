/*
This test makes sure the AI Randy works ok, by making him play through a full game
of Semaphor versus himself. This game always ends with a winner, which means we
also test if AI:s can finish games correctly.
*/

import algol from '../../src';
import * as test from 'tape';
import makePlayer from '../makeplayer';

test(`The Randy AI plays Semaphor against itself to the end`, t => {
  t.plan(1);
  let UI = algol.startGame('semaphor', makePlayer(1), makePlayer(2));
  while (!UI.endedBy) {
    let cmnds = algol.findBestOption(UI.sessionId, 'Randy');
    cmnds.forEach(cmnd => {
      UI = algol.performAction(UI.sessionId, cmnd);
    });
  }
  t.equal(UI.endedBy, 'madeline', 'game ended correctly');
});
