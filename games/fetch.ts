const fs = require("fs-extra");
const beautify = require("js-beautify");
import analyze from "./analyze";
import stub from "./stub";

function makeNice(obj = {}) {
  return beautify(JSON.stringify(obj).replace(/"([a-zA-Z]+)":/g, "$1:"), {
    indent_size: 2
  });
}

function importTypes(gameId, ...types) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${types.map(t => capId + t).join(", ")} } from './_types';`;
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
      ...rules
    } = json;
    let scripts;
    try {
      scripts = fs
        .readFileSync("../gamescripts/pergame/" + gameId + ".ts")
        .toString()
        .replace("../types", "../../types");
    } catch (e) {
      scripts = `import { GameTestSuite } from '../../types';

const ${gameId}Tests: GameTestSuite = {};

export default ${gameId}Tests;
`;
    }
    fs.ensureDirSync("./definitions/" + gameId);

    // -------------- META --------------
    fs.writeFileSync(
      "./definitions/" + gameId + "/meta.ts",
      `import {Meta} from '../../types';

const ${gameId}Meta: Meta = ${makeNice(otherMeta || {})};

export default ${gameId}Meta;
`
    );

    // -------------- RULES --------------
    fs.writeFileSync(
      "./definitions/" + gameId + "/rules.ts",
      `import {Definition} from '../../types';
${importTypes(gameId, "Terrain", "Unit")}

const ${gameId}Rules: Definition<${capId}Terrain, ${capId}Unit> = ${makeNice(
        rules
      )};

export default ${gameId}Rules;
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
    fs.writeFileSync(
      "./definitions/" + gameId + "/instructions.ts",
      `import {Instructions} from '../../types';
${importTypes(gameId, "Phase")}

const ${gameId}Instructions: Instructions<${capId}Phase> = ${makeNice(
        instructions || {}
      )};

export default ${gameId}Instructions;
`
    );

    // -------------- GRAPHICS --------------
    fs.writeFileSync(
      "./definitions/" + gameId + "/graphics.ts",
      `import {Graphics} from '../../types';
${importTypes(gameId, "Terrain", "Unit")}

const ${gameId}Graphics: Graphics<${capId}Terrain, ${capId}Unit> = ${makeNice(
        graphics || {}
      )};

export default ${gameId}Graphics;
`
    );

    // -------------- BOARD --------------
    fs.writeFileSync(
      "./definitions/" + gameId + "/board.ts",
      `import {Board} from '../../types';
${importTypes(gameId, "Terrain")}

const ${gameId}Board: Board<${capId}Terrain> = ${makeNice(board || {})};

export default ${gameId}Board;
`
    );

    // -------------- SETUP --------------
    fs.writeFileSync(
      "./definitions/" + gameId + "/setup.ts",
      `import {Setup} from '../../types';
${importTypes(gameId, "Unit")}

const ${gameId}Setup: Setup<${capId}Unit> = ${makeNice(setup || {})};

export default ${gameId}Setup;
`
    );

    fs.writeFileSync("./definitions/" + gameId + "/scripts.ts", scripts);

    analyze(gameId);
  });
