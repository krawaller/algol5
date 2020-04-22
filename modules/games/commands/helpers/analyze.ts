import * as fs from "fs-extra";
import * as path from "path";
import prettier from "prettier";
import fake from "./fake";

import {
  FullDefAnon,
  AlgolLinkAnon,
  isAlgolEffectSetTurnPos,
  isAlgolEffectSetBattlePos,
  isAlgolEffectSetTurnVar,
  isAlgolEffectSetBattleVar,
} from "../../../types";
import {
  boardPositions,
  terrainLayerNames,
  possibilities,
  emptyArtifactLayers,
  find,
  terrainLayerNamesForBook,
  rulesetNames,
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
    //terrain: AI.terrain, // TODO - AI terrain, how to handle
  });
  const aiGenerators = Object.keys(AI.generators || {});
  const aiAspects = Object.keys(AI.aspects);
  const aiGrids = Object.keys(AI.grids || {});
  const aiBrains = Object.keys(AI.brains);
  const aiArtifactLayerNames = Object.keys(emptyArtifactLayers(AI.generators));

  const turnpos = Array.from(
    new Set(
      find(def, isAlgolEffectSetTurnPos).reduce(
        (mem, find) => mem.concat(possibilities(find.value.setturnpos[0])),
        [] as string[]
      )
    )
  );
  const battlepos = Array.from(
    new Set(
      find(def, isAlgolEffectSetBattlePos).reduce(
        (mem, find) => mem.concat(possibilities(find.value.setbattlepos[0])),
        [] as string[]
      )
    )
  );
  const turnvar = Array.from(
    new Set(
      find(def, isAlgolEffectSetTurnVar).reduce(
        (mem, find) => mem.concat(possibilities(find.value.setturnvar[0])),
        [] as string[]
      )
    )
  ).concat(turnpos);
  const battlevar = Array.from(
    new Set(
      find(def, isAlgolEffectSetBattleVar).reduce(
        (mem, find) => mem.concat(possibilities(find.value.setbattlevar[0])),
        [] as string[]
      )
    )
  ).concat(battlepos);

  const boardNames = Object.keys(def.boards);
  const setupNames = Object.keys(def.setups);
  const myRulesetNames = rulesetNames(def);
  const variantNames = def.variants.map(v => v.desc);

  const analysis = `import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type ${capId}BoardHeight = ${maxHeight};
type ${capId}BoardWidth = ${maxWidth};

type ${capId}Terrain = ${
    terrains.length ? terrains.map(t => `"${t}"`).join(" | ") : "never"
  };
type ${capId}Unit = ${
    units.length ? units.map(t => `"${t}"`).join(" | ") : "never"
  };
type ${capId}Mark = ${
    marks.length ? marks.map(t => `"${t}"`).join(" | ") : "never"
  };
type ${capId}Command = ${
    commands.length ? commands.map(t => `"${t}"`).join(" | ") : "never"
  };
type ${capId}PhaseCommand = ${
    nonEndCommands.length
      ? nonEndCommands.map(t => `"${t}"`).join(" | ")
      : "never"
  };
type ${capId}Phase = "startTurn" | ${capId}Mark${
    nonEndCommands.length ? ` | ${capId}PhaseCommand` : ""
  };
type ${capId}UnitLayer = ${
    myUnitLayerNames.length
      ? myUnitLayerNames.map(t => `"${t}"`).join(" | ")
      : "never"
  };
type ${capId}Generator = ${
    myGeneratorNames.length
      ? myGeneratorNames.map(t => `"${t}"`).join(" | ")
      : "never"
  };
type ${capId}ArtifactLayer = ${
    myArtifactLayerNames.length
      ? myArtifactLayerNames.map(t => `"${t}"`).join(" | ")
      : "never"
  };
type ${capId}TerrainLayer = ${
    myTerrainLayerNames.length
      ? myTerrainLayerNames.map(t => `"${t}"`).join(" | ")
      : "never"
  };
type ${capId}Layer = CommonLayer${
    myUnitLayerNames.length ? ` | ${capId}UnitLayer` : ""
  }${myArtifactLayerNames.length ? ` | ${capId}ArtifactLayer` : ""}${
    myTerrainLayerNames.length ? ` | ${capId}TerrainLayer` : ""
  };
type ${capId}BattlePos = ${
    battlepos.length ? battlepos.map(t => `"${t}"`).join(" | ") : "never"
  };
type ${capId}BattleVar = ${
    battlevar.length ? battlevar.map(t => `"${t}"`).join(" | ") : "never"
  };
type ${capId}TurnPos = ${
    turnpos.length ? turnpos.map(t => `"${t}"`).join(" | ") : "never"
  };
type ${capId}TurnVar = ${
    turnvar.length ? turnvar.map(t => `"${t}"`).join(" | ") : "never"
  };

type ${capId}BoardName = ${boardNames.map(n => `"${n}"`).join(" | ")};
type ${capId}SetupName = ${setupNames.map(n => `"${n}"`).join(" | ")};
type ${capId}RulesetName = ${myRulesetNames.map(n => `"${n}"`).join(" | ")};
type ${capId}VariantName = ${variantNames.map(n => `"${n}"`).join(" | ")};

type ${capId}Grid = ${
    gridNames.length ? gridNames.map(t => `"${t}"`).join(" | ") : "never"
  };

type ${capId}Position = ${boardPositions(maxHeight, maxWidth)
    .map(t => `"${t}"`)
    .join(" | ")};

export type ${capId}Blob = AlgolGameBlob<
  ${capId}ArtifactLayer,
  ${capId}BoardName,
  ${capId}BattlePos,
  ${capId}BattleVar,
  ${capId}Command,
  ${capId}Generator,
  ${capId}Grid,
  ${capId}Layer,
  ${capId}Mark,
  ${capId}Phase,
  ${capId}Position,
  ${capId}RulesetName,
  ${capId}SetupName,
  ${capId}Terrain,
  ${capId}TurnPos,
  ${capId}TurnVar,
  ${capId}Unit
>;

export type ${capId}Definition = FullDef<${capId}Blob>;
`;
  const code = "// Generated file, do not edit here!\n" + analysis;
  await fs.writeFile(
    path.join(gameDefPath, "_types.ts"),
    prettier.format(code, { filepath: "foo.ts" })
  );
  console.log("Analysed", gameId);
  dateStamp();
}
