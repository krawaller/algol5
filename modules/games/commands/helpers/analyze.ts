import * as fs from "fs-extra";
import * as path from "path";

import fake from "./fake";

import { FullDef, typeSignature } from "../../../types";
import dateStamp from "./datestamp";

import { defPath } from "./_paths";

function ownify(u) {
  return [u, "my" + u, "neutral" + u, "opp" + u];
}

function possibles(def) {
  if (typeof def === "string") return [def];
  if (def.ifplayer) {
    return def.ifplayer[1];
  }
  if (def.playercase) {
    return possibles(def.playercase[0]).concat(possibles(def.playercase[1]));
  }
  if (def.if) {
    return def.if[1];
  }
  if (def.ifelse) {
    return possibles(def.ifelse[1]).concat(possibles(def.ifelse[2]));
  }
  if (def.indexlist) {
    const [indexer, ...values] = def.indexlist;
    return values.reduce((mem, v) => mem.concat(possibles(v)), []);
  }

  return def;
}

function getArtifactLayers(generators = {}) {
  const generatorNames = Object.keys(generators);
  let artifactLayers = [];

  for (let g of generatorNames) {
    const gen = generators[g];
    const draws = gen.type === "filter" ? { filter: gen } : gen.draw;
    for (let d of Object.keys(draws)) {
      const draw = draws[d];
      for (let l of possibles(draw.tolayer)) {
        if (draw.include && draw.include.owner) {
          artifactLayers = artifactLayers.concat(ownify(l));
        } else {
          artifactLayers = artifactLayers.concat(l);
        }
      }
    }
  }
  return artifactLayers.filter((l, n) => artifactLayers.indexOf(l) === n);
}

function getTerrainLayers(terrains = {}) {
  let terrainLayers = [];
  const terrainNames = Object.keys(terrains);
  for (let tname of terrainNames) {
    const t = terrains[tname];
    terrainLayers.push(tname);
    terrainLayers.push("no" + tname);
    if (!Array.isArray(t)) {
      if (t[0]) terrainLayers.push("neutral" + tname);
      if (t[1] || t[2]) {
        terrainLayers.push("my" + tname);
        terrainLayers.push("opp" + tname);
      }
    }
  }
  return terrainLayers;
}

