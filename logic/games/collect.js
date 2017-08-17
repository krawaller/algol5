/*
Build script that loops over the game files in the `temp/indiv` folder
(created by `generate.js`), and collects them into a single file
at `temp/ALLGAMES.js`. That file exports an object containing all games,
which is imported from within the engine files.
*/

import fs from 'fs'

let games = fs.readdirSync(__dirname+"/temp/indiv/").map(gamename=>{
  let code = fs.readFileSync(__dirname+"/temp/indiv/"+gamename)
  console.log("Collecting",gamename)
  return gamename.replace('.js','')+': '+code
})

let file = `
  module.exports = {
    ${games.join(', ')}
  };
`

fs.writeFileSync(__dirname+'/temp/ALLGAMES.js',file);