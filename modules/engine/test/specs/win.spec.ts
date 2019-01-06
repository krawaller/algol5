/*
This test makes sure that executing the win command correctly ends a game.
*/

import algol from '../../src';
import * as omit from 'lodash/omit';

import makePlayer from '../makeplayer';

import optionsInUI from '../../src/various/optionsinui';

import * as test from 'tape';

const path = [
  "b3","c3","move","endturn",
  "c2","b2","move","endturn",
  "a4","b3","move","endturn",
  "d2","d3","move","endturn",
  "c3","c2","move","endturn",
  "d1","d2","move","endturn",
  "b3","c3","move","endturn",
  "b2","b3","move","endturn",
  "c2","d1","move","win"
];

test(`The win mechanics`, t => {
  t.plan(4);
  let UI = algol.startGame('krieg', makePlayer(1), makePlayer(2));
  let remaining = path.slice(0);
  while(remaining.length){
    let action = remaining.shift();
    UI = algol.performAction(UI.sessionId, action);
  }
  t.deepEqual(optionsInUI(UI,true), [], 'No options are available in a finished game');
  t.equal(UI.winner, 1, 'The winner was correctly registered');
  t.equal(UI.endedBy, 'cornerinfiltration', 'The win condition was correctly registered');
  let newUI = algol.inflateFromSave(UI.save);
  t.deepEqual(omit(newUI, ['sessionId']), omit(UI,['sessionId']), 'When restored game is still won');
});
