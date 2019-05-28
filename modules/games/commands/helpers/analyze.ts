import * as fs from "fs-extra";
import * as path from "path";

import fake from "./fake";

import {
  FullDefAnon,
  typeSignature,
  isAlgolPosTurnPos,
  isAlgolPosBattlePos,
  isAlgolValBattleVar,
  isAlgolValTurnVar
} from "algol-types";
import {
  boardPositions,
  terrainLayerNames,
  possibilities,
  emptyArtifactLayers,
  emptyUnitLayers,
  find
} from "algol-common";
import dateStamp from "./datestamp";

import { defPath } from "./_paths";

export default async function analyze(def: FullDefAnon | string) {
  if (typeof def === "string") {
    await fake(def);
    def = require(path.join(defPath, def)).default as FullDefAnon;
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
    let poss = defs.reduce((mem, d) => mem.concat(possibilities(d)), []);
    return poss.filter(l => l !== "endTurn").length > 0;
  });

  const myUnitLayerNames = Object.keys(emptyUnitLayers(def));
  const myTerrainLayerNames = terrainLayerNames(def.board);
  const myArtifactLayerNames = Object.keys(emptyArtifactLayers(def.generators));
  const myGeneratorNames = Object.keys(generators);

  const gridNames = Object.keys(def.grids || {});

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
  const aiTerrainLayers = terrainLayerNames({
    ...def.board,
    terrain: AI.terrain
  });
  const aiGenerators = Object.keys(AI.generators);
  const aiAspects = Object.keys(AI.aspects);
  const aiGrids = Object.keys(AI.grids);
  const aiBrains = Object.keys(AI.brains);
  const aiArtifactLayerNames = Object.keys(emptyArtifactLayers(AI.generators));

  const turnpos = Array.from(
    new Set(
      find(def, isAlgolPosTurnPos).reduce(
        (mem, find) => mem.concat(possibilities(find.value.turnpos)),
        []
      )
    )
  );
  const battlepos = Array.from(
    new Set(
      find(def, isAlgolPosBattlePos).reduce(
        (mem, find) => mem.concat(possibilities(find.value.battlepos)),
        []
      )
    )
  );
  const turnvar = Array.from(
    new Set(
      find(def, isAlgolValTurnVar).reduce(
        (mem, find) => mem.concat(possibilities(find.value.turnvar)),
        []
      )
    )
  );
  const battlevar = Array.from(
    new Set(
      find(def, isAlgolValBattleVar).reduce(
        (mem, find) => mem.concat(possibilities(find.value.battlevar)),
        []
      )
    )
  );

  const analysis = `import { CommonLayer, Generators, Flow, AlgolBoard, AI, AlgolAnimCollection, Graphics, Instructions, AlgolMeta, Setup, AlgolGameTestSuite, FullDef, AlgolPerformance } from 'algol-types';

export type ${capId}BoardHeight = ${def.board.height};
export type ${capId}BoardWidth = ${def.board.width};

export type ${capId}Anim = AlgolAnimCollection<${typeSignature(
    "AlgolAnimCollection",
    gameId
  )}>;

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
    myUnitLayerNames.length
      ? myUnitLayerNames.map(t => `"${t}"`).join(" | ")
      : "never"
  };
export type ${capId}Generator = ${
    myGeneratorNames.length
      ? myGeneratorNames.map(t => `"${t}"`).join(" | ")
      : "never"
  };
export type ${capId}ArtifactLayer = ${
    myArtifactLayerNames.length
      ? myArtifactLayerNames.map(t => `"${t}"`).join(" | ")
      : "never"
  };
export type ${capId}TerrainLayer = ${
    myTerrainLayerNames.length
      ? myTerrainLayerNames.map(t => `"${t}"`).join(" | ")
      : "never"
  };
export type ${capId}Layer = CommonLayer${
    myUnitLayerNames.length ? ` | ${capId}UnitLayer` : ""
  }${myArtifactLayerNames.length ? ` | ${capId}ArtifactLayer` : ""}${
    myTerrainLayerNames.length ? ` | ${capId}TerrainLayer` : ""
  };
export type ${capId}BattlePos = ${
    battlepos.length ? battlepos.map(t => `"${t}"`).join(" | ") : "never"
  };
export type ${capId}BattleVar = ${
    battlevar.length ? battlevar.map(t => `"${t}"`).join(" | ") : "never"
  };
export type ${capId}TurnPos = ${
    turnpos.length ? turnpos.map(t => `"${t}"`).join(" | ") : "never"
  };
export type ${capId}TurnVar = ${
    turnvar.length ? turnvar.map(t => `"${t}"`).join(" | ") : "never"
  };
 
export type ${capId}Generators = Generators<${typeSignature(
    "Generators",
    gameId
  )}>;
export type ${capId}Flow = Flow<${typeSignature("Flow", gameId)}>;
export type ${capId}Board = AlgolBoard<${typeSignature("AlgolBoard", gameId)}>;
export type ${capId}AI = AI<${typeSignature("AI", gameId)}>;
export type ${capId}Graphics = Graphics<${typeSignature("Graphics", gameId)}>;
export type ${capId}Instructions = Instructions<${typeSignature(
    "Instructions",
    gameId
  )}>;
export type ${capId}Meta = AlgolMeta<${typeSignature("AlgolMeta", gameId)}>;
export type ${capId}Performance = AlgolPerformance<${typeSignature(
    "AlgolPerformance",
    gameId
  )}>;
export type ${capId}Scripts = AlgolGameTestSuite<${typeSignature(
    "AlgolGameTestSuite",
    gameId
  )}>;
export type ${capId}Setup = Setup<${typeSignature("Setup", gameId)}>;

export type ${capId}Definition = FullDef<${typeSignature("FullDef", gameId)}>;

export type ${capId}Grid = ${
    gridNames.length ? gridNames.map(t => `"${t}"`).join(" | ") : "never"
  };

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
    aiArtifactLayerNames.length
      ? aiArtifactLayerNames.map(t => `"${t}"`).join(" | ")
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

export type ${capId}Position = ${boardPositions(
    def.board.height,
    def.board.width
  )
    .map(t => `"${t}"`)
    .join(" | ")};
`;

  await fs.writeFile(path.join(gameDefPath, "_types.ts"), analysis);
  console.log("Analysed", gameId);
  dateStamp();
}
