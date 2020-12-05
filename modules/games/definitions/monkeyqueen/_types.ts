// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type MonkeyqueenBoardHeight = 12;
type MonkeyqueenBoardWidth = 12;

type MonkeyqueenTerrain = never;
type MonkeyqueenUnit = "queens" | "babies";
type MonkeyqueenMark = "selectunit" | "selectmovetarget";
type MonkeyqueenCommand = "move" | "pie";
type MonkeyqueenPhaseCommand = never;
type MonkeyqueenPhase = "startTurn" | MonkeyqueenMark;
type MonkeyqueenUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "queens"
  | "myqueens"
  | "oppqueens"
  | "neutralqueens"
  | "babies"
  | "mybabies"
  | "oppbabies"
  | "neutralbabies";
type MonkeyqueenGenerator = "findmovetargets";
type MonkeyqueenArtifactLayer = "movetargets";
type MonkeyqueenTerrainLayer = never;
type MonkeyqueenLayer =
  | CommonLayer
  | MonkeyqueenUnitLayer
  | MonkeyqueenArtifactLayer;
type MonkeyqueenBattlePos = never;
type MonkeyqueenBattleVar = "plr1life" | "plr2life";
type MonkeyqueenTurnPos = never;
type MonkeyqueenTurnVar = never;

type MonkeyqueenBoardName = "basic";
type MonkeyqueenSetupName = "basic";
type MonkeyqueenRulesetName = "basic";
type MonkeyqueenVariantName = "regular";

type MonkeyqueenGrid = never;

type MonkeyqueenPosition =
  | "a1"
  | "a10"
  | "a11"
  | "a12"
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
  | "b11"
  | "b12"
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
  | "c11"
  | "c12"
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
  | "d11"
  | "d12"
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
  | "e11"
  | "e12"
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
  | "f11"
  | "f12"
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
  | "g11"
  | "g12"
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
  | "h11"
  | "h12"
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
  | "i11"
  | "i12"
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
  | "j11"
  | "j12"
  | "j2"
  | "j3"
  | "j4"
  | "j5"
  | "j6"
  | "j7"
  | "j8"
  | "j9"
  | "k1"
  | "k10"
  | "k11"
  | "k12"
  | "k2"
  | "k3"
  | "k4"
  | "k5"
  | "k6"
  | "k7"
  | "k8"
  | "k9"
  | "l1"
  | "l10"
  | "l11"
  | "l12"
  | "l2"
  | "l3"
  | "l4"
  | "l5"
  | "l6"
  | "l7"
  | "l8"
  | "l9";

export type MonkeyqueenBlob = AlgolGameBlob<
  MonkeyqueenArtifactLayer,
  MonkeyqueenBoardName,
  MonkeyqueenBattlePos,
  MonkeyqueenBattleVar,
  MonkeyqueenCommand,
  MonkeyqueenGenerator,
  MonkeyqueenGrid,
  MonkeyqueenLayer,
  MonkeyqueenMark,
  MonkeyqueenPhase,
  MonkeyqueenPosition,
  MonkeyqueenRulesetName,
  MonkeyqueenSetupName,
  MonkeyqueenTerrain,
  MonkeyqueenTurnPos,
  MonkeyqueenTurnVar,
  MonkeyqueenUnit
>;

export type MonkeyqueenDefinition = FullDef<MonkeyqueenBlob>;
