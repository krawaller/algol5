const path = require("path");
const fs = require("fs-extra");
const beautify = require("js-beautify");
import analyze from "./analyze";
import stub from "./stub";

import updateGame from "./update";

import { FullDef } from "./types";
import update from "./update";

function makeNice(obj = {}) {
  return beautify(JSON.stringify(obj).replace(/"([a-zA-Z]+)":/g, "$1:"), {
    indent_size: 2
  });
}

fs.removeSync("./definitions");

fs.readdirSync("../library/defs")
  .filter(f => f !== ".DS_Store")
  .forEach(fname => {
    const gameId = fname.split(".")[0];
    const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
    stub(gameId);
    const json = JSON.parse(
      fs.readFileSync("../library/defs/" + fname).toString()
    );
    const {
      meta: { instructions = {}, ...otherMeta } = {},
      AI,
      graphics,
      board,
      setup,
      generators,
      ...flow
    } = json;
    graphics.icons = graphics.icons || {};
    graphics.tiles = graphics.tiles || {};
    board.terrain = board.terrain || {};
    let scripts;
    try {
      scripts = require(path.join(
        __dirname,
        "../gamescripts/pergame/" + gameId
      )).default;
    } catch (e) {}

    const gameDef: FullDef = {
      scripts,
      AI,
      graphics,
      board,
      setup,
      generators,
      meta: otherMeta,
      instructions,
      flow
    };

    updateGame(gameId, gameDef);

    analyze(gameId);
  });
