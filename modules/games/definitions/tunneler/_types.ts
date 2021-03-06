// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type TunnelerBoardHeight = 11;
type TunnelerBoardWidth = 11;

type TunnelerTerrain = never;
type TunnelerUnit = "foremen" | "tunnelers" | "rocks";
type TunnelerMark = "selectunit" | "selectmovetarget";
type TunnelerCommand = "move";
type TunnelerPhaseCommand = never;
type TunnelerPhase = "startTurn" | TunnelerMark;
type TunnelerUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "foremen"
  | "myforemen"
  | "oppforemen"
  | "neutralforemen"
  | "tunnelers"
  | "mytunnelers"
  | "opptunnelers"
  | "neutraltunnelers"
  | "rocks"
  | "myrocks"
  | "opprocks"
  | "neutralrocks";
type TunnelerGenerator = "find2x2squares" | "findmovetargets";
type TunnelerArtifactLayer = "bitsum" | "movetargets";
type TunnelerTerrainLayer = never;
type TunnelerLayer = CommonLayer | TunnelerUnitLayer | TunnelerArtifactLayer;
type TunnelerBattlePos = never;
type TunnelerBattleVar = never;
type TunnelerTurnPos = never;
type TunnelerTurnVar = never;

type TunnelerBoardName = "basic";
type TunnelerSetupName = "basic";
type TunnelerRulesetName = "basic";
type TunnelerVariantName = "regular";

type TunnelerGrid = never;

type TunnelerPosition =
  | "a1"
  | "a10"
  | "a11"
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
  | "k2"
  | "k3"
  | "k4"
  | "k5"
  | "k6"
  | "k7"
  | "k8"
  | "k9";

export type TunnelerBlob = AlgolGameBlob<
  TunnelerArtifactLayer,
  TunnelerBoardName,
  TunnelerBattlePos,
  TunnelerBattleVar,
  TunnelerCommand,
  TunnelerGenerator,
  TunnelerGrid,
  TunnelerLayer,
  TunnelerMark,
  TunnelerPhase,
  TunnelerPosition,
  TunnelerRulesetName,
  TunnelerSetupName,
  TunnelerTerrain,
  TunnelerTurnPos,
  TunnelerTurnVar,
  TunnelerUnit
>;

export type TunnelerDefinition = FullDef<TunnelerBlob>;
