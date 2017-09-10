/*
This test executes scipted steps
*/

import * as library from '../../dist/library.js';
import * as test from "tape";

type Test = [string, string, string[]];

const scripts: Test[] = [
  ["Basic Amazon script", "amazon",[
    "d10","d4","move","g4","fire","endturn",
    "g1","f2","move","f4","fire","endturn",
    "d4","d7","move"
  ]],
  ["Basic Aries script", "aries", [
    "d4","g4","move","endturn",
    "g5","g4","move","endturn",
    "c4","g4","move","endturn"
  ]],
  ["Basic Atrium script", "atrium", [
    "e2","d3","move","endturn",
    "e3","d2","move","endturn"
  ]],
  ["Basic Castle script", "castle", [
    "c8","c9","move","endturn",
    "q12","q11","move","endturn",
    "c9"
  ]],
  ["Basic Coffee script", "coffee", [
    "c3","downhill","endturn",
    "b4","uphill","endturn",
    "c5","vertical","endturn",
    "c2"
  ]],
  ["Basic Daggers script", "daggers", [
    "c7","g3","move","endturn",
    "f2","e3","move","endturn",
    "g3","f2","move","endturn",
    "f1"
  ]],
  ["Basic Gogol script", "gogol", [
    "g4","deploy","endturn",
    "f4","deploy","endturn",
    "g4","d7","move","endturn",
    "e8","d6","move","endturn",
    "d7","d5","jump","endturn"
  ]],
  ["Gogol ending script (tests filter)", "gogol", [
    "c4","deploy","endturn",
    "d4","deploy","endturn",
    "c4","e4","jump","win"
  ]],
  ["Gogol non-ending script (also filter test)", "gogol", [
    "d5","deploy","endturn",
    "c5","deploy","endturn",
    "d1","b4","move","endturn",
    "c5","a3","jump","endturn",
    "a1"
  ]],
  ["Basic Jostle script", "jostle", [
    "h3","h2","jostle","endturn",
    "g5","f5","jostle","endturn",
    "c6","b6","jostle","endturn",
    "e7","e6","jostle","endturn",
    "h5","i5","jostle","endturn"
  ]],
  ["Basic Kickrun script", "kickrun", [
    "c1","c2","move","endturn",
    "d5","d1","move","endturn",
    "c2","d1","move","endturn",
    "e4"
  ]],
  ["Basic Krieg script", "krieg", [
    "b3","c3","move","endturn",
    "c2","b2","move","endturn",
    "a4","b3","move","endturn",
    "d2","d3","move","endturn",
    "c3","c2","move","endturn",
    "d1","d2","move","endturn",
    "b3","c3","move","endturn",
    "b2","b3","move","endturn",
    "c2","d1","move","win"
  ]],
  ["Basic Murus Gallicus script", "murusgallicus", [
    "a1","c3","move","endturn",
    "a7","c5","move","endturn",
    "c1","c3","move","endturn",
    "b7","b5","move","endturn",
    "c3","e5","move","endturn",
    "d7","f5","move","endturn",
    "d1","d3","move","endturn",
    "f7","d5","move","endturn",
    "b1","d3","move","endturn",
    "e6","e5","kill","endturn"
  ]],
  ["Basic Murus Gallicus Advanced script", "murusgallicusadvanced", [
    "b1","d3","move","endturn",
    "d7","d5","move","endturn",
    "d1","d3","move","endturn",
    "e7","c5","move","endturn",
    "f1","d3","move","endturn",
    "a7","a5","move","endturn",
    "d3","d6","fire","endturn",
    "f7","d5","move","endturn",
    "d3"
  ]],
  ["Basic Orthokon script", "orthokon", [
    "a1","c3","move","endturn",
    "d4","d2","move","endturn"
  ]],
  ["Basic Semaphor script", "semaphor", [
    "c2","deploy","endturn",
    "c2","promote","endturn",
    "c2","promote","endturn",
    "b2","deploy","endturn",
    "b2","promote","endturn",
    "b2","promote","endturn",
    "a2","deploy","endturn",
    "a2","promote","endturn",
    "a2","promote","win"
  ]],
  ["Basic Serauqs script", "serauqs", [
    "d1","makewild","endturn",
    "a4","makewild","endturn",
    "b1","b2","move","endturn"
  ]],
  ["Basic Snijpunt script", "snijpunt", [
    "d6","snipe","endturn",
    "a3","snipe","endturn",
    "c6","snipe","endturn",
    "a4","snipe","endturn",
    "d6","snipe","endturn",
    "a2","snipe","endturn",
    "c6","snipe","endturn",
    "a5","snipe","endturn",
    "d6","snipe","endturn",
    "a1","snipe","endturn",
    "c6","snipe","endturn"
  ]],
  ["Basic ThreeMusketeers script", "threemusketeers", [
    "c3","c4","move","endturn",
    "c2","c3","move","endturn",
    "c4","c3","move","endturn",
    "c1","c2","move","endturn",
    "c3"
  ]],
  ["Basic Transet script", "transet", [
    "c1","c2","move","endturn",
    "b5","c4","move","endturn",
    "c2","d1","d2","swap","endturn",
    "c4","d3","move","endturn",
    "d2","d3","b5","move","endturn"
  ]],
];

scripts.forEach(([name, gameId,commands], n) => {
  test("Following scripted moves for "+name, t => {
    let game = library[gameId];
    let turn = game.newGame();
    let at = 'root';
    let instr;
    commands.forEach(cmnd => {
      let func = turn.links[at][cmnd];
      if (cmnd === 'endturn') {
        instr = game[func+'instruction'](turn.steps[at]);
        t.doesNotThrow(()=> {
          turn = game[func](turn, turn.steps[at]);
        }, "can end turn by calling " + func);
        at = 'root';
      } else if (cmnd === 'win' || cmnd === 'lose' || cmnd === 'draw'){
        t.ok(!!func && !game[func], gameId + " win condition!");
      } else {
        instr = game[func+'instruction'](turn.steps[at]);
        t.doesNotThrow(()=> {
          let step = game[func](turn,turn.steps[at],cmnd);
          at = step.stepid;
        }, "can do " + cmnd + " by calling " + func);
      }
    });
    t.end();
  });
});
