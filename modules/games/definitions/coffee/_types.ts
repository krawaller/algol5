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
 
export type CoffeeGenerators = Generators<CoffeeLayer, CoffeeMark, CoffeeCommand, CoffeeTurnPos, CoffeeTurnVar, CoffeeBattlePos, CoffeeBattleVar, CoffeeArtifactLayer, CoffeeGenerator>;
export type CoffeeFlow = Flow<CoffeeArtifactLayer, CoffeeCommand, CoffeeGenerator, CoffeeLayer, CoffeeMark, CoffeeUnit>;
export type CoffeeBoard = Board<CoffeeTerrain>;
export type CoffeeAI = AI;
export type CoffeeGraphics = Graphics<CoffeeTerrain, CoffeeUnit>;
export type CoffeeInstructions = Instructions<CoffeePhase>;
export type CoffeeMeta = Meta;
export type CoffeeScripts = GameTestSuite;
export type CoffeeSetup = Setup<CoffeeUnit>;

export type CoffeeDefinition = FullDef<CoffeeLayer, CoffeeMark, CoffeeCommand, CoffeeTurnPos, CoffeeTurnVar, CoffeeBattlePos, CoffeeBattleVar, CoffeeArtifactLayer, CoffeeGenerator, CoffeePhase, CoffeeTerrain, CoffeeUnit>;
