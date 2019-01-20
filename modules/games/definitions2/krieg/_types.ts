import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

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
 
export type KriegGenerators = Generators<KriegArtifactLayer, KriegBattlePos, KriegBattleVar, KriegCommand, KriegGenerator, KriegLayer, KriegMark, KriegTurnPos, KriegTurnVar>;
export type KriegFlow = Flow<KriegBattlePos, KriegBattleVar, KriegCommand, KriegGenerator, KriegLayer, KriegMark, KriegTurnPos, KriegTurnVar, KriegUnit>;
export type KriegBoard = Board<KriegTerrain>;
export type KriegAI = AI<KriegAiArtifactLayer, KriegAiAspect, KriegAiBrain, KriegAiGenerator, KriegAiGrid, KriegAiTerrain, KriegAiTerrainLayer, KriegBattlePos, KriegBattleVar, KriegCommand, KriegLayer, KriegMark, KriegTurnPos, KriegTurnVar>;
export type KriegGraphics = Graphics<KriegTerrain, KriegUnit>;
export type KriegInstructions = Instructions<KriegBattlePos, KriegBattleVar, KriegCommand, KriegLayer, KriegMark, KriegPhase, KriegTurnPos, KriegTurnVar, KriegUnit>;
export type KriegMeta = Meta;
export type KriegScripts = GameTestSuite;
export type KriegSetup = Setup<KriegUnit>;

export type KriegDefinition = FullDef<KriegAiArtifactLayer, KriegAiAspect, KriegAiBrain, KriegAiGenerator, KriegAiGrid, KriegAiTerrain, KriegAiTerrainLayer, KriegArtifactLayer, KriegBattlePos, KriegBattleVar, KriegCommand, KriegGenerator, KriegLayer, KriegMark, KriegPhase, KriegTerrain, KriegTurnPos, KriegTurnVar, KriegUnit>;

export type KriegAiGenerator = "findmythreats" | "findoppthreats";

export type KriegAiAspect = "myfrozenguardedthreat" | "myfrozenfreethreat" | "mymoverguardedthreat" | "mymoverfreethreat" | "myfrozeninfiltrators" | "myfreeinfiltrators" | "oppfrozenguardedthreat" | "oppfrozenfreethreat" | "oppmoverguardedthreat" | "oppmoverfreethreat" | "oppfrozeninfiltrators" | "oppfreeinfiltrators";

export type KriegAiGrid = never;

export type KriegAiArtifactLayer = "ifelse" | "anyat" | "myfrozens" | "start" | "anyat,units,target" | "myfrozenguardedthreat" | "myfrozenfreethreat" | "anyat,units,target" | "mymoverguardedthreat" | "mymoverfreethreat" | "oppfrozens" | "start" | "anyat,units,target" | "oppfrozenguardedthreat" | "oppfrozenfreethreat" | "anyat,units,target" | "oppmoverguardedthreat" | "oppmoverfreethreat";

export type KriegAiBrain = "Fred";

export type KriegAiTerrainLayer = never;

export type KriegAiTerrain = never;
