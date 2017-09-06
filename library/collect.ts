/*
Build script that loops over the game files in the `temp/indiv` folder
(created by `generate.js`), and collects them into a single file
at `temp/ALLGAMES.js`. That file exports an object containing all games,
which is imported from within the engine files.
*/

import * as fs from 'fs';

let games = fs.readdirSync(__dirname+"/temp/").filter(f => f != '.DS_Store').map(gamename=>{
  let code = fs.readFileSync(__dirname+"/temp/"+gamename)
  console.log("Collecting",gamename)
  return gamename.replace('.js','')+': '+code
})

let envelope = fs.readFileSync(__dirname + "/envelope.js") + '';

let file = `
${envelope}

module.exports = {
  ${games.join(', ')}
};
`

fs.writeFileSync(__dirname+'/dist/library.js',file);