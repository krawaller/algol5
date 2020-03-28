// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type KingsvalleyBoardHeight = 5;
type KingsvalleyBoardWidth = 5;

type KingsvalleyTerrain = "goal";
type KingsvalleyUnit = "soldiers" | "kings";
type KingsvalleyMark = "selectunit" | "selectmovetarget";
type KingsvalleyCommand = "slide";
type KingsvalleyPhaseCommand = never;
type KingsvalleyPhase = "startTurn" | KingsvalleyMark;
type KingsvalleyUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers"
  | "kings"
  | "mykings"
  | "oppkings"
  | "neutralkings";
type KingsvalleyGenerator = "findmovetargets";
type KingsvalleyArtifactLayer = "movetargets";
type KingsvalleyTerrainLayer = "goal" | "nogoal";
type KingsvalleyLayer =
  | CommonLayer
  | KingsvalleyUnitLayer
  | KingsvalleyArtifactLayer
  | KingsvalleyTerrainLayer;
type KingsvalleyBattlePos = never;
type KingsvalleyBattleVar = never;
type KingsvalleyTurnPos = never;
type KingsvalleyTurnVar = never;

type KingsvalleyBoardName = "basic";
type KingsvalleySetupName = "basic" | "retrieve";
type KingsvalleyRulesetName = "basic";
type KingsvalleyVariantName = "regular" | "retrieve";

type KingsvalleyGrid = never;

type KingsvalleyPosition =
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

export type KingsvalleyBlob = AlgolGameBlob<
  KingsvalleyArtifactLayer,
  KingsvalleyBoardName,
  KingsvalleyBattlePos,
  KingsvalleyBattleVar,
  KingsvalleyCommand,
  KingsvalleyGenerator,
  KingsvalleyGrid,
  KingsvalleyLayer,
  KingsvalleyMark,
  KingsvalleyPhase,
  KingsvalleyPosition,
  KingsvalleyRulesetName,
  KingsvalleySetupName,
  KingsvalleyTerrain,
  KingsvalleyTurnPos,
  KingsvalleyTurnVar,
  KingsvalleyUnit
>;

export type KingsvalleyDefinition = FullDef<KingsvalleyBlob>;
