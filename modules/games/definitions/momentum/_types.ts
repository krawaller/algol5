// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type MomentumBoardHeight = 7;
type MomentumBoardWidth = 7;

type MomentumTerrain = never;
type MomentumUnit = "stones";
type MomentumMark = "selectdroptarget";
type MomentumCommand = "pie" | "drop";
type MomentumPhaseCommand = never;
type MomentumPhase = "startTurn" | MomentumMark;
type MomentumUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "stones"
  | "mystones"
  | "oppstones"
  | "neutralstones";
type MomentumGenerator = "findpusheffects";
type MomentumArtifactLayer = "doomed" | "pushed";
type MomentumTerrainLayer = never;
type MomentumLayer = CommonLayer | MomentumUnitLayer | MomentumArtifactLayer;
type MomentumBattlePos = never;
type MomentumBattleVar = never;
type MomentumTurnPos = never;
type MomentumTurnVar = never;

type MomentumBoardName = "basic";
type MomentumSetupName = "basic";
type MomentumRulesetName = "basic";
type MomentumVariantName = "basic";

type MomentumGrid = never;

type MomentumPosition =
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
  | "g7";

type MomentumBlob = AlgolGameBlob<
  MomentumArtifactLayer,
  MomentumBoardName,
  MomentumBattlePos,
  MomentumBattleVar,
  MomentumCommand,
  MomentumGenerator,
  MomentumGrid,
  MomentumLayer,
  MomentumMark,
  MomentumPhase,
  MomentumPosition,
  MomentumRulesetName,
  MomentumSetupName,
  MomentumTerrain,
  MomentumTurnPos,
  MomentumTurnVar,
  MomentumUnit
>;

export type MomentumDefinition = FullDef<MomentumBlob>;
