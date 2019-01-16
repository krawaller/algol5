import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type MurusgallicusadvancedTerrain = "homerow";
export type MurusgallicusadvancedUnit = "towers" | "walls" | "catapults";
export type MurusgallicusadvancedMark = "selecttower" | "selectmove" | "selectkill" | "selectcatapult" | "selectfire";
export type MurusgallicusadvancedCommand = "move" | "kill" | "sacrifice" | "fire";
export type MurusgallicusadvancedPhaseCommand = never;
export type MurusgallicusadvancedPhase = "startTurn" | MurusgallicusadvancedMark;
export type MurusgallicusadvancedUnitLayer = "towers" | "mytowers" | "neutraltowers" | "opptowers" | "walls" | "mywalls" | "neutralwalls" | "oppwalls" | "catapults" | "mycatapults" | "neutralcatapults" | "oppcatapults";
export type MurusgallicusadvancedGenerator = "findfiretargets" | "findmovetargets" | "findmoveresults" | "findkilltargets";
export type MurusgallicusadvancedArtifactLayer = "firetargets" | "movetargets" | "killtargets";
export type MurusgallicusadvancedTerrainLayer = "homerow" | "nohomerow" | "myhomerow" | "opphomerow";
export type MurusgallicusadvancedLayer = CommonLayer | MurusgallicusadvancedUnitLayer | MurusgallicusadvancedArtifactLayer | MurusgallicusadvancedTerrainLayer;
export type MurusgallicusadvancedBattlePos = any;
export type MurusgallicusadvancedBattleVar = any;
export type MurusgallicusadvancedTurnPos = any;
export type MurusgallicusadvancedTurnVar = any;
 
export type MurusgallicusadvancedGenerators = Generators<MurusgallicusadvancedArtifactLayer, MurusgallicusadvancedBattlePos, MurusgallicusadvancedBattleVar, MurusgallicusadvancedCommand, MurusgallicusadvancedGenerator, MurusgallicusadvancedLayer, MurusgallicusadvancedMark, MurusgallicusadvancedTurnPos, MurusgallicusadvancedTurnVar>;
export type MurusgallicusadvancedFlow = Flow<MurusgallicusadvancedBattlePos, MurusgallicusadvancedBattleVar, MurusgallicusadvancedCommand, MurusgallicusadvancedLayer, MurusgallicusadvancedMark, MurusgallicusadvancedTurnPos, MurusgallicusadvancedTurnVar>;
export type MurusgallicusadvancedBoard = Board<MurusgallicusadvancedTerrain>;
export type MurusgallicusadvancedAI = AI;
export type MurusgallicusadvancedGraphics = Graphics<MurusgallicusadvancedTerrain, MurusgallicusadvancedUnit>;
export type MurusgallicusadvancedInstructions = Instructions<MurusgallicusadvancedPhase>;
export type MurusgallicusadvancedMeta = Meta;
export type MurusgallicusadvancedScripts = GameTestSuite;
export type MurusgallicusadvancedSetup = Setup<MurusgallicusadvancedUnit>;

export type MurusgallicusadvancedDefinition = FullDef<MurusgallicusadvancedArtifactLayer, MurusgallicusadvancedBattlePos, MurusgallicusadvancedBattleVar, MurusgallicusadvancedCommand, MurusgallicusadvancedGenerator, MurusgallicusadvancedLayer, MurusgallicusadvancedMark, MurusgallicusadvancedPhase, MurusgallicusadvancedTerrain, MurusgallicusadvancedTurnPos, MurusgallicusadvancedTurnVar, MurusgallicusadvancedUnit>;
