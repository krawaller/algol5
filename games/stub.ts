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

const ${gameId}AI: AI = {};

export default ${gameId}AI;
`
  );

  // --------- BOARD ----------
  const bsig = typeSignature("Board", gameId);
  fs.writeFileSync(
    path.join(defPath, "board.ts"),
    `import {Board} from '../../types';
import { ${bsig} } from './_types';

const ${gameId}Board: Board<${bsig}> = {
  height: 666,
  width: 666,
  terrain: {

  }
};

export default ${gameId}Board;
`
  );

  // --------- GRAPHICS ----------
  const gsig = typeSignature("Graphics", gameId);
  fs.writeFileSync(
    path.join(defPath, "graphics.ts"),
    `import {Graphics} from '../../types';
import { ${gsig} } from './_types';

const ${gameId}Graphics: Graphics<${gsig}> = {
  icons: {

  },
  tiles: {

  }
};

export default ${gameId}Graphics;
`
  );

  // --------- INSTRUCTIONS ----------
  const isig = typeSignature("Instructions", gameId);
  fs.writeFileSync(
    path.join(defPath, "instructions.ts"),
    `import {Instructions} from '../../types';
import { ${isig} } from './_types';

const ${gameId}Instructions: Instructions<${isig}> = {

};

export default ${gameId}Instructions;
`
  );

  // ------------ META ----------------
  fs.writeFileSync(
    path.join(defPath, "meta.ts"),
    `import {Meta} from '../../types';

const ${gameId}Meta: Meta = {
  id: "${gameId}",
  name: "",
  tags: [],
  tagline: "",
};

export default ${gameId}Meta;
`
  );

  // ----------- FLOW --------------
  const fsig = typeSignature("Flow", gameId);
  fs.writeFileSync(
    path.join(defPath, "flow.ts"),
    `import {Flow} from '../../types';
import { ${fsig} } from './_types';

const ${gameId}Flow: Flow<${fsig}> = {
  startTurn: {

  },
  commands: {

  },
  marks: {

  }
};

export default ${gameId}Flow;
`
  );

  // ----------- GENERATORS --------------
  const gensig = typeSignature("Generators", gameId);
  fs.writeFileSync(
    path.join(defPath, "generators.ts"),
    `import {Generators} from '../../types';
import { ${gensig} } from './_types';

const ${gameId}Generators: Generators<${gensig}> = {

};

export default ${gameId}Generators;
`
  );

  // ------------ SCRIPTS ------------
  fs.writeFileSync(
    path.join(defPath, "scripts.ts"),
    `import {GameTestSuite} from '../../types';

const ${gameId}Tests: GameTestSuite = {

};

export default ${gameId}Tests;
`
  );

  // ------------ SETUP -------------
  const ssig = typeSignature("Setup", gameId);
  fs.writeFileSync(
    path.join(defPath, "setup.ts"),
    `import {Setup} from '../../types';

import {${ssig} } from './_types';

const ${gameId}Setup: Setup<${ssig}> = {

};

export default ${gameId}Setup;
`
  );
}
