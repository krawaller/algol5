import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type MurusgallicusTerrain = "homerow";
export type MurusgallicusUnit = "towers" | "walls";
export type MurusgallicusMark = "selecttower" | "selectmove" | "selectkill";
export type MurusgallicusCommand = "move" | "kill";
export type MurusgallicusPhaseCommand = never;
export type MurusgallicusPhase = "startTurn" | MurusgallicusMark;
export type MurusgallicusUnitLayer = "towers" | "mytowers" | "neutraltowers" | "opptowers" | "walls" | "mywalls" | "neutralwalls" | "oppwalls";
export type MurusgallicusGenerator = "findmovetargets" | "findmoveresults" | "findkilltargets";
export type MurusgallicusArtifactLayer = "movetargets" | "madetowers" | "madewalls" | "killtargets";
export type MurusgallicusTerrainLayer = "homerow" | "myhomerow" | "opphomerow" | "nohomerow";
export type MurusgallicusLayer = CommonLayer | MurusgallicusUnitLayer | MurusgallicusArtifactLayer | MurusgallicusTerrainLayer;
export type MurusgallicusBattlePos = any;
export type MurusgallicusBattleVar = any;
export type MurusgallicusTurnPos = any;
export type MurusgallicusTurnVar = any;
 
export type MurusgallicusGenerators = Generators<MurusgallicusArtifactLayer, MurusgallicusBattlePos, MurusgallicusBattleVar, MurusgallicusCommand, MurusgallicusGenerator, MurusgallicusGrid, MurusgallicusLayer, MurusgallicusMark, MurusgallicusTurnPos, MurusgallicusTurnVar>;
export type MurusgallicusFlow = Flow<MurusgallicusBattlePos, MurusgallicusBattleVar, MurusgallicusCommand, MurusgallicusGenerator, MurusgallicusGrid, MurusgallicusLayer, MurusgallicusMark, MurusgallicusTurnPos, MurusgallicusTurnVar, MurusgallicusUnit>;
export type MurusgallicusBoard = Board<MurusgallicusPosition, MurusgallicusTerrain>;
export type MurusgallicusAI = AI<MurusgallicusAiArtifactLayer, MurusgallicusAiAspect, MurusgallicusAiBrain, MurusgallicusAiGenerator, MurusgallicusAiGrid, MurusgallicusAiTerrain, MurusgallicusAiTerrainLayer, MurusgallicusBattlePos, MurusgallicusBattleVar, MurusgallicusCommand, MurusgallicusGrid, MurusgallicusLayer, MurusgallicusMark, MurusgallicusTurnPos, MurusgallicusTurnVar>;
export type MurusgallicusGraphics = Graphics<MurusgallicusTerrain, MurusgallicusUnit>;
export type MurusgallicusInstructions = Instructions<MurusgallicusBattlePos, MurusgallicusBattleVar, MurusgallicusCommand, MurusgallicusGrid, MurusgallicusLayer, MurusgallicusMark, MurusgallicusPhase, MurusgallicusTurnPos, MurusgallicusTurnVar, MurusgallicusUnit>;
export type MurusgallicusMeta = Meta;
export type MurusgallicusScripts = GameTestSuite;
export type MurusgallicusSetup = Setup<MurusgallicusPosition, MurusgallicusUnit>;

export type MurusgallicusDefinition = FullDef<MurusgallicusAiArtifactLayer, MurusgallicusAiAspect, MurusgallicusAiBrain, MurusgallicusAiGenerator, MurusgallicusAiGrid, MurusgallicusAiTerrain, MurusgallicusAiTerrainLayer, MurusgallicusArtifactLayer, MurusgallicusBattlePos, MurusgallicusBattleVar, MurusgallicusCommand, MurusgallicusGenerator, MurusgallicusGrid, MurusgallicusLayer, MurusgallicusMark, MurusgallicusPhase, MurusgallicusPosition, MurusgallicusTerrain, MurusgallicusTurnPos, MurusgallicusTurnVar, MurusgallicusUnit>;

export type MurusgallicusGrid = never;

export type MurusgallicusAiGenerator = "findmymoves" | "findoppmoves" | "findoppthreats";

export type MurusgallicusAiAspect = "mymoves" | "mytowerpos" | "mywallpos" | "oppmoves" | "mytowercount" | "oppwinmoves" | "opplightthreats" | "oppheavythreats";

export type MurusgallicusAiGrid = "basic1" | "basic2";

export type MurusgallicusAiArtifactLayer = "mymoves" | "oppmoves" | "oppheavythreats" | "opplightthreats";

export type MurusgallicusAiBrain = "Steve" | "Joe" | "Clive";

export type MurusgallicusAiTerrainLayer = "0" | "1" | "2" | "3";

export type MurusgallicusAiTerrain = "threatrow";

export type MurusgallicusPosition = "a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7" | "e1" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "g1" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7";
