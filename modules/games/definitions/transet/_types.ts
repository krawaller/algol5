// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type TransetBoardHeight = 5;
type TransetBoardWidth = 5;

type TransetTerrain = "base";
type TransetUnit = "pinets" | "piokers" | "piases";
type TransetMark =
  | "selectunit"
  | "selectmovetarget"
  | "selectdeportdestination"
  | "selectswapunit"
  | "selectswap1target";
type TransetCommand = "move" | "swap";
type TransetPhaseCommand = never;
type TransetPhase = "startTurn" | TransetMark;
type TransetUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "pinets"
  | "mypinets"
  | "opppinets"
  | "neutralpinets"
  | "piokers"
  | "mypiokers"
  | "opppiokers"
  | "neutralpiokers"
  | "piases"
  | "mypiases"
  | "opppiases"
  | "neutralpiases";
type TransetGenerator = "findswap2step" | "findswap1steps" | "findmovetargets";
type TransetArtifactLayer = "swap2step" | "swap1steps" | "movetargets";
type TransetTerrainLayer = "base" | "mybase" | "oppbase" | "nobase";
type TransetLayer =
  | CommonLayer
  | TransetUnitLayer
  | TransetArtifactLayer
  | TransetTerrainLayer;
type TransetBattlePos = never;
type TransetBattleVar = never;
type TransetTurnPos = never;
type TransetTurnVar = never;

type TransetBoardName = "basic";
type TransetSetupName = "basic";
type TransetRulesetName = "basic";
type TransetVariantName = "regular";

type TransetGrid = never;

type TransetPosition =
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

export type TransetBlob = AlgolGameBlob<
  TransetArtifactLayer,
  TransetBoardName,
  TransetBattlePos,
  TransetBattleVar,
  TransetCommand,
  TransetGenerator,
  TransetGrid,
  TransetLayer,
  TransetMark,
  TransetPhase,
  TransetPosition,
  TransetRulesetName,
  TransetSetupName,
  TransetTerrain,
  TransetTurnPos,
  TransetTurnVar,
  TransetUnit
>;

export type TransetDefinition = FullDef<TransetBlob>;
