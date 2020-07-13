// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type BombardmentBoardHeight = 8;
type BombardmentBoardWidth = 8;

type BombardmentTerrain = "base";
type BombardmentUnit = "rockets";
type BombardmentMark = "selectunit" | "selectmovetarget";
type BombardmentCommand = "detonate" | "move";
type BombardmentPhaseCommand = never;
type BombardmentPhase = "startTurn" | BombardmentMark;
type BombardmentUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "rockets"
  | "myrockets"
  | "opprockets"
  | "neutralrockets";
type BombardmentGenerator = "findmoveandboomtargets";
type BombardmentArtifactLayer = "boomtargets" | "movetargets";
type BombardmentTerrainLayer = "base" | "mybase" | "oppbase" | "nobase";
type BombardmentLayer =
  | CommonLayer
  | BombardmentUnitLayer
  | BombardmentArtifactLayer
  | BombardmentTerrainLayer;
type BombardmentBattlePos = never;
type BombardmentBattleVar = never;
type BombardmentTurnPos = never;
type BombardmentTurnVar = never;

type BombardmentBoardName = "basic";
type BombardmentSetupName = "basic";
type BombardmentRulesetName = "basic";
type BombardmentVariantName = "regular";

type BombardmentGrid = never;

type BombardmentPosition =
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

export type BombardmentBlob = AlgolGameBlob<
  BombardmentArtifactLayer,
  BombardmentBoardName,
  BombardmentBattlePos,
  BombardmentBattleVar,
  BombardmentCommand,
  BombardmentGenerator,
  BombardmentGrid,
  BombardmentLayer,
  BombardmentMark,
  BombardmentPhase,
  BombardmentPosition,
  BombardmentRulesetName,
  BombardmentSetupName,
  BombardmentTerrain,
  BombardmentTurnPos,
  BombardmentTurnVar,
  BombardmentUnit
>;

export type BombardmentDefinition = FullDef<BombardmentBlob>;
