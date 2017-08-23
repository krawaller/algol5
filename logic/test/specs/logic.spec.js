/*
This test executes the "unit tests" in the test game "_test.json".
*/

import algol from '../../dist/algol';
import games from '../../dist/gamelibrary';

import optionsInUI from '../../engine/various/optionsinui';

describe("the game logic", () => {
  describe("walkers with steps and blocks", () => {
    it("doesnt draw blocks if no steps beneath when testblocksbeforesteps is false", () => {
      let UI = algol.startGame('_test', 'plr1', 'plr2');
      UI = algol.performAction(UI.sessionId, 'a3'); // selecting the 'testblocksbeforesteps=false' variant
      expect(optionsInUI(UI)).toEqual(['a1','a2','a4']); // include unit at a1 but not at a5
    });
    it("draws blocks if no steps beneath when testblocksbeforesteps is true", () => {
      let UI = algol.startGame('_test', 'plr1', 'plr2');
      UI = algol.performAction(UI.sessionId, 'b3'); // selecting the 'testblocksbeforesteps=true' variant
      expect(optionsInUI(UI)).toEqual(['b1','b2','b4','b5']); // include unit at b1 and b5
    });
    it("draws blocks if no steps beneath when testblocksbeforesteps is not set", () => {
      let UI = algol.startGame('_test', 'plr1', 'plr2');
      UI = algol.performAction(UI.sessionId, 'c3'); // selecting variant where testblocksbeforesteps isnt set
      expect(optionsInUI(UI)).toEqual(['c1','c2','c4']); // exclude c5
    });
    it("doesnt draw block when no step under if flag isnt set", () => {
      let UI = algol.startGame('_test', 'plr1', 'plr2');
      UI = algol.performAction(UI.sessionId, 'd3');
      expect(optionsInUI(UI)).toEqual(['d2','d4']);
    });
  });
});
