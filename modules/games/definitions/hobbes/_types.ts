// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type HobbesBoardHeight = 5;
type HobbesBoardWidth = 5;

type HobbesTerrain = "pie";
type HobbesUnit = "stones" | "kings";
type HobbesMark =
  | "selectmovetarget"
  | "selectstone"
  | "selectpushtarget"
  | "selectpulltarget";
type HobbesCommand = "move" | "push" | "pull";
type HobbesPhaseCommand = "move";
type HobbesPhase = "startTurn" | HobbesMark | HobbesPhaseCommand;
type HobbesUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "stones"
  | "mystones"
  | "oppstones"
  | "neutralstones"
  | "kings"
  | "mykings"
  | "oppkings"
  | "neutralkings";
type HobbesGenerator =
  | "findmovetargets"
  | "findnearbystones"
  | "findpushtargets"
  | "findpulltargets";
type HobbesArtifactLayer =
  | "movetargets"
  | "vulnerable"
  | "nearbystonesaftermove"
  | "nearbystonesnomove"
  | "pushtargets"
  | "pulltargets";
type HobbesTerrainLayer = "pie" | "nopie";
type HobbesLayer =
  | CommonLayer
  | HobbesUnitLayer
  | HobbesArtifactLayer
  | HobbesTerrainLayer;
type HobbesBattlePos = never;
type HobbesBattleVar = never;
type HobbesTurnPos = never;
type HobbesTurnVar = "moved";

type HobbesBoardName = "basic";
type HobbesSetupName = "basic";
type HobbesRulesetName = "basic";
type HobbesVariantName = "regular";

type HobbesGrid = never;

type HobbesPosition =
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

export type HobbesBlob = AlgolGameBlob<
  HobbesArtifactLayer,
  HobbesBoardName,
  HobbesBattlePos,
  HobbesBattleVar,
  HobbesCommand,
  HobbesGenerator,
  HobbesGrid,
  HobbesLayer,
  HobbesMark,
  HobbesPhase,
  HobbesPosition,
  HobbesRulesetName,
  HobbesSetupName,
  HobbesTerrain,
  HobbesTurnPos,
  HobbesTurnVar,
  HobbesUnit
>;

export type HobbesDefinition = FullDef<HobbesBlob>;
