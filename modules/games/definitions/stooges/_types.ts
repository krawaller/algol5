// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type StoogesBoardHeight = 5;
type StoogesBoardWidth = 6;

type StoogesTerrain = "corners";
type StoogesUnit = "singles" | "doubles";
type StoogesMark = "selectsingle" | "selectdouble" | "selectmovetarget";
type StoogesCommand = "move" | "swap";
type StoogesPhaseCommand = never;
type StoogesPhase = "startTurn" | StoogesMark;
type StoogesUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "singles"
  | "mysingles"
  | "oppsingles"
  | "neutralsingles"
  | "doubles"
  | "mydoubles"
  | "oppdoubles"
  | "neutraldoubles";
type StoogesGenerator = "findmovetargets" | "findwinline";
type StoogesArtifactLayer = "movetargets" | "winline";
type StoogesTerrainLayer = "corners" | "nocorners";
type StoogesLayer =
  | CommonLayer
  | StoogesUnitLayer
  | StoogesArtifactLayer
  | StoogesTerrainLayer;
type StoogesBattlePos = "lastswap";
type StoogesBattleVar = "doubleswap" | "lastswap" | "lastswap";
type StoogesTurnPos = never;
type StoogesTurnVar = never;

type StoogesBoardName = "basic";
type StoogesSetupName = "basic";
type StoogesRulesetName = "basic";
type StoogesVariantName = "regular";

type StoogesGrid = never;

type StoogesPosition =
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
  | "e5"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5";

export type StoogesBlob = AlgolGameBlob<
  StoogesArtifactLayer,
  StoogesBoardName,
  StoogesBattlePos,
  StoogesBattleVar,
  StoogesCommand,
  StoogesGenerator,
  StoogesGrid,
  StoogesLayer,
  StoogesMark,
  StoogesPhase,
  StoogesPosition,
  StoogesRulesetName,
  StoogesSetupName,
  StoogesTerrain,
  StoogesTurnPos,
  StoogesTurnVar,
  StoogesUnit
>;

export type StoogesDefinition = FullDef<StoogesBlob>;
