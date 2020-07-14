// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type EuclidBoardHeight = 8;
type EuclidBoardWidth = 8;

type EuclidTerrain = never;
type EuclidUnit = "soldiers" | "kings" | "projectiles";
type EuclidMark = "selectunit" | "selectmovetarget";
type EuclidCommand = "move";
type EuclidPhaseCommand = never;
type EuclidPhase = "startTurn" | EuclidMark;
type EuclidUnitLayer =
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
  | "neutralkings"
  | "projectiles"
  | "myprojectiles"
  | "oppprojectiles"
  | "neutralprojectiles";
type EuclidGenerator = "findmovetargets" | "findintersections";
type EuclidArtifactLayer = "movetargets" | "intersection" | "lines";
type EuclidTerrainLayer = never;
type EuclidLayer = CommonLayer | EuclidUnitLayer | EuclidArtifactLayer;
type EuclidBattlePos = never;
type EuclidBattleVar = never;
type EuclidTurnPos = never;
type EuclidTurnVar = never;

type EuclidBoardName = "basic";
type EuclidSetupName = "basic";
type EuclidRulesetName = "basic";
type EuclidVariantName = "regular";

type EuclidGrid = never;

type EuclidPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "a7"
  | "a8"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "b7"
  | "b8"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "c7"
  | "c8"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "d7"
  | "d8"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5"
  | "e6"
  | "e7"
  | "e8"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "f7"
  | "f8"
  | "g1"
  | "g2"
  | "g3"
  | "g4"
  | "g5"
  | "g6"
  | "g7"
  | "g8"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "h7"
  | "h8";

export type EuclidBlob = AlgolGameBlob<
  EuclidArtifactLayer,
  EuclidBoardName,
  EuclidBattlePos,
  EuclidBattleVar,
  EuclidCommand,
  EuclidGenerator,
  EuclidGrid,
  EuclidLayer,
  EuclidMark,
  EuclidPhase,
  EuclidPosition,
  EuclidRulesetName,
  EuclidSetupName,
  EuclidTerrain,
  EuclidTurnPos,
  EuclidTurnVar,
  EuclidUnit
>;

export type EuclidDefinition = FullDef<EuclidBlob>;
