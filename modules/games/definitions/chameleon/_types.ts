// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type ChameleonBoardHeight = 5;
type ChameleonBoardWidth = 5;

type ChameleonTerrain = "base";
type ChameleonUnit = "knights" | "bishops";
type ChameleonMark = "selectunit" | "selectmovetarget";
type ChameleonCommand = "move";
type ChameleonPhaseCommand = never;
type ChameleonPhase = "startTurn" | ChameleonMark;
type ChameleonUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "knights"
  | "myknights"
  | "oppknights"
  | "neutralknights"
  | "bishops"
  | "mybishops"
  | "oppbishops"
  | "neutralbishops";
type ChameleonGenerator =
  | "findinvaders"
  | "findsteptargets"
  | "findbishoptargets"
  | "findknighttargets";
type ChameleonArtifactLayer = "invaders" | "morph" | "movetarget";
type ChameleonTerrainLayer = "base" | "mybase" | "oppbase" | "nobase";
type ChameleonLayer =
  | CommonLayer
  | ChameleonUnitLayer
  | ChameleonArtifactLayer
  | ChameleonTerrainLayer;
type ChameleonBattlePos = never;
type ChameleonBattleVar = never;
type ChameleonTurnPos = never;
type ChameleonTurnVar = never;

type ChameleonBoardName = "basic";
type ChameleonSetupName = "basic";
type ChameleonRulesetName = "basic";
type ChameleonVariantName = "regular";

type ChameleonGrid = never;

type ChameleonPosition =
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

export type ChameleonBlob = AlgolGameBlob<
  ChameleonArtifactLayer,
  ChameleonBoardName,
  ChameleonBattlePos,
  ChameleonBattleVar,
  ChameleonCommand,
  ChameleonGenerator,
  ChameleonGrid,
  ChameleonLayer,
  ChameleonMark,
  ChameleonPhase,
  ChameleonPosition,
  ChameleonRulesetName,
  ChameleonSetupName,
  ChameleonTerrain,
  ChameleonTurnPos,
  ChameleonTurnVar,
  ChameleonUnit
>;

export type ChameleonDefinition = FullDef<ChameleonBlob>;
