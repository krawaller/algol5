// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type KickrunBoardHeight = 5;
type KickrunBoardWidth = 5;

type KickrunTerrain = "corners";
type KickrunUnit = "runners" | "sidekickers";
type KickrunMark = "selectunit" | "selectmovetarget";
type KickrunCommand = "move";
type KickrunPhaseCommand = never;
type KickrunPhase = "startTurn" | KickrunMark;
type KickrunUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "runners"
  | "myrunners"
  | "opprunners"
  | "neutralrunners"
  | "sidekickers"
  | "mysidekickers"
  | "oppsidekickers"
  | "neutralsidekickers";
type KickrunGenerator = "findmovetargets";
type KickrunArtifactLayer = "movetargets";
type KickrunTerrainLayer = "corners" | "mycorners" | "oppcorners" | "nocorners";
type KickrunLayer =
  | CommonLayer
  | KickrunUnitLayer
  | KickrunArtifactLayer
  | KickrunTerrainLayer;
type KickrunBattlePos = never;
type KickrunBattleVar = never;
type KickrunTurnPos = never;
type KickrunTurnVar = never;

type KickrunBoardName = "basic";
type KickrunSetupName = "basic";
type KickrunRulesetName = "basic";
type KickrunVariantName = "regular";

type KickrunGrid = never;

type KickrunPosition =
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

export type KickrunBlob = AlgolGameBlob<
  KickrunArtifactLayer,
  KickrunBoardName,
  KickrunBattlePos,
  KickrunBattleVar,
  KickrunCommand,
  KickrunGenerator,
  KickrunGrid,
  KickrunLayer,
  KickrunMark,
  KickrunPhase,
  KickrunPosition,
  KickrunRulesetName,
  KickrunSetupName,
  KickrunTerrain,
  KickrunTurnPos,
  KickrunTurnVar,
  KickrunUnit
>;

export type KickrunDefinition = FullDef<KickrunBlob>;
