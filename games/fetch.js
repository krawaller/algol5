const fs = require("fs-extra");
const beautify = require("js-beautify");

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
    const json = JSON.parse(
      fs.readFileSync("../library/defs/" + fname).toString()
    );
    const {
      meta: { instructions, ...otherMeta } = {},
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

    fs.writeFileSync(
      "./definitions/" + gameId + "/meta.ts",
      `import {Meta} from '../../types';

const ${gameId}Meta: Meta = ${makeNice(otherMeta || {})};

export default ${gameId}Meta;
`
    );

    fs.writeFileSync(
      "./definitions/" + gameId + "/rules.ts",
      `import {Definition} from '../../types';

const ${gameId}Rules: Definition = ${makeNice(rules)};

export default ${gameId}Rules;
`
    );

    fs.writeFileSync(
      "./definitions/" + gameId + "/ai.ts",
      `import {AI} from '../../types';

const ${gameId}AI: AI = ${makeNice(AI)};

export default ${gameId}AI;
`
    );

    fs.writeFileSync(
      "./definitions/" + gameId + "/instructions.ts",
      `import {Instructions} from '../../types';

const ${gameId}Instructions: Instructions = ${makeNice(instructions || {})};

export default ${gameId}Instructions;
`
    );

    fs.writeFileSync(
      "./definitions/" + gameId + "/graphics.ts",
      `import {Graphics} from '../../types';

const ${gameId}Graphics: Graphics = ${makeNice(graphics || {})};

export default ${gameId}Graphics;
`
    );

    fs.writeFileSync(
      "./definitions/" + gameId + "/board.ts",
      `import {Board} from '../../types';

const ${gameId}Board: Board = ${makeNice(board || {})};

export default ${gameId}Board;
`
    );

    fs.writeFileSync(
      "./definitions/" + gameId + "/setup.ts",
      `import {Setup} from '../../types';

const ${gameId}Setup: Setup = ${makeNice(setup || {})};

export default ${gameId}Setup;
`
    );

    fs.writeFileSync("./definitions/" + gameId + "/scripts.ts", scripts);
  });
