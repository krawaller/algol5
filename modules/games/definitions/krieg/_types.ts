// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type KriegBoardHeight = 4;
type KriegBoardWidth = 4;

type KriegTerrain = "southeast" | "northwest" | "corners" | "bases";
type KriegUnit = "notfrozens" | "frozens";
type KriegMark = "selectunit" | "selectmove";
type KriegCommand = "move";
type KriegPhaseCommand = never;
type KriegPhase = "startTurn" | KriegMark;
type KriegUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "notfrozens"
  | "mynotfrozens"
  | "oppnotfrozens"
  | "neutralnotfrozens"
  | "frozens"
  | "myfrozens"
  | "oppfrozens"
  | "neutralfrozens";
type KriegGenerator = "findmovetargets";
type KriegArtifactLayer = "movetargets";
type KriegTerrainLayer =
  | "southeast"
  | "northwest"
  | "corners"
  | "mycorners"
  | "oppcorners"
  | "bases"
  | "mybases"
  | "oppbases"
  | "nosoutheast"
  | "nonorthwest"
  | "nocorners"
  | "nobases";
type KriegLayer =
  | CommonLayer
  | KriegUnitLayer
  | KriegArtifactLayer
  | KriegTerrainLayer;
type KriegBattlePos = never;
type KriegBattleVar = never;
type KriegTurnPos = never;
type KriegTurnVar = never;

type KriegBoardName = "basic";
type KriegSetupName = "basic";
type KriegRulesetName = "basic";
type KriegVariantName = "regular";

type KriegGrid = never;

type KriegPosition =
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

export type KriegBlob = AlgolGameBlob<
  KriegArtifactLayer,
  KriegBoardName,
  KriegBattlePos,
  KriegBattleVar,
  KriegCommand,
  KriegGenerator,
  KriegGrid,
  KriegLayer,
  KriegMark,
  KriegPhase,
  KriegPosition,
  KriegRulesetName,
  KriegSetupName,
  KriegTerrain,
  KriegTurnPos,
  KriegTurnVar,
  KriegUnit
>;

export type KriegDefinition = FullDef<KriegBlob>;
