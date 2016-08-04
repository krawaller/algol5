import lib from '../src/codegen/'

import fs from 'fs'

let games = fs.readdirSync(__dirname+"/built").map(gamename=>{
  let code = fs.readFileSync(__dirname+"/built/"+gamename)
  return gamename.replace('.js','')+': '+code
})

let file = `
  module.exports = {
    ${games.join(', ')}
  };
`

fs.writeFileSync(__dirname+'/games.js',file);