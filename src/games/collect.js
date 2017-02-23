/*
Build script that loops over the game files in the `built` folder
(created by `generate.js`), and collects them into a single file
at `games.js`. this file exports an object containing all games.
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