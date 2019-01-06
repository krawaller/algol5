const path = require("path");
const fs = require("fs-extra");
import stub from "./stub";

import overwriteGame from "./overwrite";

import { FullDef } from "../types";

fs.removeSync("./definitions");

fs.readdirSync("./dev/prev")
  .filter(f => f !== ".DS_Store")
  .forEach(async fname => {
    const gameId = fname.split(".")[0];
    await stub(gameId);
    const oldDef = await fs.readFile("./dev/prev/" + fname);
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
      scripts = require(path.join(__dirname, "./dev/scripts/" + gameId))
        .default;
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

    overwriteGame(gameId, gameDef);
  });
