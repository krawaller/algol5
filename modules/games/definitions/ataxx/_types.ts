// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type AtaxxBoardHeight = 7;
type AtaxxBoardWidth = 7;

type AtaxxTerrain = never;
type AtaxxUnit = "microbes";
type AtaxxMark = "selectunit" | "selectsplittarget" | "selectjumptarget";
type AtaxxCommand = "split" | "jump";
type AtaxxPhaseCommand = never;
type AtaxxPhase = "startTurn" | AtaxxMark;
type AtaxxUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "microbes"
  | "mymicrobes"
  | "oppmicrobes"
  | "neutralmicrobes";
type AtaxxGenerator =
  | "findsplittargets"
  | "findjumptargets"
  | "findassimilated";
type AtaxxArtifactLayer =
  | "splittargets"
  | "movetargets"
  | "jumptargets"
  | "assimilated";
type AtaxxTerrainLayer = never;
type AtaxxLayer = CommonLayer | AtaxxUnitLayer | AtaxxArtifactLayer;
type AtaxxBattlePos = never;
type AtaxxBattleVar = never;
type AtaxxTurnPos = never;
type AtaxxTurnVar = never;

type AtaxxBoardName = "basic";
type AtaxxSetupName = "basic";
type AtaxxRulesetName = "basic";
type AtaxxVariantName = "regular";

type AtaxxGrid = never;

type AtaxxPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "a7"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "b7"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "c7"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "d7"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5"
  | "e6"
  | "e7"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "f7"
  | "g1"
  | "g2"
  | "g3"
  | "g4"
  | "g5"
  | "g6"
  | "g7";

export type AtaxxBlob = AlgolGameBlob<
  AtaxxArtifactLayer,
  AtaxxBoardName,
  AtaxxBattlePos,
  AtaxxBattleVar,
  AtaxxCommand,
  AtaxxGenerator,
  AtaxxGrid,
  AtaxxLayer,
  AtaxxMark,
  AtaxxPhase,
  AtaxxPosition,
  AtaxxRulesetName,
  AtaxxSetupName,
  AtaxxTerrain,
  AtaxxTurnPos,
  AtaxxTurnVar,
  AtaxxUnit
>;

export type AtaxxDefinition = FullDef<AtaxxBlob>;
