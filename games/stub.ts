const fs = require("fs-extra");
const path = require("path");

import { typeSignature } from "./types";

async function stubAI(gameId) {
  await fs.writeFile(
    path.join(__dirname, "./definitions", gameId, "ai.ts"),
    `import {AI} from '../../types';

const ${gameId}AI: AI = {};

export default ${gameId}AI;
`
  );
}

async function stubAnalysis(gameId) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  await fs.writeFile(
    path.join(__dirname, "./definitions", gameId, "_types.ts"),
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
}

async function stubBoard(gameId) {
  const bsig = typeSignature("Board", gameId);
  await fs.writeFile(
    path.join(__dirname, "./definitions", gameId, "board.ts"),
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
}

async function stubGraphics(gameId) {
  const gsig = typeSignature("Graphics", gameId);
  await fs.writeFile(
    path.join(__dirname, "./definitions", gameId, "graphics.ts"),
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
}

async function stubInstructions(gameId) {
  const isig = typeSignature("Instructions", gameId);
  await fs.writeFile(
    path.join(__dirname, "./definitions", gameId, "instructions.ts"),
    `import {Instructions} from '../../types';
import { ${isig} } from './_types';

const ${gameId}Instructions: Instructions<${isig}> = {

};

export default ${gameId}Instructions;
`
  );
}

async function stubMeta(gameId) {
  await fs.writeFile(
    path.join(__dirname, "./definitions", gameId, "meta.ts"),
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
}

async function stubFlow(gameId) {
  const fsig = typeSignature("Flow", gameId);
  await fs.writeFile(
    path.join(__dirname, "./definitions", gameId, "flow.ts"),
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
}

async function stubGenerators(gameId) {
  const gensig = typeSignature("Generators", gameId);
  await fs.writeFile(
    path.join(__dirname, "./definitions", gameId, "generators.ts"),
    `import {Generators} from '../../types';
import { ${gensig} } from './_types';

const ${gameId}Generators: Generators<${gensig}> = {

};

export default ${gameId}Generators;
`
  );
}

async function stubScripts(gameId) {
  await fs.writeFile(
    path.join(__dirname, "./definitions", gameId, "scripts.ts"),
    `import {GameTestSuite} from '../../types';

const ${gameId}Tests: GameTestSuite = {

};

export default ${gameId}Tests;
`
  );
}

async function stubSetup(gameId) {
  const ssig = typeSignature("Setup", gameId);
  await fs.writeFile(
    path.join(__dirname, "./definitions", gameId, "setup.ts"),
    `import {Setup} from '../../types';
import { ${ssig} } from './_types';

const ${gameId}Setup: Setup<${ssig}> = {

};

export default ${gameId}Setup;
`
  );
}

export default async function stub(gameId) {
  await fs.ensureDir(path.join(__dirname, "./definitions", gameId));
  await Promise.all([
    stubAI(gameId),
    stubAnalysis(gameId),
    stubBoard(gameId),
    stubFlow(gameId),
    stubGenerators(gameId),
    stubGraphics(gameId),
    stubInstructions(gameId),
    stubMeta(gameId),
    stubScripts(gameId),
    stubSetup(gameId)
  ]);
  return console.log("Stubbed", gameId);
}