export default async function analyze(def: FullDef | string) {
  if (typeof def === "string") {
    await fake(def);
    def = require(path.join(defPath, def)).default as FullDef;
  }
  const gameId = def.meta.id;
  const gameDefPath = path.join(defPath, gameId);
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  const { board, graphics, generators, flow } = def;
  const terrains = Object.keys(board.terrain || {});
  const units = Object.keys(graphics.icons);
  const marks = Object.keys(flow.marks);
  const commands = Object.keys(flow.commands);
  const nonEndCommands = commands.filter(c => {
    let cdef = flow.commands[c];
    let defs = [].concat(cdef.link || []).concat(cdef.links || []);
    let poss = defs.reduce((mem, d) => mem.concat(possibles(d)), []);
    return poss.filter(l => l !== "endturn").length > 0;
  });

  const unitLayers = units.reduce((mem, u) => mem.concat(ownify(u)), []);

  let terrainLayers = getTerrainLayers(def.board.terrain);

  const artifactLayers = getArtifactLayers(def.generators);
  const generatorNames = Object.keys(generators);

  const origAI = def.AI;
  const AI: typeof origAI = {
    brains: {},
    generators: {},
    aspects: {},
    grids: {},
    terrain: {},
    ...def.AI
  };

  const aiTerrainNames = Object.keys(AI.terrain);
  const aiTerrainLayers = getTerrainLayers(AI.terrain);
  const aiGenerators = Object.keys(AI.generators);
  const aiAspects = Object.keys(AI.aspects);
  const aiGrids = Object.keys(AI.grids);
  const aiBrains = Object.keys(AI.brains);
  const aiArtifactLayers = getArtifactLayers(AI.generators);

  const analysis = `import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type ${capId}Terrain = ${
    terrains.length ? terrains.map(t => `"${t}"`).join(" | ") : "never"
  };
export type ${capId}Unit = ${
    units.length ? units.map(t => `"${t}"`).join(" | ") : "never"
  };
export type ${capId}Mark = ${
    marks.length ? marks.map(t => `"${t}"`).join(" | ") : "never"
  };
export type ${capId}Command = ${
    commands.length ? commands.map(t => `"${t}"`).join(" | ") : "never"
  };
export type ${capId}PhaseCommand = ${
    nonEndCommands.length
      ? nonEndCommands.map(t => `"${t}"`).join(" | ")
      : "never"
  };
export type ${capId}Phase = "startTurn" | ${capId}Mark${
    nonEndCommands.length ? ` | ${capId}PhaseCommand` : ""
  };
export type ${capId}UnitLayer = ${
    unitLayers.length ? unitLayers.map(t => `"${t}"`).join(" | ") : "never"
  };
export type ${capId}Generator = ${
    generatorNames.length
      ? generatorNames.map(t => `"${t}"`).join(" | ")
      : "never"
  };
export type ${capId}ArtifactLayer = ${
    artifactLayers.length
      ? artifactLayers.map(t => `"${t}"`).join(" | ")
      : "never"
  };
export type ${capId}TerrainLayer = ${
    terrainLayers.length
      ? terrainLayers.map(t => `"${t}"`).join(" | ")
      : "never"
  };
export type ${capId}Layer = CommonLayer${
    unitLayers.length ? ` | ${capId}UnitLayer` : ""
  }${artifactLayers.length ? ` | ${capId}ArtifactLayer` : ""}${
    terrainLayers.length ? ` | ${capId}TerrainLayer` : ""
  };
export type ${capId}BattlePos = any;
export type ${capId}BattleVar = any;
export type ${capId}TurnPos = any;
export type ${capId}TurnVar = any;
 
export type ${capId}Generators = Generators<${typeSignature(
    "Generators",
    gameId
  )}>;
export type ${capId}Flow = Flow<${typeSignature("Flow", gameId)}>;
export type ${capId}Board = Board<${typeSignature("Board", gameId)}>;
export type ${capId}AI = AI<${typeSignature("AI", gameId)}>;
export type ${capId}Graphics = Graphics<${typeSignature("Graphics", gameId)}>;
export type ${capId}Instructions = Instructions<${typeSignature(
    "Instructions",
    gameId
  )}>;
export type ${capId}Meta = Meta;
export type ${capId}Scripts = GameTestSuite;
export type ${capId}Setup = Setup<${typeSignature("Setup", gameId)}>;

export type ${capId}Definition = FullDef<${typeSignature("FullDef", gameId)}>;

export type ${capId}AiGenerator = ${
    aiGenerators.length ? aiGenerators.map(t => `"${t}"`).join(" | ") : "never"
  };

export type ${capId}AiAspect = ${
    aiAspects.length ? aiAspects.map(t => `"${t}"`).join(" | ") : "never"
  };

export type ${capId}AiGrid = ${
    aiGrids.length ? aiGrids.map(t => `"${t}"`).join(" | ") : "never"
  };

export type ${capId}AiArtifactLayer = ${
    aiArtifactLayers.length
      ? aiArtifactLayers.map(t => `"${t}"`).join(" | ")
      : "never"
  };

export type ${capId}AiBrain = ${
    aiBrains.length ? aiBrains.map(t => `"${t}"`).join(" | ") : "never"
  };

export type ${capId}AiTerrainLayer = ${
    aiTerrainLayers.length
      ? aiTerrainLayers.map(t => `"${t}"`).join(" | ")
      : "never"
  };

export type ${capId}AiTerrain = ${
    aiTerrainNames.length
      ? aiTerrainNames.map(t => `"${t}"`).join(" | ")
      : "never"
  };
`;

  await fs.writeFile(path.join(gameDefPath, "_types.ts"), analysis);
  console.log("Analysed", gameId);
  dateStamp();
}
