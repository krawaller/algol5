// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type CampaignBoardHeight = 10;
type CampaignBoardWidth = 10;

type CampaignTerrain = "center";
type CampaignUnit = "knights" | "marks";
type CampaignMark = "selectdeploytarget" | "selectjumptarget";
type CampaignCommand = "deploy" | "jump";
type CampaignPhaseCommand = never;
type CampaignPhase = "startTurn" | CampaignMark;
type CampaignUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "knights"
  | "myknights"
  | "oppknights"
  | "neutralknights"
  | "marks"
  | "mymarks"
  | "oppmarks"
  | "neutralmarks";
type CampaignGenerator =
  | "findjumptargets"
  | "findwinlineheads"
  | "findwinlines";
type CampaignArtifactLayer = "jumptargets" | "winlineheads" | "winline";
type CampaignTerrainLayer = "center" | "nocenter";
type CampaignLayer =
  | CommonLayer
  | CampaignUnitLayer
  | CampaignArtifactLayer
  | CampaignTerrainLayer;
type CampaignBattlePos = never;
type CampaignBattleVar = never;
type CampaignTurnPos = "jumpedfrom";
type CampaignTurnVar = "jumpedfrom";

type CampaignBoardName = "basic";
type CampaignSetupName = "basic";
type CampaignRulesetName = "basic";
type CampaignVariantName = "regular";

type CampaignGrid = never;

type CampaignPosition =
  | "a1"
  | "a10"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "a7"
  | "a8"
  | "a9"
  | "b1"
  | "b10"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "b7"
  | "b8"
  | "b9"
  | "c1"
  | "c10"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "c7"
  | "c8"
  | "c9"
  | "d1"
  | "d10"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "d7"
  | "d8"
  | "d9"
  | "e1"
  | "e10"
  | "e2"
  | "e3"
  | "e4"
  | "e5"
  | "e6"
  | "e7"
  | "e8"
  | "e9"
  | "f1"
  | "f10"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "f7"
  | "f8"
  | "f9"
  | "g1"
  | "g10"
  | "g2"
  | "g3"
  | "g4"
  | "g5"
  | "g6"
  | "g7"
  | "g8"
  | "g9"
  | "h1"
  | "h10"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "h7"
  | "h8"
  | "h9"
  | "i1"
  | "i10"
  | "i2"
  | "i3"
  | "i4"
  | "i5"
  | "i6"
  | "i7"
  | "i8"
  | "i9"
  | "j1"
  | "j10"
  | "j2"
  | "j3"
  | "j4"
  | "j5"
  | "j6"
  | "j7"
  | "j8"
  | "j9";

export type CampaignBlob = AlgolGameBlob<
  CampaignArtifactLayer,
  CampaignBoardName,
  CampaignBattlePos,
  CampaignBattleVar,
  CampaignCommand,
  CampaignGenerator,
  CampaignGrid,
  CampaignLayer,
  CampaignMark,
  CampaignPhase,
  CampaignPosition,
  CampaignRulesetName,
  CampaignSetupName,
  CampaignTerrain,
  CampaignTurnPos,
  CampaignTurnVar,
  CampaignUnit
>;

export type CampaignDefinition = FullDef<CampaignBlob>;
