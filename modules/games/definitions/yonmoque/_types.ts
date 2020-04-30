// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type YonmoqueBoardHeight = 5;
type YonmoqueBoardWidth = 5;

type YonmoqueTerrain = "base" | "edge";
type YonmoqueUnit = "pawns" | "bishops";
type YonmoqueMark = "selectdroptarget" | "selectunit" | "selectmovetarget";
type YonmoqueCommand = "drop" | "move";
type YonmoquePhaseCommand = never;
type YonmoquePhase = "startTurn" | YonmoqueMark;
type YonmoqueUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "pawns"
  | "mypawns"
  | "opppawns"
  | "neutralpawns"
  | "bishops"
  | "mybishops"
  | "oppbishops"
  | "neutralbishops";
type YonmoqueGenerator =
  | "findwinlinestarts"
  | "findwinlines"
  | "findloselines"
  | "findsteptargets"
  | "findslidetargets"
  | "findconversions";
type YonmoqueArtifactLayer =
  | "winlineheads"
  | "winline"
  | "loseline"
  | "movetargets"
  | "conversions"
  | "demote"
  | "promote";
type YonmoqueTerrainLayer =
  | "base"
  | "mybase"
  | "oppbase"
  | "edge"
  | "nobase"
  | "noedge";
type YonmoqueLayer =
  | CommonLayer
  | YonmoqueUnitLayer
  | YonmoqueArtifactLayer
  | YonmoqueTerrainLayer;
type YonmoqueBattlePos = never;
type YonmoqueBattleVar = "plr1drop" | "plr2drop";
type YonmoqueTurnPos = never;
type YonmoqueTurnVar = never;

type YonmoqueBoardName = "basic";
type YonmoqueSetupName = "basic";
type YonmoqueRulesetName = "basic";
type YonmoqueVariantName = "regular";

type YonmoqueGrid = never;

type YonmoquePosition =
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

export type YonmoqueBlob = AlgolGameBlob<
  YonmoqueArtifactLayer,
  YonmoqueBoardName,
  YonmoqueBattlePos,
  YonmoqueBattleVar,
  YonmoqueCommand,
  YonmoqueGenerator,
  YonmoqueGrid,
  YonmoqueLayer,
  YonmoqueMark,
  YonmoquePhase,
  YonmoquePosition,
  YonmoqueRulesetName,
  YonmoqueSetupName,
  YonmoqueTerrain,
  YonmoqueTurnPos,
  YonmoqueTurnVar,
  YonmoqueUnit
>;

export type YonmoqueDefinition = FullDef<YonmoqueBlob>;
