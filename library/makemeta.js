/*
Build script that loops over the game files in the `built` folder
(created by `generate.js`), and collects their metadata into a single file
at `games.js`. this file exports an object containing all games.
*/

import fs from 'fs';
import omit from 'lodash/omit';
import _eval from 'eval';

let terrainLayers = _eval(fs.readFileSync(__dirname + "/logic/envelope.js") + '  module.exports = terrainLayers;' );

let meta = fs.readdirSync(__dirname+"/defs").reduce((mem,gamename)=>{
  console.log("Meta for",gamename);
  let json = JSON.parse(fs.readFileSync(__dirname+"/defs/"+gamename));
  let id = gamename.replace('.json','');
  let allTerrainLayers = terrainLayers(json.board);
  mem[id] = {
    ...json.meta,
    AI: Object.keys(json.AI && json.AI.brains || {}).concat("Randy"),
    board: {
      ...omit(json.board,["terrain"]),
      terrainLayers: omit(allTerrainLayers, Object.keys(allTerrainLayers).filter(l => !json.graphics.tiles[l]))
    },
    graphics: json.graphics
  };
  return mem;
},{})

fs.writeFileSync(__dirname+'/dist/meta.js',`
  module.exports = ${JSON.stringify(meta)};
`)
