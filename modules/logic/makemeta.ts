/*
Build script that loops over the game files in the `built` folder
(created by `generate.js`), and collects their metadata into a single file
at `games.js`. this file exports an object containing all games.
NOOOO
*/

import * as fs from "fs";
import * as omit from "lodash/omit";
import * as _eval from "eval";

import { terrainLayers } from '../common';

import defs from "../games/dist/lib";

let meta = Object.keys(defs).reduce((mem, gamename) => {
  console.log("Meta for", gamename);
  let json = defs[gamename];
  let id = gamename.replace(".json", "");
  let allTerrainLayers = terrainLayers(json.board);
  mem[id] = {
    ...json.meta,
    AI: Object.keys((json.AI && json.AI.brains) || {}).concat("Randy"),
    board: {
      ...omit(json.board, ["terrain"]),
      terrainLayers: omit(
        allTerrainLayers,
        Object.keys(allTerrainLayers).filter(
          l => !(json.graphics.tiles || {})[l]
        )
      )
    },
    graphics: json.graphics
  };
  return mem;
}, {});

fs.writeFileSync(
  __dirname + "/dist/meta.js",
  `
  module.exports = ${JSON.stringify(meta)};
`
);
