import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite } from '../../../types';

export type KriegTerrain = "southeast" | "northwest" | "corners" | "bases";
export type KriegUnit = "notfrozens" | "frozens";
export type KriegMark = "selectunit" | "selectmove";
export type KriegCommand = "move";
export type KriegPhaseCommand = never;
export type KriegPhase = "startTurn" | KriegMark;
export type KriegUnitLayer = "notfrozens" | "mynotfrozens" | "neutralnotfrozens" | "oppnotfrozens" | "frozens" | "myfrozens" | "neutralfrozens" | "oppfrozens";
export type KriegGenerator = "findmovetargets";
export type KriegArtifactLayer = "movetargets";
export type KriegTerrainLayer = "southeast" | "nosoutheast" | "northwest" | "nonorthwest" | "corners" | "nocorners" | "mycorners" | "oppcorners" | "bases" | "nobases" | "mybases" | "oppbases";
export type KriegLayer = CommonLayer | KriegUnitLayer | KriegArtifactLayer | KriegTerrainLayer;
export type KriegBattlePos = any;
export type KriegBattleVar = any;
export type KriegTurnPos = any;
export type KriegTurnVar = any;
 
export type KriegGenerators = Generators<KriegArtifactLayer, KriegGenerator, KriegLayer>;
export type KriegFlow = Flow<KriegArtifactLayer, KriegCommand, KriegGenerator, KriegLayer, KriegMark, KriegUnit>;
export type KriegBoard = Board<KriegTerrain>;
export type KriegAI = AI;
export type KriegGraphics = Graphics<KriegTerrain, KriegUnit>;
export type KriegInstructions = Instructions<KriegPhase>;
export type KriegMeta = Meta;
export type KriegScripts = GameTestSuite;
export type KriegSetup = Setup<KriegUnit>;
