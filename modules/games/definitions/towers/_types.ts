// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type TowersBoardHeight = 5;
type TowersBoardWidth = 5;

type TowersTerrain = "base";
type TowersUnit = "pieces";
type TowersMark = "selectunit" | "selectmovetarget";
type TowersCommand = "move";
type TowersPhaseCommand = never;
type TowersPhase = "startTurn" | TowersMark;
type TowersUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "pieces"
  | "mypieces"
  | "opppieces"
  | "neutralpieces";
type TowersGenerator = "findmovetargets";
type TowersArtifactLayer = "movetargets";
type TowersTerrainLayer = "base" | "mybase" | "oppbase" | "nobase";
type TowersLayer =
  | CommonLayer
  | TowersUnitLayer
  | TowersArtifactLayer
  | TowersTerrainLayer;
type TowersBattlePos = never;
type TowersBattleVar = never;
type TowersTurnPos = never;
type TowersTurnVar = never;

type TowersBoardName = "basic";
type TowersSetupName = "basic";
type TowersRulesetName = "basic";
type TowersVariantName = "regular";

type TowersGrid = never;

type TowersPosition =
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

export type TowersBlob = AlgolGameBlob<
  TowersArtifactLayer,
  TowersBoardName,
  TowersBattlePos,
  TowersBattleVar,
  TowersCommand,
  TowersGenerator,
  TowersGrid,
  TowersLayer,
  TowersMark,
  TowersPhase,
  TowersPosition,
  TowersRulesetName,
  TowersSetupName,
  TowersTerrain,
  TowersTurnPos,
  TowersTurnVar,
  TowersUnit
>;

export type TowersDefinition = FullDef<TowersBlob>;
