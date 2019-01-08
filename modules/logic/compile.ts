/*
Build script that will loop over all game definitions in the `defs` folder,
and create individual game generator files inside the `temp` folder.

The code in a built file evaluates to an object with methods to make
moves in that particular game.

After this is done, these files can then be merged together by the script
in `collect.js`.
*/

import compileGameToCode from "./def2code/";

import * as fs from "fs-extra";
import * as path from 'path';

import { js_beautify } from "js-beautify";

import lib from "../games/dist/lib";

const out = path.join(__dirname + "/generated")

fs.removeSync(out);

fs.mkdirSync(out);

for (let gameId in lib) {
  let rules = lib[gameId];
  console.log("Building", gameId);
  let code = compileGameToCode(rules);
  code = js_beautify(code, { indent_size: 2 }).replace(/\n{1,}/g, "\n");
  fs.writeFileSync(path.join(out, gameId + ".ts"), code);
}
