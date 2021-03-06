// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type OrthokonBoardHeight = 4;
type OrthokonBoardWidth = 4;

type OrthokonTerrain = never;
type OrthokonUnit = "soldiers";
type OrthokonMark = "selectunit" | "selectslidetarget";
type OrthokonCommand = "slide";
type OrthokonPhaseCommand = never;
type OrthokonPhase = "startTurn" | OrthokonMark;
type OrthokonUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers";
type OrthokonGenerator = "findvictims" | "findslidetargets";
type OrthokonArtifactLayer = "victims" | "slidetargets";
type OrthokonTerrainLayer = never;
type OrthokonLayer = CommonLayer | OrthokonUnitLayer | OrthokonArtifactLayer;
type OrthokonBattlePos = never;
type OrthokonBattleVar = never;
type OrthokonTurnPos = never;
type OrthokonTurnVar = never;

type OrthokonBoardName = "basic";
type OrthokonSetupName = "basic";
type OrthokonRulesetName = "basic";
type OrthokonVariantName = "regular";

type OrthokonGrid = never;

type OrthokonPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "d1"
  | "d2"
  | "d3"
  | "d4";

export type OrthokonBlob = AlgolGameBlob<
  OrthokonArtifactLayer,
  OrthokonBoardName,
  OrthokonBattlePos,
  OrthokonBattleVar,
  OrthokonCommand,
  OrthokonGenerator,
  OrthokonGrid,
  OrthokonLayer,
  OrthokonMark,
  OrthokonPhase,
  OrthokonPosition,
  OrthokonRulesetName,
  OrthokonSetupName,
  OrthokonTerrain,
  OrthokonTurnPos,
  OrthokonTurnVar,
  OrthokonUnit
>;

export type OrthokonDefinition = FullDef<OrthokonBlob>;
