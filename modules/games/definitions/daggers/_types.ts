// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type DaggersBoardHeight = 8;
type DaggersBoardWidth = 8;

type DaggersTerrain = "base";
type DaggersUnit = "daggers" | "crowns";
type DaggersMark = "selectunit" | "selectmovetarget";
type DaggersCommand = "move";
type DaggersPhaseCommand = never;
type DaggersPhase = "startTurn" | DaggersMark;
type DaggersUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "daggers"
  | "mydaggers"
  | "oppdaggers"
  | "neutraldaggers"
  | "crowns"
  | "mycrowns"
  | "oppcrowns"
  | "neutralcrowns";
type DaggersGenerator = "findcrowntargets" | "finddaggertargets";
type DaggersArtifactLayer = "movetarget";
type DaggersTerrainLayer = "base" | "mybase" | "oppbase" | "nobase";
type DaggersLayer =
  | CommonLayer
  | DaggersUnitLayer
  | DaggersArtifactLayer
  | DaggersTerrainLayer;
type DaggersBattlePos = never;
type DaggersBattleVar = never;
type DaggersTurnPos = never;
type DaggersTurnVar = never;

type DaggersBoardName = "basic";
type DaggersSetupName = "basic";
type DaggersRulesetName = "basic";
type DaggersVariantName = "regular";

type DaggersGrid = never;

type DaggersPosition =
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

export type DaggersBlob = AlgolGameBlob<
  DaggersArtifactLayer,
  DaggersBoardName,
  DaggersBattlePos,
  DaggersBattleVar,
  DaggersCommand,
  DaggersGenerator,
  DaggersGrid,
  DaggersLayer,
  DaggersMark,
  DaggersPhase,
  DaggersPosition,
  DaggersRulesetName,
  DaggersSetupName,
  DaggersTerrain,
  DaggersTurnPos,
  DaggersTurnVar,
  DaggersUnit
>;

export type DaggersDefinition = FullDef<DaggersBlob>;
