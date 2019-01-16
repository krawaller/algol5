import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type MurusgallicusTerrain = "homerow";
export type MurusgallicusUnit = "towers" | "walls";
export type MurusgallicusMark = "selecttower" | "selectmove" | "selectkill";
export type MurusgallicusCommand = "move" | "kill";
export type MurusgallicusPhaseCommand = "move" | "kill";
export type MurusgallicusPhase = "startTurn" | MurusgallicusMark | MurusgallicusPhaseCommand;
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
export type MurusgallicusAI = AI;
export type MurusgallicusGraphics = Graphics<MurusgallicusTerrain, MurusgallicusUnit>;
export type MurusgallicusInstructions = Instructions<MurusgallicusPhase>;
export type MurusgallicusMeta = Meta;
export type MurusgallicusScripts = GameTestSuite;
export type MurusgallicusSetup = Setup<MurusgallicusUnit>;

export type MurusgallicusDefinition = FullDef<MurusgallicusArtifactLayer, MurusgallicusBattlePos, MurusgallicusBattleVar, MurusgallicusCommand, MurusgallicusGenerator, MurusgallicusLayer, MurusgallicusMark, MurusgallicusPhase, MurusgallicusTerrain, MurusgallicusTurnPos, MurusgallicusTurnVar, MurusgallicusUnit>;
