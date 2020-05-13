// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type DuckpondBoardHeight = 5;
type DuckpondBoardWidth = 5;

type DuckpondTerrain = never;
type DuckpondUnit = "ducks";
type DuckpondMark = "selectunit" | "selectmovetarget";
type DuckpondCommand = "move";
type DuckpondPhaseCommand = never;
type DuckpondPhase = "startTurn" | DuckpondMark;
type DuckpondUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "ducks"
  | "myducks"
  | "oppducks"
  | "neutralducks";
type DuckpondGenerator = "findmovetargets" | "findwinlines";
type DuckpondArtifactLayer = "movetargets" | "winline";
type DuckpondTerrainLayer = never;
type DuckpondLayer = CommonLayer | DuckpondUnitLayer | DuckpondArtifactLayer;
type DuckpondBattlePos = never;
type DuckpondBattleVar = never;
type DuckpondTurnPos = never;
type DuckpondTurnVar = never;

type DuckpondBoardName = "basic";
type DuckpondSetupName = "basic";
type DuckpondRulesetName = "basic";
type DuckpondVariantName = "regular";

type DuckpondGrid = never;

type DuckpondPosition =
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

export type DuckpondBlob = AlgolGameBlob<
  DuckpondArtifactLayer,
  DuckpondBoardName,
  DuckpondBattlePos,
  DuckpondBattleVar,
  DuckpondCommand,
  DuckpondGenerator,
  DuckpondGrid,
  DuckpondLayer,
  DuckpondMark,
  DuckpondPhase,
  DuckpondPosition,
  DuckpondRulesetName,
  DuckpondSetupName,
  DuckpondTerrain,
  DuckpondTurnPos,
  DuckpondTurnVar,
  DuckpondUnit
>;

export type DuckpondDefinition = FullDef<DuckpondBlob>;
