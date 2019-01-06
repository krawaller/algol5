import * as fs from "fs-extra";
import * as path from "path";

import stub from "./helpers/stub";
import overwriteGame from "./helpers/overwrite";
import { FullDef } from "../../types";

const prevPath = path.join(__dirname, "../dev/prev/");
const scriptsPath = path.join(__dirname, "../dev/scripts/");
const out = path.join(__dirname, "../definitions");

fs.removeSync(out);

fs.readdirSync(prevPath)
  .filter(f => f !== ".DS_Store")
  .forEach(async fname => {
    const gameId = fname.split(".")[0];
    await stub(gameId);
    const oldDef = await fs.readFile(path.join(prevPath, fname));
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
      scripts = require(path.join(scriptsPath, gameId))
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
