import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type MurusgallicusadvancedTerrain = "homerow";
export type MurusgallicusadvancedUnit = "towers" | "walls" | "catapults";
export type MurusgallicusadvancedMark = "selecttower" | "selectmove" | "selectkill" | "selectcatapult" | "selectfire";
export type MurusgallicusadvancedCommand = "move" | "kill" | "sacrifice" | "fire";
export type MurusgallicusadvancedPhaseCommand = never;
export type MurusgallicusadvancedPhase = "startTurn" | MurusgallicusadvancedMark;
export type MurusgallicusadvancedUnitLayer = "towers" | "mytowers" | "neutraltowers" | "opptowers" | "walls" | "mywalls" | "neutralwalls" | "oppwalls" | "catapults" | "mycatapults" | "neutralcatapults" | "oppcatapults";
export type MurusgallicusadvancedGenerator = "findfiretargets" | "findmovetargets" | "findmoveresults" | "findkilltargets";
export type MurusgallicusadvancedArtifactLayer = "firetargets" | "movetargets" | "madecatapults" | "madetowers" | "madewalls" | "killtargets";
export type MurusgallicusadvancedTerrainLayer = "homerow" | "nohomerow" | "myhomerow" | "opphomerow";
export type MurusgallicusadvancedLayer = CommonLayer | MurusgallicusadvancedUnitLayer | MurusgallicusadvancedArtifactLayer | MurusgallicusadvancedTerrainLayer;
export type MurusgallicusadvancedBattlePos = any;
export type MurusgallicusadvancedBattleVar = any;
export type MurusgallicusadvancedTurnPos = any;
export type MurusgallicusadvancedTurnVar = any;
 
export type MurusgallicusadvancedGenerators = Generators<MurusgallicusadvancedArtifactLayer, MurusgallicusadvancedBattlePos, MurusgallicusadvancedBattleVar, MurusgallicusadvancedCommand, MurusgallicusadvancedGenerator, MurusgallicusadvancedLayer, MurusgallicusadvancedMark, MurusgallicusadvancedTurnPos, MurusgallicusadvancedTurnVar>;
export type MurusgallicusadvancedFlow = Flow<MurusgallicusadvancedBattlePos, MurusgallicusadvancedBattleVar, MurusgallicusadvancedCommand, MurusgallicusadvancedGenerator, MurusgallicusadvancedLayer, MurusgallicusadvancedMark, MurusgallicusadvancedTurnPos, MurusgallicusadvancedTurnVar, MurusgallicusadvancedUnit>;
export type MurusgallicusadvancedBoard = Board<MurusgallicusadvancedTerrain>;
export type MurusgallicusadvancedAI = AI<MurusgallicusadvancedAiArtifactLayer, MurusgallicusadvancedAiAspect, MurusgallicusadvancedAiBrain, MurusgallicusadvancedAiGenerator, MurusgallicusadvancedAiGrid, MurusgallicusadvancedAiTerrain, MurusgallicusadvancedAiTerrainLayer, MurusgallicusadvancedBattlePos, MurusgallicusadvancedBattleVar, MurusgallicusadvancedCommand, MurusgallicusadvancedLayer, MurusgallicusadvancedMark, MurusgallicusadvancedTurnPos, MurusgallicusadvancedTurnVar>;
export type MurusgallicusadvancedGraphics = Graphics<MurusgallicusadvancedTerrain, MurusgallicusadvancedUnit>;
export type MurusgallicusadvancedInstructions = Instructions<MurusgallicusadvancedBattlePos, MurusgallicusadvancedBattleVar, MurusgallicusadvancedCommand, MurusgallicusadvancedLayer, MurusgallicusadvancedMark, MurusgallicusadvancedPhase, MurusgallicusadvancedTurnPos, MurusgallicusadvancedTurnVar, MurusgallicusadvancedUnit>;
export type MurusgallicusadvancedMeta = Meta;
export type MurusgallicusadvancedScripts = GameTestSuite;
export type MurusgallicusadvancedSetup = Setup<MurusgallicusadvancedUnit>;

export type MurusgallicusadvancedDefinition = FullDef<MurusgallicusadvancedAiArtifactLayer, MurusgallicusadvancedAiAspect, MurusgallicusadvancedAiBrain, MurusgallicusadvancedAiGenerator, MurusgallicusadvancedAiGrid, MurusgallicusadvancedAiTerrain, MurusgallicusadvancedAiTerrainLayer, MurusgallicusadvancedArtifactLayer, MurusgallicusadvancedBattlePos, MurusgallicusadvancedBattleVar, MurusgallicusadvancedCommand, MurusgallicusadvancedGenerator, MurusgallicusadvancedLayer, MurusgallicusadvancedMark, MurusgallicusadvancedPhase, MurusgallicusadvancedTerrain, MurusgallicusadvancedTurnPos, MurusgallicusadvancedTurnVar, MurusgallicusadvancedUnit>;

export type MurusgallicusadvancedAiGenerator = never;

export type MurusgallicusadvancedAiAspect = never;

export type MurusgallicusadvancedAiGrid = never;

export type MurusgallicusadvancedAiArtifactLayer = never;

export type MurusgallicusadvancedAiBrain = never;

export type MurusgallicusadvancedAiTerrainLayer = never;

export type MurusgallicusadvancedAiTerrain = never;
