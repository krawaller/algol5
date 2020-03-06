// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type MurusgallicusBoardHeight = 7;
type MurusgallicusBoardWidth = 8;

type MurusgallicusTerrain = "homerow";
type MurusgallicusUnit = "towers" | "walls";
type MurusgallicusMark = "selecttower" | "selectmove" | "selectcrush";
type MurusgallicusCommand = "move" | "crush";
type MurusgallicusPhaseCommand = never;
type MurusgallicusPhase = "startTurn" | MurusgallicusMark;
type MurusgallicusUnitLayer =
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
  | "neutralwalls";
type MurusgallicusGenerator =
  | "findmovetargets"
  | "findmoveresults"
  | "findcrushtargets";
type MurusgallicusArtifactLayer =
  | "movetargets"
  | "madetowers"
  | "madewalls"
  | "crushtargets";
type MurusgallicusTerrainLayer =
  | "homerow"
  | "myhomerow"
  | "opphomerow"
  | "nohomerow";
type MurusgallicusLayer =
  | CommonLayer
  | MurusgallicusUnitLayer
  | MurusgallicusArtifactLayer
  | MurusgallicusTerrainLayer;
type MurusgallicusBattlePos = never;
type MurusgallicusBattleVar = never;
type MurusgallicusTurnPos = never;
type MurusgallicusTurnVar = never;

type MurusgallicusBoardName = "basic";
type MurusgallicusSetupName = "basic";
type MurusgallicusRulesetName = "basic";
type MurusgallicusVariantName = "basic";

type MurusgallicusGrid = never;

type MurusgallicusPosition =
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

type MurusgallicusBlob = AlgolGameBlob<
  MurusgallicusArtifactLayer,
  MurusgallicusBoardName,
  MurusgallicusBattlePos,
  MurusgallicusBattleVar,
  MurusgallicusCommand,
  MurusgallicusGenerator,
  MurusgallicusGrid,
  MurusgallicusLayer,
  MurusgallicusMark,
  MurusgallicusPhase,
  MurusgallicusPosition,
  MurusgallicusRulesetName,
  MurusgallicusSetupName,
  MurusgallicusTerrain,
  MurusgallicusTurnPos,
  MurusgallicusTurnVar,
  MurusgallicusUnit
>;

export type MurusgallicusDefinition = FullDef<MurusgallicusBlob>;
