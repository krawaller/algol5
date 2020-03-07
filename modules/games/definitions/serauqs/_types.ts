// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type SerauqsBoardHeight = 4;
type SerauqsBoardWidth = 4;

type SerauqsTerrain = "base" | "corners" | "middle";
type SerauqsUnit = "soldiers" | "wild";
type SerauqsMark = "selectunit" | "selectmovetarget";
type SerauqsCommand = "promote" | "move";
type SerauqsPhaseCommand = never;
type SerauqsPhase = "startTurn" | SerauqsMark;
type SerauqsUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers"
  | "wild"
  | "mywild"
  | "oppwild"
  | "neutralwild";
type SerauqsGenerator = "findmovetargets" | "findwinline";
type SerauqsArtifactLayer = "movetargets" | "winline";
type SerauqsTerrainLayer =
  | "base"
  | "mybase"
  | "oppbase"
  | "corners"
  | "middle"
  | "nobase"
  | "nocorners"
  | "nomiddle";
type SerauqsLayer =
  | CommonLayer
  | SerauqsUnitLayer
  | SerauqsArtifactLayer
  | SerauqsTerrainLayer;
type SerauqsBattlePos = never;
type SerauqsBattleVar = never;
type SerauqsTurnPos = never;
type SerauqsTurnVar = never;

type SerauqsBoardName = "basic";
type SerauqsSetupName = "basic";
type SerauqsRulesetName = "basic";
type SerauqsVariantName = "basic";

type SerauqsGrid = never;

type SerauqsPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "d1"
  | "d2"
  | "d3"
  | "d4";

type SerauqsBlob = AlgolGameBlob<
  SerauqsArtifactLayer,
  SerauqsBoardName,
  SerauqsBattlePos,
  SerauqsBattleVar,
  SerauqsCommand,
  SerauqsGenerator,
  SerauqsGrid,
  SerauqsLayer,
  SerauqsMark,
  SerauqsPhase,
  SerauqsPosition,
  SerauqsRulesetName,
  SerauqsSetupName,
  SerauqsTerrain,
  SerauqsTurnPos,
  SerauqsTurnVar,
  SerauqsUnit
>;

export type SerauqsDefinition = FullDef<SerauqsBlob>;
