// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type CatsanddogsBoardHeight = 11;
type CatsanddogsBoardWidth = 11;

type CatsanddogsTerrain = "center";
type CatsanddogsUnit = "animals";
type CatsanddogsMark = "selectdeploytarget";
type CatsanddogsCommand = "deploy";
type CatsanddogsPhaseCommand = never;
type CatsanddogsPhase = "startTurn" | CatsanddogsMark;
type CatsanddogsUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "animals"
  | "myanimals"
  | "oppanimals"
  | "neutralanimals";
type CatsanddogsGenerator = "findforbidden";
type CatsanddogsArtifactLayer = "forbidden";
type CatsanddogsTerrainLayer = "center" | "nocenter";
type CatsanddogsLayer =
  | CommonLayer
  | CatsanddogsUnitLayer
  | CatsanddogsArtifactLayer
  | CatsanddogsTerrainLayer;
type CatsanddogsBattlePos = never;
type CatsanddogsBattleVar = never;
type CatsanddogsTurnPos = never;
type CatsanddogsTurnVar = never;

type CatsanddogsBoardName = "basic";
type CatsanddogsSetupName = "basic";
type CatsanddogsRulesetName = "basic";
type CatsanddogsVariantName = "regular";

type CatsanddogsGrid = never;

type CatsanddogsPosition =
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

export type CatsanddogsBlob = AlgolGameBlob<
  CatsanddogsArtifactLayer,
  CatsanddogsBoardName,
  CatsanddogsBattlePos,
  CatsanddogsBattleVar,
  CatsanddogsCommand,
  CatsanddogsGenerator,
  CatsanddogsGrid,
  CatsanddogsLayer,
  CatsanddogsMark,
  CatsanddogsPhase,
  CatsanddogsPosition,
  CatsanddogsRulesetName,
  CatsanddogsSetupName,
  CatsanddogsTerrain,
  CatsanddogsTurnPos,
  CatsanddogsTurnVar,
  CatsanddogsUnit
>;

export type CatsanddogsDefinition = FullDef<CatsanddogsBlob>;
