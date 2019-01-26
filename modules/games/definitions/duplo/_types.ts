import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type DuploTerrain = never;
export type DuploUnit = "soldiers";
export type DuploMark = "selectdeploy" | "selectunit" | "selecttarget";
export type DuploCommand = "deploy" | "expand";
export type DuploPhaseCommand = "deploy";
export type DuploPhase = "startTurn" | DuploMark | DuploPhaseCommand;
export type DuploUnitLayer = "soldiers" | "mysoldiers" | "neutralsoldiers" | "oppsoldiers";
export type DuploGenerator = "findspawndirs" | "findgrowstarts" | "findexpandpoints" | "findoppstrengths" | "findspawns";
export type DuploArtifactLayer = "spawndirs" | "growstarts" | "targets" | "potentialopptargets" | "spawns";
export type DuploTerrainLayer = never;
export type DuploLayer = CommonLayer | DuploUnitLayer | DuploArtifactLayer;
export type DuploBattlePos = any;
export type DuploBattleVar = any;
export type DuploTurnPos = any;
export type DuploTurnVar = any;
 
export type DuploGenerators = Generators<DuploArtifactLayer, DuploBattlePos, DuploBattleVar, DuploCommand, DuploGenerator, DuploGrid, DuploLayer, DuploMark, DuploTurnPos, DuploTurnVar>;
export type DuploFlow = Flow<DuploBattlePos, DuploBattleVar, DuploCommand, DuploGenerator, DuploGrid, DuploLayer, DuploMark, DuploTurnPos, DuploTurnVar, DuploUnit>;
export type DuploBoard = Board<DuploTerrain>;
export type DuploAI = AI<DuploAiArtifactLayer, DuploAiAspect, DuploAiBrain, DuploAiGenerator, DuploAiGrid, DuploAiTerrain, DuploAiTerrainLayer, DuploBattlePos, DuploBattleVar, DuploCommand, DuploGrid, DuploLayer, DuploMark, DuploTurnPos, DuploTurnVar>;
export type DuploGraphics = Graphics<DuploTerrain, DuploUnit>;
export type DuploInstructions = Instructions<DuploBattlePos, DuploBattleVar, DuploCommand, DuploGrid, DuploLayer, DuploMark, DuploPhase, DuploTurnPos, DuploTurnVar, DuploUnit>;
export type DuploMeta = Meta;
export type DuploScripts = GameTestSuite;
export type DuploSetup = Setup<DuploUnit>;

export type DuploDefinition = FullDef<DuploAiArtifactLayer, DuploAiAspect, DuploAiBrain, DuploAiGenerator, DuploAiGrid, DuploAiTerrain, DuploAiTerrainLayer, DuploArtifactLayer, DuploBattlePos, DuploBattleVar, DuploCommand, DuploGenerator, DuploGrid, DuploLayer, DuploMark, DuploPhase, DuploTerrain, DuploTurnPos, DuploTurnVar, DuploUnit>;

export type DuploGrid = never;

export type DuploAiGenerator = never;

export type DuploAiAspect = never;

export type DuploAiGrid = never;

export type DuploAiArtifactLayer = never;

export type DuploAiBrain = never;

export type DuploAiTerrainLayer = never;

export type DuploAiTerrain = never;

export type DuploPositions = ["a1","a2","a3","a4","a5","a6","a7","a8","b1","b2","b3","b4","b5","b6","b7","b8","c1","c2","c3","c4","c5","c6","c7","c8","d1","d2","d3","d4","d5","d6","d7","d8","e1","e2","e3","e4","e5","e6","e7","e8","f1","f2","f3","f4","f5","f6","f7","f8","g1","g2","g3","g4","g5","g6","g7","g8","h1","h2","h3","h4","h5","h6","h7","h8"];
