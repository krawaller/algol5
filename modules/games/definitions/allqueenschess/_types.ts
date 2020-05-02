// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type AllqueenschessBoardHeight = 5;
type AllqueenschessBoardWidth = 5;

type AllqueenschessTerrain = never;
type AllqueenschessUnit = "queens";
type AllqueenschessMark = "selectunit" | "selectmovetarget";
type AllqueenschessCommand = "move";
type AllqueenschessPhaseCommand = never;
type AllqueenschessPhase = "startTurn" | AllqueenschessMark;
type AllqueenschessUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "queens"
  | "myqueens"
  | "oppqueens"
  | "neutralqueens";
type AllqueenschessGenerator = "findmovetargets" | "findwinline";
type AllqueenschessArtifactLayer = "movetargets" | "winline";
type AllqueenschessTerrainLayer = never;
type AllqueenschessLayer =
  | CommonLayer
  | AllqueenschessUnitLayer
  | AllqueenschessArtifactLayer;
type AllqueenschessBattlePos = never;
type AllqueenschessBattleVar = never;
type AllqueenschessTurnPos = never;
type AllqueenschessTurnVar = never;

type AllqueenschessBoardName = "basic";
type AllqueenschessSetupName = "basic";
type AllqueenschessRulesetName = "basic";
type AllqueenschessVariantName = "regular";

type AllqueenschessGrid = never;

type AllqueenschessPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5";

export type AllqueenschessBlob = AlgolGameBlob<
  AllqueenschessArtifactLayer,
  AllqueenschessBoardName,
  AllqueenschessBattlePos,
  AllqueenschessBattleVar,
  AllqueenschessCommand,
  AllqueenschessGenerator,
  AllqueenschessGrid,
  AllqueenschessLayer,
  AllqueenschessMark,
  AllqueenschessPhase,
  AllqueenschessPosition,
  AllqueenschessRulesetName,
  AllqueenschessSetupName,
  AllqueenschessTerrain,
  AllqueenschessTurnPos,
  AllqueenschessTurnVar,
  AllqueenschessUnit
>;

export type AllqueenschessDefinition = FullDef<AllqueenschessBlob>;
