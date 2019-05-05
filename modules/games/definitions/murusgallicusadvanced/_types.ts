import { CommonLayer, Generators, Flow, AlgolBoard, AI, AlgolAnim, Graphics, Instructions, AlgolMeta, Setup, GameTestSuite, FullDef, AlgolPerformance } from '../../../types';

export type MurusgallicusadvancedBoardHeight = 7;
export type MurusgallicusadvancedBoardWidth = 8;

export type MurusgallicusadvancedAnim = AlgolAnim<MurusgallicusadvancedBattlePos, MurusgallicusadvancedBattleVar, MurusgallicusadvancedCommand, MurusgallicusadvancedGrid, MurusgallicusadvancedLayer, MurusgallicusadvancedMark, MurusgallicusadvancedTurnPos, MurusgallicusadvancedTurnVar, MurusgallicusadvancedUnit>;

export type MurusgallicusadvancedTerrain = "homerow";
export type MurusgallicusadvancedUnit = "towers" | "walls" | "catapults";
export type MurusgallicusadvancedMark = "selecttower" | "selectmove" | "selectcrush" | "selectcatapult" | "selectfire";
export type MurusgallicusadvancedCommand = "move" | "crush" | "sacrifice" | "fire";
export type MurusgallicusadvancedPhaseCommand = never;
export type MurusgallicusadvancedPhase = "startTurn" | MurusgallicusadvancedMark;
export type MurusgallicusadvancedUnitLayer = "units" | "myunits" | "oppunits" | "towers" | "mytowers" | "opptowers" | "walls" | "mywalls" | "oppwalls" | "catapults" | "mycatapults" | "oppcatapults";
export type MurusgallicusadvancedGenerator = "findfiretargets" | "findmovetargets" | "findmoveresults" | "findcrushtargets";
export type MurusgallicusadvancedArtifactLayer = "firetargets" | "movetargets" | "madecatapults" | "madetowers" | "madewalls" | "crushtargets";
export type MurusgallicusadvancedTerrainLayer = "homerow" | "myhomerow" | "opphomerow" | "nohomerow";
export type MurusgallicusadvancedLayer = CommonLayer | MurusgallicusadvancedUnitLayer | MurusgallicusadvancedArtifactLayer | MurusgallicusadvancedTerrainLayer;
export type MurusgallicusadvancedBattlePos = any;
export type MurusgallicusadvancedBattleVar = any;
export type MurusgallicusadvancedTurnPos = any;
export type MurusgallicusadvancedTurnVar = any;
 
export type MurusgallicusadvancedGenerators = Generators<MurusgallicusadvancedArtifactLayer, MurusgallicusadvancedBattlePos, MurusgallicusadvancedBattleVar, MurusgallicusadvancedCommand, MurusgallicusadvancedGenerator, MurusgallicusadvancedGrid, MurusgallicusadvancedLayer, MurusgallicusadvancedMark, MurusgallicusadvancedTurnPos, MurusgallicusadvancedTurnVar>;
export type MurusgallicusadvancedFlow = Flow<MurusgallicusadvancedBattlePos, MurusgallicusadvancedBattleVar, MurusgallicusadvancedCommand, MurusgallicusadvancedGenerator, MurusgallicusadvancedGrid, MurusgallicusadvancedLayer, MurusgallicusadvancedMark, MurusgallicusadvancedTurnPos, MurusgallicusadvancedTurnVar, MurusgallicusadvancedUnit>;
export type MurusgallicusadvancedBoard = AlgolBoard<MurusgallicusadvancedBoardHeight, MurusgallicusadvancedBoardWidth, MurusgallicusadvancedGrid, MurusgallicusadvancedPosition, MurusgallicusadvancedTerrain>;
export type MurusgallicusadvancedAI = AI<MurusgallicusadvancedAiArtifactLayer, MurusgallicusadvancedAiAspect, MurusgallicusadvancedAiBrain, MurusgallicusadvancedAiGenerator, MurusgallicusadvancedAiGrid, MurusgallicusadvancedAiTerrain, MurusgallicusadvancedAiTerrainLayer, MurusgallicusadvancedBattlePos, MurusgallicusadvancedBattleVar, MurusgallicusadvancedBoardHeight, MurusgallicusadvancedBoardWidth, MurusgallicusadvancedCommand, MurusgallicusadvancedGrid, MurusgallicusadvancedLayer, MurusgallicusadvancedMark, MurusgallicusadvancedPosition, MurusgallicusadvancedTurnPos, MurusgallicusadvancedTurnVar>;
export type MurusgallicusadvancedGraphics = Graphics<MurusgallicusadvancedTerrain, MurusgallicusadvancedUnit>;
export type MurusgallicusadvancedInstructions = Instructions<MurusgallicusadvancedBattlePos, MurusgallicusadvancedBattleVar, MurusgallicusadvancedCommand, MurusgallicusadvancedGrid, MurusgallicusadvancedLayer, MurusgallicusadvancedMark, MurusgallicusadvancedPhase, MurusgallicusadvancedTurnPos, MurusgallicusadvancedTurnVar, MurusgallicusadvancedUnit>;
export type MurusgallicusadvancedMeta = AlgolMeta<MurusgallicusadvancedCommand, MurusgallicusadvancedMark>;
export type MurusgallicusadvancedPerformance = AlgolPerformance<MurusgallicusadvancedCommand, MurusgallicusadvancedMark>;
export type MurusgallicusadvancedScripts = GameTestSuite;
export type MurusgallicusadvancedSetup = Setup<MurusgallicusadvancedPosition, MurusgallicusadvancedUnit>;

export type MurusgallicusadvancedDefinition = FullDef<MurusgallicusadvancedAiArtifactLayer, MurusgallicusadvancedAiAspect, MurusgallicusadvancedAiBrain, MurusgallicusadvancedAiGenerator, MurusgallicusadvancedAiGrid, MurusgallicusadvancedAiTerrain, MurusgallicusadvancedAiTerrainLayer, MurusgallicusadvancedArtifactLayer, MurusgallicusadvancedBattlePos, MurusgallicusadvancedBattleVar, MurusgallicusadvancedBoardHeight, MurusgallicusadvancedBoardWidth, MurusgallicusadvancedCommand, MurusgallicusadvancedGenerator, MurusgallicusadvancedGrid, MurusgallicusadvancedLayer, MurusgallicusadvancedMark, MurusgallicusadvancedPhase, MurusgallicusadvancedPosition, MurusgallicusadvancedTerrain, MurusgallicusadvancedTurnPos, MurusgallicusadvancedTurnVar, MurusgallicusadvancedUnit>;

export type MurusgallicusadvancedGrid = never;

export type MurusgallicusadvancedAiGenerator = never;

export type MurusgallicusadvancedAiAspect = never;

export type MurusgallicusadvancedAiGrid = never;

export type MurusgallicusadvancedAiArtifactLayer = never;

export type MurusgallicusadvancedAiBrain = never;

export type MurusgallicusadvancedAiTerrainLayer = never;

export type MurusgallicusadvancedAiTerrain = never;

export type MurusgallicusadvancedPosition = "a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7" | "e1" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "g1" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7";
