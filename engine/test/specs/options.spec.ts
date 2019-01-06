/*
This test executes scipted steps, for each making sure that the available options
in the resulting UI is exactly what is expected (excluding undos and removeMarks).
*/

import algol from "../../src";
import optionsInUI from "../../src/various/optionsinui";
import * as test from "tape";
import makePlayer from "../makeplayer";
import defs from "../../../games/dist/lib";
import { ScriptLine } from '../../../types';

Object.keys(defs).forEach(gameId => {
  Object.keys(defs[gameId].scripts).forEach(script => {
    test("Running " + gameId + " script " + script, t => {
      const lines: ScriptLine[] = defs[gameId].scripts[script];
      let UI = algol.startGame(gameId, makePlayer(1), makePlayer(2));
      lines.forEach(({commands, include = [], exclude = []}, i) => {
        commands.forEach(cmnd => {
          UI = algol.performAction(UI.sessionId, cmnd);
        });
        const opts = optionsInUI(UI, true);
        if (include.length) {
          const missingOpts = include.filter(o => opts.indexOf(o) === -1);
          t.deepEqual(
            missingOpts,
            [],
            "UI after " +
              (commands.length ? commands : ["start"]).join(",") +
              " included " +
              include.join(",")
          );
        }
        if (exclude.length) {
          const unwantedOpts = opts.filter(
            o => exclude.indexOf(o) !== -1
          );
          t.deepEqual(
            unwantedOpts,
            [],
            "UI after " +
              (commands.length ? commands : ["start"]).join(",") +
              " didn't include " +
              exclude.join(",")
          );
        }
      });
      t.end();
    });
  });
});
