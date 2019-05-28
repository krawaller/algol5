import { CommonLayer, Generators, Flow, AlgolBoard, AI, AlgolAnimCollection, Graphics, Instructions, AlgolMeta, Setup, AlgolGameTestSuite, FullDef, AlgolPerformance } from 'algol-types';

export type CoffeeBoardHeight = 5;
export type CoffeeBoardWidth = 5;

export type CoffeeAnim = AlgolAnimCollection<CoffeeBattlePos, CoffeeBattleVar, CoffeeCommand, CoffeeGrid, CoffeeLayer, CoffeeMark, CoffeeTurnPos, CoffeeTurnVar, CoffeeUnit>;

export type CoffeeTerrain = never;
export type CoffeeUnit = "soldiers";
export type CoffeeMark = "selectdrop";
export type CoffeeCommand = "uphill" | "downhill" | "horisontal" | "vertical";
export type CoffeePhaseCommand = never;
export type CoffeePhase = "startTurn" | CoffeeMark;
export type CoffeeUnitLayer = "units" | "myunits" | "oppunits" | "neutralunits" | "soldiers";
export type CoffeeGenerator = "findgeneratees" | "findwinlines";
export type CoffeeArtifactLayer = "FOOBAR" | "vertical" | "uphill" | "horisontal" | "downhill" | "winline";
export type CoffeeTerrainLayer = never;
export type CoffeeLayer = CommonLayer | CoffeeUnitLayer | CoffeeArtifactLayer;
export type CoffeeBattlePos = never;
export type CoffeeBattleVar = never;
export type CoffeeTurnPos = never;
export type CoffeeTurnVar = never;
 
export type CoffeeGenerators = Generators<CoffeeArtifactLayer, CoffeeBattlePos, CoffeeBattleVar, CoffeeCommand, CoffeeGenerator, CoffeeGrid, CoffeeLayer, CoffeeMark, CoffeeTurnPos, CoffeeTurnVar>;
export type CoffeeFlow = Flow<CoffeeBattlePos, CoffeeBattleVar, CoffeeCommand, CoffeeGenerator, CoffeeGrid, CoffeeLayer, CoffeeMark, CoffeeTurnPos, CoffeeTurnVar, CoffeeUnit>;
export type CoffeeBoard = AlgolBoard<CoffeeBoardHeight, CoffeeBoardWidth, CoffeeGrid, CoffeePosition, CoffeeTerrain>;
export type CoffeeAI = AI<CoffeeAiArtifactLayer, CoffeeAiAspect, CoffeeAiBrain, CoffeeAiGenerator, CoffeeAiGrid, CoffeeAiTerrain, CoffeeAiTerrainLayer, CoffeeBattlePos, CoffeeBattleVar, CoffeeBoardHeight, CoffeeBoardWidth, CoffeeCommand, CoffeeGrid, CoffeeLayer, CoffeeMark, CoffeePosition, CoffeeTurnPos, CoffeeTurnVar>;
export type CoffeeGraphics = Graphics<CoffeeTerrain, CoffeeUnit>;
export type CoffeeInstructions = Instructions<CoffeeBattlePos, CoffeeBattleVar, CoffeeCommand, CoffeeGrid, CoffeeLayer, CoffeeMark, CoffeePhase, CoffeeTurnPos, CoffeeTurnVar, CoffeeUnit>;
export type CoffeeMeta = AlgolMeta<CoffeeCommand, CoffeeMark>;
export type CoffeePerformance = AlgolPerformance<CoffeeCommand, CoffeeMark>;
export type CoffeeScripts = AlgolGameTestSuite<CoffeeCommand, CoffeePosition>;
export type CoffeeSetup = Setup<CoffeePosition, CoffeeUnit>;

export type CoffeeDefinition = FullDef<CoffeeAiArtifactLayer, CoffeeAiAspect, CoffeeAiBrain, CoffeeAiGenerator, CoffeeAiGrid, CoffeeAiTerrain, CoffeeAiTerrainLayer, CoffeeArtifactLayer, CoffeeBattlePos, CoffeeBattleVar, CoffeeBoardHeight, CoffeeBoardWidth, CoffeeCommand, CoffeeGenerator, CoffeeGrid, CoffeeLayer, CoffeeMark, CoffeePhase, CoffeePosition, CoffeeTerrain, CoffeeTurnPos, CoffeeTurnVar, CoffeeUnit>;

export type CoffeeGrid = never;

export type CoffeeAiGenerator = never;

export type CoffeeAiAspect = never;

export type CoffeeAiGrid = never;

export type CoffeeAiArtifactLayer = never;

export type CoffeeAiBrain = never;

export type CoffeeAiTerrainLayer = never;

export type CoffeeAiTerrain = never;

export type CoffeePosition = "a1" | "a2" | "a3" | "a4" | "a5" | "b1" | "b2" | "b3" | "b4" | "b5" | "c1" | "c2" | "c3" | "c4" | "c5" | "d1" | "d2" | "d3" | "d4" | "d5" | "e1" | "e2" | "e3" | "e4" | "e5";
