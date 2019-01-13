import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite } from '../../../types';

export type UglyduckTerrain = "homerow";
export type UglyduckUnit = "soldiers" | "kings";
export type UglyduckMark = "selectunit" | "selectmovetarget";
export type UglyduckCommand = "move";
export type UglyduckPhaseCommand = never;
export type UglyduckPhase = "startTurn" | UglyduckMark;
export type UglyduckUnitLayer = "soldiers" | "mysoldiers" | "neutralsoldiers" | "oppsoldiers" | "kings" | "mykings" | "neutralkings" | "oppkings";
export type UglyduckGenerator = "findmovetargets";
export type UglyduckArtifactLayer = "movetargets";
export type UglyduckTerrainLayer = "homerow" | "nohomerow" | "myhomerow" | "opphomerow";
export type UglyduckLayer = CommonLayer | UglyduckUnitLayer | UglyduckArtifactLayer | UglyduckTerrainLayer;
export type UglyduckBattlePos = any;
export type UglyduckBattleVar = any;
export type UglyduckTurnPos = any;
export type UglyduckTurnVar = any;
 
export type UglyduckGenerators = Generators<UglyduckArtifactLayer, UglyduckGenerator, UglyduckLayer>;
export type UglyduckFlow = Flow<UglyduckArtifactLayer, UglyduckCommand, UglyduckGenerator, UglyduckLayer, UglyduckMark, UglyduckUnit>;
export type UglyduckBoard = Board<UglyduckTerrain>;
export type UglyduckAI = AI;
export type UglyduckGraphics = Graphics<UglyduckTerrain, UglyduckUnit>;
export type UglyduckInstructions = Instructions<UglyduckPhase>;
export type UglyduckMeta = Meta;
export type UglyduckScripts = GameTestSuite;
export type UglyduckSetup = Setup<UglyduckUnit>;
