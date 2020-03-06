// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type AriesBoardHeight = 8;
type AriesBoardWidth = 8;

type AriesTerrain = "corner";
type AriesUnit = "soldiers";
type AriesMark = "selectunit" | "selectmovetarget";
type AriesCommand = "move";
type AriesPhaseCommand = never;
type AriesPhase = "startTurn" | AriesMark;
type AriesUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers";
type AriesGenerator = "findmovetargets" | "findpushresults";
type AriesArtifactLayer = "movetargets" | "beingpushed" | "squished";
type AriesTerrainLayer = "corner" | "mycorner" | "oppcorner" | "nocorner";
type AriesLayer =
  | CommonLayer
  | AriesUnitLayer
  | AriesArtifactLayer
  | AriesTerrainLayer;
type AriesBattlePos = "pushsquare";
type AriesBattleVar = "pusheeid";
type AriesTurnPos = never;
type AriesTurnVar = never;

type AriesBoardName = "basic";
type AriesSetupName = "basic";
type AriesRulesetName = "basic";
type AriesVariantName = "basic";

type AriesGrid = never;

type AriesPosition =
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

type AriesBlob = AlgolGameBlob<
  AriesArtifactLayer,
  AriesBoardName,
  AriesBattlePos,
  AriesBattleVar,
  AriesCommand,
  AriesGenerator,
  AriesGrid,
  AriesLayer,
  AriesMark,
  AriesPhase,
  AriesPosition,
  AriesRulesetName,
  AriesSetupName,
  AriesTerrain,
  AriesTurnPos,
  AriesTurnVar,
  AriesUnit
>;

export type AriesDefinition = FullDef<AriesBlob>;
