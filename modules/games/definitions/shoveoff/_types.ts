import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite } from '../../../types';

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
 
export type ShoveoffGenerators = Generators<ShoveoffArtifactLayer, ShoveoffGenerator, ShoveoffLayer>;
export type ShoveoffFlow = Flow<ShoveoffArtifactLayer, ShoveoffCommand, ShoveoffGenerator, ShoveoffLayer, ShoveoffMark, ShoveoffUnit>;
export type ShoveoffBoard = Board<ShoveoffTerrain>;
export type ShoveoffAI = AI;
export type ShoveoffGraphics = Graphics<ShoveoffTerrain, ShoveoffUnit>;
export type ShoveoffInstructions = Instructions<ShoveoffPhase>;
export type ShoveoffMeta = Meta;
export type ShoveoffScripts = GameTestSuite;
export type ShoveoffSetup = Setup<ShoveoffUnit>;
