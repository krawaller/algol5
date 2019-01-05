const path = require("path");
const fs = require("fs-extra");
const beautify = require("js-beautify");
import analyze from "./analyze";
import stub from "./stub";

import { typeSignature } from "./types";

function makeNice(obj = {}) {
  return beautify(JSON.stringify(obj).replace(/"([a-zA-Z]+)":/g, "$1:"), {
    indent_size: 2
  });
}

fs.removeSync("./definitions");

fs.readdirSync("../library/defs")
  .filter(f => f !== ".DS_Store")
  .forEach(fname => {
    const gameId = fname.split(".")[0];
    const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
    stub(gameId);
    const json = JSON.parse(
      fs.readFileSync("../library/defs/" + fname).toString()
    );
    const {
      meta: { instructions = {}, ...otherMeta } = {},
      AI,
      graphics,
      board,
      setup,
      generators,
      ...flow
    } = json;
    graphics.icons = graphics.icons || {};
    graphics.tiles = graphics.tiles || {};
    board.terrain = board.terrain || {};

    fs.ensureDirSync("./definitions/" + gameId);

    // ---------------- SCRIPTS ----------
    let scripts;
    try {
      scripts = require(path.join(
        __dirname,
        "../gamescripts/pergame/" + gameId
      )).default;
    } catch (e) {}
    const scriptsPath = "./definitions/" + gameId + "/scripts.ts";
    const scriptsFile = fs.readFileSync(scriptsPath).toString();
    fs.writeFileSync(
      scriptsPath,
      scriptsFile.replace(/ = {[\s\S]*};/, ` = ${makeNice(scripts || {})};`)
    );

    // -------------- META --------------
    const metaPath = "./definitions/" + gameId + "/meta.ts";
    const file = fs.readFileSync(metaPath).toString();
    fs.writeFileSync(
      metaPath,
      file.replace(/ = {[\s\S]*};/, ` = ${makeNice(otherMeta || {})};`)
    );

    // -------------- FLOW --------------
    const fsig = typeSignature("Flow", gameId);
    fs.writeFileSync(
      "./definitions/" + gameId + "/flow.ts",
      `import {Flow} from '../../types';
import { ${fsig} } from './_types';

const ${gameId}Flow: Flow<${fsig}> = ${makeNice(flow)};

export default ${gameId}Flow;
`
    );

    // -------------- AI --------------
    fs.writeFileSync(
      "./definitions/" + gameId + "/ai.ts",
      `import {AI} from '../../types';

const ${gameId}AI: AI = ${makeNice(AI)};

export default ${gameId}AI;
`
    );

    // -------------- INSTRUCTIONS --------------
    const isig = typeSignature("Instructions", gameId);
    fs.writeFileSync(
      "./definitions/" + gameId + "/instructions.ts",
      `import {Instructions} from '../../types';
import { ${isig} } from './_types';

const ${gameId}Instructions: Instructions<${isig}> = ${makeNice(
        instructions || {}
      )};

export default ${gameId}Instructions;
`
    );

    // -------------- GRAPHICS --------------
    const gsig = typeSignature("Graphics", gameId);
    fs.writeFileSync(
      "./definitions/" + gameId + "/graphics.ts",
      `import {Graphics} from '../../types';
import { ${gsig} } from './_types';

const ${gameId}Graphics: Graphics<${gsig}> = ${makeNice(graphics || {})};

export default ${gameId}Graphics;
`
    );

    // -------------- BOARD --------------
    const bsig = typeSignature("Board", gameId);
    fs.writeFileSync(
      "./definitions/" + gameId + "/board.ts",
      `import {Board} from '../../types';
import { ${bsig} } from './_types';

const ${gameId}Board: Board<${bsig}> = ${makeNice(board || {})};

export default ${gameId}Board;
`
    );

    // -------------- SETUP --------------
    const ssig = typeSignature("Setup", gameId);
    fs.writeFileSync(
      "./definitions/" + gameId + "/setup.ts",
      `import {Setup} from '../../types';
import { ${ssig} } from './_types';

const ${gameId}Setup: Setup<${ssig}> = ${makeNice(setup || {})};

export default ${gameId}Setup;
`
    );

    // -------------- GENERATORS --------------
    const gensig = typeSignature("Generators", gameId);
    fs.writeFileSync(
      "./definitions/" + gameId + "/generators.ts",
      `import {Generators} from '../../types';
import { ${gensig} } from './_types';

const ${gameId}Generators: Generators<${gensig}> = ${makeNice(
        generators || {}
      )};

export default ${gameId}Generators;
`
    );

    analyze(gameId);
  });
