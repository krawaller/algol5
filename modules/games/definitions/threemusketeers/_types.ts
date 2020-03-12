// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type ThreemusketeersBoardHeight = 5;
type ThreemusketeersBoardWidth = 5;

type ThreemusketeersTerrain = never;
type ThreemusketeersUnit = "pawns" | "kings";
type ThreemusketeersMark = "selectunit" | "selectmovetarget";
type ThreemusketeersCommand = "move";
type ThreemusketeersPhaseCommand = never;
type ThreemusketeersPhase = "startTurn" | ThreemusketeersMark;
type ThreemusketeersUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "pawns"
  | "mypawns"
  | "opppawns"
  | "neutralpawns"
  | "kings"
  | "mykings"
  | "oppkings"
  | "neutralkings";
type ThreemusketeersGenerator =
  | "findstrandedmusketeers"
  | "findmusketeerline"
  | "findmovetargets";
type ThreemusketeersArtifactLayer =
  | "strandedmusketeers"
  | "musketeerline"
  | "movetargets";
type ThreemusketeersTerrainLayer = never;
type ThreemusketeersLayer =
  | CommonLayer
  | ThreemusketeersUnitLayer
  | ThreemusketeersArtifactLayer;
type ThreemusketeersBattlePos = never;
type ThreemusketeersBattleVar = never;
type ThreemusketeersTurnPos = never;
type ThreemusketeersTurnVar = never;

type ThreemusketeersBoardName = "basic";
type ThreemusketeersSetupName = "basic";
type ThreemusketeersRulesetName = "basic";
type ThreemusketeersVariantName = "regular";

type ThreemusketeersGrid = never;

type ThreemusketeersPosition =
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

export type ThreemusketeersBlob = AlgolGameBlob<
  ThreemusketeersArtifactLayer,
  ThreemusketeersBoardName,
  ThreemusketeersBattlePos,
  ThreemusketeersBattleVar,
  ThreemusketeersCommand,
  ThreemusketeersGenerator,
  ThreemusketeersGrid,
  ThreemusketeersLayer,
  ThreemusketeersMark,
  ThreemusketeersPhase,
  ThreemusketeersPosition,
  ThreemusketeersRulesetName,
  ThreemusketeersSetupName,
  ThreemusketeersTerrain,
  ThreemusketeersTurnPos,
  ThreemusketeersTurnVar,
  ThreemusketeersUnit
>;

export type ThreemusketeersDefinition = FullDef<ThreemusketeersBlob>;
