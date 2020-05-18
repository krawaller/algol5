// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type KachitknightBoardHeight = 4;
type KachitknightBoardWidth = 4;

type KachitknightTerrain = "base" | "throne" | "promotion";
type KachitknightUnit =
  | "leader"
  | "knightortho"
  | "knightdiag"
  | "leaderortho"
  | "leaderdiag";
type KachitknightMark = "selectunit" | "selectdroptarget" | "selectmovetarget";
type KachitknightCommand = "step" | "orthogonal" | "diagonal";
type KachitknightPhaseCommand = never;
type KachitknightPhase = "startTurn" | KachitknightMark;
type KachitknightUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "leader"
  | "myleader"
  | "oppleader"
  | "neutralleader"
  | "knightortho"
  | "myknightortho"
  | "oppknightortho"
  | "neutralknightortho"
  | "knightdiag"
  | "myknightdiag"
  | "oppknightdiag"
  | "neutralknightdiag"
  | "leaderortho"
  | "myleaderortho"
  | "oppleaderortho"
  | "neutralleaderortho"
  | "leaderdiag"
  | "myleaderdiag"
  | "oppleaderdiag"
  | "neutralleaderdiag";
type KachitknightGenerator =
  | "findsteptargets"
  | "findorthotargets"
  | "finddiagtargets";
type KachitknightArtifactLayer = "movetargets";
type KachitknightTerrainLayer =
  | "base"
  | "mybase"
  | "oppbase"
  | "throne"
  | "mythrone"
  | "oppthrone"
  | "promotion"
  | "nobase"
  | "nothrone"
  | "nopromotion";
type KachitknightLayer =
  | CommonLayer
  | KachitknightUnitLayer
  | KachitknightArtifactLayer
  | KachitknightTerrainLayer;
type KachitknightBattlePos = never;
type KachitknightBattleVar = "plr1knights" | "plr2knights";
type KachitknightTurnPos = never;
type KachitknightTurnVar = never;

type KachitknightBoardName = "basic";
type KachitknightSetupName = "basic";
type KachitknightRulesetName = "basic";
type KachitknightVariantName = "regular";

type KachitknightGrid = never;

type KachitknightPosition =
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

export type KachitknightBlob = AlgolGameBlob<
  KachitknightArtifactLayer,
  KachitknightBoardName,
  KachitknightBattlePos,
  KachitknightBattleVar,
  KachitknightCommand,
  KachitknightGenerator,
  KachitknightGrid,
  KachitknightLayer,
  KachitknightMark,
  KachitknightPhase,
  KachitknightPosition,
  KachitknightRulesetName,
  KachitknightSetupName,
  KachitknightTerrain,
  KachitknightTurnPos,
  KachitknightTurnVar,
  KachitknightUnit
>;

export type KachitknightDefinition = FullDef<KachitknightBlob>;
