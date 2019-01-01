/*
This test executes scipted steps, for each making sure that the available options
in the resulting UI is exactly what is expected (excluding undos and removeMarks).
*/

import algol from '../../src';
import optionsInUI from '../../src/various/optionsinui';
import * as test from "tape";
import makePlayer from '../makeplayer';
import scripts from '../../../gamescripts';

Object.keys(scripts).forEach(gameId => {
  Object.keys(scripts[gameId]).forEach(script => {
    test("Running " + gameId + " script " + script, t => {
      const lines = scripts[gameId][script];
      let UI = algol.startGame(gameId, makePlayer(1), makePlayer(2));
      lines.forEach(([cmnds, expectedOpts, forbiddenOpts=[]], i) => {
        cmnds.forEach(cmnd => {
          UI = algol.performAction(UI.sessionId, cmnd);
        });
        const opts = optionsInUI(UI,true);
        if (expectedOpts.length) {
          const missingOpts = expectedOpts.filter(o => opts.indexOf(o) === -1);
          t.deepEqual(missingOpts,[],"UI after " +((cmnds.length?cmnds:["start"]).join(","))+ " included " + expectedOpts.join(","));
        }
        if (forbiddenOpts.length) {
          const unwantedOpts = opts.filter(o => forbiddenOpts.indexOf(o) !== -1);
          t.deepEqual(unwantedOpts, [], "UI after " +((cmnds.length?cmnds:["start"]).join(","))+ " didn't include " + forbiddenOpts.join(","));
        }
      });
      t.end();
    });
  });
});
