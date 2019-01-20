import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type CoffeeTerrain = never;
export type CoffeeUnit = "soldiers" | "markers";
export type CoffeeMark = "selectdrop";
export type CoffeeCommand = "uphill" | "downhill" | "horisontal" | "vertical";
export type CoffeePhaseCommand = never;
export type CoffeePhase = "startTurn" | CoffeeMark;
export type CoffeeUnitLayer = "soldiers" | "mysoldiers" | "neutralsoldiers" | "oppsoldiers" | "markers" | "mymarkers" | "neutralmarkers" | "oppmarkers";
export type CoffeeGenerator = "findgeneratees" | "findwinlines";
export type CoffeeArtifactLayer = "FOOBAR" | "vertical" | "uphill" | "horisontal" | "downhill" | "winline";
export type CoffeeTerrainLayer = never;
export type CoffeeLayer = CommonLayer | CoffeeUnitLayer | CoffeeArtifactLayer;
export type CoffeeBattlePos = any;
export type CoffeeBattleVar = any;
export type CoffeeTurnPos = any;
export type CoffeeTurnVar = any;
 
export type CoffeeGenerators = Generators<CoffeeArtifactLayer, CoffeeBattlePos, CoffeeBattleVar, CoffeeCommand, CoffeeGenerator, CoffeeLayer, CoffeeMark, CoffeeTurnPos, CoffeeTurnVar>;
export type CoffeeFlow = Flow<CoffeeBattlePos, CoffeeBattleVar, CoffeeCommand, CoffeeGenerator, CoffeeLayer, CoffeeMark, CoffeeTurnPos, CoffeeTurnVar, CoffeeUnit>;
export type CoffeeBoard = Board<CoffeeTerrain>;
export type CoffeeAI = AI<CoffeeAiArtifactLayer, CoffeeAiAspect, CoffeeAiBrain, CoffeeAiGenerator, CoffeeAiGrid, CoffeeAiTerrain, CoffeeAiTerrainLayer, CoffeeBattlePos, CoffeeBattleVar, CoffeeCommand, CoffeeLayer, CoffeeMark, CoffeeTurnPos, CoffeeTurnVar>;
export type CoffeeGraphics = Graphics<CoffeeTerrain, CoffeeUnit>;
export type CoffeeInstructions = Instructions<CoffeeBattlePos, CoffeeBattleVar, CoffeeCommand, CoffeeLayer, CoffeeMark, CoffeePhase, CoffeeTurnPos, CoffeeTurnVar, CoffeeUnit>;
export type CoffeeMeta = Meta;
export type CoffeeScripts = GameTestSuite;
export type CoffeeSetup = Setup<CoffeeUnit>;

export type CoffeeDefinition = FullDef<CoffeeAiArtifactLayer, CoffeeAiAspect, CoffeeAiBrain, CoffeeAiGenerator, CoffeeAiGrid, CoffeeAiTerrain, CoffeeAiTerrainLayer, CoffeeArtifactLayer, CoffeeBattlePos, CoffeeBattleVar, CoffeeCommand, CoffeeGenerator, CoffeeLayer, CoffeeMark, CoffeePhase, CoffeeTerrain, CoffeeTurnPos, CoffeeTurnVar, CoffeeUnit>;

export type CoffeeAiGenerator = never;

export type CoffeeAiAspect = never;

export type CoffeeAiGrid = never;

export type CoffeeAiArtifactLayer = never;

export type CoffeeAiBrain = never;

export type CoffeeAiTerrainLayer = never;

export type CoffeeAiTerrain = never;
