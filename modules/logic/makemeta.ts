/*
Build script that loops over the game files in the `built` folder
(created by `generate.js`), and collects their metadata into a single file
at `games.js`. this file exports an object containing all games.
NOOOO
*/

import * as fs from "fs";
import * as omit from "lodash/omit";
import * as _eval from "eval";

import makeParser from "./def2code/expressions";

const envelope = fs.readFileSync(__dirname + "/envelope.js").toString();

let terrainLayers = _eval(envelope + "  module.exports = terrainLayers;");

const flat = ["flow"];
const perline = ["concepts"];
const perobj = ["actions", "tiles", "units", "goals"];

import defs from "../games/dist/lib";

let meta = Object.keys(defs).reduce((mem, gamename) => {
  console.log("Meta for", gamename);
  let json = defs[gamename];
  const parse = makeParser(json, 1, "rules");
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
  if (json.meta.rules) {
    // TODO - remove once all have
    const rules = json.meta.rules;
    mem[id].rules = {};
    flat.forEach(
      key => (mem[id].rules[key] = eval(envelope + parse.content(rules[key])))
    );
    perline.forEach(key => {
      if (rules[key]) {
        mem[id].rules[key] = Object.keys(rules[key]).reduce(
          (m, name) => ({
            ...m,
            [name]: eval(envelope + parse.content(rules[key][name]))
          }),
          {}
        );
      }
    });
    perobj.forEach(key => {
      if (rules[key]) {
        mem[id].rules[key] = Object.keys(rules[key]).reduce(
          (m, name) => ({
            ...m,
            [name]: {
              rule: eval(envelope + parse.content(rules[key][name].rule)),
              who: rules[key][name].who
            }
          }),
          {}
        );
      }
    });
  }
  return mem;
}, {});

fs.writeFileSync(
  __dirname + "/dist/meta.js",
  `
  module.exports = ${JSON.stringify(meta)};
`
);
