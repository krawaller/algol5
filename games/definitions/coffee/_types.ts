import { CommonLayer } from '../../../types';

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
