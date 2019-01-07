import * as fs from "fs-extra";
import * as path from "path";
import * as watchr from "watchr";

import analyze from "./helpers/analyze";

const gameId = process.argv[2];

if (!gameId) {
  console.log("No gameId provided! Usage: npm run watch <gameId>");
} else if (!fs.existsSync(path.join(__dirname, "../definitions", gameId))) {
  console.log(`Game "${gameId}" doesn't exists!`);
} else {
  const watchPath = path.join(__dirname, '../definitions/', gameId);
  watchr.open(watchPath, listener, next)
  console.log('Initiating watch of', gameId);
}

function listener (changeType, fullPath, currentStat, previousStat) {
  const fileName = fullPath.match(/[^\/]*$/)[0];
  if (changeType === 'update' && fileName !== '_types.ts') {
    console.log(gameId, 'definition update in', fileName, '- rerunning analysis!');
    delete require.cache[fullPath];
    delete require.cache[fullPath.replace(fileName, 'index.ts')];
    analyze(gameId);
  }
}

function next (err) {
  if ( err )  return console.log('watch failed with error', err)
  console.log('Started watching', gameId, 'files...');
}
