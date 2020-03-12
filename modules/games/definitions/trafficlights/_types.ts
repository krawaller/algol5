// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type TrafficlightsBoardHeight = 3;
type TrafficlightsBoardWidth = 4;

type TrafficlightsTerrain = never;
type TrafficlightsUnit = "kings" | "pawns" | "bishops";
type TrafficlightsMark = "selectdeploytarget" | "selectunit";
type TrafficlightsCommand = "deploy" | "promote";
type TrafficlightsPhaseCommand = never;
type TrafficlightsPhase = "startTurn" | TrafficlightsMark;
type TrafficlightsUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "kings"
  | "mykings"
  | "oppkings"
  | "neutralkings"
  | "pawns"
  | "mypawns"
  | "opppawns"
  | "neutralpawns"
  | "bishops"
  | "mybishops"
  | "oppbishops"
  | "neutralbishops";
type TrafficlightsGenerator = "findlines";
type TrafficlightsArtifactLayer = "line";
type TrafficlightsTerrainLayer = never;
type TrafficlightsLayer =
  | CommonLayer
  | TrafficlightsUnitLayer
  | TrafficlightsArtifactLayer;
type TrafficlightsBattlePos = never;
type TrafficlightsBattleVar = never;
type TrafficlightsTurnPos = never;
type TrafficlightsTurnVar = never;

type TrafficlightsBoardName = "basic";
type TrafficlightsSetupName = "basic";
type TrafficlightsRulesetName = "basic";
type TrafficlightsVariantName = "regular";

type TrafficlightsGrid = never;

type TrafficlightsPosition =
  | "a1"
  | "a2"
  | "a3"
  | "b1"
  | "b2"
  | "b3"
  | "c1"
  | "c2"
  | "c3"
  | "d1"
  | "d2"
  | "d3";

export type TrafficlightsBlob = AlgolGameBlob<
  TrafficlightsArtifactLayer,
  TrafficlightsBoardName,
  TrafficlightsBattlePos,
  TrafficlightsBattleVar,
  TrafficlightsCommand,
  TrafficlightsGenerator,
  TrafficlightsGrid,
  TrafficlightsLayer,
  TrafficlightsMark,
  TrafficlightsPhase,
  TrafficlightsPosition,
  TrafficlightsRulesetName,
  TrafficlightsSetupName,
  TrafficlightsTerrain,
  TrafficlightsTurnPos,
  TrafficlightsTurnVar,
  TrafficlightsUnit
>;

export type TrafficlightsDefinition = FullDef<TrafficlightsBlob>;
