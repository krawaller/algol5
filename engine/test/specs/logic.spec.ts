/*
This test executes the "unit tests" in the test game "_test.json".
*/

import algol from '../../src';
import optionsInUI from '../../src/various/optionsinui';
import makePlayer from '../makeplayer';

import * as test from "tape";

test("the game logic - walkers", t => {
  t.plan(5);
  let UI;
  
  UI = algol.startGame('_test', makePlayer(1), makePlayer(2));
  UI = algol.performAction(UI.sessionId, 'a3'); // selecting the 'testblocksbeforesteps=false' variant
  t.deepEqual(optionsInUI(UI,true), ['a1','a2','a4'], "include unit at a1 but not at a5");

  UI = algol.startGame('_test', makePlayer(1), makePlayer(2));
  UI = algol.performAction(UI.sessionId, 'b3'); // selecting the 'testblocksbeforesteps=true' variant
  t.deepEqual(optionsInUI(UI,true), ['b1','b2','b4','b5'], "include unit at b1 and b5")

  UI = algol.startGame('_test', makePlayer(1), makePlayer(2));
  UI = algol.performAction(UI.sessionId, 'c3'); // selecting variant where testblocksbeforesteps isnt set
  t.deepEqual(optionsInUI(UI,true), ['c1','c2','c4'], "exclude c5")
  
  UI = algol.startGame('_test', makePlayer(1), makePlayer(2));
  UI = algol.performAction(UI.sessionId, 'd3');
  t.deepEqual(optionsInUI(UI,true), ['d2','d4'], "");

  UI = algol.startGame('_test', makePlayer(1), makePlayer(2));
  UI = algol.performAction(UI.sessionId, 'd3');
  t.deepEqual(optionsInUI(UI,true), ['d2','d4'], "");
});
