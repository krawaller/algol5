// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type ScatterBoardHeight = 6;
type ScatterBoardWidth = 6;

type ScatterTerrain = "odd";
type ScatterUnit = "pawns" | "nobles" | "kings";
type ScatterMark = "selectunit" | "selectmovetarget";
type ScatterCommand = "move" | "north" | "east" | "south" | "west";
type ScatterPhaseCommand = never;
type ScatterPhase = "startTurn" | ScatterMark;
type ScatterUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "pawns"
  | "mypawns"
  | "opppawns"
  | "neutralpawns"
  | "nobles"
  | "mynobles"
  | "oppnobles"
  | "neutralnobles"
  | "kings"
  | "mykings"
  | "oppkings"
  | "neutralkings";
type ScatterGenerator =
  | "findnorthtargets"
  | "findeasttargets"
  | "findsouthtargets"
  | "findwesttargets"
  | "findmovetargets";
type ScatterArtifactLayer =
  | "northtargets"
  | "easttargets"
  | "southtargets"
  | "westtargets"
  | "movetargets";
type ScatterTerrainLayer = "odd" | "noodd";
type ScatterLayer =
  | CommonLayer
  | ScatterUnitLayer
  | ScatterArtifactLayer
  | ScatterTerrainLayer;
type ScatterBattlePos = never;
type ScatterBattleVar = "noshift";
type ScatterTurnPos = never;
type ScatterTurnVar = never;

type ScatterBoardName = "basic";
type ScatterSetupName = "basic";
type ScatterRulesetName = "basic";
type ScatterVariantName = "regular";

type ScatterGrid = "binary";

type ScatterPosition =
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

export type ScatterBlob = AlgolGameBlob<
  ScatterArtifactLayer,
  ScatterBoardName,
  ScatterBattlePos,
  ScatterBattleVar,
  ScatterCommand,
  ScatterGenerator,
  ScatterGrid,
  ScatterLayer,
  ScatterMark,
  ScatterPhase,
  ScatterPosition,
  ScatterRulesetName,
  ScatterSetupName,
  ScatterTerrain,
  ScatterTurnPos,
  ScatterTurnVar,
  ScatterUnit
>;

export type ScatterDefinition = FullDef<ScatterBlob>;
