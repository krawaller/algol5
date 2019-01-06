/*
This test executes scipted steps
*/

import * as library from "../../dist/library.js";
import * as test from "tape";
import { GameTestSuite } from "../../../types";
import defs from "../../../games/dist/lib";

const gameIds = Object.keys(library);

gameIds.forEach(gameId => {
  const suite: GameTestSuite = defs[gameId].scripts;
  if (suite) {
    const game = library[gameId];
    Object.keys(suite).forEach(testCaseName => {
      test("Game " + gameId + ", case " + testCaseName, t => {
        const lines = suite[testCaseName];
        let turn = game.newGame();
        let at = "root";
        lines.forEach(({commands, include = [], exclude = []}, i) => {
          t.doesNotThrow(() => {
            commands.forEach(cmnd => {
              let func = turn.links[at][cmnd];
              if (cmnd === "win" || cmnd === "lose" || cmnd === "draw") {
                t.ok(!!func && !game[func], gameId + " win condition!");
              } else if (cmnd === "endturn") {
                turn = game[func](turn, turn.steps[at]);
                at = "root";
                game[func + "instruction"](turn, turn.steps[at]);
              } else {
                let step = game[func](turn, turn.steps[at], cmnd);
                game[func + "instruction"](turn, step);
                at = step.stepid;
              }
            });
          }, "can perform " + (i ? [] : ["start"]).concat(commands).join(","));
          const links = turn.links[at];
          if (include.length) {
            const missingOpts = include.filter(o => !links[o]);
            t.deepEqual(
              missingOpts,
              [],
              "UI included " + include.join(",")
            );
          }
          if (exclude.length) {
            const unwantedOpts = Object.keys(links).filter(
              o => exclude.indexOf(o) !== -1
            );
            t.deepEqual(
              unwantedOpts,
              [],
              "UI didnt include " + exclude.join(",")
            );
          }
        });
        t.end();
      });
    });
  }
});
