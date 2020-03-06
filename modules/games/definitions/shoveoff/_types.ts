// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type ShoveoffBoardHeight = 4;
type ShoveoffBoardWidth = 4;

type ShoveoffTerrain =
  | "southedge"
  | "northedge"
  | "westedge"
  | "eastedge"
  | "edge";
type ShoveoffUnit = "soldiers";
type ShoveoffMark = "selectpushpoint";
type ShoveoffCommand = "north" | "south" | "east" | "west";
type ShoveoffPhaseCommand = never;
type ShoveoffPhase = "startTurn" | ShoveoffMark;
type ShoveoffUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers";
type ShoveoffGenerator = "findaffected" | "findresults" | "findfourinarow";
type ShoveoffArtifactLayer =
  | "targetedgepoints"
  | "squishsouth"
  | "squishwest"
  | "squishnorth"
  | "squisheast"
  | "pushsouth"
  | "pushwest"
  | "pushnorth"
  | "pusheast"
  | "spawnsouth"
  | "spawnwest"
  | "spawnnorth"
  | "spawneast"
  | "fourinarow";
type ShoveoffTerrainLayer =
  | "southedge"
  | "northedge"
  | "westedge"
  | "eastedge"
  | "edge"
  | "nosouthedge"
  | "nonorthedge"
  | "nowestedge"
  | "noeastedge"
  | "noedge";
type ShoveoffLayer =
  | CommonLayer
  | ShoveoffUnitLayer
  | ShoveoffArtifactLayer
  | ShoveoffTerrainLayer;
type ShoveoffBattlePos = never;
type ShoveoffBattleVar = never;
type ShoveoffTurnPos = never;
type ShoveoffTurnVar = never;

type ShoveoffBoardName = "basic";
type ShoveoffSetupName = "basic";
type ShoveoffRulesetName = "basic";
type ShoveoffVariantName = "basic";

type ShoveoffGrid = never;

type ShoveoffPosition =
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

type ShoveoffBlob = AlgolGameBlob<
  ShoveoffArtifactLayer,
  ShoveoffBoardName,
  ShoveoffBattlePos,
  ShoveoffBattleVar,
  ShoveoffCommand,
  ShoveoffGenerator,
  ShoveoffGrid,
  ShoveoffLayer,
  ShoveoffMark,
  ShoveoffPhase,
  ShoveoffPosition,
  ShoveoffRulesetName,
  ShoveoffSetupName,
  ShoveoffTerrain,
  ShoveoffTurnPos,
  ShoveoffTurnVar,
  ShoveoffUnit
>;

export type ShoveoffDefinition = FullDef<ShoveoffBlob>;
