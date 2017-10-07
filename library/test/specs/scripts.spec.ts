/*
This test executes scipted steps
*/

import * as library from '../../dist/library.js';
import * as test from "tape";
import scripts from './scripts';

/*
  ["Basic Duplo script", "duplo", [
    "a1","deploy","b2","deploy","endturn",
    "c6","deploy","c5","deploy","endturn",
    "b2","d4","expand","endturn"
  ]],
*/

scripts.forEach(([name, gameId,lines], n) => {
  test("Following scripted moves for "+name, t => {
    let game = library[gameId];
    let turn = game.newGame();
    let at = 'root';
    let instr;
    lines.forEach(([cmnds,expectedOpts], i) => {
      t.doesNotThrow( () => {
        cmnds.forEach(cmnd => {
          let func = turn.links[at][cmnd];
          if (cmnd === 'win' || cmnd === 'lose' || cmnd === 'draw'){
            t.ok(!!func && !game[func], gameId + " win condition!");
          } else if (cmnd === 'endturn'){
            turn = game[func](turn, turn.steps[at]);
            at = 'root';
            instr = game[func+'instruction'](turn,turn.steps[at]);
          } else {
            let step = game[func](turn,turn.steps[at],cmnd);
            instr = game[func+'instruction'](turn,step);
            at = step.stepid;
          }
        });
      }, "can perform " + (i ? [] : ['start']).concat(cmnds).join(","));
      const missingOpts = expectedOpts.filter(o => !turn.links[at]);
      t.deepEqual(missingOpts,[],"UI was " + (expectedOpts.length ? expectedOpts.join(",") : 'empty'));
    });
    t.end();
  });
});
