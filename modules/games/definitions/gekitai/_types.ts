// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type GekitaiBoardHeight = 6;
type GekitaiBoardWidth = 6;

type GekitaiTerrain = never;
type GekitaiUnit = "markers";
type GekitaiMark = "selectdroptarget";
type GekitaiCommand = "drop";
type GekitaiPhaseCommand = never;
type GekitaiPhase = "startTurn" | GekitaiMark;
type GekitaiUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "markers"
  | "mymarkers"
  | "oppmarkers"
  | "neutralmarkers";
type GekitaiGenerator = "findendline" | "findpushconsequences";
type GekitaiArtifactLayer = "winline" | "loseline" | "death" | "push";
type GekitaiTerrainLayer = never;
type GekitaiLayer = CommonLayer | GekitaiUnitLayer | GekitaiArtifactLayer;
type GekitaiBattlePos = never;
type GekitaiBattleVar = never;
type GekitaiTurnPos = never;
type GekitaiTurnVar = never;

type GekitaiBoardName = "basic";
type GekitaiSetupName = "basic";
type GekitaiRulesetName = "basic";
type GekitaiVariantName = "basic";

type GekitaiGrid = never;

type GekitaiPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5"
  | "e6"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6";

type GekitaiBlob = AlgolGameBlob<
  GekitaiArtifactLayer,
  GekitaiBoardName,
  GekitaiBattlePos,
  GekitaiBattleVar,
  GekitaiCommand,
  GekitaiGenerator,
  GekitaiGrid,
  GekitaiLayer,
  GekitaiMark,
  GekitaiPhase,
  GekitaiPosition,
  GekitaiRulesetName,
  GekitaiSetupName,
  GekitaiTerrain,
  GekitaiTurnPos,
  GekitaiTurnVar,
  GekitaiUnit
>;

export type GekitaiDefinition = FullDef<GekitaiBlob>;
