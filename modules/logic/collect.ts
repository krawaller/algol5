/*
Build script that loops over the game files in the `temp/indiv` folder
(created by `compile.js`), and collects them into a single file
at `dist/library.js`. That file exports an object containing all games,
which is imported from within the engine files.
*/

import * as fs from 'fs-extra';
import * as path from 'path';

const generated = path.join(__dirname, 'generated');
const out = path.join(__dirname, 'dist');

fs.removeSync(out);
fs.ensureDirSync(out);
fs.ensureDirSync(path.join(out, "games"));

const files = fs.readdirSync(generated).filter(f => f != '.DS_Store');

files.forEach(f => {
  const gameId = f.replace(/\.ts$/,'');
  fs.writeFileSync(path.join(out, "games", f), `
import ${gameId} from '../../generated/${gameId}';

export default ${gameId};
`);
});

const gameIds = files.map(f => f.replace(/\.ts$/,''));
fs.writeFileSync(
  path.join(out, "library.ts"),
  `${gameIds
    .map(gid => `import ${gid} from './games/${gid}';`)
    .join("\n")}

const lib = {
${gameIds.map(gid => `  ${gid},\n`).join("")}};

export default lib;
`
);
