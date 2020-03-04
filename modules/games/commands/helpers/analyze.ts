import * as fs from "fs-extra";
import * as path from "path";
import prettier from "prettier";
import fake from "./fake";

import {
  FullDefAnon,
  typeSignature,
  isAlgolPosTurnPos,
  isAlgolPosBattlePos,
  isAlgolValBattleVar,
  isAlgolValTurnVar,
  AlgolLinkAnon,
} from "../../../types";
import {
  boardPositions,
  terrainLayerNames,
  possibilities,
  emptyArtifactLayers,
  find,
  terrainLayerNamesForBook,
} from "../../../common";
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
  const { boards, graphics, generators, flow } = def;
  const { maxHeight, maxWidth } = Object.values(boards).reduce(
    (memo, board) => ({
      maxHeight: Math.max(memo.maxHeight, board.height),
      maxWidth: Math.max(memo.maxWidth, board.width),
    }),
    { maxHeight: 0, maxWidth: 0 }
  );
  const terrains = Array.from(
    new Set(
      Object.values(boards).flatMap(board => Object.keys(board.terrain || {}))
    )
  );
  const units = Object.keys(graphics.icons);
  const marks = Object.keys(flow.marks);
  const commands = Object.keys(flow.commands);
  const nonEndCommands = commands.filter(c => {
    let cdef = flow.commands[c];
    let defs: AlgolLinkAnon[] = [];
    if (cdef.link) defs.push(cdef.link);
    if (cdef.links) defs.push(...cdef.links);
    let poss: string[] = defs.reduce(
      (mem, d) => mem.concat(possibilities(d)),
      [] as string[]
    );
    return poss.filter(l => l !== "endTurn").length > 0;
  });

  const myUnitLayerNames = ["units"]
    .concat(Object.keys(def.graphics.icons))
    .reduce(
      (mem, u) => mem.concat([u, `my${u}`, `opp${u}`, `neutral${u}`]),
      [] as string[]
    );
  const myTerrainLayerNames = terrainLayerNamesForBook(def.boards);
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
    ...def.AI,
  };

  const aiTerrainNames = Object.keys(AI.terrain || {});
  const aiTerrainLayers = terrainLayerNames({
    ...def.boards.basic,
    terrain: AI.terrain,
  });
  const aiGenerators = Object.keys(AI.generators || {});
  const aiAspects = Object.keys(AI.aspects);
  const aiGrids = Object.keys(AI.grids || {});
  const aiBrains = Object.keys(AI.brains);
  const aiArtifactLayerNames = Object.keys(emptyArtifactLayers(AI.generators));

  const turnpos = Array.from(
    new Set(
      find(def, isAlgolPosTurnPos).reduce(
        (mem, find) => mem.concat(possibilities(find.value.turnpos)),
        [] as string[]
      )
    )
  );
  const battlepos = Array.from(
    new Set(
      find(def, isAlgolPosBattlePos).reduce(
        (mem, find) => mem.concat(possibilities(find.value.battlepos)),
        [] as string[]
      )
    )
  );
  const turnvar = Array.from(
    new Set(
      find(def, isAlgolValTurnVar).reduce(
        (mem, find) => mem.concat(possibilities(find.value.turnvar)),
        [] as string[]
      )
    )
  );
  const battlevar = Array.from(
    new Set(
      find(def, isAlgolValBattleVar).reduce(
        (mem, find) => mem.concat(possibilities(find.value.battlevar)),
        [] as string[]
      )
    )
  );

  const boardNames = Object.keys(def.boards);
  const setupNames = Object.keys(def.setups);
  const rulesetNames = Array.from(
    new Set(Object.values(def.variants).map(v => v.ruleset))
  );
  const variantNames = Object.keys(def.variants);

  const analysis = `import { CommonLayer, Generators, Flow, AlgolBoard, AI, AlgolAnimCollection, Graphics, Instructions, AlgolMeta, AlgolSetupBook, AlgolGameTestSuite, FullDef, AlgolPerformance, AlgolVariantBook } from '../../../types';

export type ${capId}BoardHeight = ${maxHeight};
export type ${capId}BoardWidth = ${maxWidth};

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

export type ${capId}BoardName = ${boardNames.map(n => `"${n}"`).join(" | ")};
export type ${capId}SetupName = ${setupNames.map(n => `"${n}"`).join(" | ")};
export type ${capId}RulesetName = ${rulesetNames
    .map(n => `"${n}"`)
    .join(" | ")};
export type ${capId}VariantName = ${variantNames
    .map(n => `"${n}"`)
    .join(" | ")};

export type ${capId}VariantBook = AlgolVariantBook<${typeSignature(
    "AlgolVariantBook",
    gameId
  )}>;

 
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
export type ${capId}SetupBook = AlgolSetupBook<${typeSignature(
    "AlgolSetupBook",
    gameId
  )}>;

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

export type ${capId}Position = ${boardPositions(maxHeight, maxWidth)
    .map(t => `"${t}"`)
    .join(" | ")};
`;
  const code = "// Generated file, do not edit here!\n" + analysis;
  await fs.writeFile(
    path.join(gameDefPath, "_types.ts"),
    prettier.format(code, { filepath: "foo.ts" })
  );
  console.log("Analysed", gameId);
  dateStamp();
}
