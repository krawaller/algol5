// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type AmbivalenteBoardHeight = 6;
type AmbivalenteBoardWidth = 6;

type AmbivalenteTerrain = "corners";
type AmbivalenteUnit = "pawns";
type AmbivalenteMark = "selectdroptarget";
type AmbivalenteCommand = "drop";
type AmbivalentePhaseCommand = never;
type AmbivalentePhase = "startTurn" | AmbivalenteMark;
type AmbivalenteUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "pawns"
  | "mypawns"
  | "opppawns"
  | "neutralpawns";
type AmbivalenteGenerator =
  | "findtouchedfoes"
  | "findintrusionvictims"
  | "findcornerintrusionvictims"
  | "findcustodianvictims"
  | "findcornercustodianvictims";
type AmbivalenteArtifactLayer = "touchedfoes" | "victims";
type AmbivalenteTerrainLayer = "corners" | "nocorners";
type AmbivalenteLayer =
  | CommonLayer
  | AmbivalenteUnitLayer
  | AmbivalenteArtifactLayer
  | AmbivalenteTerrainLayer;
type AmbivalenteBattlePos = never;
type AmbivalenteBattleVar = never;
type AmbivalenteTurnPos = never;
type AmbivalenteTurnVar = never;

type AmbivalenteBoardName = "basic";
type AmbivalenteSetupName = "basic";
type AmbivalenteRulesetName = "basic";
type AmbivalenteVariantName = "regular";

type AmbivalenteGrid = never;

type AmbivalentePosition =
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

export type AmbivalenteBlob = AlgolGameBlob<
  AmbivalenteArtifactLayer,
  AmbivalenteBoardName,
  AmbivalenteBattlePos,
  AmbivalenteBattleVar,
  AmbivalenteCommand,
  AmbivalenteGenerator,
  AmbivalenteGrid,
  AmbivalenteLayer,
  AmbivalenteMark,
  AmbivalentePhase,
  AmbivalentePosition,
  AmbivalenteRulesetName,
  AmbivalenteSetupName,
  AmbivalenteTerrain,
  AmbivalenteTurnPos,
  AmbivalenteTurnVar,
  AmbivalenteUnit
>;

export type AmbivalenteDefinition = FullDef<AmbivalenteBlob>;
