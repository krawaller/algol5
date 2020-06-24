// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type ErdoslatinoBoardHeight = 5;
type ErdoslatinoBoardWidth = 5;

type ErdoslatinoTerrain = never;
type ErdoslatinoUnit = "lvl1" | "lvl2" | "lvl3" | "lvl4" | "lvl5";
type ErdoslatinoMark = "selecttarget";
type ErdoslatinoCommand = "place1" | "place2" | "place3" | "place4" | "place5";
type ErdoslatinoPhaseCommand = never;
type ErdoslatinoPhase = "startTurn" | ErdoslatinoMark;
type ErdoslatinoUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "lvl1"
  | "mylvl1"
  | "opplvl1"
  | "neutrallvl1"
  | "lvl2"
  | "mylvl2"
  | "opplvl2"
  | "neutrallvl2"
  | "lvl3"
  | "mylvl3"
  | "opplvl3"
  | "neutrallvl3"
  | "lvl4"
  | "mylvl4"
  | "opplvl4"
  | "neutrallvl4"
  | "lvl5"
  | "mylvl5"
  | "opplvl5"
  | "neutrallvl5";
type ErdoslatinoGenerator =
  | "findchosencolumn"
  | "findmiddle2"
  | "findmiddle3"
  | "findmiddle4"
  | "finddownwardends"
  | "findupwardends"
  | "findvisibilities";
type ErdoslatinoArtifactLayer =
  | "currentcolumn"
  | "conquerwith2"
  | "conquerwith3"
  | "conquerwith4"
  | "conquerwith1"
  | "conquerwith5"
  | "ownedcolumns"
  | "myownedcolumns"
  | "oppownedcolumns"
  | "neutralownedcolumns"
  | "FOOBAR"
  | "sees1"
  | "sees2"
  | "sees3"
  | "sees4"
  | "sees5"
  | "above1"
  | "above2"
  | "above3"
  | "above4"
  | "above5"
  | "below1"
  | "below2"
  | "below3"
  | "below4"
  | "below5"
  | "takencolumn"
  | "mytakencolumn"
  | "opptakencolumn"
  | "neutraltakencolumn"
  | "upwards"
  | "downwards";
type ErdoslatinoTerrainLayer = never;
type ErdoslatinoLayer =
  | CommonLayer
  | ErdoslatinoUnitLayer
  | ErdoslatinoArtifactLayer;
type ErdoslatinoBattlePos = never;
type ErdoslatinoBattleVar = never;
type ErdoslatinoTurnPos = never;
type ErdoslatinoTurnVar = never;

type ErdoslatinoBoardName = "basic";
type ErdoslatinoSetupName = "basic";
type ErdoslatinoRulesetName = "basic";
type ErdoslatinoVariantName = "regular";

type ErdoslatinoGrid = never;

type ErdoslatinoPosition =
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

export type ErdoslatinoBlob = AlgolGameBlob<
  ErdoslatinoArtifactLayer,
  ErdoslatinoBoardName,
  ErdoslatinoBattlePos,
  ErdoslatinoBattleVar,
  ErdoslatinoCommand,
  ErdoslatinoGenerator,
  ErdoslatinoGrid,
  ErdoslatinoLayer,
  ErdoslatinoMark,
  ErdoslatinoPhase,
  ErdoslatinoPosition,
  ErdoslatinoRulesetName,
  ErdoslatinoSetupName,
  ErdoslatinoTerrain,
  ErdoslatinoTurnPos,
  ErdoslatinoTurnVar,
  ErdoslatinoUnit
>;

export type ErdoslatinoDefinition = FullDef<ErdoslatinoBlob>;
