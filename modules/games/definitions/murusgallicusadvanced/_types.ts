// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type MurusgallicusadvancedBoardHeight = 7;
type MurusgallicusadvancedBoardWidth = 8;

type MurusgallicusadvancedTerrain = "homerow";
type MurusgallicusadvancedUnit = "towers" | "walls" | "catapults";
type MurusgallicusadvancedMark =
  | "selecttower"
  | "selectmove"
  | "selectcrush"
  | "selectcatapult"
  | "selectfire";
type MurusgallicusadvancedCommand = "move" | "crush" | "sacrifice" | "fire";
type MurusgallicusadvancedPhaseCommand = never;
type MurusgallicusadvancedPhase = "startTurn" | MurusgallicusadvancedMark;
type MurusgallicusadvancedUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "towers"
  | "mytowers"
  | "opptowers"
  | "neutraltowers"
  | "walls"
  | "mywalls"
  | "oppwalls"
  | "neutralwalls"
  | "catapults"
  | "mycatapults"
  | "oppcatapults"
  | "neutralcatapults";
type MurusgallicusadvancedGenerator =
  | "findfiretargets"
  | "findmovetargets"
  | "findmoveresults"
  | "findcrushtargets";
type MurusgallicusadvancedArtifactLayer =
  | "firetargets"
  | "movetargets"
  | "madecatapults"
  | "madetowers"
  | "madewalls"
  | "crushtargets";
type MurusgallicusadvancedTerrainLayer =
  | "homerow"
  | "myhomerow"
  | "opphomerow"
  | "nohomerow";
type MurusgallicusadvancedLayer =
  | CommonLayer
  | MurusgallicusadvancedUnitLayer
  | MurusgallicusadvancedArtifactLayer
  | MurusgallicusadvancedTerrainLayer;
type MurusgallicusadvancedBattlePos = never;
type MurusgallicusadvancedBattleVar = never;
type MurusgallicusadvancedTurnPos = never;
type MurusgallicusadvancedTurnVar = never;

type MurusgallicusadvancedBoardName = "basic";
type MurusgallicusadvancedSetupName = "basic";
type MurusgallicusadvancedRulesetName = "basic" | "advanced";
type MurusgallicusadvancedVariantName = "basic" | "advanced";

type MurusgallicusadvancedGrid = never;

type MurusgallicusadvancedPosition =
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
  | "g7"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "h7";

type MurusgallicusadvancedBlob = AlgolGameBlob<
  MurusgallicusadvancedArtifactLayer,
  MurusgallicusadvancedBoardName,
  MurusgallicusadvancedBattlePos,
  MurusgallicusadvancedBattleVar,
  MurusgallicusadvancedCommand,
  MurusgallicusadvancedGenerator,
  MurusgallicusadvancedGrid,
  MurusgallicusadvancedLayer,
  MurusgallicusadvancedMark,
  MurusgallicusadvancedPhase,
  MurusgallicusadvancedPosition,
  MurusgallicusadvancedRulesetName,
  MurusgallicusadvancedSetupName,
  MurusgallicusadvancedTerrain,
  MurusgallicusadvancedTurnPos,
  MurusgallicusadvancedTurnVar,
  MurusgallicusadvancedUnit
>;

export type MurusgallicusadvancedDefinition = FullDef<
  MurusgallicusadvancedBlob
>;
