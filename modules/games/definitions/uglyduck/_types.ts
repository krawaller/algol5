import { CommonLayer, Generators, Flow, AlgolBoard, AI, AlgolAnim, Graphics, Instructions, AlgolMeta, Setup, GameTestSuite, FullDef, AlgolPerformance } from '../../../types';

export type UglyduckBoardHeight = 5;
export type UglyduckBoardWidth = 5;

export type UglyduckAnim = AlgolAnim<UglyduckBattlePos, UglyduckBattleVar, UglyduckCommand, UglyduckGrid, UglyduckLayer, UglyduckMark, UglyduckTurnPos, UglyduckTurnVar, UglyduckUnit>;

export type UglyduckTerrain = "homerow";
export type UglyduckUnit = "soldiers" | "kings";
export type UglyduckMark = "selectunit" | "selectmovetarget";
export type UglyduckCommand = "move";
export type UglyduckPhaseCommand = never;
export type UglyduckPhase = "startTurn" | UglyduckMark;
export type UglyduckUnitLayer = "units" | "myunits" | "oppunits" | "mysoldiers" | "oppsoldiers" | "mykings" | "oppkings";
export type UglyduckGenerator = "findmovetargets";
export type UglyduckArtifactLayer = "movetargets";
export type UglyduckTerrainLayer = "homerow" | "myhomerow" | "opphomerow" | "nohomerow";
export type UglyduckLayer = CommonLayer | UglyduckUnitLayer | UglyduckArtifactLayer | UglyduckTerrainLayer;
export type UglyduckBattlePos = any;
export type UglyduckBattleVar = any;
export type UglyduckTurnPos = any;
export type UglyduckTurnVar = any;
 
export type UglyduckGenerators = Generators<UglyduckArtifactLayer, UglyduckBattlePos, UglyduckBattleVar, UglyduckCommand, UglyduckGenerator, UglyduckGrid, UglyduckLayer, UglyduckMark, UglyduckTurnPos, UglyduckTurnVar>;
export type UglyduckFlow = Flow<UglyduckBattlePos, UglyduckBattleVar, UglyduckCommand, UglyduckGenerator, UglyduckGrid, UglyduckLayer, UglyduckMark, UglyduckTurnPos, UglyduckTurnVar, UglyduckUnit>;
export type UglyduckBoard = AlgolBoard<UglyduckBoardHeight, UglyduckBoardWidth, UglyduckGrid, UglyduckPosition, UglyduckTerrain>;
export type UglyduckAI = AI<UglyduckAiArtifactLayer, UglyduckAiAspect, UglyduckAiBrain, UglyduckAiGenerator, UglyduckAiGrid, UglyduckAiTerrain, UglyduckAiTerrainLayer, UglyduckBattlePos, UglyduckBattleVar, UglyduckBoardHeight, UglyduckBoardWidth, UglyduckCommand, UglyduckGrid, UglyduckLayer, UglyduckMark, UglyduckPosition, UglyduckTurnPos, UglyduckTurnVar>;
export type UglyduckGraphics = Graphics<UglyduckTerrain, UglyduckUnit>;
export type UglyduckInstructions = Instructions<UglyduckBattlePos, UglyduckBattleVar, UglyduckCommand, UglyduckGrid, UglyduckLayer, UglyduckMark, UglyduckPhase, UglyduckTurnPos, UglyduckTurnVar, UglyduckUnit>;
export type UglyduckMeta = AlgolMeta<UglyduckCommand, UglyduckMark>;
export type UglyduckPerformance = AlgolPerformance<UglyduckCommand, UglyduckMark>;
export type UglyduckScripts = GameTestSuite;
export type UglyduckSetup = Setup<UglyduckPosition, UglyduckUnit>;

export type UglyduckDefinition = FullDef<UglyduckAiArtifactLayer, UglyduckAiAspect, UglyduckAiBrain, UglyduckAiGenerator, UglyduckAiGrid, UglyduckAiTerrain, UglyduckAiTerrainLayer, UglyduckArtifactLayer, UglyduckBattlePos, UglyduckBattleVar, UglyduckBoardHeight, UglyduckBoardWidth, UglyduckCommand, UglyduckGenerator, UglyduckGrid, UglyduckLayer, UglyduckMark, UglyduckPhase, UglyduckPosition, UglyduckTerrain, UglyduckTurnPos, UglyduckTurnVar, UglyduckUnit>;

export type UglyduckGrid = never;

export type UglyduckAiGenerator = never;

export type UglyduckAiAspect = never;

export type UglyduckAiGrid = never;

export type UglyduckAiArtifactLayer = never;

export type UglyduckAiBrain = never;

export type UglyduckAiTerrainLayer = never;

export type UglyduckAiTerrain = never;

export type UglyduckPosition = "a1" | "a2" | "a3" | "a4" | "a5" | "b1" | "b2" | "b3" | "b4" | "b5" | "c1" | "c2" | "c3" | "c4" | "c5" | "d1" | "d2" | "d3" | "d4" | "d5" | "e1" | "e2" | "e3" | "e4" | "e5";
