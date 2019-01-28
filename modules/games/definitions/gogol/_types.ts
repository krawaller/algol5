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
export type GogolTerrainLayer = "homerow" | "myhomerow" | "opphomerow" | "edges" | "nohomerow" | "noedges";
export type GogolLayer = CommonLayer | GogolUnitLayer | GogolArtifactLayer | GogolTerrainLayer;
export type GogolBattlePos = any;
export type GogolBattleVar = any;
export type GogolTurnPos = any;
export type GogolTurnVar = any;
 
export type GogolGenerators = Generators<GogolArtifactLayer, GogolBattlePos, GogolBattleVar, GogolCommand, GogolGenerator, GogolGrid, GogolLayer, GogolMark, GogolTurnPos, GogolTurnVar>;
export type GogolFlow = Flow<GogolBattlePos, GogolBattleVar, GogolCommand, GogolGenerator, GogolGrid, GogolLayer, GogolMark, GogolTurnPos, GogolTurnVar, GogolUnit>;
export type GogolBoard = Board<GogolPosition, GogolTerrain>;
export type GogolAI = AI<GogolAiArtifactLayer, GogolAiAspect, GogolAiBrain, GogolAiGenerator, GogolAiGrid, GogolAiTerrain, GogolAiTerrainLayer, GogolBattlePos, GogolBattleVar, GogolCommand, GogolGrid, GogolLayer, GogolMark, GogolTurnPos, GogolTurnVar>;
export type GogolGraphics = Graphics<GogolTerrain, GogolUnit>;
export type GogolInstructions = Instructions<GogolBattlePos, GogolBattleVar, GogolCommand, GogolGrid, GogolLayer, GogolMark, GogolPhase, GogolTurnPos, GogolTurnVar, GogolUnit>;
export type GogolMeta = Meta;
export type GogolScripts = GameTestSuite;
export type GogolSetup = Setup<GogolPosition, GogolUnit>;

export type GogolDefinition = FullDef<GogolAiArtifactLayer, GogolAiAspect, GogolAiBrain, GogolAiGenerator, GogolAiGrid, GogolAiTerrain, GogolAiTerrainLayer, GogolArtifactLayer, GogolBattlePos, GogolBattleVar, GogolCommand, GogolGenerator, GogolGrid, GogolLayer, GogolMark, GogolPhase, GogolPosition, GogolTerrain, GogolTurnPos, GogolTurnVar, GogolUnit>;

export type GogolGrid = never;

export type GogolAiGenerator = never;

export type GogolAiAspect = never;

export type GogolAiGrid = never;

export type GogolAiArtifactLayer = never;

export type GogolAiBrain = never;

export type GogolAiTerrainLayer = never;

export type GogolAiTerrain = never;

export type GogolPosition = "a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" | "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7" | "d8" | "e1" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "e8" | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "g1" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "g8" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8";
