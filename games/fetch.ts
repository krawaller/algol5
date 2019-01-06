const path = require("path");
const fs = require("fs-extra");
import stub from "./stub";

import updateGame from "./update";

import { FullDef } from "../types";

fs.removeSync("./definitions");

fs.readdirSync("../library/defs")
  .filter(f => f !== ".DS_Store")
  .forEach(async fname => {
    const gameId = fname.split(".")[0];
    await stub(gameId);
    const oldDef = await fs.readFile("../library/defs/" + fname);
    const json = JSON.parse(oldDef.toString());
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
  });
