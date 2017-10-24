/*
This test executes scipted steps, for each making sure that the available options
in the resulting UI is exactly what is expected (excluding undos and removeMarks).
*/

import algol from '../../src';
import optionsInUI from '../../src/various/optionsinui';
import * as test from "tape";
import makePlayer from '../makeplayer';
import scripts from '../../../library/test/specs/scripts';

scripts.forEach(([name, gameId,lines], n) => {
  test("Following scripted moves for "+name, t => {
    t.plan(lines.length);
    let UI = algol.startGame(gameId, makePlayer(1), makePlayer(2));
    lines.forEach(([cmnds, expectedUI], i) => {
      cmnds.forEach(cmnd => {
        UI = algol.performAction(UI.sessionId, cmnd);
      });
      t.deepEqual(optionsInUI(UI,true), expectedUI, "executed " + ((cmnds.length?cmnds:["start"]).join(",")) + ", got UI " + expectedUI.join(","));
    });
  });
});
