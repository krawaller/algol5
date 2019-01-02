const fs = require("fs-extra");
const path = require("path");

export default function stub(gameId) {
  const defPath = path.join(__dirname, "./definitions", gameId);
  fs.ensureDirSync(defPath);

  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));

  // ------------- ANALYSIS -----------
  fs.writeFileSync(
    path.join(defPath, "_types.ts"),
    `export type ${capId}Terrain = never;
export type ${capId}Unit = never;
export type ${capId}Mark = never;
export type ${capId}Command = never;
export type ${capId}Phase = "startTurn";
`
  );

  // --------- AI ----------
  fs.writeFileSync(
    path.join(defPath, "ai.ts"),
    `import {AI} from '../../types';

const ${capId}AI: AI = {};

export default ${capId}AI;
`
  );

  // --------- BOARD ----------
  fs.writeFileSync(
    path.join(defPath, "board.ts"),
    `import {Board} from '../../types';
import { ${capId}Terrain } from './_types';

const ${capId}Board: Board<${capId}Terrain> = {
  height: 666,
  width: 666,
  terrain: {

  }
};

export default ${capId}Board;
`
  );

  // --------- GRAPHICS ----------
  fs.writeFileSync(
    path.join(defPath, "graphics.ts"),
    `import {Graphics} from '../../types';
import { ${capId}Terrain, ${capId}Unit } from './_types';

const ${capId}Graphics: Graphics<${capId}Terrain, ${capId}Unit> = {
  icons: {

  },
  tiles: {

  }
};

export default ${capId}Graphics;
`
  );

  // --------- INSTRUCTIONS ----------
  fs.writeFileSync(
    path.join(defPath, "instructions.ts"),
    `import {Instructions} from '../../types';
import { ${capId}Phase } from './_types';

const ${capId}Instructions: Instructions<${capId}Phase> = {

};

export default ${capId}Instructions;
`
  );

  // ------------ META ----------------
  fs.writeFileSync(
    path.join(defPath, "meta.ts"),
    `import {Meta} from '../../types';

const ${capId}Meta: Meta = {
  id: "${gameId}",
  name: "",
  tags: [],
  tagline: "",
};

export default ${capId}Meta;
`
  );

  // ----------- RULES --------------
  fs.writeFileSync(
    path.join(defPath, "rules.ts"),
    `import {Rules} from '../../types';
import { ${capId}Terrain, ${capId}Unit } from './_types';

const ${capId}Rules: Rules<${capId}Terrain, ${capId}Unit> = {
  startTurn: {

  },
  commands: {

  },
  marks: {

  },
  generators: {

  }
};

export default ${capId}Rules;
`
  );

  // ------------ SCRIPTS ------------
  fs.writeFileSync(
    path.join(defPath, "scripts.ts"),
    `import {GameTestSuite} from '../../types';

const ${capId}Tests: GameTestSuite = {

};

export default ${capId}Tests;
`
  );

  // ------------ SETUP -------------
  fs.writeFileSync(
    path.join(defPath, "scripts.ts"),
    `import {Setup} from '../../types';

import { ${capId}Unit } from './_types';

const ${capId}Setup: Setup<${capId}Unit> = {

};

export default ${capId}Setup;
`
  );
}
