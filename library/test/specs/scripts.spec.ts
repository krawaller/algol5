/*
This test executes scipted steps
*/

import * as library from '../../dist/library.js';
import * as test from "tape";

import gameScripts from '../../../gamescripts';

const gameIds = Object.keys(library);

gameIds.forEach(gameId => {
  const suite = gameScripts[gameId];
  if (suite) {
    const game = library[gameId];
    Object.keys(suite).forEach(testCaseName => {
      test("Game " + gameId + ", case " + testCaseName, t => {
        const lines = suite[testCaseName];
        let turn = game.newGame();
        let at = 'root';
        lines.forEach(([cmnds,expectedOpts,forbiddenOpts=[]], i) => {
          t.doesNotThrow( () => {
            cmnds.forEach(cmnd => {
              let func = turn.links[at][cmnd];
              if (cmnd === 'win' || cmnd === 'lose' || cmnd === 'draw'){
                t.ok(!!func && !game[func], gameId + " win condition!");
              } else if (cmnd === 'endturn'){
                turn = game[func](turn, turn.steps[at]);
                at = 'root';
                game[func+'instruction'](turn,turn.steps[at]);
              } else {
                let step = game[func](turn,turn.steps[at],cmnd);
                game[func+'instruction'](turn,step);
                at = step.stepid;
              }
            });
          }, "can perform " + (i ? [] : ['start']).concat(cmnds).join(","));
          const links = turn.links[at];
          if (expectedOpts.length) {
            const missingOpts = expectedOpts.filter(o => !links[o]);
            t.deepEqual(missingOpts,[],"UI included " + expectedOpts.join(","));  
          }
          if (forbiddenOpts.length) {
            const unwantedOpts = Object.keys(links).filter(o => forbiddenOpts.indexOf(o) !== -1);
            t.deepEqual(unwantedOpts, [], "UI didnt include " + forbiddenOpts.join(","));
          }
        });
        t.end();
      });
    });
  }
});
