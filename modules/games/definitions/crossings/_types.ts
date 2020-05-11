// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type CrossingsBoardHeight = 8;
type CrossingsBoardWidth = 8;

type CrossingsTerrain = "base";
type CrossingsUnit = "soldiers" | "towers";
type CrossingsMark =
  | "selecttail"
  | "selecthead"
  | "selectmarchtarget"
  | "selectsteptarget";
type CrossingsCommand = "step" | "march";
type CrossingsPhaseCommand = never;
type CrossingsPhase = "startTurn" | CrossingsMark;
type CrossingsUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers"
  | "towers"
  | "mytowers"
  | "opptowers"
  | "neutraltowers";
type CrossingsGenerator =
  | "findsteptargets"
  | "findheads"
  | "findphalanx"
  | "findmarchtargets"
  | "findvictims";
type CrossingsArtifactLayer =
  | "steptargets"
  | "heads"
  | "phalanx"
  | "marchtargets"
  | "potentialvictim";
type CrossingsTerrainLayer = "base" | "mybase" | "oppbase" | "nobase";
type CrossingsLayer =
  | CommonLayer
  | CrossingsUnitLayer
  | CrossingsArtifactLayer
  | CrossingsTerrainLayer;
type CrossingsBattlePos = never;
type CrossingsBattleVar = never;
type CrossingsTurnPos = never;
type CrossingsTurnVar = never;

type CrossingsBoardName = "basic";
type CrossingsSetupName = "basic";
type CrossingsRulesetName = "basic";
type CrossingsVariantName = "regular";

type CrossingsGrid = never;

type CrossingsPosition =
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

export type CrossingsBlob = AlgolGameBlob<
  CrossingsArtifactLayer,
  CrossingsBoardName,
  CrossingsBattlePos,
  CrossingsBattleVar,
  CrossingsCommand,
  CrossingsGenerator,
  CrossingsGrid,
  CrossingsLayer,
  CrossingsMark,
  CrossingsPhase,
  CrossingsPosition,
  CrossingsRulesetName,
  CrossingsSetupName,
  CrossingsTerrain,
  CrossingsTurnPos,
  CrossingsTurnVar,
  CrossingsUnit
>;

export type CrossingsDefinition = FullDef<CrossingsBlob>;
