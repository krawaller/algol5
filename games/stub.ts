const fs = require("fs-extra");
const path = require("path");

import { typeSignature } from "./types";

export default function stub(gameId) {
  const defPath = path.join(__dirname, "./definitions", gameId);
  fs.ensureDirSync(defPath);

  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));

  // ------------- ANALYSIS -----------
  fs.writeFileSync(
    path.join(defPath, "_types.ts"),
    `import { CommonLayer } from '../../types';

export type ${capId}Terrain = never;
export type ${capId}Unit = never;
export type ${capId}Mark = never;
export type ${capId}Command = never;
export type ${capId}Phase = "startTurn";
export type ${capId}UnitLayer = never;
export type ${capId}ArtifactLayer = never;
export type ${capId}TerrainLayer = never;
export type ${capId}Layer = CommonLayer;
export type ${capId}Generator = never;
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
  const bsig = typeSignature("Board", gameId);
  fs.writeFileSync(
    path.join(defPath, "board.ts"),
    `import {Board} from '../../types';
import { ${bsig} } from './_types';

const ${capId}Board: Board<${bsig}> = {
  height: 666,
  width: 666,
  terrain: {

  }
};

export default ${capId}Board;
`
  );

  // --------- GRAPHICS ----------
  const gsig = typeSignature("Graphics", gameId);
  fs.writeFileSync(
    path.join(defPath, "graphics.ts"),
    `import {Graphics} from '../../types';
import { ${gsig} } from './_types';

const ${capId}Graphics: Graphics<${gsig}> = {
  icons: {

  },
  tiles: {

  }
};

export default ${capId}Graphics;
`
  );

  // --------- INSTRUCTIONS ----------
  const isig = typeSignature("Instructions", gameId);
  fs.writeFileSync(
    path.join(defPath, "instructions.ts"),
    `import {Instructions} from '../../types';
import { ${isig} } from './_types';

const ${capId}Instructions: Instructions<${isig}> = {

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
  const rsig = typeSignature("Definition", gameId);
  fs.writeFileSync(
    path.join(defPath, "rules.ts"),
    `import {Definition} from '../../types';
import { ${rsig} } from './_types';

const ${capId}Rules: Rules<${rsig}> = {
  startTurn: {

  },
  commands: {

  },
  marks: {

  }
};

export default ${capId}Rules;
`
  );

  // ----------- GENERATORS --------------
  const gensig = typeSignature("Generators", gameId);
  fs.writeFileSync(
    path.join(defPath, "generators.ts"),
    `import {Generators} from '../../types';
import { ${rsig} } from './_types';

const ${capId}Generators: Generators<${rsig}> = {

};

export default ${capId}Generators;
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
  const ssig = typeSignature("Setup", gameId);
  fs.writeFileSync(
    path.join(defPath, "scripts.ts"),
    `import {Setup} from '../../types';

import {${ssig} } from './_types';

const ${capId}Setup: Setup<${ssig}> = {

};

export default ${capId}Setup;
`
  );
}
