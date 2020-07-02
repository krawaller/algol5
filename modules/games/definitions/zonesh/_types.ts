// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type ZoneshBoardHeight = 6;
type ZoneshBoardWidth = 6;

type ZoneshTerrain = "throne" | "base";
type ZoneshUnit = "soldiers";
type ZoneshMark = "selectunit" | "selectmovetarget";
type ZoneshCommand = "move";
type ZoneshPhaseCommand = never;
type ZoneshPhase = "startTurn" | ZoneshMark;
type ZoneshUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers";
type ZoneshGenerator = "findmovetargets";
type ZoneshArtifactLayer = "movetargets";
type ZoneshTerrainLayer =
  | "throne"
  | "mythrone"
  | "oppthrone"
  | "base"
  | "mybase"
  | "oppbase"
  | "nothrone"
  | "nobase";
type ZoneshLayer =
  | CommonLayer
  | ZoneshUnitLayer
  | ZoneshArtifactLayer
  | ZoneshTerrainLayer;
type ZoneshBattlePos = never;
type ZoneshBattleVar = never;
type ZoneshTurnPos = never;
type ZoneshTurnVar = never;

type ZoneshBoardName = "basic";
type ZoneshSetupName = "basic";
type ZoneshRulesetName = "basic";
type ZoneshVariantName = "regular";

type ZoneshGrid = never;

type ZoneshPosition =
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "e1"
  | "e2"
  | "e3"
  | "e4"
  | "e5"
  | "e6"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6";

export type ZoneshBlob = AlgolGameBlob<
  ZoneshArtifactLayer,
  ZoneshBoardName,
  ZoneshBattlePos,
  ZoneshBattleVar,
  ZoneshCommand,
  ZoneshGenerator,
  ZoneshGrid,
  ZoneshLayer,
  ZoneshMark,
  ZoneshPhase,
  ZoneshPosition,
  ZoneshRulesetName,
  ZoneshSetupName,
  ZoneshTerrain,
  ZoneshTurnPos,
  ZoneshTurnVar,
  ZoneshUnit
>;

export type ZoneshDefinition = FullDef<ZoneshBlob>;
