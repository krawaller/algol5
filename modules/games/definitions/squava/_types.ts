// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type SquavaBoardHeight = 5;
type SquavaBoardWidth = 5;

type SquavaTerrain = never;
type SquavaUnit = "markers";
type SquavaMark = "selectspace";
type SquavaCommand = "drop";
type SquavaPhaseCommand = never;
type SquavaPhase = "startTurn" | SquavaMark;
type SquavaUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "markers"
  | "mymarkers"
  | "oppmarkers"
  | "neutralmarkers";
type SquavaGenerator = "findlinebeginnings" | "findendlines";
type SquavaArtifactLayer = "linebeginnings" | "loseline" | "winline";
type SquavaTerrainLayer = never;
type SquavaLayer = CommonLayer | SquavaUnitLayer | SquavaArtifactLayer;
type SquavaBattlePos = never;
type SquavaBattleVar = never;
type SquavaTurnPos = never;
type SquavaTurnVar = never;

type SquavaBoardName = "basic";
type SquavaSetupName = "basic";
type SquavaRulesetName = "basic";
type SquavaVariantName = "regular";

type SquavaGrid = never;

type SquavaPosition =
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

export type SquavaBlob = AlgolGameBlob<
  SquavaArtifactLayer,
  SquavaBoardName,
  SquavaBattlePos,
  SquavaBattleVar,
  SquavaCommand,
  SquavaGenerator,
  SquavaGrid,
  SquavaLayer,
  SquavaMark,
  SquavaPhase,
  SquavaPosition,
  SquavaRulesetName,
  SquavaSetupName,
  SquavaTerrain,
  SquavaTurnPos,
  SquavaTurnVar,
  SquavaUnit
>;

export type SquavaDefinition = FullDef<SquavaBlob>;
