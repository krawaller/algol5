// Generated file, do not edit here!
import { CommonLayer, FullDef, AlgolGameBlob } from "../../../types";

type TowertwoBoardHeight = 6;
type TowertwoBoardWidth = 6;

type TowertwoTerrain = "base";
type TowertwoUnit = "soldiers";
type TowertwoMark = "selectsource" | "selectmovetarget";
type TowertwoCommand = "heal" | "deploy" | "move";
type TowertwoPhaseCommand = "heal" | "deploy" | "move";
type TowertwoPhase = "startTurn" | TowertwoMark | TowertwoPhaseCommand;
type TowertwoUnitLayer =
  | "units"
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "soldiers"
  | "mysoldiers"
  | "oppsoldiers"
  | "neutralsoldiers";
type TowertwoGenerator = "findmovetargets" | "findvictims";
type TowertwoArtifactLayer = "movetargets" | "victims";
type TowertwoTerrainLayer = "base" | "mybase" | "oppbase" | "nobase";
type TowertwoLayer =
  | CommonLayer
  | TowertwoUnitLayer
  | TowertwoArtifactLayer
  | TowertwoTerrainLayer;
type TowertwoBattlePos = never;
type TowertwoBattleVar = "plr1wounded" | "plr2wounded";
type TowertwoTurnPos = never;
type TowertwoTurnVar = "spent";

type TowertwoBoardName = "basic";
type TowertwoSetupName = "basic";
type TowertwoRulesetName = "basic";
type TowertwoVariantName = "regular";

type TowertwoGrid = never;

type TowertwoPosition =
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

export type TowertwoBlob = AlgolGameBlob<
  TowertwoArtifactLayer,
  TowertwoBoardName,
  TowertwoBattlePos,
  TowertwoBattleVar,
  TowertwoCommand,
  TowertwoGenerator,
  TowertwoGrid,
  TowertwoLayer,
  TowertwoMark,
  TowertwoPhase,
  TowertwoPosition,
  TowertwoRulesetName,
  TowertwoSetupName,
  TowertwoTerrain,
  TowertwoTurnPos,
  TowertwoTurnVar,
  TowertwoUnit
>;

export type TowertwoDefinition = FullDef<TowertwoBlob>;
