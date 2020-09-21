// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type NeutreekoBoardHeight = 5;
type NeutreekoBoardWidth = 5;

type NeutreekoTerrain = never;
type NeutreekoUnit = "pieces";
type NeutreekoMark = "selectunit" | "selectmovetarget";
type NeutreekoCommand = "move";
type NeutreekoPhaseCommand = never;
type NeutreekoPhase = "startTurn" | NeutreekoMark;
type NeutreekoUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "pieces"
  | "mypieces"
  | "opppieces"
  | "neutralpieces";
type NeutreekoGenerator = "findmovetargets" | "findwinline";
type NeutreekoArtifactLayer = "movetargets" | "winline";
type NeutreekoTerrainLayer = never;
type NeutreekoLayer = CommonLayer | NeutreekoUnitLayer | NeutreekoArtifactLayer;
type NeutreekoBattlePos = never;
type NeutreekoBattleVar = never;
type NeutreekoTurnPos = never;
type NeutreekoTurnVar = never;

type NeutreekoBoardName = "basic";
type NeutreekoSetupName = "basic";
type NeutreekoRulesetName = "basic";
type NeutreekoVariantName = "regular";

type NeutreekoGrid = never;

type NeutreekoPosition =
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

export type NeutreekoBlob = AlgolGameBlob<
  NeutreekoArtifactLayer,
  NeutreekoBoardName,
  NeutreekoBattlePos,
  NeutreekoBattleVar,
  NeutreekoCommand,
  NeutreekoGenerator,
  NeutreekoGrid,
  NeutreekoLayer,
  NeutreekoMark,
  NeutreekoPhase,
  NeutreekoPosition,
  NeutreekoRulesetName,
  NeutreekoSetupName,
  NeutreekoTerrain,
  NeutreekoTurnPos,
  NeutreekoTurnVar,
  NeutreekoUnit
>;

export type NeutreekoDefinition = FullDef<NeutreekoBlob>;
