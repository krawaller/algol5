
import algol from "./src";
import makePlayer from "./test/makeplayer";
import defs from "../games/dist/lib";
import { ScriptLine } from '../types';

console.log('Perf test started');

const before = Date.now()

let loops = 3;

while(loops > 0) {
  Object.keys(defs).forEach(gameId => {
    Object.keys(defs[gameId].scripts).forEach(script => {
      const lines: ScriptLine[] = defs[gameId].scripts[script];
      let UI = algol.startGame(gameId, makePlayer(1), makePlayer(2));
      lines.forEach(({commands, include = [], exclude = []}, i) => {
        commands.forEach(cmnd => {
          UI = algol.performAction(UI.sessionId, cmnd);
        });
      });
    });
  });
  loops--;
}

const after = Date.now()

console.log('Perf test ended, took', (after - before) / 1000, 'seconds');
