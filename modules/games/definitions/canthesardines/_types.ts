// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type CanthesardinesBoardHeight = 9;
type CanthesardinesBoardWidth = 9;

type CanthesardinesTerrain = "can" | "canedge";
type CanthesardinesUnit = "sardines";
type CanthesardinesMark = "selectunit" | "selectmovetarget";
type CanthesardinesCommand = "move";
type CanthesardinesPhaseCommand = never;
type CanthesardinesPhase = "startTurn" | CanthesardinesMark;
type CanthesardinesUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "sardines"
  | "mysardines"
  | "oppsardines"
  | "neutralsardines";
type CanthesardinesGenerator = "findmovetargets";
type CanthesardinesArtifactLayer = "movetargets";
type CanthesardinesTerrainLayer =
  | "can"
  | "neutralcan"
  | "canedge"
  | "nocan"
  | "noneutralcan"
  | "nocanedge";
type CanthesardinesLayer =
  | CommonLayer
  | CanthesardinesUnitLayer
  | CanthesardinesArtifactLayer
  | CanthesardinesTerrainLayer;
type CanthesardinesBattlePos = never;
type CanthesardinesBattleVar = never;
type CanthesardinesTurnPos = never;
type CanthesardinesTurnVar = never;

type CanthesardinesBoardName = "basic";
type CanthesardinesSetupName = "basic";
type CanthesardinesRulesetName = "basic";
type CanthesardinesVariantName = "regular";

type CanthesardinesGrid = never;

type CanthesardinesPosition =
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

export type CanthesardinesBlob = AlgolGameBlob<
  CanthesardinesArtifactLayer,
  CanthesardinesBoardName,
  CanthesardinesBattlePos,
  CanthesardinesBattleVar,
  CanthesardinesCommand,
  CanthesardinesGenerator,
  CanthesardinesGrid,
  CanthesardinesLayer,
  CanthesardinesMark,
  CanthesardinesPhase,
  CanthesardinesPosition,
  CanthesardinesRulesetName,
  CanthesardinesSetupName,
  CanthesardinesTerrain,
  CanthesardinesTurnPos,
  CanthesardinesTurnVar,
  CanthesardinesUnit
>;

export type CanthesardinesDefinition = FullDef<CanthesardinesBlob>;
