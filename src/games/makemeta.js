/*
Build script that loops over the game files in the `built` folder
(created by `generate.js`), and collects their metadata into a single file
at `games.js`. this file exports an object containing all games.
*/

import fs from 'fs'

let meta = fs.readdirSync(__dirname+"/defs").reduce((mem,gamename)=>{
  console.log("Meta for",gamename)
  let json = JSON.parse(fs.readFileSync(__dirname+"/defs/"+gamename));
  let id = gamename.replace('.json','')
  mem[id] = {...json.meta, AI: Object.keys(json.AI && json.AI.brains || {})}
  return mem;
},{})

fs.writeFileSync(__dirname+'/../../dist/gamelibrary.js',`
  module.exports = ${JSON.stringify(meta)};
`)
