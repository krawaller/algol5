import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type ShoveoffTerrain = "southedge" | "northedge" | "westedge" | "eastedge" | "edge";
export type ShoveoffUnit = "soldiers";
export type ShoveoffMark = "selectpushpoint";
export type ShoveoffCommand = "north" | "south" | "east" | "west";
export type ShoveoffPhaseCommand = never;
export type ShoveoffPhase = "startTurn" | ShoveoffMark;
export type ShoveoffUnitLayer = "soldiers" | "mysoldiers" | "neutralsoldiers" | "oppsoldiers";
export type ShoveoffGenerator = "findaffected" | "findresults" | "findfourinarow";
export type ShoveoffArtifactLayer = "targetedgepoints" | "squishsouth" | "squishwest" | "squishnorth" | "squisheast" | "pushsouth" | "pushwest" | "pushnorth" | "pusheast" | "spawnsouth" | "spawnwest" | "spawnnorth" | "spawneast" | "fourinarow";
export type ShoveoffTerrainLayer = "southedge" | "nosouthedge" | "northedge" | "nonorthedge" | "westedge" | "nowestedge" | "eastedge" | "noeastedge" | "edge" | "noedge";
export type ShoveoffLayer = CommonLayer | ShoveoffUnitLayer | ShoveoffArtifactLayer | ShoveoffTerrainLayer;
export type ShoveoffBattlePos = any;
export type ShoveoffBattleVar = any;
export type ShoveoffTurnPos = any;
export type ShoveoffTurnVar = any;
 
export type ShoveoffGenerators = Generators<ShoveoffArtifactLayer, ShoveoffBattlePos, ShoveoffBattleVar, ShoveoffCommand, ShoveoffGenerator, ShoveoffGrid, ShoveoffLayer, ShoveoffMark, ShoveoffTurnPos, ShoveoffTurnVar>;
export type ShoveoffFlow = Flow<ShoveoffBattlePos, ShoveoffBattleVar, ShoveoffCommand, ShoveoffGenerator, ShoveoffGrid, ShoveoffLayer, ShoveoffMark, ShoveoffTurnPos, ShoveoffTurnVar, ShoveoffUnit>;
export type ShoveoffBoard = Board<ShoveoffTerrain>;
export type ShoveoffAI = AI<ShoveoffAiArtifactLayer, ShoveoffAiAspect, ShoveoffAiBrain, ShoveoffAiGenerator, ShoveoffAiGrid, ShoveoffAiTerrain, ShoveoffAiTerrainLayer, ShoveoffBattlePos, ShoveoffBattleVar, ShoveoffCommand, ShoveoffGrid, ShoveoffLayer, ShoveoffMark, ShoveoffTurnPos, ShoveoffTurnVar>;
export type ShoveoffGraphics = Graphics<ShoveoffTerrain, ShoveoffUnit>;
export type ShoveoffInstructions = Instructions<ShoveoffBattlePos, ShoveoffBattleVar, ShoveoffCommand, ShoveoffGrid, ShoveoffLayer, ShoveoffMark, ShoveoffPhase, ShoveoffTurnPos, ShoveoffTurnVar, ShoveoffUnit>;
export type ShoveoffMeta = Meta;
export type ShoveoffScripts = GameTestSuite;
export type ShoveoffSetup = Setup<ShoveoffUnit>;

export type ShoveoffDefinition = FullDef<ShoveoffAiArtifactLayer, ShoveoffAiAspect, ShoveoffAiBrain, ShoveoffAiGenerator, ShoveoffAiGrid, ShoveoffAiTerrain, ShoveoffAiTerrainLayer, ShoveoffArtifactLayer, ShoveoffBattlePos, ShoveoffBattleVar, ShoveoffCommand, ShoveoffGenerator, ShoveoffGrid, ShoveoffLayer, ShoveoffMark, ShoveoffPhase, ShoveoffTerrain, ShoveoffTurnPos, ShoveoffTurnVar, ShoveoffUnit>;

export type ShoveoffGrid = never;

export type ShoveoffAiGenerator = never;

export type ShoveoffAiAspect = never;

export type ShoveoffAiGrid = never;

export type ShoveoffAiArtifactLayer = never;

export type ShoveoffAiBrain = never;

export type ShoveoffAiTerrainLayer = never;

export type ShoveoffAiTerrain = never;
