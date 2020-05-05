// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type SpeedsoccolotBoardHeight = 8;
type SpeedsoccolotBoardWidth = 8;

type SpeedsoccolotTerrain = "base";
type SpeedsoccolotUnit = "ball" | "players";
type SpeedsoccolotMark = "selectunit" | "selectruntarget" | "selectkicktarget";
type SpeedsoccolotCommand = "run" | "dribble" | "kick";
type SpeedsoccolotPhaseCommand = never;
type SpeedsoccolotPhase = "startTurn" | SpeedsoccolotMark;
type SpeedsoccolotUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "ball"
  | "myball"
  | "oppball"
  | "neutralball"
  | "players"
  | "myplayers"
  | "oppplayers"
  | "neutralplayers";
type SpeedsoccolotGenerator =
  | "findplayeroptions"
  | "finddribbletarget"
  | "findkicktargets";
type SpeedsoccolotArtifactLayer =
  | "closeball"
  | "runtargets"
  | "dribbletarget"
  | "kicktargets";
type SpeedsoccolotTerrainLayer = "base" | "mybase" | "oppbase" | "nobase";
type SpeedsoccolotLayer =
  | CommonLayer
  | SpeedsoccolotUnitLayer
  | SpeedsoccolotArtifactLayer
  | SpeedsoccolotTerrainLayer;
type SpeedsoccolotBattlePos = never;
type SpeedsoccolotBattleVar = never;
type SpeedsoccolotTurnPos = never;
type SpeedsoccolotTurnVar = never;

type SpeedsoccolotBoardName = "original" | "basic";
type SpeedsoccolotSetupName = "original" | "basic";
type SpeedsoccolotRulesetName = "basic";
type SpeedsoccolotVariantName = "speed" | "original";

type SpeedsoccolotGrid = never;

type SpeedsoccolotPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "a7"
  | "a8"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "b7"
  | "b8"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "c7"
  | "c8"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "d7"
  | "d8"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5"
  | "e6"
  | "e7"
  | "e8"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "f7"
  | "f8"
  | "g1"
  | "g2"
  | "g3"
  | "g4"
  | "g5"
  | "g6"
  | "g7"
  | "g8"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "h7"
  | "h8";

export type SpeedsoccolotBlob = AlgolGameBlob<
  SpeedsoccolotArtifactLayer,
  SpeedsoccolotBoardName,
  SpeedsoccolotBattlePos,
  SpeedsoccolotBattleVar,
  SpeedsoccolotCommand,
  SpeedsoccolotGenerator,
  SpeedsoccolotGrid,
  SpeedsoccolotLayer,
  SpeedsoccolotMark,
  SpeedsoccolotPhase,
  SpeedsoccolotPosition,
  SpeedsoccolotRulesetName,
  SpeedsoccolotSetupName,
  SpeedsoccolotTerrain,
  SpeedsoccolotTurnPos,
  SpeedsoccolotTurnVar,
  SpeedsoccolotUnit
>;

export type SpeedsoccolotDefinition = FullDef<SpeedsoccolotBlob>;
