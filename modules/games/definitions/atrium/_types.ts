// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type AtriumBoardHeight = 5;
type AtriumBoardWidth = 5;

type AtriumTerrain = never;
type AtriumUnit = "kings" | "queens";
type AtriumMark = "selectunit" | "selectmovetarget";
type AtriumCommand = "move";
type AtriumPhaseCommand = never;
type AtriumPhase = "startTurn" | AtriumMark;
type AtriumUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "kings"
  | "mykings"
  | "oppkings"
  | "neutralkings"
  | "queens"
  | "myqueens"
  | "oppqueens"
  | "neutralqueens";
type AtriumGenerator = "findmovetargets" | "findpushees" | "findwinlines";
type AtriumArtifactLayer = "movetargets" | "pushees" | "lastpushee" | "winline";
type AtriumTerrainLayer = never;
type AtriumLayer = CommonLayer | AtriumUnitLayer | AtriumArtifactLayer;
type AtriumBattlePos = "forbiddenpushtarget" | "forbiddenpusher";
type AtriumBattleVar = "pushdir" | "forbiddenpushtarget" | "forbiddenpusher";
type AtriumTurnPos = never;
type AtriumTurnVar = never;

type AtriumBoardName = "basic";
type AtriumSetupName = "basic";
type AtriumRulesetName = "basic";
type AtriumVariantName = "regular";

type AtriumGrid = never;

type AtriumPosition =
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

export type AtriumBlob = AlgolGameBlob<
  AtriumArtifactLayer,
  AtriumBoardName,
  AtriumBattlePos,
  AtriumBattleVar,
  AtriumCommand,
  AtriumGenerator,
  AtriumGrid,
  AtriumLayer,
  AtriumMark,
  AtriumPhase,
  AtriumPosition,
  AtriumRulesetName,
  AtriumSetupName,
  AtriumTerrain,
  AtriumTurnPos,
  AtriumTurnVar,
  AtriumUnit
>;

export type AtriumDefinition = FullDef<AtriumBlob>;
