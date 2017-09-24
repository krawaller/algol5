/*
This test makes sure the AI framework works ok by playing game-specific AI:s
*/

import algol from '../../src';
import * as test from 'tape';
import makePlayer from '../makeplayer';

test(`The Steve AI plays Murus Gallicus against itself to the end`, t => {
  t.plan(1);
  let UI = algol.startGame('murusgallicus', makePlayer(1), makePlayer(2));
  while (!UI.endedBy) {
    let cmnds = algol.findBestOption(UI.sessionId, 'Steve');
    cmnds.forEach(cmnd => {
      UI = algol.performAction(UI.sessionId, cmnd);
    });
  }
  t.ok(UI.endedBy, 'game ended correctly');
});
