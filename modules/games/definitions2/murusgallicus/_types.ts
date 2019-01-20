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
export type MurusgallicusTerrainLayer = "homerow" | "nohomerow" | "myhomerow" | "opphomerow";
export type MurusgallicusLayer = CommonLayer | MurusgallicusUnitLayer | MurusgallicusArtifactLayer | MurusgallicusTerrainLayer;
export type MurusgallicusBattlePos = any;
export type MurusgallicusBattleVar = any;
export type MurusgallicusTurnPos = any;
export type MurusgallicusTurnVar = any;
 
export type MurusgallicusGenerators = Generators<MurusgallicusArtifactLayer, MurusgallicusBattlePos, MurusgallicusBattleVar, MurusgallicusCommand, MurusgallicusGenerator, MurusgallicusLayer, MurusgallicusMark, MurusgallicusTurnPos, MurusgallicusTurnVar>;
export type MurusgallicusFlow = Flow<MurusgallicusBattlePos, MurusgallicusBattleVar, MurusgallicusCommand, MurusgallicusGenerator, MurusgallicusLayer, MurusgallicusMark, MurusgallicusTurnPos, MurusgallicusTurnVar, MurusgallicusUnit>;
export type MurusgallicusBoard = Board<MurusgallicusTerrain>;
export type MurusgallicusAI = AI<MurusgallicusAiArtifactLayer, MurusgallicusAiAspect, MurusgallicusAiBrain, MurusgallicusAiGenerator, MurusgallicusAiGrid, MurusgallicusAiTerrain, MurusgallicusAiTerrainLayer, MurusgallicusBattlePos, MurusgallicusBattleVar, MurusgallicusCommand, MurusgallicusLayer, MurusgallicusMark, MurusgallicusTurnPos, MurusgallicusTurnVar>;
export type MurusgallicusGraphics = Graphics<MurusgallicusTerrain, MurusgallicusUnit>;
export type MurusgallicusInstructions = Instructions<MurusgallicusBattlePos, MurusgallicusBattleVar, MurusgallicusCommand, MurusgallicusLayer, MurusgallicusMark, MurusgallicusPhase, MurusgallicusTurnPos, MurusgallicusTurnVar, MurusgallicusUnit>;
export type MurusgallicusMeta = Meta;
export type MurusgallicusScripts = GameTestSuite;
export type MurusgallicusSetup = Setup<MurusgallicusUnit>;

export type MurusgallicusDefinition = FullDef<MurusgallicusAiArtifactLayer, MurusgallicusAiAspect, MurusgallicusAiBrain, MurusgallicusAiGenerator, MurusgallicusAiGrid, MurusgallicusAiTerrain, MurusgallicusAiTerrainLayer, MurusgallicusArtifactLayer, MurusgallicusBattlePos, MurusgallicusBattleVar, MurusgallicusCommand, MurusgallicusGenerator, MurusgallicusLayer, MurusgallicusMark, MurusgallicusPhase, MurusgallicusTerrain, MurusgallicusTurnPos, MurusgallicusTurnVar, MurusgallicusUnit>;

export type MurusgallicusAiGenerator = "findmymoves" | "findoppmoves" | "findoppthreats";

export type MurusgallicusAiAspect = "mymoves" | "mytowerpos" | "mywallpos" | "oppmoves" | "mytowercount" | "oppwinmoves" | "opplightthreats" | "oppheavythreats";

export type MurusgallicusAiGrid = "basic1" | "basic2";

export type MurusgallicusAiArtifactLayer = "mymoves" | "oppmoves" | "oppheavythreats" | "opplightthreats";

export type MurusgallicusAiBrain = "Steve" | "Joe" | "Clive";

export type MurusgallicusAiTerrainLayer = "threatrow" | "nothreatrow" | "mythreatrow" | "oppthreatrow";

export type MurusgallicusAiTerrain = "threatrow";
