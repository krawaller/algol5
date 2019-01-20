import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

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
 
export type UglyduckGenerators = Generators<UglyduckArtifactLayer, UglyduckBattlePos, UglyduckBattleVar, UglyduckCommand, UglyduckGenerator, UglyduckLayer, UglyduckMark, UglyduckTurnPos, UglyduckTurnVar>;
export type UglyduckFlow = Flow<UglyduckBattlePos, UglyduckBattleVar, UglyduckCommand, UglyduckGenerator, UglyduckLayer, UglyduckMark, UglyduckTurnPos, UglyduckTurnVar, UglyduckUnit>;
export type UglyduckBoard = Board<UglyduckTerrain>;
export type UglyduckAI = AI<UglyduckAiArtifactLayer, UglyduckAiAspect, UglyduckAiBrain, UglyduckAiGenerator, UglyduckAiGrid, UglyduckAiTerrain, UglyduckAiTerrainLayer, UglyduckBattlePos, UglyduckBattleVar, UglyduckCommand, UglyduckLayer, UglyduckMark, UglyduckTurnPos, UglyduckTurnVar>;
export type UglyduckGraphics = Graphics<UglyduckTerrain, UglyduckUnit>;
export type UglyduckInstructions = Instructions<UglyduckBattlePos, UglyduckBattleVar, UglyduckCommand, UglyduckLayer, UglyduckMark, UglyduckPhase, UglyduckTurnPos, UglyduckTurnVar, UglyduckUnit>;
export type UglyduckMeta = Meta;
export type UglyduckScripts = GameTestSuite;
export type UglyduckSetup = Setup<UglyduckUnit>;

export type UglyduckDefinition = FullDef<UglyduckAiArtifactLayer, UglyduckAiAspect, UglyduckAiBrain, UglyduckAiGenerator, UglyduckAiGrid, UglyduckAiTerrain, UglyduckAiTerrainLayer, UglyduckArtifactLayer, UglyduckBattlePos, UglyduckBattleVar, UglyduckCommand, UglyduckGenerator, UglyduckLayer, UglyduckMark, UglyduckPhase, UglyduckTerrain, UglyduckTurnPos, UglyduckTurnVar, UglyduckUnit>;

export type UglyduckAiGenerator = never;

export type UglyduckAiAspect = never;

export type UglyduckAiGrid = never;

export type UglyduckAiArtifactLayer = never;

export type UglyduckAiBrain = never;

export type UglyduckAiTerrainLayer = never;

export type UglyduckAiTerrain = never;
