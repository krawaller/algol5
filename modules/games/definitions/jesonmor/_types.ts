// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type JesonmorBoardHeight = 9;
type JesonmorBoardWidth = 9;

type JesonmorTerrain = "center";
type JesonmorUnit = "horses";
type JesonmorMark = "selectunit" | "selectmovetarget";
type JesonmorCommand = "move";
type JesonmorPhaseCommand = never;
type JesonmorPhase = "startTurn" | JesonmorMark;
type JesonmorUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "horses"
  | "myhorses"
  | "opphorses"
  | "neutralhorses";
type JesonmorGenerator = "findmovetargets";
type JesonmorArtifactLayer = "movetargets";
type JesonmorTerrainLayer =
  | "center"
  | "neutralcenter"
  | "nocenter"
  | "noneutralcenter";
type JesonmorLayer =
  | CommonLayer
  | JesonmorUnitLayer
  | JesonmorArtifactLayer
  | JesonmorTerrainLayer;
type JesonmorBattlePos = never;
type JesonmorBattleVar = never;
type JesonmorTurnPos = never;
type JesonmorTurnVar = never;

type JesonmorBoardName = "basic";
type JesonmorSetupName = "basic";
type JesonmorRulesetName = "basic";
type JesonmorVariantName = "regular";

type JesonmorGrid = never;

type JesonmorPosition =
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

export type JesonmorBlob = AlgolGameBlob<
  JesonmorArtifactLayer,
  JesonmorBoardName,
  JesonmorBattlePos,
  JesonmorBattleVar,
  JesonmorCommand,
  JesonmorGenerator,
  JesonmorGrid,
  JesonmorLayer,
  JesonmorMark,
  JesonmorPhase,
  JesonmorPosition,
  JesonmorRulesetName,
  JesonmorSetupName,
  JesonmorTerrain,
  JesonmorTurnPos,
  JesonmorTurnVar,
  JesonmorUnit
>;

export type JesonmorDefinition = FullDef<JesonmorBlob>;
