// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type PaperneutronBoardHeight = 5;
type PaperneutronBoardWidth = 5;

type PaperneutronTerrain = never;
type PaperneutronUnit = never;
type PaperneutronMark = never;
type PaperneutronCommand = never;
type PaperneutronPhaseCommand = never;
type PaperneutronPhase = "startTurn" | PaperneutronMark;
type PaperneutronUnitLayer = "units" | "myunits" | "oppunits" | "neutralunits";
type PaperneutronGenerator = never;
type PaperneutronArtifactLayer = never;
type PaperneutronTerrainLayer = never;
type PaperneutronLayer = CommonLayer | PaperneutronUnitLayer;
type PaperneutronBattlePos = never;
type PaperneutronBattleVar = never;
type PaperneutronTurnPos = never;
type PaperneutronTurnVar = never;

type PaperneutronBoardName = "basic";
type PaperneutronSetupName = "basic";
type PaperneutronRulesetName = "basic";
type PaperneutronVariantName = "regular";

type PaperneutronGrid = never;

type PaperneutronPosition =
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

export type PaperneutronBlob = AlgolGameBlob<
  PaperneutronArtifactLayer,
  PaperneutronBoardName,
  PaperneutronBattlePos,
  PaperneutronBattleVar,
  PaperneutronCommand,
  PaperneutronGenerator,
  PaperneutronGrid,
  PaperneutronLayer,
  PaperneutronMark,
  PaperneutronPhase,
  PaperneutronPosition,
  PaperneutronRulesetName,
  PaperneutronSetupName,
  PaperneutronTerrain,
  PaperneutronTurnPos,
  PaperneutronTurnVar,
  PaperneutronUnit
>;

export type PaperneutronDefinition = FullDef<PaperneutronBlob>;
