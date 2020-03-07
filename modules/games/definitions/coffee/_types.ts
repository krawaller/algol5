// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type CoffeeBoardHeight = 5;
type CoffeeBoardWidth = 5;

type CoffeeTerrain = never;
type CoffeeUnit = "soldiers";
type CoffeeMark = "selectdrop";
type CoffeeCommand = "uphill" | "downhill" | "horisontal" | "vertical";
type CoffeePhaseCommand = never;
type CoffeePhase = "startTurn" | CoffeeMark;
type CoffeeUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers";
type CoffeeGenerator = "findgeneratees" | "findwinlines";
type CoffeeArtifactLayer =
  | "FOOBAR"
  | "vertical"
  | "uphill"
  | "horisontal"
  | "downhill"
  | "winline";
type CoffeeTerrainLayer = never;
type CoffeeLayer = CommonLayer | CoffeeUnitLayer | CoffeeArtifactLayer;
type CoffeeBattlePos = never;
type CoffeeBattleVar = never;
type CoffeeTurnPos = never;
type CoffeeTurnVar = never;

type CoffeeBoardName = "basic";
type CoffeeSetupName = "basic";
type CoffeeRulesetName = "basic";
type CoffeeVariantName = "basic";

type CoffeeGrid = never;

type CoffeePosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5";

type CoffeeBlob = AlgolGameBlob<
  CoffeeArtifactLayer,
  CoffeeBoardName,
  CoffeeBattlePos,
  CoffeeBattleVar,
  CoffeeCommand,
  CoffeeGenerator,
  CoffeeGrid,
  CoffeeLayer,
  CoffeeMark,
  CoffeePhase,
  CoffeePosition,
  CoffeeRulesetName,
  CoffeeSetupName,
  CoffeeTerrain,
  CoffeeTurnPos,
  CoffeeTurnVar,
  CoffeeUnit
>;

export type CoffeeDefinition = FullDef<CoffeeBlob>;
