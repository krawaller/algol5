// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type DescentBoardHeight = 4;
type DescentBoardWidth = 4;

type DescentTerrain = never;
type DescentUnit = "lvl3" | "lvl2" | "lvl1" | "lvl0";
type DescentMark = "selectunit" | "selectmovetarget" | "selectdigtarget";
type DescentCommand = "move" | "dig";
type DescentPhaseCommand = "move";
type DescentPhase = "startTurn" | DescentMark | DescentPhaseCommand;
type DescentUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "lvl3"
  | "mylvl3"
  | "opplvl3"
  | "neutrallvl3"
  | "lvl2"
  | "mylvl2"
  | "opplvl2"
  | "neutrallvl2"
  | "lvl1"
  | "mylvl1"
  | "opplvl1"
  | "neutrallvl1"
  | "lvl0"
  | "mylvl0"
  | "opplvl0"
  | "neutrallvl0";
type DescentGenerator = "findmovetargets" | "finddigtargets" | "findwinlines";
type DescentArtifactLayer = "movetargets" | "digtargets" | "winline";
type DescentTerrainLayer = never;
type DescentLayer = CommonLayer | DescentUnitLayer | DescentArtifactLayer;
type DescentBattlePos = never;
type DescentBattleVar = never;
type DescentTurnPos = "movedto";
type DescentTurnVar = "heightto" | "heightfrom";

type DescentBoardName = "basic";
type DescentSetupName = "basic";
type DescentRulesetName = "basic";
type DescentVariantName = "basic";

type DescentGrid = never;

type DescentPosition =
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

type DescentBlob = AlgolGameBlob<
  DescentArtifactLayer,
  DescentBoardName,
  DescentBattlePos,
  DescentBattleVar,
  DescentCommand,
  DescentGenerator,
  DescentGrid,
  DescentLayer,
  DescentMark,
  DescentPhase,
  DescentPosition,
  DescentRulesetName,
  DescentSetupName,
  DescentTerrain,
  DescentTurnPos,
  DescentTurnVar,
  DescentUnit
>;

export type DescentDefinition = FullDef<DescentBlob>;
