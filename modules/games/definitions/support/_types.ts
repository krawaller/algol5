// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type SupportBoardHeight = 9;
type SupportBoardWidth = 9;

type SupportTerrain = "edge" | "center";
type SupportUnit = "bases" | "soldiers";
type SupportMark = "selectedge" | "selectpushtarget";
type SupportCommand = "insert";
type SupportPhaseCommand = never;
type SupportPhase = "startTurn" | SupportMark;
type SupportUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "bases"
  | "mybases"
  | "oppbases"
  | "neutralbases"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers";
type SupportGenerator = "findpushtargets" | "findpushees";
type SupportArtifactLayer = "pushtargets" | "pushees";
type SupportTerrainLayer =
  | "edge"
  | "center"
  | "neutralcenter"
  | "noedge"
  | "nocenter"
  | "noneutralcenter";
type SupportLayer =
  | CommonLayer
  | SupportUnitLayer
  | SupportArtifactLayer
  | SupportTerrainLayer;
type SupportBattlePos = never;
type SupportBattleVar = never;
type SupportTurnPos = never;
type SupportTurnVar = never;

type SupportBoardName = "basic";
type SupportSetupName = "basic";
type SupportRulesetName = "basic";
type SupportVariantName = "regular";

type SupportGrid = never;

type SupportPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "a7"
  | "a8"
  | "a9"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "b7"
  | "b8"
  | "b9"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "c7"
  | "c8"
  | "c9"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "d7"
  | "d8"
  | "d9"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5"
  | "e6"
  | "e7"
  | "e8"
  | "e9"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "f7"
  | "f8"
  | "f9"
  | "g1"
  | "g2"
  | "g3"
  | "g4"
  | "g5"
  | "g6"
  | "g7"
  | "g8"
  | "g9"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "h7"
  | "h8"
  | "h9"
  | "i1"
  | "i2"
  | "i3"
  | "i4"
  | "i5"
  | "i6"
  | "i7"
  | "i8"
  | "i9";

export type SupportBlob = AlgolGameBlob<
  SupportArtifactLayer,
  SupportBoardName,
  SupportBattlePos,
  SupportBattleVar,
  SupportCommand,
  SupportGenerator,
  SupportGrid,
  SupportLayer,
  SupportMark,
  SupportPhase,
  SupportPosition,
  SupportRulesetName,
  SupportSetupName,
  SupportTerrain,
  SupportTurnPos,
  SupportTurnVar,
  SupportUnit
>;

export type SupportDefinition = FullDef<SupportBlob>;
