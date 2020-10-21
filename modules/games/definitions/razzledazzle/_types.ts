// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type RazzledazzleBoardHeight = 7;
type RazzledazzleBoardWidth = 8;

type RazzledazzleTerrain = "base";
type RazzledazzleUnit = "carriers" | "receivers" | "resters" | "ball";
type RazzledazzleMark =
  | "selectmover"
  | "selectpasser"
  | "selectpasstarget"
  | "selectmovetarget";
type RazzledazzleCommand = "move" | "pass";
type RazzledazzlePhaseCommand = "pass";
type RazzledazzlePhase =
  | "startTurn"
  | RazzledazzleMark
  | RazzledazzlePhaseCommand;
type RazzledazzleUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "carriers"
  | "mycarriers"
  | "oppcarriers"
  | "neutralcarriers"
  | "receivers"
  | "myreceivers"
  | "oppreceivers"
  | "neutralreceivers"
  | "resters"
  | "myresters"
  | "oppresters"
  | "neutralresters"
  | "ball"
  | "myball"
  | "oppball"
  | "neutralball";
type RazzledazzleGenerator =
  | "findpasstargets"
  | "findmovetargets"
  | "findannoyer";
type RazzledazzleArtifactLayer = "passtargets" | "movetargets" | "annoyer";
type RazzledazzleTerrainLayer = "base" | "mybase" | "oppbase" | "nobase";
type RazzledazzleLayer =
  | CommonLayer
  | RazzledazzleUnitLayer
  | RazzledazzleArtifactLayer
  | RazzledazzleTerrainLayer;
type RazzledazzleBattlePos = "plr1lastmove" | "plr2lastmove";
type RazzledazzleBattleVar = "plr1lastmove" | "plr2lastmove";
type RazzledazzleTurnPos = never;
type RazzledazzleTurnVar = never;

type RazzledazzleBoardName = "basic";
type RazzledazzleSetupName = "basic";
type RazzledazzleRulesetName = "basic";
type RazzledazzleVariantName = "regular";

type RazzledazzleGrid = never;

type RazzledazzlePosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "a7"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "b7"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "c7"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "d7"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5"
  | "e6"
  | "e7"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "f7"
  | "g1"
  | "g2"
  | "g3"
  | "g4"
  | "g5"
  | "g6"
  | "g7"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "h7";

export type RazzledazzleBlob = AlgolGameBlob<
  RazzledazzleArtifactLayer,
  RazzledazzleBoardName,
  RazzledazzleBattlePos,
  RazzledazzleBattleVar,
  RazzledazzleCommand,
  RazzledazzleGenerator,
  RazzledazzleGrid,
  RazzledazzleLayer,
  RazzledazzleMark,
  RazzledazzlePhase,
  RazzledazzlePosition,
  RazzledazzleRulesetName,
  RazzledazzleSetupName,
  RazzledazzleTerrain,
  RazzledazzleTurnPos,
  RazzledazzleTurnVar,
  RazzledazzleUnit
>;

export type RazzledazzleDefinition = FullDef<RazzledazzleBlob>;
