// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type BreakthroughBoardHeight = 8;
type BreakthroughBoardWidth = 8;

type BreakthroughTerrain = "base";
type BreakthroughUnit = "soldiers";
type BreakthroughMark = "selectunit" | "selectmovetarget";
type BreakthroughCommand = "move";
type BreakthroughPhaseCommand = never;
type BreakthroughPhase = "startTurn" | BreakthroughMark;
type BreakthroughUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers";
type BreakthroughGenerator = "findmovetargets";
type BreakthroughArtifactLayer = "movetargets";
type BreakthroughTerrainLayer = "base" | "mybase" | "oppbase" | "nobase";
type BreakthroughLayer =
  | CommonLayer
  | BreakthroughUnitLayer
  | BreakthroughArtifactLayer
  | BreakthroughTerrainLayer;
type BreakthroughBattlePos = never;
type BreakthroughBattleVar = never;
type BreakthroughTurnPos = never;
type BreakthroughTurnVar = never;

type BreakthroughBoardName = "basic" | "mini" | "siege";
type BreakthroughSetupName = "basic" | "mini" | "siege";
type BreakthroughRulesetName = "basic" | "siege";
type BreakthroughVariantName = "regular" | "mini" | "siege";

type BreakthroughGrid = never;

type BreakthroughPosition =
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

export type BreakthroughBlob = AlgolGameBlob<
  BreakthroughArtifactLayer,
  BreakthroughBoardName,
  BreakthroughBattlePos,
  BreakthroughBattleVar,
  BreakthroughCommand,
  BreakthroughGenerator,
  BreakthroughGrid,
  BreakthroughLayer,
  BreakthroughMark,
  BreakthroughPhase,
  BreakthroughPosition,
  BreakthroughRulesetName,
  BreakthroughSetupName,
  BreakthroughTerrain,
  BreakthroughTurnPos,
  BreakthroughTurnVar,
  BreakthroughUnit
>;

export type BreakthroughDefinition = FullDef<BreakthroughBlob>;
