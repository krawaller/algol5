import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type GogolTerrain = "homerow" | "edges";
export type GogolUnit = "kings" | "soldiers";
export type GogolMark = "selectkingdeploy" | "selectunit" | "selectmovetarget" | "selectjumptarget";
export type GogolCommand = "deploy" | "move" | "jump";
export type GogolPhaseCommand = never;
export type GogolPhase = "startTurn" | GogolMark;
export type GogolUnitLayer = "kings" | "mykings" | "neutralkings" | "oppkings" | "soldiers" | "mysoldiers" | "neutralsoldiers" | "oppsoldiers";
export type GogolGenerator = "findforbiddenkingspots" | "findforbiddensoldierspots" | "findkingwalktargets" | "findadjacentenemies" | "findsplashed" | "findjumptargets";
export type GogolArtifactLayer = "nokings" | "nosoldiers" | "kingwalk" | "adjacentenemies" | "splashed" | "willdie" | "jumptargets";
export type GogolTerrainLayer = "homerow" | "nohomerow" | "myhomerow" | "opphomerow" | "edges" | "noedges";
export type GogolLayer = CommonLayer | GogolUnitLayer | GogolArtifactLayer | GogolTerrainLayer;
export type GogolBattlePos = any;
export type GogolBattleVar = any;
export type GogolTurnPos = any;
export type GogolTurnVar = any;
 
export type GogolGenerators = Generators<GogolArtifactLayer, GogolBattlePos, GogolBattleVar, GogolCommand, GogolGenerator, GogolLayer, GogolMark, GogolTurnPos, GogolTurnVar>;
export type GogolFlow = Flow<GogolBattlePos, GogolBattleVar, GogolCommand, GogolGenerator, GogolLayer, GogolMark, GogolTurnPos, GogolTurnVar, GogolUnit>;
export type GogolBoard = Board<GogolTerrain>;
export type GogolAI = AI<GogolAiArtifactLayer, GogolAiAspect, GogolAiBrain, GogolAiGenerator, GogolAiGrid, GogolAiTerrain, GogolAiTerrainLayer, GogolBattlePos, GogolBattleVar, GogolCommand, GogolLayer, GogolMark, GogolTurnPos, GogolTurnVar>;
export type GogolGraphics = Graphics<GogolTerrain, GogolUnit>;
export type GogolInstructions = Instructions<GogolBattlePos, GogolBattleVar, GogolCommand, GogolLayer, GogolMark, GogolPhase, GogolTurnPos, GogolTurnVar, GogolUnit>;
export type GogolMeta = Meta;
export type GogolScripts = GameTestSuite;
export type GogolSetup = Setup<GogolUnit>;

export type GogolDefinition = FullDef<GogolAiArtifactLayer, GogolAiAspect, GogolAiBrain, GogolAiGenerator, GogolAiGrid, GogolAiTerrain, GogolAiTerrainLayer, GogolArtifactLayer, GogolBattlePos, GogolBattleVar, GogolCommand, GogolGenerator, GogolLayer, GogolMark, GogolPhase, GogolTerrain, GogolTurnPos, GogolTurnVar, GogolUnit>;

export type GogolAiGenerator = never;

export type GogolAiAspect = never;

export type GogolAiGrid = never;

export type GogolAiArtifactLayer = never;

export type GogolAiBrain = never;

export type GogolAiTerrainLayer = never;

export type GogolAiTerrain = never;
